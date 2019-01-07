"""
Zanzito platform for notify component.

For more details about this platform, please refer to the documentation at
https://home-assistant.io/components/notify.zanzito/
"""
import io
import json
import logging
import requests

import voluptuous as vol

import homeassistant.components.mqtt as mqtt
import homeassistant.helpers.config_validation as cv
from homeassistant.components.notify import (
    ATTR_TITLE, ATTR_DATA, PLATFORM_SCHEMA, BaseNotificationService)

_LOGGER = logging.getLogger(__name__)

CONF_DEVICE_NAME = 'device-name'


ATTR_ALARM = 'alarm'
ATTR_FILE = 'file'
ATTR_PHOTO = 'photo'
ATTR_PHOTO_TOPIC = 'photo_topic'
ATTR_SAY = 'say'
ATTR_SMS = 'sms'
ATTR_SMS_NUMBER = 'sms_number'
ATTR_URL = 'url'
ATTR_USERNAME = 'username'
ATTR_PASSWORD = 'password'

DATA_MQTT = 'mqtt'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_DEVICE_NAME): cv.string
})


def get_service(hass, config, discovery_info=None):
    """Get the Zanzito notification service."""
    device_name = config.get(CONF_DEVICE_NAME)
    return ZanzitoNotificationService(device_name)


def load_data(url=None, file=None, username=None, password=None):
    """Load photo into ByteIO/File container from a source."""
    try:
        if url is not None:
            # load photo from url
            if username is not None and password is not None:
                req = requests.get(url, auth=(username, password), timeout=15)
            else:
                req = requests.get(url, timeout=15)
            return io.BytesIO(req.content).read()

        elif file is not None:
            # load photo from file
            return open(file, "rb").read()
        else:
            _LOGGER.warning("Can't load photo no photo found in params!")

    except OSError as error:
        _LOGGER.error("Can't load photo into ByteIO: %s", error)

    return None


class ZanzitoNotificationService(BaseNotificationService):
    """Implement the notification service for Zanzito."""

    def __init__(self, device_name):
        """Initialize the service."""
        self._device_name = device_name
        self._base_topic = 'zanzito/' + self._device_name
        self._alarm_off_topic = self._base_topic + '/alarm/stop'
        self._alarm_on_topic = self._base_topic + '/alarm/play'
        self._notification_topic = self._base_topic + '/notification'
        self._photo_topic = self._base_topic + '/photonotification'
        self._say_topic = self._base_topic + '/say'
        self._sms_base_topic = self._base_topic + '/sendsms/'


    def send_message(self, message="", **kwargs):
        """Send a message to a user."""
        title = kwargs.get(ATTR_TITLE)
        data = kwargs.get(ATTR_DATA)

        # exists data for send a photo/location
        if data is not None and ATTR_PHOTO in data:
            photos = data.get(ATTR_PHOTO, None)
            photos = photos if isinstance(photos, list) else [photos]

            for photo_data in photos:
                self.send_photo(photo_data)
            return
        elif data is not None and ATTR_SMS in data:
            number = data.get(ATTR_SMS)
            if number is not '':
                return self.send_sms(message, number)
            else:
                _LOGGER.warning('Could not send SMS because of '
                                'missing number: %s', data)
                return
        elif data is not None and ATTR_ALARM in data:
            if data.get(ATTR_ALARM) == 'on':
                topic = self._alarm_on_topic
                payload = message
            else:
                topic = self._alarm_off_topic
                payload = ''
        elif data is not None and ATTR_SAY in data:
            topic = self._say_topic
            payload = message
        else:
            topic = self._notification_topic
            if title:
                json_payload = {"title": title, "message": message}
                payload = json.dumps(json_payload)
            else:
                payload = message

        mqtt.async_publish(self.hass, topic, payload)

    def send_sms(self, message, number):
        """Send an SMS."""
        sms_topic = self._sms_base_topic + number
        mqtt.async_publish(self.hass, sms_topic, message)

    def send_photo(self, data):
        """Send a photo."""
        photo = load_data(
            url=data.get(ATTR_URL),
            file=data.get(ATTR_FILE),
            username=data.get(ATTR_USERNAME),
            password=data.get(ATTR_PASSWORD),
            )
        if photo is not None:
            self.hass.\
                loop.run_in_executor(
                    None,
                    self.hass.data[DATA_MQTT]._mqttc.publish,
                    self._photo_topic, bytearray(photo), 0,
                    False)
