"""my first component."""
from datetime import timedelta
import logging

try:
    from homeassistant.config_entries import SOURCE_IMPORT
    from homeassistant.const import (
        CONF_SCAN_INTERVAL,
        EVENT_HOMEASSISTANT_STARTED,
    )
    from homeassistant.core import CoreState, callback
    from homeassistant.exceptions import ConfigEntryNotReady

    from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
except ImportError:
    # si py test
    class DataUpdateCoordinator:
        def __init__(self):
            # nothing to do
            pass

    def callback(var1):
        return

from . import sensorEnedis
from . import myEnedis

from .const import (
    CONF_TOKEN,
    CONF_CODE,
    DOMAIN,
    PLATFORM,
    HP_COST,
    HC_COST,
    DEFAULT_SCAN_INTERVAL,
    DEFAULT_SENSOR_INTERVAL,
    myENEDIS_SERVICE,
    __VERSION__,
    __name__,
    CONF_DELAY,
    HEURESCREUSES_ON,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Import integration from config."""
    hass.data.setdefault(DOMAIN, {})
    conf = config.get(DOMAIN)
    if conf:
        for enedisconf in conf:
            _LOGGER.info("run myEnedis for %s" % enedisconf)
        if DOMAIN in config:
            hass.async_create_task(
                hass.config_entries.flow.async_init(
                    DOMAIN, context={"source": SOURCE_IMPORT}, data=config[DOMAIN]
                )
            )
    return True

async def async_setup_entry(hass, config_entry) -> bool:
    _LOGGER.info("run myEnedis - sensorEnedisCoordinator %s" % config_entry.data)
    coordinator = sensorEnedisCoordinator(hass, config_entry)
    await coordinator.async_setup()

    async def _enable_scheduled_myEnedis(*_):
        """Activate the data update coordinator."""
        coordinator.update_interval = timedelta(
            seconds=config_entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        )
        await coordinator.async_refresh()

    if hass.state == CoreState.running:
        await _enable_scheduled_myEnedis()
        if not coordinator.last_update_success:
            raise ConfigEntryNotReady
    else:
        # Running a speed test during startup can prevent
        # integrations from being able to setup because it
        # can saturate the network interface.
        hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_STARTED, _enable_scheduled_myEnedis
        )
    undo_listener = config_entry.add_update_listener(update_listener)
    if DOMAIN not in hass.data.keys():
        hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][config_entry.entry_id] = coordinator
    for component in [PLATFORM]:
        _LOGGER.info("run myEnedis - component %s" % component)
        hass.async_create_task(
            hass.config_entries.async_forward_entry_setup(config_entry, component)
        )
    return True


async def update_listener(hass, config_entry):
    """Update listener."""
    await hass.config_entries.async_reload(config_entry.entry_id)


async def async_unload_entry(hass, config_entry):
    """Unload myEnedis Entry from config_entry."""
    hass.services.async_remove(DOMAIN, myENEDIS_SERVICE)
    hass.data[DOMAIN][config_entry.entry_id].async_unload()
    await hass.config_entries.async_forward_entry_unload(config_entry, "sensor")
    hass.data.pop(DOMAIN)
    return True


class sensorEnedisCoordinator(DataUpdateCoordinator):

    def __init__(self, hass, config_entry):
        """Initialize the data object."""
        self.hass = hass
        self.config_entry = config_entry
        self.myEnedis = None
        self.servers = {}
        self._unsub_update_listener = None
        super().__init__(
            self.hass,
            _LOGGER,
            name=DOMAIN,
            update_method=self.async_update,
        )

    def init_update_data(self):
        """Get the latest data from myEnedis."""
        self.myEnedis.initUpdate()
        return True

    def update_data(self):
        """Get the latest data from myEnedis."""
        self.myEnedis.updateManagerSensor()
        return True

    async def async_update(self, *_):
        """Update myEnedis data."""
        try:
            return await self.hass.async_add_executor_job(self.update_data)
        except Exception as inst:
            raise Exception(inst)

    async def async_set_options(self):
        """Set options for entry."""
        _LOGGER.info("async_set_options - proc -- %s" % self.config_entry.options)
        if not self.config_entry.options:
            _LOGGER.info(".config_entry.options()")
            data = {**self.config_entry.data}
            options = {
                CONF_SCAN_INTERVAL: data.pop(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
                CONF_TOKEN: data.pop(CONF_TOKEN, ""),
                CONF_CODE: str(data.pop(CONF_CODE, "")),
                HP_COST: str(data.pop(HP_COST, "0.0")),
                HC_COST: str(data.pop(HC_COST, "0.0")),
                HEURESCREUSES_ON: bool(data.pop(HEURESCREUSES_ON, True)),
            }
            self.hass.config_entries.async_update_entry(
                self.config_entry, data=data, options=options
            )
            _LOGGER.info(".config_entry.options() - done")
        _LOGGER.info("async_set_options - proc -- done ")

    def update_MyEnedis(self):
        _LOGGER.info("update_MyEnedis pre-getini for %s" % (self.config_entry.options['token']))
        if not self.myEnedis.getInit():
            _LOGGER.info("getInit()")
            delai_interval = CONF_DELAY  # delai de rafraichissement de l'appel API
            heures_creuses = None
            hc_cost_key = "hc_cout"
            hp_cost_key = "hp_cout"
            heurescreusesON_key = "heuresCreusesON"
            if hc_cost_key not in self.config_entry.options.keys():
                hc_cost = float("0.0")
            else:
                hc_cost = float(self.config_entry.options.get(hc_cost_key, "0.0"))
            if hp_cost_key not in self.config_entry.options.keys():
                hp_cost = float("0.0")
            else:
                hp_cost = float(self.config_entry.options.get(hp_cost_key, "0.0"))
            token, code = self.config_entry.options['token'], self.config_entry.options['code']
            if heurescreusesON_key not in self.config_entry.options.keys():
                heures_creusesON = True
            else:
                heures_creusesON = self.config_entry.options[heurescreusesON_key]
            _LOGGER.info("options - proc -- %s %s %s %s %s" % (token, code, hc_cost, hp_cost, heures_creusesON))
            my_data_enedis = myEnedis.myEnedis(token, code, delai_interval,
                                               heuresCreuses=heures_creuses, heuresCreusesCost=hc_cost,
                                               heuresPleinesCost=hp_cost, log=_LOGGER,
                                               version = __VERSION__, heuresCreusesON = heures_creusesON)
            self.myEnedis.init(my_data_enedis, _LOGGER, __VERSION__)

    async def async_setup(self):
        """Set up myEnedis."""
        try:
            _LOGGER.info("run my First Extension")
            self.myEnedis = await self.hass.async_add_executor_job(sensorEnedis.manageSensorState)
            _LOGGER.info("run my First Extension - done -- ")
        except Exception as inst:
            raise Exception(inst)

        async def request_update(call):
            """Request update."""
            await self.async_request_refresh()

        await self.async_set_options()
        await self.hass.async_add_executor_job(self.update_MyEnedis)
        self._unsub_update_listener = self.config_entry.add_update_listener(
            options_updated_listener
        )

    @callback
    def async_unload(self):
        """Unload the coordinator."""
        if not self._unsub_update_listener:
            return
        self._unsub_update_listener()
        self._unsub_update_listener = None


async def options_updated_listener(hass, entry):
    """Handle options update."""
    _LOGGER.info("options_updated_listener ")
    hass.data[DOMAIN][entry.entry_id].update_interval = timedelta(
        seconds=DEFAULT_SENSOR_INTERVAL
    )
    await hass.data[DOMAIN][entry.entry_id].async_request_refresh()
    _LOGGER.info("options_updated_listener - done -- ")
