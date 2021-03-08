"""Sensor for my first"""
import datetime
import logging
from datetime import timedelta

import homeassistant.helpers.config_validation as cv
import voluptuous as vol
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    CONF_NAME,
    ATTR_ATTRIBUTION,
)
from homeassistant.core import callback
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.typing import HomeAssistantType
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import Throttle

from .const import (
    DOMAIN,
    CONF_TOKEN,
    CONF_CODE,
    HC_COST,
    HP_COST,
    DEFAULT_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL_HISTORIQUE,
    CONF_DELAY,
    HEURESCREUSES_ON,
    __VERSION__,
    __name__,
    _consommation,
    _production
)

_LOGGER = logging.getLogger(__name__)

ICON = "mdi:package-variant-closed"


DEFAUT_DELAI_INTERVAL = 7200 # interrogation faite toutes 2 les heures
#DEFAUT_DELAI_INTERVAL = 120 # interrogation faite toutes 2 les heures
DEFAUT_HEURES_CREUSES = "[]"
DEFAUT_COST = "0.0"
HEURES_CREUSES = "heures_creuses"
DEFAUT_HEURES_CREUSES_ON = True

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_TOKEN): cv.string,
        vol.Required(CONF_CODE): cv.string,
        vol.Optional(CONF_NAME): cv.string,
        vol.Optional(HEURES_CREUSES, default=DEFAUT_HEURES_CREUSES): cv.string,
        vol.Optional(CONF_DELAY, default=DEFAUT_DELAI_INTERVAL): cv.positive_int,
        vol.Optional(HC_COST, default=DEFAUT_COST): cv.string,
        vol.Optional(HP_COST, default=DEFAUT_COST): cv.string,
        vol.Optional(HEURESCREUSES_ON, default=DEFAUT_HEURES_CREUSES_ON): cv.boolean,
    }
)

from . import myEnedis
from . import sensorEnedis


def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up the platform."""
    _LOGGER.info("myEnedis version %s " %( __VERSION__))
    name = config.get(CONF_NAME)
    token = config.get(CONF_TOKEN)
    code = config.get(CONF_CODE)
    heuresCreusesCh = config.get(HEURES_CREUSES)
    heuresCreuses = eval(heuresCreusesCh)
    HCCost = float(config.get(HC_COST))
    HPCost = float(config.get(HP_COST))
    heuresCreusesON = config.get(HEURESCREUSES_ON)
    update_interval = DEFAULT_SCAN_INTERVAL
    update_interval_historique = DEFAULT_SCAN_INTERVAL_HISTORIQUE
    delai_interval = config.get(CONF_DELAY)

    try:
        session = []
    except :
        _LOGGER.exception("Could not run my First Extension")
        return False
    myDataEnedis = myEnedis.myEnedis( token, code, delai_interval,
        heuresCreuses=heuresCreuses, heuresCreusesCost=HCCost, heuresPleinesCost=HPCost, log=_LOGGER,
        version = __VERSION__, heuresCreusesON = heuresCreusesON
    )
    # faire lupdate contract ...si pas fait
    mSS = sensorEnedis.manageSensorState()
    mSS.init( myDataEnedis, _LOGGER, __VERSION__)
    mSS.initUpdate()
    add_entities([myEnedisSensor(session, name, update_interval, mSS, _consommation )], True)
    add_entities([myEnedisSensor(session, name, update_interval, mSS, _production )], True)
    # gestion historique
    add_entities([myEnedisSensorHistory(session, name, update_interval_historique, mSS, "ALL" )], True)
    add_entities([myEnedisSensorHistory(session, name, update_interval_historique, mSS, "HC" )], True)
    add_entities([myEnedisSensorHistory(session, name, update_interval_historique, mSS, "HP" )], True)

async def async_setup_entry(
    hass: HomeAssistantType, entry: ConfigEntry, async_add_entities
) -> None:
    """Set up the myEnedis sensor platform."""
    entities = []
    myEnedis_Cordinator = hass.data[DOMAIN][entry.entry_id]
    myEnedis_Cordinator.myEnedis.initUpdate()
    entities.append(myEnedisSensorCoordinator(myEnedis_Cordinator))
    entities.append(myEnedisSensorYesterdayCostCoordinator(myEnedis_Cordinator))
    entities.append(myEnedisSensorCoordinator(myEnedis_Cordinator, _production))
    entities.append(myEnedisSensorCoordinatorHistory(myEnedis_Cordinator, detail = "ALL" ))
    entities.append(myEnedisSensorCoordinatorHistory(myEnedis_Cordinator, detail = "HC" ))
    entities.append(myEnedisSensorCoordinatorHistory(myEnedis_Cordinator, detail = "HP" ))
    async_add_entities(entities)

class myEnedisSensorCoordinator(CoordinatorEntity, RestoreEntity):
    """."""

    def __init__(self, coordinator, typeSensor = _consommation):
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._myDataEnedis = coordinator
        self._attributes = {}
        self._state = None
        self._unit = "kWh"
        #TEST
        interval = timedelta(seconds=120)
        self.update = Throttle(interval)(self._update)
        self._lastState = None
        self._lastAttributes = None
        self._typeSensor = typeSensor

    def setLastState(self):
        self._lastState = self._state
    def setLastAttributes(self):
        self._lastAttributes = self._attributes.copy()

    def setStateFromLastState(self):
        if ( self._lastState != None ) :
            self._state = self._lastState
    def setAttributesFromLastAttributes(self):
        if ( self._lastAttributes != None ) :
            self._attributes = self._lastAttributes.copy()
            return self._attributes
        else:
            return {}

    @property
    def unique_id(self):
        "Return a unique_id for this entity."
        if ( self._typeSensor == _production):
            name = "myEnedis.%s.production" %(self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID())
        else:
            name = "myEnedis.%s" %(self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID())
        return name
        #return f"{self._myDataEnedis._myDataEnedis.get_PDL_ID()}".lower()

    @property
    def name(self):
        """Return the name of the sensor."""
        if ( self._typeSensor == _production):
            name = "myEnedis.%s.production" %(self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID())
        else:
            name = "myEnedis.%s" %(self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID())
        return name

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        #if not self.coordinator.data:
        #    return None
        self._attributes = {
            ATTR_ATTRIBUTION: "",
            "ATTR_test": "test",
        }
        status_counts = self._myDataEnedis.myEnedis.getStatus( self._typeSensor )
        self._attributes.update(status_counts)
        return self._attributes

    async def async_added_to_hass(self):
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        state = await self.async_get_last_state()
        if state:
            self._state = state.state

        @callback
        def update():
            """Update state."""
            self._update_state()
            self.async_write_ha_state()

        self.async_on_remove(self.coordinator.async_add_listener(update))
        self._update_state()
        if not state:
            return

        if 'yesterday' not in self._attributes.keys() and 'yesterday_production' not in self._attributes.keys(): # pas plutot la key à checker ??
            self._state = state.state
            self._attributes = state.attributes
            self.setLastAttributes()
            self.setLastState()

    def _update_state(self):
        """Update sensors state."""
        self._attributes = {ATTR_ATTRIBUTION: "" }
        status_counts, state = self._myDataEnedis.myEnedis.getStatus(self._typeSensor)
        self._attributes.update(status_counts)
        self._state = state

    def _update(self):
        """Update device state."""
        self._attributes = {ATTR_ATTRIBUTION: ""}
        self._state = "unavailable"

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    @property
    def icon(self):
        """Icon to use in the frontend."""

class myEnedisSensorCoordinatorHistory(CoordinatorEntity, RestoreEntity):
    """."""

    def __init__(self, coordinator, typeSensor = _consommation, detail = "ALL"):
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._myDataEnedis = coordinator
        self._attributes = {}
        self._state = None
        self._unit = "kWh"
        #TEST
        interval = timedelta(seconds=120)
        self.update = Throttle(interval)(self._update)
        self._lastState = None
        self._lastAttributes = None
        self._typeSensor = typeSensor
        self._detail = detail

    @property
    def unique_id(self):
        "Return a unique_id for this entity."
        return f"{self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID()}_history_{self._detail}".lower()

    def setLastState(self):
        self._lastState = self._state
    def setLastAttributes(self):
        self._lastAttributes = self._attributes.copy()

    def setStateFromLastState(self):
        if ( self._lastState != None ) :
            self._state = self._lastState
    def setAttributesFromLastAttributes(self):
        if ( self._lastAttributes != None ) :
            self._attributes = self._lastAttributes.copy()
            return self._attributes
        else:
            return {}

    @property
    def name(self):
        """Return the name of the sensor."""
        return "myEnedis.history.%s.%s" % (self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID(), self._detail)

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    async def async_added_to_hass(self):
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        state = await self.async_get_last_state()
        if state:
            self._state = state.state

        @callback
        def update():
            """Update state."""
            self._update_state()
            self.async_write_ha_state()

        self.async_on_remove(self.coordinator.async_add_listener(update))
        self._update_state()
        if not state:
            return

    def _update_state(self):
        """Update sensors state."""
        self._attributes = {ATTR_ATTRIBUTION: "" }
        laDate = datetime.datetime.today() - datetime.timedelta(2)
        # on fait 2 jours, car les données de la veille ne sont pas encore disponible
        status_counts, state = self._myDataEnedis.myEnedis.getStatusHistory( laDate, self._detail )
        status_counts["lastUpdate"] = datetime.datetime.today().strftime("%Y-%m-%d %H:%M" )
        self._attributes.update(status_counts)
        self._state = state

    def _update(self):
        """Update device state."""
        self._attributes = {ATTR_ATTRIBUTION: ""}
        self._state = "unavailable"

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    @property
    def icon(self):
        """Icon to use in the frontend."""

class myEnedisSensorYesterdayCostCoordinator(CoordinatorEntity, RestoreEntity):
    """."""

    def __init__(self, coordinator):
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._myDataEnedis = coordinator
        self._attributes = {}
        self._state = None
        self._unit = "€"
        interval = timedelta(seconds=120)
        self.update = Throttle(interval)(self._update)
        self._lastState = None
        self._lastYesterday = None


    def setLastState(self):
        self._lastState = self._state

    @property
    def name(self):
        """Return the name of the sensor."""
        return "myEnedis.cost.yesterday.%s" %(self._myDataEnedis.myEnedis._myDataEnedis.get_PDL_ID())

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        #if not self.coordinator.data:
        #    return None
        self._attributes = {
            ATTR_ATTRIBUTION: "",
        }
        return self._attributes

    async def async_added_to_hass(self):
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        state = await self.async_get_last_state()

        @callback
        def update():
            """Update state."""
            self._update_state()
            self.async_write_ha_state()

        self.async_on_remove(self.coordinator.async_add_listener(update))
        self._update_state()
        if not state:
            return

    def _update_state(self):
        """Update sensors state."""
        dataAvailable, yesterdayDate, status_counts, state = self._myDataEnedis.myEnedis.getStatusYesterdayCost()
        if dataAvailable:
            if ( self._lastYesterday != yesterdayDate ) and ( yesterdayDate != None ):
                self._attributes = {ATTR_ATTRIBUTION: "" }
                status_counts["timeLastCall"] = datetime.datetime.now()
                self._attributes.update(status_counts)
                self._state = state
                self._lastYesterday = yesterdayDate
            else:
                # pas de nouvelle donnée
                return
        else:
            # donnée non disponible
            return

    def _update(self):
        """Update device state."""
        self._attributes = {ATTR_ATTRIBUTION: ""}
        self._state = "unavailable"

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    @property
    def icon(self):
        """Icon to use in the frontend."""


class myEnedisSensorHistory(RestoreEntity):
    """."""

    def __init__(self, session, name, interval, myDataEnedis, detail):
        """Initialize the sensor."""
        self._session = session
        self._name = name
        self._myDataEnedis = myDataEnedis
        self._attributes = {}
        self._state = None
        self._unit = "kWh"
        self.update = Throttle( timedelta(seconds=interval))(self._update)
        self._lastState = None
        self._lastAttributes = None
        self._detail = detail

    def setLastState(self):
        self._lastState = self._state
    def setLastAttributes(self):
        self._lastAttributes = self._attributes.copy()

    def setStateFromLastState(self):
        if ( self._lastState != None ) :
            self._state = self._lastState
    def setAttributesFromLastAttributes(self):
        if ( self._lastAttributes != None ) :
            self._attributes = self._lastAttributes.copy()
            return self._attributes
        else:
            return {}

    @property
    def unique_id(self):
        "Return a unique_id for this entity."
        return f"{self._myDataEnedis._myDataEnedis.get_PDL_ID()}_history_{self._detail}".lower()
    
    @property
    def name(self):
        """Return the name of the sensor."""
        return "myEnedis.history.%s.%s" %(self._myDataEnedis._myDataEnedis.get_PDL_ID(), self._detail)

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit

    def _update(self):
        """Update device state."""
        self._attributes = {ATTR_ATTRIBUTION: "" }
        laDate = datetime.datetime.today() - datetime.timedelta(2)
        # on fait 2 jours, car les données de la veille ne sont pas encore disponible
        status_counts, state = self._myDataEnedis.getStatusHistory( laDate, self._detail )
        status_counts["lastUpdate"] = datetime.datetime.today().strftime("%Y-%m-%d %H:%M" )
        self._attributes.update(status_counts)
        self._state = state

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    @property
    def icon(self):
        """Icon to use in the frontend."""

    async def async_added_to_hass(self) -> None:
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        state = await self.async_get_last_state()
        if not state:
            return

class myEnedisSensor(RestoreEntity):
    """."""

    def __init__(self, session, name, interval, myDataEnedis, typeSensor):
        """Initialize the sensor."""
        self._session = session
        self._name = name
        self._myDataEnedis = myDataEnedis
        self._attributes = {}
        self._state = None
        self._unit = "kWh"
        self.update = Throttle(timedelta(seconds=interval))(self._update)
        self._lastState = None
        self._lastAttributes = None
        self._typeSensor = typeSensor

    def setLastState(self):
        self._lastState = self._state

    def setLastAttributes(self):
        self._lastAttributes = self._attributes.copy()

    def setStateFromLastState(self):
        if (self._lastState != None):
            self._state = self._lastState

    def setAttributesFromLastAttributes(self):
        if (self._lastAttributes != None):
            self._attributes = self._lastAttributes.copy()
            return self._attributes
        else:
            return {}

    @property
    def unique_id(self):
        "Return a unique_id for this entity."
        if self._typeSensor == _production:
            name = "myEnedis.%s.production" %(self._myDataEnedis._myDataEnedis.get_PDL_ID())
        else:
            name = "myEnedis.%s" %(self._myDataEnedis._myDataEnedis.get_PDL_ID())
        return name
        #return f"{self._myDataEnedis._myDataEnedis.get_PDL_ID()}".lower()



    @property
    def name(self):
        """Return the name of the sensor."""
        if self._typeSensor == _production:
            name = "myEnedis.%s.production" %(self._myDataEnedis._myDataEnedis.get_PDL_ID())
        else:
            name = "myEnedis.%s" %(self._myDataEnedis._myDataEnedis.get_PDL_ID())
        return name


    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit

    def _update(self):
        """Update device state."""
        self._attributes = {ATTR_ATTRIBUTION: ""}
        self._myDataEnedis.updateManagerSensor()
        status_counts, state = self._myDataEnedis.getStatus( self._typeSensor)
        self._attributes.update(status_counts)
        self._state = state

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return self._attributes

    @property
    def icon(self):
        """Icon to use in the frontend."""

    async def async_added_to_hass(self) -> None:
        """Handle entity which will be added."""
        await super().async_added_to_hass()
        state = await self.async_get_last_state()
        if not state:
            return

        # ADDED CODE HERE
        # si seulement pas eut de mise à jour !!
        # si la clef yesterday est disponible dans l'element courant, alors c'est que l'on a eut une mise à jour
        if 'yesterday' not in self._attributes.keys() and 'yesterday_production' not in self._attributes.keys():  # pas plutot la key à checker ??
            self._state = state.state
            # _LOGGER.warning("*** / / / \ \ \ *** mise a jour state precedent %s " % (self._state))
            self._attributes = state.attributes
            # _LOGGER.warning("*** / / / \ \ \ *** mise a jour attributes precedent %s " %( self._attributes ))
            # on sauvegarde les elements pour les reprendre si errot
            self.setLastAttributes()
            self.setLastState()