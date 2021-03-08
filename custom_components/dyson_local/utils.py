

from typing import Any, Optional

from homeassistant.const import STATE_OFF

from libdyson.const import ENVIRONMENTAL_FAIL, ENVIRONMENTAL_INIT, ENVIRONMENTAL_OFF

STATE_INIT = "init"
STATE_FAIL = "fail"


class environmental_property(property):

    def __get__(self, obj: Any, type: Optional[type] = ...) -> Any:
        value = super().__get__(obj, type)
        if value == ENVIRONMENTAL_OFF:
            return STATE_OFF
        elif value == ENVIRONMENTAL_INIT:
            return STATE_INIT
        elif value == ENVIRONMENTAL_FAIL:
            return STATE_FAIL
        return value
