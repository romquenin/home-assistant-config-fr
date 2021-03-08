"""Fan platform for dyson."""

import math
from homeassistant.const import CONF_NAME
import logging
from libdyson.const import AirQualityTarget
import voluptuous as vol

from typing import Callable, List, Optional
from homeassistant.components.fan import FanEntity, SPEED_HIGH, SPEED_LOW, SPEED_MEDIUM, SUPPORT_OSCILLATE, SUPPORT_SET_SPEED
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_platform, config_validation as cv
from homeassistant.util.percentage import (
    int_states_in_range,
    percentage_to_ranged_value,
    ranged_value_to_percentage,
)

from libdyson import MessageType, DysonPureCoolLink

from . import DysonEntity, DOMAIN
from .const import DATA_DEVICES

_LOGGER = logging.getLogger(__name__)

AIR_QUALITY_TARGET_ENUM_TO_STR = {
    AirQualityTarget.GOOD: "good",
    AirQualityTarget.DEFAULT: "default",
    AirQualityTarget.SENSITIVE: "sensitive",
    AirQualityTarget.VERY_SENSITIVE: "very sensitive",
}

AIR_QUALITY_TARGET_STR_TO_ENUM = {
    value: key
    for key, value in AIR_QUALITY_TARGET_ENUM_TO_STR.items()
}

ATTR_AIR_QUALITY_TARGET = "air_quality_target"

SERVICE_SET_AIR_QUALITY_TARGET = "set_air_quality_target"

SET_AIR_QUALITY_TARGET_SCHEMA = {
    vol.Required(ATTR_AIR_QUALITY_TARGET): vol.In(AIR_QUALITY_TARGET_STR_TO_ENUM),
}

PRESET_MODE_AUTO = "auto"
PRESET_MODES = [PRESET_MODE_AUTO]

SPEED_LIST_DYSON = list(range(1, 11))  # 1, 2, ..., 10

SPEED_RANGE = (
    SPEED_LIST_DYSON[0],
    SPEED_LIST_DYSON[-1],
)

SUPPORTED_FEATURES = SUPPORT_OSCILLATE | SUPPORT_SET_SPEED


async def async_setup_entry(
    hass: HomeAssistant, config_entry: ConfigEntry, async_add_entities: Callable
) -> None:
    """Set up Dyson fan from a config entry."""
    device = hass.data[DOMAIN][DATA_DEVICES][config_entry.entry_id]
    name = config_entry.data[CONF_NAME]
    if isinstance(device, DysonPureCoolLink):
        entity = DysonPureCoolLinkEntity(device, name)
    else:
        entity = DysonPureCoolEntity(device, name)
    async_add_entities([entity])

    platform = entity_platform.current_platform.get()
    if isinstance(device, DysonPureCoolLink):
        platform.async_register_entity_service(
            SERVICE_SET_AIR_QUALITY_TARGET, SET_AIR_QUALITY_TARGET_SCHEMA, "set_air_quality_target"
        )


class DysonFanEntity(DysonEntity, FanEntity):

    _MESSAGE_TYPE = MessageType.STATE

    @property
    def is_on(self) -> bool:
        """Return if the fan is on."""
        return self._device.is_on

    @property
    def speed_count(self) -> int:
        """Return the number of speeds the fan supports."""
        return int_states_in_range(SPEED_RANGE)

    @property
    def percentage(self) -> Optional[int]:
        """Return the current speed percentage."""
        if self._device.auto_mode:
            return None
        return ranged_value_to_percentage(SPEED_RANGE, int(self._device.speed))

    @property
    def preset_modes(self) -> List[str]:
        """Return the available preset modes."""
        return PRESET_MODES

    @property
    def preset_mode(self) -> Optional[str]:
        """Return the current preset mode."""
        if self._device.auto_mode:
            return PRESET_MODE_AUTO
        return None

    @property
    def oscillating(self):
        """Return the oscillation state."""
        return self._device.oscillation

    @property
    def supported_features(self) -> int:
        """Flag supported features."""
        return SUPPORTED_FEATURES

    def turn_on(
        self,
        speed: Optional[str] = None,
        percentage: Optional[int] = None,
        preset_mode: Optional[str] = None,
        **kwargs,
    ) -> None:
        """Turn on the fan."""
        _LOGGER.debug("Turn on fan %s with percentage %s", self.name, percentage)
        if preset_mode:
            self.set_preset_mode(preset_mode)
        elif percentage is None:
            # percentage not set, just turn on
            self._device.turn_on()
        else:
            self.set_percentage(percentage)

    def turn_off(self, **kwargs) -> None:
        """Turn off the fan."""
        _LOGGER.debug("Turn off fan %s", self.name)
        return self._device.turn_off()

    def set_percentage(self, percentage: int) -> None:
        """Set the speed percentage of the fan."""
        dyson_speed = math.ceil(percentage_to_ranged_value(SPEED_RANGE, percentage))
        self._device.set_speed(dyson_speed)

    def set_preset_mode(self, preset_mode: str) -> None:
        """Set a preset mode on the fan."""
        self._valid_preset_mode_or_raise(preset_mode)
        # There currently is only one
        self._device.enable_auto_mode()

    def oscillate(self, oscillating: bool) -> None:
        """Turn on/of oscillation."""
        _LOGGER.debug("Turn oscillation %s for device %s", oscillating, self.name)
        if oscillating:
            self._device.enable_oscillation()
        else:
            self._device.disable_oscillation()


class DysonPureCoolLinkEntity(DysonFanEntity):
    """Dyson Pure Cool Link entity."""

    @property
    def air_quality_target(self) -> str:
        """Return air quality target."""
        return AIR_QUALITY_TARGET_ENUM_TO_STR[self._device.air_quality_target]

    @property
    def device_state_attributes(self) -> dict:
        """Return optional state attributes."""
        return {ATTR_AIR_QUALITY_TARGET: self.air_quality_target}

    def set_air_quality_target(self, air_quality_target: str) -> None:
        """Set air quality target."""
        self._device.set_air_quality_target(AIR_QUALITY_TARGET_STR_TO_ENUM[air_quality_target])


class DysonPureCoolEntity(DysonFanEntity):
    """Dyson Pure Cool entity."""
