#==================================================================================================
#  python_scripts/set_state.py 
#  modified from - https://community.home-assistant.io/t/how-to-manually-set-state-value-of-sensor/43975/37
#==================================================================================================

#--------------------------------------------------------------------------------------------------
# Set the state or other attributes for the entity specified in the Automation Action
#--------------------------------------------------------------------------------------------------

inputEntity = data.get('entity_id')
if inputEntity is None:
    logger.warning("===== entity_id is required if you want to set something.")
else:    
    inputStateObject = hass.states.get(inputEntity)
    if inputStateObject is None and not data.get('allow_create'):
        logger.warning("===== unknown entity_id: %s", inputEntity)
    else:
        if not inputStateObject is None:
            inputState = inputStateObject.state
            inputAttributesObject = inputStateObject.attributes.copy()
        else:
            inputAttributesObject = {}
    
        for item in data:
            newAttribute = data.get(item)
            logger.debug("===== item = {0}; value = {1}".format(item,newAttribute))
            if item == 'entity_id':
                continue            # already handled
            elif item == 'allow_create':
                continue            # already handled
            elif item == 'state':
                inputState = newAttribute
            else:
                inputAttributesObject[item] = newAttribute
            
        hass.states.set(inputEntity, inputState, inputAttributesObject)

