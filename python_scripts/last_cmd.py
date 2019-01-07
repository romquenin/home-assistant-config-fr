
# Get params
event = data.get('event')
# logger.error("LAST CMD: " + str(event))
# Sample: <Event call_service[L]: service_data=, service_call_id=78356624-86, service=mp_playpause, domain=script>

# Find the script name. TODO: Is it possible do with regex, dictionary, json...?
pos_start = event.find('service=')+8
pos_end = event.find(',', pos_start)

# Get the state object (script) from the name
entity_id = 'script.' + event[pos_start:pos_end]
state = hass.states.get(entity_id)
dt = datetime.datetime.now() #state.attributes.get('last_triggered')
time = "%02d:%02d" % (dt.hour, dt.minute)

try:
    msg = state.name
except:
    msg = ''

# Ignore some names


if (msg != '') :
    # Sensor update
    hass.states.set('sensor.last_command', '{} - {}'.format(time, msg), {
        'custom_ui_state_card': 'state-card-value_only'
})