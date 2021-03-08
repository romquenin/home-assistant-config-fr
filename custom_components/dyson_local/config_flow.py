import logging
import threading
from typing import Optional
from homeassistant import config_entries
from homeassistant.components.zeroconf import async_get_instance
from homeassistant.const import CONF_DEVICE, CONF_HOST, CONF_NAME
from homeassistant.exceptions import HomeAssistantError
from libdyson.cloud import DysonDeviceInfo
import voluptuous as vol
from libdyson.discovery import DysonDiscovery
from libdyson.exceptions import DysonException, DysonInvalidCredential
from libdyson import get_device, DEVICE_TYPE_NAMES
from voluptuous.error import Invalid
from .const import CONF_CREDENTIAL, CONF_DEVICE_TYPE, CONF_SERIAL, DOMAIN

_LOGGER = logging.getLogger(__name__)


DISCOVERY_TIMEOUT = 10

class DysonLocalConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Dyson local config flow."""

    VERSION = 1
    CONNECTION_CLASS = config_entries.CONN_CLASS_LOCAL_PUSH

    def __init__(self):
        """Initialize the config flow."""
        self._device_info = None

    async def async_step_user(self, info):
        errors = {}
        if info is not None:
            serial = info[CONF_SERIAL]
            for entry in self._async_current_entries():
                if entry.unique_id == serial:
                    return self.async_abort(reason="already_configured")
            await self.async_set_unique_id(serial)
            self._abort_if_unique_id_configured()

            device_type = info[CONF_DEVICE_TYPE]
            device_type_name = DEVICE_TYPE_NAMES[device_type]
            try:
                data = await self._async_get_entry_data(
                    serial,
                    info[CONF_CREDENTIAL],
                    device_type,
                    device_type_name,
                    info.get(CONF_HOST),
                )
            except InvalidAuth:
                errors["base"] = "invalid_auth"
            except CannotConnect:
                errors["base"] = "cannot_connect"
            except CannotFind:
                errors["base"] = "cannot_find"
            else:
                return self.async_create_entry(
                    title=device_type_name,
                    data=data,
                )

        info = info or {}
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({
                vol.Required(CONF_SERIAL, default=info.get(CONF_SERIAL, "")): str,
                vol.Required(CONF_CREDENTIAL, default=info.get(CONF_CREDENTIAL, "")): str,
                vol.Required(CONF_DEVICE_TYPE, default=info.get(CONF_DEVICE_TYPE, "")): vol.In(DEVICE_TYPE_NAMES),
                vol.Optional(CONF_HOST, default=info.get(CONF_HOST, "")): str,
            }),
            errors=errors,
        )

    async def async_step_host(self, info: Optional[dict]=None):
        errors = {}
        if info is not None:
            try:
                data = await self._async_get_entry_data(
                    self._device_info.serial,
                    self._device_info.credential,
                    self._device_info.product_type,
                    self._device_info.name,
                    info.get(CONF_HOST),
                )
            except CannotConnect:
                errors["base"] = "cannot_connect"
            except CannotFind:
                errors["base"] = "cannot_find"
            else:
                return self.async_create_entry(
                    title=self._device_info.name,
                    data=data,
                )

        info = info or {}
        return self.async_show_form(
            step_id="host",
            data_schema=vol.Schema({
                vol.Optional(CONF_HOST, default=info.get(CONF_HOST, "")): str
            }),
            errors=errors,
        )

    async def async_step_discovery(self, info: DysonDeviceInfo):
        for entry in self._async_current_entries():
            if entry.unique_id == info.serial:
                return self.async_abort(reason="already_configured")
        await self.async_set_unique_id(info.serial)
        self._abort_if_unique_id_configured()
        self.context["title_placeholders"] = {
            CONF_NAME: info.name,
            CONF_SERIAL: info.serial,
        }
        self._device_info = info
        return await self.async_step_host()

    async def _async_get_entry_data(
        self,
        serial: str,
        credential: str,
        device_type: str,
        name: str,
        host: Optional[str]=None,
    ) -> Optional[str]:
        device = get_device(serial, credential, device_type)

        # Find device using discovery
        if not host:
            discovered = threading.Event()
            def _callback(address: str) -> None:
                _LOGGER.debug("Found device at %s", address)
                nonlocal host
                host = address
                discovered.set()
            discovery = DysonDiscovery()
            discovery.register_device(device, _callback)
            discovery.start_discovery(
                await async_get_instance(self.hass)
            )
            succeed = await self.hass.async_add_executor_job(
                discovered.wait, DISCOVERY_TIMEOUT
            )
            discovery.stop_discovery()
            if not succeed:
                _LOGGER.debug("Discovery timed out")
                raise CannotFind

        # Try connect to the device
        try:
            device.connect(host)
        except DysonInvalidCredential:
            raise InvalidAuth
        except DysonException as err:
            _LOGGER.debug("Failed to connect to device: %s", err)
            raise CannotConnect

        return {
            CONF_SERIAL: serial,
            CONF_CREDENTIAL: credential,
            CONF_DEVICE_TYPE: device_type,
            CONF_NAME: name,
            CONF_HOST: host,
        }


class CannotConnect(HomeAssistantError):
    """Represents connection failure."""


class CannotFind(HomeAssistantError):
    """Represents discovery failure."""


class InvalidAuth(HomeAssistantError):
    """Represents invalid authentication."""
