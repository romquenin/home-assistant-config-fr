""" Constants """


ISSUE_URL="https://github.com/saniho/apiEnedis/issues"
myENEDIS_SERVICE = "myEnedis"
# nom du repertoire
DOMAIN = "myEnedis"
DATA_UPDATED = f"{DOMAIN}_data_updated"

# Base component constants
PLATFORM = "sensor"

# Configuration
CONF_TOKEN = "token"
CONF_CODE = "code"
CONF_SCAN_INTERVAL = "conf_scan_interval" # 60 secondes verifications du coordinator

HP_COST = "hp_cout"
HC_COST = "hc_cout"

CONF_DELAY = 60 * 60 * 6  # verification enedis toutes les 6 heures
DEFAULT_SCAN_INTERVAL = 60*5  # verification enedis toutes les 5 minutes, si dernier ok, alors verifie selon conf_delay
DEFAULT_SENSOR_INTERVAL = 60 # 60 secondes verifications du coordinator
DEFAULT_SCAN_INTERVAL_HISTORIQUE = 60*10 # 1 fois toutes les 10 minutes

HEURESCREUSES_ON = "heuresCreusesON"
__VERSION__ = "1.1.3.1"
__name__ = "myEnedis"

_consommation = "consommation"
_production = "production"