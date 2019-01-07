class TilesCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._DOMAIN_SCRIPT = ["script", "python_script"];
    this._DOMAIN_SENSOR = ["sensor", "binary_sensor", "device_tracker"];
    this._DOMAIN_NO_ONOFF = this._DOMAIN_SCRIPT.concat("sensor", "scene", "weblink");
    this._DOMAIN_LIST = ["input_select"];
    this._DOMAIN_REMOTE = ["remote"];
    this._ON_STATES = ["on", "open", "locked", "home"];
  }

  setConfig(config) {

    if(config.legacy_config)
      config = this._convertLegacyConfig(config.legacy_config);

    if(!config.entities) {
        throw new Error('Please define your entities');
    }

    const root = this.shadowRoot;
    if(root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = Object.assign({}, config);
    
    const card = document.createElement('ha-card');
    card.header = cardConfig.card_settings.title;

    this._setStylesCard(cardConfig.card_settings, card.style);
    if(cardConfig.common_settings)
      this._setStylesPaperComponent(cardConfig.common_settings, card.style, "common");

    var content = this._createContentCard(cardConfig);

    const style = document.createElement('style');
    style.textContent += this._getGlobalStyle();
    card.appendChild(style);

    card.appendChild(content);
    root.appendChild(card);
    this._config = cardConfig;
  }

  set hass(hass) {
    this.myHass = hass;
    var card = this.shadowRoot.lastChild;
    var entitiesTiles = this._config.entities;

    this._updateContentCard(entitiesTiles, card);
 }

  _createContentCard(config) {
    var entitiesTiles = config.entities;
    const content = document.createElement('div');
    content.className = "grid";
    content.id = "div-tiles";

    entitiesTiles.forEach((entity, index) => {

      // Grid Style values
      const column = entity.column ? entity.column : 'auto';
      const column_span = entity.column_span ? entity.column_span : 1;
      const row = entity.row ? entity.row : 'auto';
      const row_span = entity.row_span ? entity.row_span : 1;
      var paperComponent;
      var display = entity.display || (config.common_settings && config.common_settings.display);

      entity.domain = entity.entity ? entity.entity.split('.')[0] : "";

      if(entity.title) entity.label = entity.title;
      if(entity.item) entity.label_sec = entity.item;

      if(!entity.label) entity.label = "";
      else if(typeof(entity.label) == "string") entity.label = {value: entity.label};
      if(!entity.label_sec) entity.label_sec = "";
      else if(typeof(entity.label_sec) == "string") entity.label_sec = {value: entity.label_sec};
      if(!entity.icon) entity.icon = "";
      else if(typeof(entity.icon) == "string") entity.icon = {value: entity.icon};

      if(this._DOMAIN_LIST.includes(entity.domain)) paperComponent = this._createPaperDropdownMenu(entity);
      else paperComponent = config.legacy_config ? this._createPaperButtonLegacy(entity) : this._createPaperButton(entity);

      if(display == "disabled") paperComponent.disable(true);

      paperComponent.style.gridColumn = `${column} / span ${column_span}`;
      paperComponent.style.gridRow = `${row} / span ${row_span}`;
      this._setStylesPaperComponent(entity, paperComponent.style);

      paperComponent.id = "component_"+index;
      content.appendChild(paperComponent);
    });

    return content;
  }

  _updateContentCard(entitiesTiles, card) {
    var cardConfig = this._config;
    var content = card.children.namedItem("div-tiles");

    // Compute card templates if exists
    if(cardConfig.card_settings.templates) this._computeCardStylesFromTemplate(card, cardConfig.card_settings);
    
    entitiesTiles.forEach((entity, index) => {

      var paperComponent = content.children["component_"+index]
      var ironIcon = paperComponent.getElementsByTagName('iron-icon').item(0);

      // Compute entity templates if exists
      if(entity.templates) this._computeEntityStylesFromTemplate(paperComponent, entity);

      if(ironIcon) {
        var icon = this._getIconValue(entity);
        ironIcon.removeAttribute("icon");
        ironIcon.removeAttribute("src");
        ironIcon.setAttribute((icon.indexOf("mdi:") >= 0) ? "icon" : "src", icon);
      }
      
      if(this._DOMAIN_LIST.includes(entity.domain)) {
        this._updatePaperDropdownMenu(paperComponent, entity);
      } else {
        paperComponent.className = this._getClassPaperButton(entity);
        entity.className = this._getClassPaperButton(entity);
        var label = this._hasLabel(entity) ? this._getLabel(entity) : "";
        var labelSec = this._hasLabelSec(entity) ? this._getLabelSec(entity) : "";

        if(cardConfig.legacy_config) {
          if(label) paperComponent.getElementsByClassName('paperButtonLegacy')[0].innerHTML = (ironIcon ? ironIcon.outerHTML : "")+label;
          if(labelSec) paperComponent.getElementsByClassName('labelSec')[0].innerHTML = labelSec;
        } else {
          if(label) paperComponent.getElementsByClassName('label')[0].innerHTML = label;
          if(labelSec) paperComponent.getElementsByClassName('labelSec')[0].innerHTML = labelSec;
        }
      }

    });
  }

  _createPaperButton(entity) {
    var paperButton = document.createElement('paper-button');
    paperButton.raised = true;
    paperButton.animate = true;
    paperButton.tabIndex = 0;

    if(this._hasLabel(entity)){
      var div = document.createElement('div');
      div.className = "label";
      div.innerHTML = entity.label.value;
      paperButton.appendChild(div);
    }

    if(this._hasIcon(entity)){
      var div = document.createElement('div');
      div.className = "icon";
      var ironIcon = document.createElement('iron-icon');
      div.appendChild(ironIcon);
      paperButton.appendChild(div);
    }

    if(this._hasLabelSec(entity)){
      var div = document.createElement('div');
      div.className = "labelSec";
      div.innerHTML = entity.label_sec.value;
      paperButton.appendChild(div);
    }

    paperButton.disable = function(value){
      paperButton.disabled = value;
      if(value) paperButton.classList.add("disabled");
      else paperButton.classList.remove("disabled");
    };

    if(this._isClickable(entity)) paperButton.addEventListener('click', event => { this._onClick(entity) });
    else paperButton.style.setProperty("cursor", "default");

    return paperButton;
  }

  _isClickable(entity){
    return entity.domain || entity.more_info || entity.service;
  }

  _createPaperButtonLegacy(entity) {
    var paperButton = document.createElement('paper-button');
    var divPaperButton = document.createElement('div');
    divPaperButton.className = "paperButtonLegacy";
    divPaperButton.style.width = "100%";
    paperButton.appendChild(divPaperButton);
    paperButton.raised = true;
    paperButton.animate = true;
    paperButton.tabIndex = 0;
    paperButton.style.textAlign = "var(--tiles-text-align-legacy, var(--tiles-common-text-align-legacy, center))";
    paperButton.style.textTransform = "var(--tiles-label-transform, var(--tiles-common-label-transform, uppercase))";

    if(this._hasIcon(entity)){
      var ironIcon = document.createElement('iron-icon');
      divPaperButton.appendChild(ironIcon);
    }

    if(this._hasLabel(entity)) divPaperButton.innerHTML += entity.label.value;

    if(this._hasLabelSec(entity)){
      var div = document.createElement('div');
      div.className = "labelSec";
      div.style.width = "100%";
      div.innerHTML = entity.label_sec.value;
      paperButton.appendChild(div);
    }

    if(this._isClickable(entity)) paperButton.addEventListener('click', event => { this._onClick(entity) });
    else paperButton.style.setProperty("cursor", "default");

    return paperButton;
  }

  _createPaperDropdownMenu(entity){
    var divPaperDropdownMenu = document.createElement('div');
    var paperDropdownMenu = document.createElement('paper-dropdown-menu');
    var paperListbox = document.createElement('paper-listbox');
    var optionsList;
    
    divPaperDropdownMenu.className = "paperListbox";
    paperDropdownMenu.label = entity.label.value ? entity.label.value : "";
    paperDropdownMenu.className = "dropdownMenu";
    paperDropdownMenu.styleApplied = false;
    paperDropdownMenu.appendChild(paperListbox);
    paperListbox.tabIndex = 0;
    paperListbox.slot = "dropdown-content";
    entity.service = "input_select.select_option";

    if(this._hasIcon(entity)){
      var div = document.createElement('div');
      div.className = "icon";
      var ironIcon = document.createElement('iron-icon');
      div.appendChild(ironIcon);
      divPaperDropdownMenu.appendChild(div);
    }

    divPaperDropdownMenu.disable = function(value){
      paperDropdownMenu.disabled = value;
      if(value) divPaperDropdownMenu.classList.add("disabled");
      else divPaperDropdownMenu.classList.remove("disabled");
    };

    divPaperDropdownMenu.loadItensList = function(card, optionsListTemp) {
      optionsList = optionsListTemp;
      if(paperListbox.childElementCount <= 0){
        optionsList.forEach(item => {
          var paperItem = document.createElement('paper-item');
          paperItem.innerHTML = item;
          paperItem.className = "itemLista";
          paperItem.addEventListener('click', event => {
            entity.data = { entity_id: entity.entity, option: item };
            card._onClick(entity);
          });
          paperListbox.appendChild(paperItem);
        });
      }
    };

    divPaperDropdownMenu.setItem = function(selectedItem){
      paperListbox.selected = optionsList.indexOf(selectedItem);
    };

    divPaperDropdownMenu.appendChild(paperDropdownMenu);

    return divPaperDropdownMenu;
  }

  _updatePaperDropdownMenu(divPaperDropdownMenu, entity){
    var paperDropdownMenu = divPaperDropdownMenu.getElementsByTagName('paper-dropdown-menu').item(0);
    var inputSelect = this.myHass.states[entity.entity];
    var optionsList = inputSelect.attributes.options;
    var selectedItem = inputSelect.state;

    divPaperDropdownMenu.loadItensList(this, optionsList);
    divPaperDropdownMenu.setItem(selectedItem);

    if(paperDropdownMenu.shadowRoot && !divPaperDropdownMenu.styleApplied) {
      var paperInputContainer = paperDropdownMenu.shadowRoot.children[2].children[0].children[1].shadowRoot.children[1];
      paperInputContainer.setAttribute("style", "padding: 0px;");
      var input = paperInputContainer.children[2].children[0];
      input.setAttribute("style", "color: var(--tiles-label-sec-color, var(--tiles-common-label-sec-color, var(--primary-text-color)));");
      if(!entity.label.value) paperInputContainer.shadowRoot.children[1].style.display = "none";
      divPaperDropdownMenu.styleApplied = true;
    }
  }

  _setStylesCard(config, style) {
    if(config.title) style.setProperty("--tiles-card-padding-top", "0px");
    if(config.title_color) style.setProperty("--tiles-card-title-color", config.title_color);
    if(config.title_align) style.setProperty("--tiles-card-title-align", config.title_align);
    if(config.gap) style.setProperty("--tiles-card-gap", config.gap);
    if(config.padding) style.setProperty("--tiles-card-padding", config.padding);
    if(config.background) style.setProperty("--tiles-card-background", config.background);
    
    if(config.align) { 
      if(config.align == "left") style.setProperty("--tiles-card-align", "start");
      if(config.align == "center") style.setProperty("--tiles-card-align", "center");
      if(config.align == "right") style.setProperty("--tiles-card-align", "end");
    }

    if(config.display) {
      if(config.display == "none") style.setProperty("--tiles-card-display", "none");
      if(config.display == "hidden") style.setProperty("--tiles-card-visibility", "hidden");
    }

    if(config.columns) style.setProperty("--tiles-card-columns", config.columns);
    if(config.column_width) style.setProperty("--tiles-card-column-width", (config.column_width == "auto" ? "1fr" : config.column_width));
    if(config.row_height) style.setProperty("--tiles-card-row-height", config.row_height);
  }

  _setStylesPaperComponent(tilesConfig, style, scope) {
    var value = "--tiles";
    value += scope ? `-${scope}-` : "-";

    if(tilesConfig.background) {
      var background = tilesConfig.background;
      if(typeof(tilesConfig.background) == "string") background = {value: tilesConfig.background};
      
      if(background.value) style.setProperty(value+"background", background.value);
      if(background.value && background.value.indexOf("url(") < 0) style.setProperty(value+"list-color",background.value);
      if(background.value_on) style.setProperty(value+"background-on", background.value_on);
      if(background.value_off) style.setProperty(value+"background-off", background.value_off);
      if(background.image_size) style.setProperty(value+"image-size", background.image_size);
    }

    if(tilesConfig.label) {
      if(tilesConfig.label.color) style.setProperty(value+"label-color", tilesConfig.label.color);
      if(tilesConfig.label.color_on) style.setProperty(value+"label-color-on", tilesConfig.label.color_on);
      if(tilesConfig.label.color_off) style.setProperty(value+"label-color-off", tilesConfig.label.color_off);
      if(tilesConfig.label.size) style.setProperty(value+"label-size", tilesConfig.label.size);
      if(tilesConfig.label.transform) style.setProperty(value+"label-transform", tilesConfig.label.transform);
      if(tilesConfig.label.padding) style.setProperty(value+"label-padding", tilesConfig.label.padding);
      if(tilesConfig.label.size && this._DOMAIN_LIST.includes(tilesConfig.domain)) 
        style.setProperty("--paper-font-subhead_-_font-size", tilesConfig.label.size);
    }

    if(tilesConfig.label_sec) {
      if(tilesConfig.label_sec.color) style.setProperty(value+"label-sec-color", tilesConfig.label_sec.color);
      if(tilesConfig.label_sec.color_on) style.setProperty(value+"label-sec-color-on", tilesConfig.label_sec.color_on);
      if(tilesConfig.label_sec.color_off) style.setProperty(value+"label-sec-color-off", tilesConfig.label_sec.color_off);
      if(tilesConfig.label_sec.size) style.setProperty(value+"label-sec-size", tilesConfig.label_sec.size);
      if(tilesConfig.label_sec.transform) style.setProperty(value+"label-sec-transform", tilesConfig.label_sec.transform);
      if(tilesConfig.label_sec.padding) style.setProperty(value+"label-sec-padding", tilesConfig.label_sec.padding);
      if(tilesConfig.label_sec.size && this._DOMAIN_LIST.includes(tilesConfig.domain)) 
        style.setProperty("--paper-input-container-shared-input-style_-_font-size", tilesConfig.label_sec.size);
    }

    if(tilesConfig.icon) {
      if(tilesConfig.icon.color) style.setProperty(value+"icon-color", tilesConfig.icon.color);
      if(tilesConfig.icon.color_on) style.setProperty(value+"icon-color-on", tilesConfig.icon.color_on);
      if(tilesConfig.icon.color_off) style.setProperty(value+"icon-color-off", tilesConfig.icon.color_off);
      if(tilesConfig.icon.size) style.setProperty(value+"icon-size", tilesConfig.icon.size);
      if(tilesConfig.icon.padding) style.setProperty(value+"icon-padding", tilesConfig.icon.padding);
    }

    if(tilesConfig.border) {
      if(tilesConfig.border.size) style.setProperty(value+"border-size", tilesConfig.border.size);
      if(tilesConfig.border.color) style.setProperty(value+"border-color", tilesConfig.border.color);
      if(tilesConfig.border.radius) style.setProperty(value+"border-radius", tilesConfig.border.radius);
    }

    if(tilesConfig.opacity) {
      if(tilesConfig.opacity.value) style.setProperty(value+"opacity", tilesConfig.opacity.value);
      if(tilesConfig.opacity.value_on) style.setProperty(value+"opacity-on", tilesConfig.opacity.value_on);
      if(tilesConfig.opacity.value_off) style.setProperty(value+"opacity-off", tilesConfig.opacity.value_off);
      if(tilesConfig.opacity.value_disabled) style.setProperty(value+"opacity-disabled", tilesConfig.opacity.value_disabled);
    }

    if(tilesConfig.orientation) {
      if(tilesConfig.orientation == "horizontal") style.setProperty(value+"orientation", "row");
      if(tilesConfig.orientation == "vertical") style.setProperty(value+"orientation", "column"); //default
    }

    if(tilesConfig.align) {
      if(tilesConfig.orientation == "horizontal") {
        if(tilesConfig.align.indexOf("left") >= 0) style.setProperty(value+"horizontal-align", "flex-start");
        if(tilesConfig.align.indexOf("right") >= 0) style.setProperty(value+"horizontal-align", "flex-end");
        if(tilesConfig.align.indexOf("top") >= 0) style.setProperty(value+"vertical-align", "flex-start");
        if(tilesConfig.align.indexOf("bottom") >= 0) style.setProperty(value+"vertical-align", "flex-end");
        if(tilesConfig.align.indexOf("middle") >= 0) style.setProperty(value+"vertical-align", "center");
        if(tilesConfig.align.indexOf("center") >= 0) style.setProperty(value+"horizontal-align", "center");
      } else {
        if(tilesConfig.align.indexOf("left") >= 0) style.setProperty(value+"vertical-align", "flex-start");
        if(tilesConfig.align.indexOf("right") >= 0) style.setProperty(value+"vertical-align", "flex-end");
        if(tilesConfig.align.indexOf("top") >= 0) style.setProperty(value+"horizontal-align", "flex-start");
        if(tilesConfig.align.indexOf("bottom") >= 0) style.setProperty(value+"horizontal-align", "flex-end");
        if(tilesConfig.align.indexOf("center") >= 0) style.setProperty(value+"vertical-align", "center");
        if(tilesConfig.align.indexOf("middle") >= 0) style.setProperty(value+"horizontal-align", "center");
      }
    }

    if(tilesConfig.display) {
      if(tilesConfig.display == "none") style.setProperty(value+"display", "none");
      if(tilesConfig.display == "hidden") style.setProperty(value+"visibility", "hidden");
    }
    
    if(tilesConfig.padding) style.setProperty(value+"padding", tilesConfig.padding);
    
    if(tilesConfig.text_align_legacy) style.setProperty(value+"text-align-legacy", tilesConfig.text_align_legacy);
  }

  _computeCardStylesFromTemplate(card, cardConfig){
    if(cardConfig.templates.display) {
      var display = this._getValueFromTemplate(cardConfig, "display");
      card.style.removeProperty("--tiles-card-display");
      card.style.removeProperty("--tiles-card-visibility");
      if(display == "none") card.style.setProperty("--tiles-card-display", "none");
      if(display == "hidden") card.style.setProperty("--tiles-card-visibility", "hidden");
    }
    if(cardConfig.templates.background) card.style.setProperty("--tiles-card-background", this._getValueFromTemplate(cardConfig, "background"));
    if(cardConfig.templates.style) card.style.cssText += this._getValueFromTemplate(cardConfig, "style");
  }

  _computeEntityStylesFromTemplate(paperComponent, entity){
    if(entity.templates.background) paperComponent.style.setProperty("--tiles-background", this._getValueFromTemplate(entity, "background"));
    if(entity.templates.background && entity.templates.background.indexOf("url(:") < 0) paperComponent.style.setProperty("--tiles-list-color", this._getValueFromTemplate(entity, "background"));
    if(entity.templates.label_color) paperComponent.style.setProperty("--tiles-label-color", this._getValueFromTemplate(entity, "label_color"));
    if(entity.templates.label_transform) paperComponent.style.setProperty("--tiles-label-transform", this._getValueFromTemplate(entity, "label_transform"));
    if(entity.templates.label_sec_color) paperComponent.style.setProperty("--tiles-label-sec-color", this._getValueFromTemplate(entity, "label_sec_color"));
    if(entity.templates.label_sec_transform) paperComponent.style.setProperty("--tiles-label-sec-transform", this._getValueFromTemplate(entity, "label_sec_transform"));
    if(entity.templates.icon_color) paperComponent.style.setProperty("--tiles-icon-color", this._getValueFromTemplate(entity, "color_color"));
    if(entity.templates.display) {
      var display = this._getValueFromTemplate(entity, "display");
      paperComponent.style.removeProperty("--tiles-visibility");
      paperComponent.style.removeProperty("--tiles-display");
      paperComponent.disable(false);
      if(display == "none") paperComponent.style.setProperty("--tiles-display", "none");
      if(display == "hidden") paperComponent.style.setProperty("--tiles-visibility", "hidden");
      if(display == "disabled") paperComponent.disable(true);
    }
    if(entity.templates.style) paperComponent.style.cssText += this._getValueFromTemplate(entity, "style");
  }

  _getValueFromTemplate(entity, template) {
    const state = this.myHass.states[entity.entity] && this.myHass.states[entity.entity].state || null;
    const attributes = this.myHass.states[entity.entity] && this.myHass.states[entity.entity].attributes || null;
    const entities = this.myHass.states;
    return Function('state', 'attributes', 'entities', entity.templates[template])(state, attributes, entities);
  }
  
  _hasLabel(entity) {
    return entity.label.value || entity.label.state || (entity.templates && entity.templates.label);
  }

  _hasLabelSec(entity) {
    return entity.label_sec.value || entity.label_sec.state || (entity.templates && entity.templates.label_sec);
  }

  _hasIcon(entity) {
    return entity.icon.value || entity.icon.value_on || entity.icon.value_off || (entity.templates && entity.templates.icon);
  }

  _getLabel(entity) {
    if(entity.label && entity.label.value) {
      return entity.label.value;
    } else if(entity.templates && entity.templates.label) {
      return this._getValueFromTemplate(entity, 'label');
    } else if(entity.label.state || this._DOMAIN_SENSOR.includes(entity.entity ? entity.entity.split('.')[0] : "")) {
      const stateObj = this.myHass.states[entity.label.state];
      if(stateObj) {
        return stateObj.attributes && stateObj.attributes.unit_of_measurement ? `${stateObj.state} ${stateObj.attributes.unit_of_measurement}` : stateObj.state;
      }
    }
    return '';
  }
  
  _getLabelSec(entity) {
    return this._getLabel({
      templates: {label: (entity.templates && entity.templates.label_sec) ? entity.templates.label_sec : null},
      label: {value: entity.label_sec.value, state: entity.label_sec.state},
      entity: entity.entity });
  }

  _getIconValue(entity) {
    var iconValue = "";
    if(entity.icon && entity.icon.value) iconValue = entity.icon.value;
    if(entity.icon && entity.icon.value_on && entity.className == "on") iconValue = entity.icon.value_on;
    if(entity.icon && entity.icon.value_off && entity.className == "off") iconValue = entity.icon.value_off;
    if(entity.templates && entity.templates.icon) iconValue = this._getValueFromTemplate(entity, "icon");

    return iconValue;
  }
  
  _getClassPaperButton(entity) {
    var entityId = entity.entity;
    if(entity.templates && entity.templates.class_name) {
      return this._getValueFromTemplate(entity, "class_name");
    } else if(!entityId || this._DOMAIN_NO_ONOFF.includes(entityId.split('.')[0])) {
      return '';
    } else {
      return this.myHass.states[entityId] && this._ON_STATES.includes(this.myHass.states[entityId].state) ? 'on' : 'off';
    }
  }

  _onClick(entity) {
    const entity_id = entity.entity;
    const stateDomain = entity_id ? entity_id.split('.')[0] : "";
    if(stateDomain === 'weblink') {
      window.open(this.myHass.states[entity_id].state, '_blank');
    } else if(this._DOMAIN_SENSOR.includes(stateDomain) || entity.more_info) {
      this._fire('hass-more-info', { entityId: entity.more_info || entity_id });
    } else {
      let serviceDomain, service;
      const data = entity.data || { entity_id: entity_id };
      if(entity.service) {
        serviceDomain = entity.service.split('.')[0];
        service = entity.service.split('.')[1];
      } else if(this._DOMAIN_REMOTE.includes(stateDomain)){
        serviceDomain = entity_id.split('.')[0];
        service = data.service || "send_command";
      } else if(this._DOMAIN_SCRIPT.includes(stateDomain)) {
        serviceDomain = stateDomain;
        service = entity_id.split('.')[1];
      } else {
        const isOn = this._ON_STATES.includes(this.myHass.states[entity_id].state);
        switch (stateDomain) {
          case 'lock':
            serviceDomain = 'lock';
            service = isOn ? 'unlock' : 'lock';
            break;
          case 'cover':
            serviceDomain = 'cover';
            service = isOn ? 'close' : 'open';
            break;
          case 'scene':
            serviceDomain = 'scene';
            service = 'turn_on';
            break;
          default:
            serviceDomain = 'homeassistant';
            service = isOn ? 'turn_off' : 'turn_on';
        }
      }
      this.myHass.callService(serviceDomain, service, data);
    }
  }

  _fire(type, detail, options) {
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    const node = options.node || this;
    node.dispatchEvent(event);
    return event;
  }

  getCardSize() {
    var size = (this._config.entities.length / this._config.card_settings.columns);
    if(this._config.card_settings.title) size++;
    return size;
  }

  _convertLegacyConfig(config){
    var newConfig = {};
    newConfig.card_settings = {};
    newConfig.common_settings = {};
    newConfig.common_settings.background = {};
    newConfig.common_settings.label = {};
    newConfig.common_settings.label_sec = {};
    newConfig.common_settings.icon = {};
    newConfig.legacy_config = true;
    
    newConfig.common_settings.padding = "8.4px 6.85px";
    newConfig.common_settings.background.image_size = "none";
    newConfig.entities = [];

    if(config.title) newConfig.card_settings.title = config.title;
    if(config.columns) newConfig.card_settings.columns = config.columns;
    if(config.column_width) newConfig.card_settings.column_width = config.column_width;
    if(config.row_height) newConfig.card_settings.row_height = config.row_height;
    if(config.gap) newConfig.card_settings.gap = config.gap;

    if(config.text_align) newConfig.common_settings.text_align_legacy = config.text_align;
    if(config.text_uppercase == false) newConfig.common_settings.label.transform = "none";

    if(config.color) newConfig.common_settings.background.value = config.color;
    if(config.color_on) newConfig.common_settings.background.value_on = config.color_on;
    if(config.color_off) newConfig.common_settings.background.value_off = config.color_off;

    if(config.label) newConfig.common_settings.label.value = config.label;
    if(config.text_color) newConfig.common_settings.label.color = config.text_color;
    if(config.text_color_on) newConfig.common_settings.label.color_on = config.text_color_on;
    if(config.text_color_off) newConfig.common_settings.label.color_off = config.text_color_off;
    if(config.text_size) newConfig.common_settings.label.size = config.text_size;

    if(config.label_sec) newConfig.common_settings.label_sec.value = config.label_sec;
    if(config.text_sec_color) newConfig.common_settings.label_sec.color = config.text_sec_color;
    if(config.text_sec_color_on) newConfig.common_settings.label_sec.color_on = config. text_sec_color_on;
    if(config.text_sec_color_off) newConfig.common_settings.label_sec.color_off = config.text_sec_color_off;
    if(config.text_sec_size) newConfig.common_settings.label_sec.size = config.text_sec_size;

    if(config.icon_size) newConfig.common_settings.icon.size = config.icon_size;

    config.entities.forEach((entity) => {

      var newEntity = {};
      newEntity.background = {};
      newEntity.label = {};
      newEntity.label_sec = {};
      newEntity.icon = {};
      newEntity.templates = {};

      if(entity.column) newEntity.column = entity.column;
      if(entity.column_span) newEntity.column_span = entity.column_span;
      if(entity.row) newEntity.row = entity.row;
      if(entity.row_span) newEntity.row_span = entity.row_span;
      if(entity.text_uppercase == false) newEntity.label.transform = "none";

      if(entity.entity) newEntity.entity = entity.entity;
      if(entity.service) newEntity.service = entity.service;
      if(entity.data) newEntity.data = entity.data;
      if(entity.more_info) newEntity.more_info = entity.more_info;
      if(entity.text_align) newEntity.text_align_legacy = entity.text_align;
      
      if(entity.color) newEntity.background.value = entity.color;
      if(entity.color_on) newEntity.background.value_on = entity.color_on;
      if(entity.color_off) newEntity.background.value_off = entity.color_off;
  
      if(entity.label) newEntity.label.value = entity.label;
      if(entity.label_state) newEntity.label.state = entity.label_state;
      if(entity.text_color) newEntity.label.color = entity.text_color;
      if(entity.text_color_on) newEntity.label.color_on = entity.text_color_on;
      if(entity.text_color_off) newEntity.label.color_off = entity.text_color_off;
      if(entity.text_size) newEntity.label.size = entity.text_size;
  
      if(entity.label_sec) newEntity.label_sec.value = entity.label_sec;
      if(entity.label_sec_state) newEntity.label_sec.state = entity.label_sec_state;
      if(entity.text_sec_color) newEntity.label_sec.color = entity.text_sec_color;
      if(entity.text_sec_color_on) newEntity.label_sec.color_on = entity. text_sec_color_on;
      if(entity.text_sec_color_off) newEntity.label_sec.color_off = entity.text_sec_color_off;
      if(entity.text_sec_size) newEntity.label_sec.size = entity.text_sec_size;
      
      if(entity.icon) newEntity.icon.value = entity.icon;
      if(entity.icon_size) newEntity.icon.size = entity.icon_size;

      if(entity.image){
        newEntity.background.value = `url("${entity.image}")`;
        newEntity.background.value_on = `url("${entity.image}")`;
        newEntity.background.value_off = `url("${entity.image}")`;
      } 

      if(entity.icon_template) newEntity.templates.icon = entity.icon_template;
      if(entity.label_template) newEntity.templates.label = entity.label_template;
      if(entity.label_sec_template) newEntity.templates.label_sec = entity.label_sec_template;
      if(entity.style_template) newEntity.templates.style = entity.style_template;

      newConfig.entities.push(newEntity);
    });

    return newConfig;
  }

  _getGlobalStyle() {
    return `
      ha-card {
          display: var(--tiles-card-display, block);
          visibility: var(--tiles-card-visibility, visible);
          color: var(--tiles-card-title-color, var(--primary-text-color));
          text-align: var(--tiles-card-title-align, left);
          background: var(--tiles-card-background, var(--paper-card-background-color));
          background-size: cover;
          background-repeat: no-repeat;
      
          /* DEFAULT VALUES */
          --tiles-default-card-columns: 3;
          --tiles-default-card-column-width: 1fr;
          --tiles-default-card-row-height: 1fr;
          --tiles-default-card-gap: 5px;
          --tiles-default-card-padding: 16px;
          --tiles-default-border-size: 0px;
          --tiles-default-border-radius: 3px;
          --tiles-default-icon-size: 24px;
          --tiles-default-icon-padding: 5px;
          --tiles-default-labels-size: 1em;
          --tiles-default-labels-padding: 0px;
          --tiles-default-opacity: 1;
          --tiles-default-opacity-disabled: 0.5;
          --tiles-default-padding: 0px;
          --tiles-default-paperlistbox-padding: 0px;
          --tiles-default-dropdownmenu-padding: 0px 5px;
          --tiles-default-contents-color: white;
      }
      
      .grid {
          display: grid;
          grid-template-columns: repeat(var(--tiles-card-columns, var(--tiles-default-card-columns)), var(--tiles-card-column-width, var(--tiles-default-card-column-width)));
          grid-auto-rows: var(--tiles-card-row-height, var(--tiles-default-card-row-height));
          grid-gap: var(--tiles-card-gap, var(--tiles-default-card-gap));
          padding: var(--tiles-card-padding, var(--tiles-default-card-padding));
          padding-top: var(--tiles-card-padding-top, var(--tiles-card-padding, var(--tiles-default-card-padding)));
          justify-content: var(--tiles-card-align, start);
      }
      
      div.paperListbox {
          display: var(--tiles-display, var(--tiles-common-display, flex));
          visibility: var(--tiles-visibility, var(--tiles-common-visibility, visible));
          background: var(--tiles-background, var(--tiles-common-background, var(--primary-color)));
          height: 100%;
          width: 100%;
          flex-direction: var(--tiles-orientation, var(--tiles-common-orientation, row));
          align-items: var(--tiles-vertical-align, var(--tiles-common-vertical-align, center));
          justify-content: var(--tiles-horizontal-align, var(--tiles-common-horizontal-align, center));
          opacity: var(--tiles-opacity, var(--tiles-common-opacity, var(--tiles-default-opacity)));
          border-style: solid;
          border-width: var(--tiles-border-size, var(--tiles-common-border-size, var(--tiles-default-border-size)));
          border-color: var(--tiles-border-color, var(--tiles-common-border-color, var(--tiles-default-contents-color)));
          border-radius: var(--tiles-border-radius, var(--tiles-common-border-radius, var(--tiles-default-border-radius)));
          padding: var(--tiles-default-paperlistbox-padding);
      }
      
      div.paperListbox .icon {
          height: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
          width: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
          padding: var(--tiles-icon-padding, var(--tiles-common-icon-padding, var(--tiles-default-icon-padding)));
          --iron-icon-fill-color: var(--tiles-icon-color, var(--tiles-common-icon-color, var(--tiles-default-contents-color)));
          --iron-icon-height: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
          --iron-icon-width: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
      }
      
      div.paperListbox.disabled {
          opacity: var(--tiles-opacity-disabled, var(--tiles-common-opacity-disabled, var(--tiles-default-opacity-disabled)));
      }
      
      paper-dropdown-menu {
          width: 100%;
          padding: var(--tiles-dropdownMenu-padding, var(--tiles-default-dropdownmenu-padding)); /* top|right|bottom|left */
          text-transform: var(--tiles-label-transform, var(--tiles-common-label-transform, none));
      
          --paper-input-container-color: var(--tiles-label-color, var(--tiles-common-label-color, var(--tiles-default-contents-color)));
          --iron-icon-fill-color: var(--tiles-label-color, var(--tiles-common-label-color, var(--tiles-default-contents-color)));
          --paper-listbox-background-color: var(--tiles-list-color, var(--tiles-common-list-color, var(--primary-color)));
          --paper-listbox-color: var(--tiles-label-sec-color, var(--tiles-common-label_sec-color, var(--tiles-default-contents-color)));
          --paper-input-container-focus-color: var(--tiles-list-color, var(--tiles-common-list-color, var(--primary-color)));
      }
      
      paper-item {
          font-size: var(--tiles-label-sec-size, var(--tiles-common-label_sec-size, var(--paper-input-container-shared-input-style_-_font-size, var(--tiles-default-labels-size))));
          text-transform: var(--tiles-label-sec-transform, var(--tiles-common-label_sec-transform, none));
      }
      
      paper-button {
          display: var(--tiles-display, var(--tiles-common-display, flex));
          visibility: var(--tiles-visibility, var(--tiles-common-visibility, visible));
          height: 100%;
          width: 100%;
          box-shadow: none !important;
          margin: 0 !important;
          min-width: 10px;
          min-height: 10px;
          flex-direction: var(--tiles-orientation, var(--tiles-common-orientation, column));
          align-items: var(--tiles-vertical-align, var(--tiles-common-vertical-align, center));
          justify-content: var(--tiles-horizontal-align, var(--tiles-common-horizontal-align, center));
          background: var(--tiles-background, var(--tiles-common-background, var(--primary-color)));
          background-size: var(--tiles-image-size, var(--tiles-common-image-size, contain));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          opacity: var(--tiles-opacity, var(--tiles-common-opacity, --tiles-default-opacity));
          color: var(--tiles-label-color, var(--tiles-common-label-color, var(--tiles-default-contents-color)));
          font-size: var(--tiles-label-size, var(--tiles-common-label-size, var(--tiles-default-labels-size)));
          border-style: solid;
          border-width: var(--tiles-border-size, var(--tiles-common-border-size, var(--tiles-default-border-size)));
          border-color: var(--tiles-border-color, var(--tiles-common-border-color, var(--tiles-default-contents-color)));
          border-radius: var(--tiles-border-radius, var(--tiles-common-border-radius, var(--tiles-default-border-radius)));
          padding: var(--tiles-padding, var(--tiles-common-padding, var(--tiles-default-padding)));
      
          --iron-icon-fill-color: var(--tiles-icon-color, var(--tiles-common-icon-color, var(--tiles-label-color, var(--tiles-common-label-color, var(--tiles-default-contents-color)))));
          --iron-icon-height: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
          --iron-icon-width: var(--tiles-icon-size, var(--tiles-common-icon-size, var(--tiles-default-icon-size)));
      }
      
      paper-button.on {
          background: var(--tiles-background-on, var(--tiles-background, var(--tiles-common-background-on, var(--tiles-common-background, var(--google-green-500)))));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: var(--tiles-image-size,  var(--tiles-common-image-size, contain));
          opacity: var(--tiles-opacity-on, var(--tiles-opacity, var(--tiles-common-opacity-on, var(--tiles-common-opacity, --tiles-default-opacity))));
          color: var(--tiles-label-color-on, var(--tiles-label-color, var(--tiles-common-label-color-on, var(--tiles-common-label-color, var(--tiles-default-contents-color)))));
          /* --iron-icon-stroke-color: 	Stroke color of the svg icon */
          --iron-icon-fill-color: var(--tiles-icon-color-on, var(--tiles-icon-color, var(--tiles-common-icon-color-on, var(--tiles-common-icon-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button.off {
          background: var(--tiles-background-off, var(--tiles-background, var(--tiles-common-background-off, var(--tiles-common-background, var(--google-red-500)))));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: var(--tiles-image-size,  var(--tiles-common-image-size, contain));
          opacity: var(--tiles-opacity-off, var(--tiles-opacity, var(--tiles-common-opacity-off, var(--tiles-common-opacity, --tiles-default-opacity))));
          color: var(--tiles-label-color-off, var(--tiles-label-color, var(--tiles-common-label-color-off, var(--tiles-common-label-color, var(--tiles-default-contents-color)))));
          /* --iron-icon-stroke-color: 	Stroke color of the svg icon */
          --iron-icon-fill-color: var(--tiles-icon-color-off, var(--tiles-icon-color, var(--tiles-common-icon-color-off, var(--tiles-common-icon-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button .icon {
          padding: var(--tiles-icon-padding, var(--tiles-common-icon-padding, var(--tiles-default-icon-padding)));
      }
      
      paper-button .label {
          color: var(--tiles-label-color, var(--tiles-common-label-color, var(--tiles-default-contents-color)));
          font-size: var(--tiles-label-size, var(--tiles-common-label-size, var(--tiles-default-labels-size)));
          text-transform: var(--tiles-label-transform, var(--tiles-common-label-transform, none));
          padding: var(--tiles-label-padding, var(--tiles-common-label-padding, var(--tiles-default-labels-padding)));
      }
      
      paper-button.on .label {
          color: var(--tiles-label-color-on, var(--tiles-label-color, var(--tiles-common-label-color-on, var(--tiles-common-label-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button.off .label {
          color: var(--tiles-label-color-off, var(--tiles-label-color, var(--tiles-common-label-color-off, var(--tiles-common-label-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button .labelSec {
          color: var(--tiles-label-sec-color, var(--tiles-common-label-sec-color, var(--tiles-default-contents-color)));
          font-size: var(--tiles-label-sec-size, var(--tiles-common-label-sec-size, var(--tiles-default-labels-size)));
          text-transform: var(--tiles-label-sec-transform, var(--tiles-common-label-sec-transform, none));
          padding: var(--tiles-label-sec-padding, var(--tiles-common-label-sec-padding, var(--tiles-default-labels-padding)));
      }
      
      paper-button.on .labelSec {
          color: var(--tiles-label-sec-color-on, var(--tiles-label-sec-color, var(--tiles-common-label-sec-color-on, var(--tiles-common-label-sec-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button.off .labelSec {
          color: var(--tiles-label-sec-color-off, var(--tiles-label-sec-color, var(--tiles-common-label-sec-color-off, var(--tiles-common-label-sec-color, var(--tiles-default-contents-color)))));
      }
      
      paper-button[disabled] {
          opacity: var(--tiles-opacity-disabled, var(--tiles-common-opacity-disabled, var(--tiles-default-opacity-disabled)));
      }
      
      paper-button div.paperButtonLegacy{
          text-align: var(--tiles-text-align-legacy, var(--tiles-common-text-align-legacy, center));
          text-transform: var(--tiles-label-transform, var(--tiles-common-label-transform, uppercase));
          font-size: var(--tiles-label-size, var(--tiles-common-label-size, var(--tiles-default-labels-size)));
      }
  `;
  }

}
  
customElements.define('tiles-card', TilesCard);