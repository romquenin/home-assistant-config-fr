def log_info(logger, data, msg):
  log_enabled = str(data.get("log_enabled", "false"))
  if log_enabled.lower() == "true":
    logger.debug(msg)


def log_error(logger, msg):
  logger.error(msg)
  #Notify the error via persistent_notification
  domain = "persistent_notification"
  service = "create"
  service_data = {}
  service_data["notification_id"] = "hass_entities_error"
  service_data["title"] = "\U000026A0 hass_entities error"
  service_data["message"] = "{}".format(msg)
  hass.services.call(domain, service, service_data, False)


try:
  #Execute requested action
  script_name = "hass_entities.py"
  action = data.get("action", "")

  #Log start action execution
  log_info(logger, data, "Python Script: {} -> START of action: {}".format(script_name, action))

  if action == "":
    log_error(logger, "**Required parameter 'action' is missing.**\n\nScript NOT executed.")

  elif action.lower() == "set_state":
    #Parameter -> action: set_state (string, required)
    #Parameter -> entity_id (string, required)
    #Parameter -> state (string, required)
    #Parameter -> log_enabled (bool)

    #Getting entity
    entity_id = data.get("entity_id", "")
    if entity_id == "":
      log_error(logger, "**Required parameter 'entity_id' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
    else:
      #Getting original state and attributes
      entity = hass.states.get(entity_id)
      if entity is None:
        log_error(logger, "**Cannot find entity '{}'.**\n\nAction '{}' NOT executed.".format(entity_id, action.lower()))
      else:
        attributes = {}
        for attr in entity.attributes:
          attributes[attr] = entity.attributes.get(attr)
        #Getting new state
        new_state = data.get("state", "")
        if new_state is None or new_state == "":
          log_error(logger, "**Required parameter 'state' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
        else:
          #Setting new state
          log_info(logger, data, "  Entity: '{}' -> New state: '{}'".format(entity_id, new_state))
          hass.states.set(entity_id, new_state, attributes)
          log_info(logger, data, "  DONE -> State set for entity '{}'".format(entity_id))

  elif action.lower() == "set_attributes":
    #Parameter -> action: set_attributes (string, required)
    #Parameter -> entity_id (string, required)
    #Parameter -> attributes (list, required)
    #Parameter -> log_enabled (bool)

    #Getting entity
    entity_id = data.get("entity_id", "")
    if entity_id == "":
      log_error(logger, "**Required parameter 'entity_id' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
    else:
      #Getting original state and attributes
      entity = hass.states.get(entity_id)
      if entity is None:
        log_error(logger, "**Cannot find entity '{}'.**\n\nAction '{}' NOT executed.".format(entity_id, action.lower()))
      else:
        state = entity.state
        attributes = {}
        for attr in entity.attributes:
          attributes[attr] = entity.attributes.get(attr)
        #Getting new attributes
        new_attributes = data.get("attributes", "")
        if new_attributes is None or new_attributes == "":
          log_error(logger, "**Required parameter 'attributes' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
        else:
          #Setting new attributes
          for new_attr in new_attributes:
            for k,v in new_attr.items(): #This should iterate just once
              log_info(logger, data, "  Entity: '{}' -> New attribute '{}': '{}'".format(entity_id, k, v))
              attributes[k] = v
          hass.states.set(entity_id, state, attributes)
          log_info(logger, data, "  DONE -> Attributes set for entity '{}'".format(entity_id))

  elif action.lower() == "set_state_attributes":
    #Parameter -> action: set_state_attributes (string, required)
    #Parameter -> entity_id (string, required)
    #Parameter -> state (string, required)
    #Parameter -> attributes (list, required)
    #Parameter -> log_enabled (bool)

    #Getting entity
    entity_id = data.get("entity_id", "")
    if entity_id == "":
      log_error(logger, "**Required parameter 'entity_id' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
    else:
      #Getting original state and attributes
      entity = hass.states.get(entity_id)
      if entity is None:
        log_error(logger, "**Cannot find entity '{}'.**\n\nAction '{}' NOT executed.".format(entity_id, action.lower()))
      else:
        state = entity.state
        attributes = {}
        for attr in entity.attributes:
          attributes[attr] = entity.attributes.get(attr)
        #Getting new state
        new_state = data.get("state", "")
        if new_state is None or new_state == "":
          log_error(logger, "**Required parameter 'state' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
        else:
          state = new_state
          #Setting new state
          log_info(logger, data, "  Entity: '{}' -> New state: '{}'".format(entity_id, new_state))
          #Getting new attributes
          new_attributes = data.get("attributes", "")
          if new_attributes is None or new_attributes == "":
            log_error(logger, "**Required parameter 'attributes' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
          else:
            #Setting new attributes
            for new_attr in new_attributes:
              for k,v in new_attr.items(): #This should iterate just once
                log_info(logger, data, "  Entity: '{}' -> New attribute '{}': '{}'".format(entity_id, k, v))
                attributes[k] = v
            hass.states.set(entity_id, state, attributes)
            log_info(logger, data, "  DONE -> State & attributes set for entity '{}'".format(entity_id))

  elif action.lower() == "delete_attribute":
    #Parameter -> action: delete_attribute (string, required)
    #Parameter -> entity_id (string, required)
    #Parameter -> attribute (string, required)
    #Parameter -> log_enabled (bool)

    #Getting entity
    entity_id = data.get("entity_id", "")
    if entity_id == "":
      log_error(logger, "**Required parameter 'entity_id' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
    else:
      #Getting original state and attributes
      entity = hass.states.get(entity_id)
      if entity is None:
        log_error(logger, "**Cannot find entity '{}'.**\n\nAction '{}' NOT executed.".format(entity_id, action.lower()))
      else:
        state = entity.state
        attributes = {}
        #Getting attribute to delete
        del_attribute = data.get("attribute", "")
        if del_attribute == "":
          log_error(logger, "**Required parameter 'attribute' is missing.**\n\nAction '{}' NOT executed.".format(action.lower()))
        else:
          for attr in entity.attributes:
            if attr != del_attribute:
              attributes[attr] = entity.attributes.get(attr)
          #Setting attributes
          hass.states.set(entity_id, state, attributes)
          log_info(logger, data, "  DONE -> Attribute '{}' deleted from entity '{}'".format(del_attribute, entity_id))

  else:
    log_error(logger, "**Invalid action provided ('{}').**\n\nExpected: 'set_state', 'set_attributes', 'set_state_attributes', 'delete_attribute'.".format(action))

  #Log end action execution
  log_info(logger, data, "Python Script: {} -> END of action: {}".format(script_name, action))

except Exception as e:
  log_error(logger, "**An unhandled error has occurred.**\n\n{}".format(e))
