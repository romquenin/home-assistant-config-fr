class ToggleLockEntityRow extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      hui-generic-entity-row {
        margin: var(--ha-themed-slider-margin, initial);
      }
      .flex {
        display: flex;
        align-items: center;
      }
      #overlay {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: right;
        z-index: 1;
      }
      #lock {
        margin-top: 8px;
        opacity: 1;
        margin-right: 7px;
        -webkit-animation-duration: 5s;animation-duration 5s;
        -webkit-animation-fill-mode: both;animation-full-mode: both;
      }
      .wrapper {
        position: relative;
      }
      @keyframes fadeOut{
        0% {opacity: 1;}
        20% {opacity: 0;}
        80% {opacity: 0;}
        100% {opacity: 1;}
      }
      .fadeOut {
        -webkit-animation-name: fadeOut;animation-name: fadeOut;
      }
    </style>
    <hui-generic-entity-row
      config="[[_config]]"
      hass="[[_hass]]"
      >
      <div class="wrapper">
        <div class="flex">
          <ha-entity-toggle
            state-obj="[[stateObj]]"
            hass="[[_hass]]"
          ></ha-entity-toggle>
        </div>
        <div id="overlay" on-click='clickHandler'>
          <iron-icon id="lock" icon="mdi:lock-outline"></iron-icon>
        </div>
      </div>
    </hui-generic-entity-row>
    `
  }

  setConfig(config)
  {
    this._config = config;
    this.users = null;
    if(config.users) {
      this.users = config.users;
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
  }

  clickHandler(e) {
    e.stopPropagation();
    if(this.users) {
      if(! document.querySelector("home-assistant").hass.user) return;
      let user = document.querySelector("home-assistant").hass.user.name;
      if(this.users.indexOf(user) < 0) return;
    }
    this.$.overlay.style.pointerEvents = 'none';
    const lock = this.$.lock;
    if(lock) {
      lock.icon = 'mdi:lock-open-outline';
      lock.classList.add('fadeOut');
    }
    window.setTimeout(() => {
      this.$.overlay.style.pointerEvents = '';
      if(lock) {
        lock.classList.remove('fadeOut');
        lock.icon = 'mdi:lock-outline';
      }
    }, 5000);
  }

}

customElements.define('toggle-lock-entity-row', ToggleLockEntityRow);
