"""
Support for Roku API emulation.

For more details about this component, please refer to the documentation at
https://home-assistant.io/components/emulated_roku/
"""
import asyncio
import logging

from homeassistant.const import (
    EVENT_HOMEASSISTANT_START, EVENT_HOMEASSISTANT_STOP)
import homeassistant.helpers.config_validation as cv
import voluptuous as vol

REQUIREMENTS = ['emulated_roku==0.1.3']

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'emulated_roku'

CONF_HOST_IP = 'host_ip'
CONF_LISTEN_PORTS = 'listen_ports'
CONF_ADVERTISE_IP = 'advertise_ip'
CONF_UPNP_BIND_MULTICAST = 'upnp_bind_multicast'

DEFAULT_HOST_IP = "0.0.0.0"
DEFAULT_LISTEN_PORTS = [8060]
DEFAULT_UPNP_BIND_MULTICAST = True

CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
        vol.Optional(CONF_HOST_IP, default=DEFAULT_HOST_IP): cv.string,
        vol.Optional(CONF_LISTEN_PORTS,
                     default=DEFAULT_LISTEN_PORTS): cv.ensure_list,
        vol.Optional(CONF_ADVERTISE_IP): cv.string,
        vol.Optional(CONF_UPNP_BIND_MULTICAST,
                     default=DEFAULT_UPNP_BIND_MULTICAST): cv.boolean
    })
}, extra=vol.ALLOW_EXTRA)

EVENT_ROKU_COMMAND = 'roku_command'

ATTR_COMMAND_TYPE = 'type'
ATTR_ROKU_USN = 'roku_usn'
ATTR_KEY = 'key'
ATTR_APP_ID = 'app_id'

ROKU_COMMAND_KEYDOWN = 'keydown'
ROKU_COMMAND_KEYUP = 'keyup'
ROKU_COMMAND_KEYPRESS = 'keypress'
ROKU_COMMAND_LAUNCH = 'launch'


@asyncio.coroutine
def async_setup(hass, config):
    """Setup the emulated roku component."""
    from emulated_roku import RokuCommandHandler, make_roku_api

    _LOGGER.info("Initializing emulated roku")

    config = config.get(DOMAIN)

    host_ip = config.get(CONF_HOST_IP)
    listen_ports = config.get(CONF_LISTEN_PORTS)
    advertise_ip = config.get(CONF_ADVERTISE_IP) or host_ip
    bind_multicast = config.get(CONF_UPNP_BIND_MULTICAST)

    class HomeAssistantRokuCommandHandler(RokuCommandHandler):
        """Emulated Roku command handler."""

        def __init__(self, hass):
            self.hass = hass

        def on_keydown(self, roku_usn, key):
            self.hass.bus.async_fire(EVENT_ROKU_COMMAND, {
                ATTR_ROKU_USN: roku_usn,
                ATTR_COMMAND_TYPE: ROKU_COMMAND_KEYDOWN,
                ATTR_KEY: key
            })

        def on_keyup(self, roku_usn, key):
            self.hass.bus.async_fire(EVENT_ROKU_COMMAND, {
                ATTR_ROKU_USN: roku_usn,
                ATTR_COMMAND_TYPE: ROKU_COMMAND_KEYUP,
                ATTR_KEY: key
            })

        def on_keypress(self, roku_usn, key):
            self.hass.bus.async_fire(EVENT_ROKU_COMMAND, {
                ATTR_ROKU_USN: roku_usn,
                ATTR_COMMAND_TYPE: ROKU_COMMAND_KEYPRESS,
                ATTR_KEY: key
            })

        def launch(self, roku_usn, app_id):
            self.hass.bus.async_fire(EVENT_ROKU_COMMAND, {
                ATTR_ROKU_USN: roku_usn,
                ATTR_COMMAND_TYPE: ROKU_COMMAND_LAUNCH,
                ATTR_APP_ID: app_id
            })

    servers = []

    @asyncio.coroutine
    def start_emulated_roku(event):
        """Start the emulated roku servers."""
        handler = HomeAssistantRokuCommandHandler(hass)

        for port in listen_ports:
            if isinstance(port, int):
                advertise_port = port
            else:
                port, advertise_port = port.split(':')

                port = int(port)
                advertise_port = int(advertise_port)

            _LOGGER.info("Intializing emulated roku %s:%s", host_ip, port)
            discovery_endpoint, api_endpoint = make_roku_api(hass.loop,
                                                             handler,
                                                             host_ip,
                                                             port,
                                                             advertise_ip,
                                                             advertise_port,
                                                             bind_multicast)

            discovery_server, _ = yield from discovery_endpoint
            api_server = yield from api_endpoint

            servers.append(discovery_server)
            servers.append(api_server)

    @asyncio.coroutine
    def stop_emulated_roku(event):
        """Stop the emulated roku servers."""
        _LOGGER.info("Stopping emulated roku")
        for server in servers:
            server.close()

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_START, start_emulated_roku)
    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, stop_emulated_roku)

    return True