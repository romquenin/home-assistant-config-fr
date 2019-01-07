# Get params
event = data.get('event')

# Get the state object from the name
state_value = hass.states.get('input_select.harmony_hub').state

# Get info
dt = datetime.datetime.now() #state.attributes.get('last_triggered')
time = "%02d:%02d" % (dt.hour, dt.minute)

# Sensor update
hass.states.set('sensor.activity_badge', state_value, {
    'friendly_name': time, #state_value,
    'entity_picture': '/local/activities/{}.png'.format(state_value.lower()),
    'unit_of_measurement': 'Act'
})
