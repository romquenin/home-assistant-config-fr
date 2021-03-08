"""Binary sensor platform for dyson."""

from typing import Callable
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.components.binary_sensor import BinarySensorEntity, DEVICE_CLASS_BATTERY_CHARGING
from homeassistant.config_entries import ConfigEntry

from . import DysonEntity
from .const import DATA_DEVICES, DOMAIN


async def async_setup_entry(
    hass: HomeAssistant, config_entry: ConfigEntry, async_add_entities: Callable
) -> None:
    """Set up Dyson binary sensor from a config entry."""
    device = hass.data[DOMAIN][DATA_DEVICES][config_entry.entry_id]
    entity = Dyson360EyeBatteryChargingSensor(device, config_entry.data[CONF_NAME])
    async_add_entities([entity])


class Dyson360EyeBatteryChargingSensor(DysonEntity, BinarySensorEntity):

    @property
    def state(self) -> bool:
        """Return the state of the sensor."""
        return self._device.is_charging

    @property
    def device_class(self) -> str:
        """Return the device class of the sensor."""
        return DEVICE_CLASS_BATTERY_CHARGING

    @property
    def sub_name(self) -> str:
        """Return the name of the sensor."""
        return "Battery Charging"
