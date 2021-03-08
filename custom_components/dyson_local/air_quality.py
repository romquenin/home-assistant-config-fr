"""Air quality platform for dyson."""

from typing import Callable
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_NAME
from homeassistant.helpers.update_coordinator import CoordinatorEntity, DataUpdateCoordinator
from homeassistant.components.air_quality import AirQualityEntity
from libdyson import MessageType, DysonDevice, DysonPureCoolLink

from . import DysonEntity
from .const import DATA_COORDINATORS, DOMAIN, DATA_DEVICES
from .utils import environmental_property

ATTR_VOC = "volatile_organic_compounds"


async def async_setup_entry(
    hass: HomeAssistant, config_entry: ConfigEntry, async_add_entities: Callable
) -> None:
    """Set up Dyson air quality from a config entry."""
    coordinator = hass.data[DOMAIN][DATA_COORDINATORS][config_entry.entry_id]
    device = hass.data[DOMAIN][DATA_DEVICES][config_entry.entry_id]
    name = config_entry.data[CONF_NAME]
    if isinstance(device, DysonPureCoolLink):
        entities = [DysonPureCoolLinkAirQualityEntity(coordinator, device, name)]
    else:  # DysonPureCool
        entities = [DysonPureCoolAirQualityEntity(coordinator, device, name)]
    async_add_entities(entities)


class DysonAirQualityEntity(CoordinatorEntity, DysonEntity, AirQualityEntity):

    _MESSAGE_TYPE: MessageType.ENVIRONMENTAL

    def __init__(self, coordinator: DataUpdateCoordinator, device: DysonDevice, name: str):
        CoordinatorEntity.__init__(self, coordinator)
        DysonEntity.__init__(self, device, name)

    @property
    def sub_name(self):
        """Return the name of the air quality entity."""
        return "Air Quality"

    @property
    def device_state_attributes(self):
        """Return the device state attributes."""
        return {ATTR_VOC: self.volatile_organic_compounds}


class DysonPureCoolLinkAirQualityEntity(DysonAirQualityEntity):

    @environmental_property
    def particulate_matter_2_5(self):
        """Return the particulate matter 2.5 level."""
        return self._device.particulates

    @environmental_property
    def particulate_matter_10(self):
        """Return the particulate matter 10 level."""
        return self._device.particulates

    @environmental_property
    def volatile_organic_compounds(self):
        """Return the VOC (Volatile Organic Compounds) level."""
        return self._device.volatile_organic_compounds

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity."""
        return "level"


class DysonPureCoolAirQualityEntity(DysonAirQualityEntity):

    @environmental_property
    def particulate_matter_2_5(self):
        """Return the particulate matter 2.5 level."""
        return self._device.particulate_matter_2_5

    @environmental_property
    def particulate_matter_10(self):
        """Return the particulate matter 10 level."""
        return self._device.particulate_matter_10

    @environmental_property
    def volatile_organic_compounds(self):
        """Return the VOC (Volatile Organic Compounds) level."""
        return self._device.volatile_organic_compounds

    @property
    def nitrogen_dioxide(self):
        """Return the NO2 (nitrogen dioxide) level."""
        return self._device.nitrogen_dioxide
