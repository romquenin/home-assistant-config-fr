"""Support for climacell.co API Version 4"""

import asyncio
import logging


from homeassistant.core import callback

from custom_components.climacell.data_provider import ClimacellTimelineDataProvider

DOMAIN = "climacell"

_LOGGER = logging.getLogger(__name__)


@asyncio.coroutine
def async_setup(hass, config):
    _LOGGER.info("__init__ async_setup start for domain %s.", DOMAIN)

    @callback
    def climacell_service(call):
        """climacell service."""
        _LOGGER.info(
            "__init__ async_setup start service for domain %s. Receive data %s",
            DOMAIN,
            call.data,
        )

    # Register our service with Home Assistant.
    hass.services.async_register(DOMAIN, "climacell_weather", climacell_service)

    _LOGGER.info("__init__ async_setup done for domain %s.", DOMAIN)
    return True
