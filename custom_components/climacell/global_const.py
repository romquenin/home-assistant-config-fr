import voluptuous as vol
from homeassistant.helpers import config_validation as cv

from homeassistant.components.weather import (
    ATTR_WEATHER_TEMPERATURE,
    ATTR_WEATHER_VISIBILITY,
    ATTR_WEATHER_HUMIDITY,
    ATTR_WEATHER_PRESSURE,
    ATTR_WEATHER_WIND_SPEED,
    ATTR_FORECAST_PRECIPITATION,
    ATTR_FORECAST_PRECIPITATION_PROBABILITY,
)

from homeassistant.const import (
    ATTR_NAME,
    ATTR_ICON,
    SUN_EVENT_SUNSET,
    SUN_EVENT_SUNRISE,
)

ATTRIBUTION = "Powered by Climacell"
ATTR_OBSERVATION_TIME = "observation_time"

CONF_UNITS = "units"
CONF_ALLOWED_UNITS = ["metric", "imperial"]
CONF_LEGACY_UNITS = ["si", "us"]

PERCENTAGE = "%"
DEGREES = "degrees"
SECONDS = "s"

CONF_CONDITIONS = "conditions"
CONF_SOURCES = "sources"
CONF_FORECAST_OBSERVATIONS = "forecast_observations"
CONF_TIMESTEP = "timestep"
CONF_EXCLUDE_INTERVAL = "exclude_interval"
CONF_TIMELINES = "timelines"
CONF_FIELDS = "fields"
CONF_START_TIME = "start_time"

CONF_UPDATE = "update"
ATTR_AUTO = "auto"
ATTR_MANUAL = "manual"

ATTR_FIELD = "field"
RAW_PREFIX = "Raw"

ATTR_WEATHER_FEELS_LIKE = "feels_like"
ATTR_WEATHER_DEWPOINT = "dewpoint"

ATTR_WEATHER_WIND_DIRECTION = "wind_direction"
ATTR_WEATHER_WIND_GUST = "wind_gust"
ATTR_FORECAST_PRECIPITATION_TYPE = "precipitation_type"
ATTR_FORECAST_PRECIPITATION_ACCUMULATION = "precipitation_accumulation"
ATTR_WEATHER_CLOUD_COVER = "cloud_cover"
ATTR_WEATHER_CLOUD_BASE = "cloud_base"
ATTR_WEATHER_CLOUD_CEILING = "cloud_ceiling"
ATTR_WEATHER_CONDITION = "weather_condition"
ATTR_WEATHER_SURFACE_SHORTWAVE_RADIATION = "surface_shortwave_radiation"
ATTR_MOON_PHASE = "moon_phase"
ATTR_WEATHER_GROUP = "weather_groups"
ATTR_WEATHER_PRESSURE_SEALEVEL = "sealevel_pressure"
ATTR_WEATHER_SOLAR_GHI = "solar_ghi"

ATTR_POLLEN_TREE = "pollen_tree"
ATTR_POLLEN_WEED = "pollen_weed"
ATTR_POLLEN_GRASS = "pollen_grass"

ATTR_AIR_QUALITY_PM25 = "pm25"
ATTR_AIR_QUALITY_PM10 = "pm10"
ATTR_AIR_QUALITY_O3 = "o3"
ATTR_AIR_QUALITY_NO2 = "no2"
ATTR_AIR_QUALITY_CO = "co"
ATTR_AIR_QUALITY_SO2 = "so2"
ATTR_AIR_QUALITY_EPA_AQI = "epa_aqi"
ATTR_AIR_QUALITY_EPA_PRIM = "epa_primary_pollutant"
ATTR_AIR_QUALITY_EPA_HEALTH = "epa_health_concern"
ATTR_AIR_QUALITY_CHINA_AQI = "china_aqi"
ATTR_AIR_QUALITY_CHINA_PRIMARY_POLLUTANT = "china_primary_pollutant"
ATTR_AIR_QUALITY_CHINA_HEALTH_CONCERN = "china_health_concern"

ATTR_ROAD_RISK_SCORE = "road_risk_score"
ATTR_ROAD_RISK = "road_risk"
ATTR_ROAD_RISK_CONFIDENCE = "road_risk_confidence"
ATTR_ROAD_RISK_CONDITIONS = "road_risk_conditions"

ATTR_FIRE_INDEX = "fire_index"

UPDATE_MODES = {
    ATTR_AUTO,
    ATTR_MANUAL,
}

ATTR_API_SUFFIX = "api_suffix"
ATTR_SUFFIX_NAME = "suffix_name"
ATTR_CONDITION = "condition"

SUFFIXES = {
    "Min": "Minimum",
    "Max": "Maximum",
    "Avg": "Average",
    "MinTime": "Time of minium",
    "MaxTime": "Time of maximum",
}

CLIMACELL_FIELDS = {
    "temperature": {
        ATTR_NAME: "Temperature",
        ATTR_ICON: "mdi:thermometer",
        ATTR_CONDITION: ATTR_WEATHER_TEMPERATURE,
    },
    "temperatureApparent": {
        ATTR_NAME: "Feels Like",
        ATTR_ICON: "mdi:thermometer",
        ATTR_CONDITION: ATTR_WEATHER_FEELS_LIKE,
    },
    "dewPoint": {
        ATTR_NAME: "Dewpoint",
        ATTR_ICON: "mdi:thermometer",
        ATTR_CONDITION: ATTR_WEATHER_DEWPOINT,
    },
    "humidity": {
        ATTR_NAME: "Humidity Percentage",
        ATTR_ICON: "mdi:water-percent",
        ATTR_CONDITION: ATTR_WEATHER_HUMIDITY,
    },
    "windSpeed": {
        ATTR_NAME: "Wind speed",
        ATTR_ICON: "mdi:weather-windy",
        ATTR_CONDITION: ATTR_WEATHER_WIND_SPEED,
    },
    "windDirection": {
        ATTR_NAME: "Wind Direction",
        ATTR_ICON: "mdi:compass",
        ATTR_CONDITION: ATTR_WEATHER_WIND_DIRECTION,
    },
    "windGust": {
        ATTR_NAME: "Wind Gust",
        ATTR_ICON: "mdi:weather-windy-variant",
        ATTR_CONDITION: ATTR_WEATHER_WIND_GUST,
    },
    "pressureSurfaceLevel": {
        ATTR_NAME: "Barometric pressure",
        ATTR_ICON: "mdi:gauge",
        ATTR_CONDITION: ATTR_WEATHER_PRESSURE,
    },
    "pressureSeaLevel": {
        ATTR_NAME: "Barometric pressure at sea level",
        ATTR_ICON: "mdi:gauge",
        ATTR_CONDITION: ATTR_WEATHER_PRESSURE_SEALEVEL,
    },
    "precipitationType": {
        ATTR_NAME: "Precipitation Type",
        ATTR_ICON: "mdi:weather-pouring",
        ATTR_CONDITION: ATTR_FORECAST_PRECIPITATION_TYPE,
    },
    "precipitationIntensity": {
        ATTR_NAME: "Precipitation",
        ATTR_ICON: "mdi:weather-rainy",
        ATTR_CONDITION: ATTR_FORECAST_PRECIPITATION,
    },
    "precipitationProbability": {
        ATTR_NAME: "precipitation Probability",
        ATTR_ICON: "mdi:weather-rainy",
        ATTR_CONDITION: ATTR_FORECAST_PRECIPITATION_PROBABILITY,
    },
    "sunriseTime": {
        ATTR_NAME: "Sunrise",
        ATTR_ICON: "mdi:white-balance-sunny",
        ATTR_CONDITION: SUN_EVENT_SUNRISE,
    },
    "sunsetTime": {
        ATTR_NAME: "Sunset",
        ATTR_ICON: "mdi:weather-night",
        ATTR_CONDITION: SUN_EVENT_SUNSET,
    },
    "solarGHI": {
        ATTR_NAME: "Solar GHI",
        ATTR_ICON: "mdi:white-balance-sunny",
        ATTR_CONDITION: ATTR_WEATHER_SOLAR_GHI,
    },
    "visibility": {
        ATTR_NAME: "Visibility",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_WEATHER_VISIBILITY,
    },
    "cloudCover": {
        ATTR_NAME: "Cloud Cover",
        ATTR_ICON: "mdi:weather-partly-cloudy",
        ATTR_CONDITION: ATTR_WEATHER_CLOUD_COVER,
    },
    "cloudBase": {
        ATTR_NAME: "Cloud Base",
        ATTR_ICON: "mdi:weather-partly-cloudy",
        ATTR_CONDITION: ATTR_WEATHER_CLOUD_BASE,
    },
    "cloudCeiling": {
        ATTR_NAME: "Cloud Ceiling",
        ATTR_ICON: "mdi:weather-partly-cloudy",
        ATTR_CONDITION: ATTR_WEATHER_CLOUD_CEILING,
    },
    "moonPhase": {
        ATTR_NAME: "Moon Phase",
        ATTR_ICON: "mdi:weather-night",
        ATTR_CONDITION: ATTR_MOON_PHASE,
    },
    "weatherCode": {
        ATTR_NAME: "Weather Condition",
        ATTR_ICON: "mdi:thermometer",
        ATTR_CONDITION: ATTR_WEATHER_CONDITION,
    },
    #
    # Air Quality
    #
    "particulateMatter25": {
        ATTR_NAME: "pm25",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_PM25,
    },
    "particulateMatter10": {
        ATTR_NAME: "pm10",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_PM10,
    },
    "pollutantO3": {
        ATTR_NAME: "o3",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_O3,
    },
    "pollutantNO2": {
        ATTR_NAME: "no2",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_NO2,
    },
    "pollutantCO": {
        ATTR_NAME: "co",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_CO,
    },
    "pollutantSO2": {
        ATTR_NAME: "so2",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_SO2,
    },
    "epaIndex": {
        ATTR_NAME: "EPA AQI",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_EPA_AQI,
    },
    "epaPrimaryPollutant": {
        ATTR_NAME: "EPA Primary Pollutant",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_EPA_PRIM,
    },
    "epaHealthConcern": {
        ATTR_NAME: "EPA Health Concern",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_EPA_HEALTH,
    },
    "mepIndex": {
        ATTR_NAME: "China AQI",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_CHINA_AQI,
    },
    "mepPrimaryPollutant": {
        ATTR_NAME: "China Primary Pollutant",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_CHINA_PRIMARY_POLLUTANT,
    },
    "mepHealthConcern": {
        ATTR_NAME: "China Health Concern",
        ATTR_ICON: "mdi:eye",
        ATTR_CONDITION: ATTR_AIR_QUALITY_CHINA_HEALTH_CONCERN,
    },
    #
    # Pollen
    #
    "treeIndex": {
        ATTR_NAME: "Pollen Tree",
        ATTR_ICON: "mdi:tree",
        ATTR_CONDITION: ATTR_POLLEN_TREE,
    },
    "grassIndex": {
        ATTR_NAME: "Pollen Weed",
        ATTR_ICON: "mdi:sprout",
        ATTR_CONDITION: ATTR_POLLEN_WEED,
    },
    "weedIndex": {
        ATTR_NAME: "Pollen Grass",
        ATTR_ICON: "mdi:flower",
        ATTR_CONDITION: ATTR_POLLEN_GRASS,
    },
    #
    # Road Risk
    #
    "roadRiskScore": {
        ATTR_NAME: "Road Risk Score",
        ATTR_ICON: "",
        ATTR_CONDITION: ATTR_ROAD_RISK_SCORE,
    },
    "roadRisk": {ATTR_NAME: "Road Risk", ATTR_ICON: "", ATTR_CONDITION: ATTR_ROAD_RISK},
    "roadRiskConfidence": {
        ATTR_NAME: "Road Risk Confidence",
        ATTR_ICON: "",
        ATTR_CONDITION: ATTR_ROAD_RISK_CONFIDENCE,
    },
    "roadRiskConditions": {
        ATTR_NAME: "Road Risk Conditions",
        ATTR_ICON: "",
        ATTR_CONDITION: ATTR_ROAD_RISK_CONDITIONS,
    },
    #
    # Fire Index
    #
    "fireIndex": {
        ATTR_NAME: "Fire Index",
        ATTR_ICON: "mdi:pine-tree-fire",
        ATTR_CONDITION: ATTR_FIRE_INDEX,
    },
}

LEGACY_FIELDS = {
    spec[ATTR_CONDITION]: field for (field, spec) in CLIMACELL_FIELDS.items()
}

SCHEMA_EXCLUDE_INTERVAL = vol.Schema(
    {
        vol.All(vol.Coerce(int), vol.Range(min=1, max=20)): vol.All(
            cv.ensure_list, [cv.string]
        ),
    }
)

# From https://docs.climacell.co/reference/data-layers-overview
METRIC_UNITS = {
    "cloudBase": "km",
    "cloudCeiling": "km",
    "cloudCover": "%",
    "dewPoint": "Celcius",
    "epaHealthConcern": {
        "0": "Good",
        "1": "Moderate",
        "2": "Unhealthy for Sensitive Groups",
        "3": "Unhealthy",
        "4": "Very Unhealthy",
        "5": "Hazardous",
    },
    "epaIndex": "EPA AQI",
    "epaPrimaryPollutant": {
        "0": "PM2.5",
        "1": "PM10",
        "2": "O3",
        "3": "NO2",
        "4": "CO",
        "5": "SO2",
    },
    "fireIndex": "FWI",
    "grassGrassIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "grassIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "hailBinary": "Binary Prediction",
    "humidity": "%",
    "mepHealthConcern": {
        "0": "Good",
        "1": "Moderate",
        "2": "Unhealthy for Sensitive Groups",
        "3": "Unhealthy",
        "4": "Very Unhealthy",
        "5": "Hazardous",
    },
    "mepIndex": "MEP AQI",
    "mepPrimaryPollutant": {
        "0": "PM2.5",
        "1": "PM10",
        "2": "O3",
        "3": "NO2",
        "4": "CO",
        "5": "SO2",
    },
    "moonPhase": {
        "0": "New",
        "1": "Waxing Crescent",
        "2": "First Quarter",
        "3": "Waxing Gibbous",
        "4": "Full",
        "5": "Waning Gibbous",
        "6": "Third Quarter",
        "7": "Waning Crescen",
    },
    "particulateMatter10": "μg/m^3",
    "particulateMatter25": "μg/m^3",
    "pollutantCO": "ppb",
    "pollutantNO2": "ppb",
    "pollutantO3": "ppb",
    "pollutantSO2": "ppb",
    "precipitationIntensity": "mm/hr",
    "precipitationProbability": "%",
    "precipitationType": {
        "0": "N/A",
        "1": "Rain",
        "2": "Snow",
        "3": "Freezing Rain",
        "4": "Ice Pellets",
    },
    "pressureSeaLevel": "hPa",
    "pressureSurfaceLevel": "hPa",
    "solarDIF": "W/m^2",
    "solarDIR": "W/m^2",
    "solarGHI": "W/m^2",
    "sunriseTime": "",
    "sunsetTime": "",
    "temperature": "Celcius",
    "temperatureApparent": "Celcius",
    "treeAcacia": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeAsh": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeBeech": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeBirch": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCedar": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCottonwood": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCypress": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeElder": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeElm": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeHemlock": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeHickory": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeJuniper": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMahagony": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMaple": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMulberry": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeOak": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treePine": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeSpruce": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeSycamore": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeWalnut": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeWillow": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "visibility": "km",
    "weatherCode": {
        "0": "Unknown",
        "1000": "Clear",
        "1001": "Cloudy",
        "1100": "Mostly Clear",
        "1101": "Partly Cloudy",
        "1102": "Mostly Cloudy",
        "2000": "Fog",
        "2100": "Light Fog",
        "3000": "Light Wind",
        "3001": "Wind",
        "3002": "Strong Wind",
        "4000": "Drizzle",
        "4001": "Rain",
        "4200": "Light Rain",
        "4201": "Heavy Rain",
        "5000": "Snow",
        "5001": "Flurries",
        "5100": "Light Snow",
        "5101": "Heavy Snow",
        "6000": "Freezing Drizzle",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6201": "Heavy Freezing Rain",
        "7000": "Ice Pellets",
        "7101": "Heavy Ice Pellets",
        "7102": "Light Ice Pellets",
        "8000": "Thunderstorm",
    },
    "weedGrassweedIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "weedIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "windDirection": "degrees",
    "windGust": "m/s",
    "windSpeed": "m/s",
}

IMPERIAL_UNITS = {
    "cloudBase": "mi",
    "cloudCeiling": "mi",
    "cloudCover": "%",
    "dewPoint": "Fahrenheit",
    "epaHealthConcern": {
        "0": "Good",
        "1": "Moderate",
        "2": "Unhealthy for Sensitive Groups",
        "3": "Unhealthy",
        "4": "Very Unhealthy",
        "5": "Hazardous",
    },
    "epaIndex": "EPA AQI",
    "epaPrimaryPollutant": {
        "0": "PM2.5",
        "1": "PM10",
        "2": "O3",
        "3": "NO2",
        "4": "CO",
        "5": "SO2",
    },
    "fireIndex": "FWI",
    "grassGrassIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "grassIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "hailBinary": "Binary Prediction",
    "humidity": "%",
    "mepHealthConcern": {
        "0": "Good",
        "1": "Moderate",
        "2": "Unhealthy for Sensitive Groups",
        "3": "Unhealthy",
        "4": "Very Unhealthy",
        "5": "Hazardous",
    },
    "mepIndex": "MEP AQI",
    "mepPrimaryPollutant": {
        "0": "PM2.5",
        "1": "PM10",
        "2": "O3",
        "3": "NO2",
        "4": "CO",
        "5": "SO2",
    },
    "moonPhase": {
        "0": "New",
        "1": "Waxing Crescent",
        "2": "First Quarter",
        "3": "Waxing Gibbous",
        "4": "Full",
        "5": "Waning Gibbous",
        "6": "Third Quarter",
        "7": "Waning Crescen",
    },
    "particulateMatter10": "μg/ft^3",
    "particulateMatter25": "μg/ft^3",
    "pollutantCO": "ppb",
    "pollutantNO2": "ppb",
    "pollutantO3": "ppb",
    "pollutantSO2": "ppb",
    "precipitationIntensity": "in/hr",
    "precipitationProbability": "%",
    "precipitationType": {
        "0": "N/A",
        "1": "Rain",
        "2": "Snow",
        "3": "Freezing Rain",
        "4": "Ice Pellets",
    },
    "pressureSeaLevel": "inHg",
    "pressureSurfaceLevel": "inHg",
    "solarDIF": "Btu/ft^2",
    "solarDIR": "Btu/ft^2",
    "solarGHI": "Btu/ft^2",
    "temperature": "Fahrenheit",
    "temperatureApparent": "Fahrenheit",
    "treeAcacia": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeAsh": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeBeech": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeBirch": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCedar": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCottonwood": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeCypress": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeElder": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeElm": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeHemlock": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeHickory": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeJuniper": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMahagony": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMaple": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeMulberry": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeOak": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treePine": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeSpruce": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeSycamore": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeWalnut": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "treeWillow": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "visibility": "mi",
    "weatherCode": {
        "0": "Unknown",
        "1000": "Clear",
        "1001": "Cloudy",
        "1100": "Mostly Clear",
        "1101": "Partly Cloudy",
        "1102": "Mostly Cloudy",
        "2000": "Fog",
        "2100": "Light Fog",
        "3000": "Light Wind",
        "3001": "Wind",
        "3002": "Strong Wind",
        "4000": "Drizzle",
        "4001": "Rain",
        "4200": "Light Rain",
        "4201": "Heavy Rain",
        "5000": "Snow",
        "5001": "Flurries",
        "5100": "Light Snow",
        "5101": "Heavy Snow",
        "6000": "Freezing Drizzle",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6201": "Heavy Freezing Rain",
        "7000": "Ice Pellets",
        "7101": "Heavy Ice Pellets",
        "7102": "Light Ice Pellets",
        "8000": "Thunderstorm",
    },
    "weedGrassweedIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "weedIndex": {
        "0": "None",
        "1": "Very Low",
        "2": "Low",
        "3": "Medium",
        "4": "High",
        "5": "Very High",
    },
    "windDirection": "degrees",
    "windGust": "mph",
    "windSpeed": "mph",
}

UNITS = {
    CONF_ALLOWED_UNITS[0]: METRIC_UNITS,
    CONF_ALLOWED_UNITS[1]: IMPERIAL_UNITS,
}
