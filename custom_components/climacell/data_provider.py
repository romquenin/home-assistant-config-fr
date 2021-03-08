from datetime import datetime
from datetime import timedelta
from datetime import time

import logging

import json
import requests
import socket

from homeassistant.util import Throttle

_LOGGER = logging.getLogger(__name__)

ATTR_SERVICE_COUNTER = "service_counter"
_HOSTNAME = "data.climacell.co"
_ENDPOINT = "https://" + _HOSTNAME + "/v4"


class ClimacellTimelineDataProvider:
    def __init__(
        self,
        api_key,
        latitude,
        longitude,
        interval,
        units,
        fields,
        start_time,
        timesteps,
        observations,
        exceptions=None,
        inc_counter=1,
    ):
        self.__name = "timeline"
        self.__update_timestamp = datetime.today()
        self.__service_counter = 0
        self.__inc_counter = inc_counter

        self.__interval = interval
        self.__exceptions = exceptions

        self.__throttle_user_update = Throttle(interval)(self._user_update)
        self.__throttle_update = Throttle(timedelta(seconds=300))(
            self.__update_controller
        )

        self.__api_key = api_key
        self.__latitude = latitude
        self.__longitude = longitude
        self.__fields = ",".join(fields)
        self.__observations = observations
        self.__start_time = start_time
        self.__units = units

        if timesteps == 'current':
            self.__timesteps_suffix = 'current'
            self.__timesteps_int = ''
            self.__observations = None
            self.__start_time = 0
        else:
            self.__timesteps_suffix = timesteps[-1]
            self.__timesteps_int = int(timesteps[:-1])

        self.__take_every = 1

        if self.__timesteps_suffix == "m":
            if self.__timesteps_int % 60 == 0:
                self.__timesteps_suffix = "h"
                self.__timesteps_int = 1
                self.__take_every = int(self.__timesteps_int / 60)
            elif self.__timesteps_int % 30 == 0:
                self.__take_every = int(self.__timesteps_int / 30)
                self.__timesteps_int = 30
            elif self.__timesteps_int % 5 == 0:
                self.__take_every = int(self.__timesteps_int / 5)
                self.__timesteps_int = 5
            else:
                self.__take_every = self.__timesteps_int
                self.__timesteps_int = 1

        if self.__timesteps_suffix == "h":
            if self.__timesteps_int % 24 == 0:
                self.__timesteps_suffix = "d"
                self.__timesteps_int = 1
                self.__take_every = int(self.__timesteps_int / 24)
            else:
                self.__take_every = self.__timesteps_int
                self.__timesteps_int = 1

        if self.__timesteps_suffix == "d":
            self.__take_every = self.__timesteps_int
            self.__timesteps_int = 1

        """Initialize the data object."""
        self.data = None

        self.__headers = {
            "Content-Type": "application/json",
            "apikey": api_key,
        }

        self._params = (
            "location="
            + str(latitude)
            + ","
            + str(longitude)
            + "&units="
            + self.__units
            + "&timesteps="
            + str(self.__timesteps_int)
            + self.__timesteps_suffix
        )

        _LOGGER.debug(
            "ClimacellTimelineDataProvider initializated for: %s.", self.__fields
        )

    @staticmethod
    def __is_between(time, time_range):
        if time_range[1] < time_range[0]:
            return time >= time_range[0] or time <= time_range[1]
        return time_range[0] <= time <= time_range[1]

    def __reset_service_counter(self):
        self.__update_timestamp = datetime.today()
        self.__service_counter = 0

    def __inc_service_counter(self, inc_counter=None):
        if self.__update_timestamp.date() == datetime.today().date():
            incr = self.__inc_counter if inc_counter is None else inc_counter
            self.__service_counter = self.__service_counter + incr
            _LOGGER.debug(
                "Service '%s' usage: %s with incr: %s (def. %s)",
                self.__name,
                self.__service_counter,
                incr,
                self.__inc_counter,
            )
        else:
            self.__reset_service_counter()
            _LOGGER.debug(
                "Service '%s' usage resetted: %s", self.__name, self.__service_counter
            )

    @property
    def service_counter(self):
        return self.__service_counter

    def _set_service_counter(self, val):
        self.__service_counter = val

    @property
    def service_counter_update_timestamp(self):
        return self.__update_timestamp

    def _set_service_counter_update_timestamp(self, val):
        self.__update_timestamp = val

    def retrieve_update(self):
        self.__throttle_update()

    def __update_controller(self):
        """"""
        now = datetime.now()
        hourminute = "" + str(now.hour) + ":" + str(now.minute)

        update = True

        if self.__exceptions is not None:
            for key, value in self.__exceptions[0].items():
                if self.__is_between(hourminute, value):
                    update = False

        if update:
            updt_state = self.__throttle_user_update()
            if updt_state:
                self.__inc_service_counter()

    def _user_update(self):
        """Get the latest data from climacell"""

        if self.__fields is not "":
            querystring = self._params
            querystring += "&fields=" + self.__fields

            if self.__start_time != 0:
                start_time_obj = datetime.now() + timedelta(minutes=self.__start_time)
                start_time_obj = start_time_obj.replace(microsecond=0, tzinfo=None)
                querystring += "&startTime=" + start_time_obj.isoformat() + "Z"

                if self.__observations is not None:
                    time_delta = self.__timesteps_int * (
                        self.__observations * self.__take_every
                    )
                    if self.__timesteps_suffix == "m":
                        end_time = start_time_obj + timedelta(minutes=time_delta)
                    elif self.__timesteps_suffix == "h":
                        end_time = start_time_obj + timedelta(hours=time_delta)
                    elif self.__timesteps_suffix == "d":
                        end_time = start_time_obj + timedelta(days=time_delta)

                    querystring += "&endTime=" + end_time.isoformat() + "Z"

            url = _ENDPOINT + "/timelines"
            self.data = self.__retrieve_data(url, self.__headers, querystring)

        return True

    def __retrieve_data(self, url, headers, querystring):
        result = self.data

        try:
            _LOGGER.debug(
                "ClimacellTimelineDataProvider:_retrieve_data url: %s - headers: %s - querystring: %s",
                url,
                self.__headers,
                querystring,
            )

            response = requests.request(
                "GET",
                url,
                headers=headers,
                params=querystring,
                timeout=(10.05, 27),
                verify=True,
            )

            if response.status_code == 200:
                result = json.loads(response.text)
                result = result["data"]["timelines"][0]
                result["intervals"] = result["intervals"][:: self.__take_every]
            else:
                _LOGGER.error(
                    "ClimacellTimelineDataProvider._retrieve_data error status_code %s",
                    response.status_code,
                )

            _LOGGER.debug("_retrieve_data response.text: %s", response.text)

        except socket.error as err:
            _LOGGER.error(
                "Unable to connect to Climatecell '%s' while try to retrieve data from %s.",
                err,
                url,
            )

        return result
