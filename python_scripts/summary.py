## Repo: https://github.com/maattdiy/home-assistant-config
## Screenshot: https://github.com/maattdiy/home-assistant-config/blob/master/screenshots/summary.png
## Script call: https://github.com/maattdiy/home-assistant-config/blob/master/config/packages/summary.yaml

## Resources:
## https://home-assistant.io/components/python_script/
## https://home-assistant.io/docs/configuration/state_object/

debug = False
show_badges = True
show_card = True

group_count = 0
group_desc = ''
summary = ''
idx = 0

if debug:
    event = data.get('event')
    logger.error("\n\nSUMMARY: " + str(event))

##################################################
## Groups summary (people and devices)
## Groups config: https://github.com/maattdiy/home-assistant-config/blob/master/config/groups.yaml#L267
##################################################

# Summary by groups
groups = ['group.users_tracker', 'group.switch_tracker', 'group.device_tracker']
groups_format = ['{} à la maison: {}\n', '{} utilisé(s): {}', '{} éteint: {}'] # Message prefix
groups_filter = ['home', 'on|playing|idle|home', 'off|not_home'] # Filter to list
groups_badge = ['Home', 'In use', 'Status'] # Badge 'belt' (unit_of_measurement)
groups_badge_pic = ['', '', 'ok|bug|critical'] # Pictures: none, on picure or a list of picture (in this case the picture position will match the count)
groups_min_show = [0, 0, 0] # Mininum count to show
groups_desc = ['La maison est vide', '', 'Système ok'] # Can set the default description, for use in case count = 0
groups_count = [0, 0, 0]

for group in groups:
    group_count = 0
    group_desc = ''
    
    for entity_id in hass.states.get(group).attributes['entity_id']:
        state = hass.states.get(entity_id)
        filter = groups_filter[idx]
        
        if (state.state in filter.split('|') or debug):
            dt = state.last_changed
            dt = dt + datetime.timedelta(hours=+1) # For time zone :( How to do native?
            time = '%02d:%02d' % (dt.hour, dt.minute)
            
            # If state changed in the past days show the date too
            if dt.date() < datetime.datetime.now().date():
                time = '{} {}'.format('%02d/%02d' % (dt.day, dt.month), time)
            
            group_count = group_count + 1
            group_desc = '{} {} ({}), '.format(group_desc, state.name, time)
    
    # Final format for this group
    if (group_count >= groups_min_show[idx]):
        if (group_count == 0):
            group_desc = groups_desc[idx]
        else:
            group_desc = groups_format[idx].format(group_count, group_desc[:-2])
        
        groups_desc[idx] = group_desc
        groups_count[idx] = group_count
        
    idx = idx + 1

##################################################
## Badges updates
## Badges images: https://github.com/maattdiy/home-assistant-config/tree/master/www/badges
##################################################

idx = 0
order = 2

if show_badges:
    for badge in groups_badge:
        if (badge != ''):
            entity_id = 'sensor.{}_badge'.format(badge.replace(' ', '').lower());
            hidden = False if (groups_count[idx] >= groups_min_show[idx] or debug) else True
            fname = groups_desc[idx] if debug else ' '
            picture = groups_badge_pic[idx].replace(' ', '').lower()
            
            # Check for picture X index/count
            if (picture != ''):
                list = picture.split('|')
                if (len(list) in [1, groups_count[idx]]):
                    picture = list[len(list)-1]
                else:
                    picture = list[groups_count[idx]]
                
                if (picture != ''):
                    picture = '/local/images/badges/{}.png'.format(picture)
            
            hass.states.set(entity_id, groups_count[idx], {
              'friendly_name': fname,
              'unit_of_measurement': badge, 
              'entity_picture': picture,
              'hidden': hidden,
              'order': order
            })
        
        order = order + 1
        idx = idx + 1

##################################################
## Alarm clock
## Package: https://github.com/maattdiy/home-assistant-config/blob/master/config/packages/alarmclock.yaml
##################################################

alarms_prefix = ['alarmclock_wd']
alarms_wfilter = ['1|2|3|4|5|6|7']
alarms_desc = ''
idx = 0

for entity_id in alarms_prefix:
    state = hass.states.get('input_boolean.{}_enabled'.format(entity_id))
    if (not state is None):
        if (state.state == 'on'):
            # Show the alarm for the next day
            if (str(datetime.datetime.now().isoweekday()) in alarms_wfilter[idx].split('|')):
                state = hass.states.get('sensor.{}_time_template'.format(entity_id))
                alarms_desc = '{}{}, '.format(alarms_desc, state.state)
    idx = idx + 1

if (alarms_desc == ''):
    alarms_desc = 'Réveil désactivé'
else:
    alarms_desc = 'Réveil activé pour ' + alarms_desc[:-2]

##################################################
## Activity
## Package: https://github.com/maattdiy/home-assistant-config/blob/master/python_scripts/activity.py
##################################################

activity_desc = ''
state = hass.states.get('input_select.harmony_hub')
state_value = hass.states.get('input_select.harmony_hub').state
#time = '?'
# Get info
#dt = state.attributes.get('last_triggered')
#time = '%02d:%02d' % (dt.hour, dt.minute)
if not state is None:
    hidden = False #if (state.state != 'Normal') else True
    if state.state != 'Unknown':
        dt = hass.states.get('automation.script_activity_change').attributes.get('last_triggered')
        if not dt is None:
            time = "%02d:%02d" % (dt.hour+1, dt.minute)

            # If state changed in the past days show the date too
            if dt.date() < datetime.datetime.now().date():
                time = '{} {}'.format('%02d/%02d' % (dt.day, dt.month), time)
            
    if not hidden:
        activity_desc = '\n{}{} : ({})\n'.format(summary, state.state, time)
        
        hass.states.set('sensor.activity_badge', state_value, {
            'friendly_name': ' ', #state_value,
            'entity_picture': '/local/images/activities/{' '}.png'.format(state_value.replace(' ','').lower()),
            'unit_of_measurement': 'Harmony'
            })

##################################################
## Summary update
## Custom card: https://github.com/maattdiy/home-assistant-config/blob/master/www/custom_ui/state-card-value_only.html
##################################################

for group_desc in groups_desc:
    if (group_desc != '' and not group_desc.endswith(': ')):
        summary = '{}\n{}\n'.format(summary, group_desc)

summary = '{}\n{}\n{}'.format(summary, alarms_desc, activity_desc)

if show_card:
    hass.states.set('sensor.summary', '', {
      'custom_ui_state_card': 'state-card-value_only',
      'text': summary
})