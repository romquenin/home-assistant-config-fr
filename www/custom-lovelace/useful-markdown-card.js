class UsefulMarkdownCard extends Polymer.Element {

  static get template() {
    return Polymer.html`
    <style>
      :host {
        @apply --paper-font-body1;
      }
      ha-markdown {
        display: block;
        -ms-user-select: initial;
        -webkit-user-select: initial;
        -moz-user-select: initial;
      }
      ha-markdown > *:first-child {
        margin-top: 0;
      }
      ha-markdown > *:last-child {
        margin-bottom: 0;
      }
      ha-markdown a {
        color: var(--primary-color);
      }
      ha-markdown img {
        max-width: 100%;
      }
    </style>
      <ha-card header="[[title]]">
      <ha-markdown id="md" content='[[renderedContent]]'></ha-markdown>
      </ha-card>
    `;
  }

  handleTemplate(str) {
    if(!this._hass) return '';
    str = str.replace(/^\s+|\s+$/g, '');
    let parts = str.split(".");
    let v = this._hass.states[parts[0]+'.'+parts[1]];
    try {
    parts.shift();
    parts.shift();
    parts.forEach(item => {
      v = v[item];
    });
    return v;
    } catch (err) {
      return `[[ matching failed: ${str} ]]`;
    }
  }

  process(text) {
    text = text.replace(/\[\[(.*?)\]\]/g, (str,p1, offset,s) => this.handleTemplate(p1));
    return text;
  }

  setConfig(config) {
    this._config = config;
    this.title = config.title;
    this.content = config.content;
    this.padding = config.padding || null;
    if(!this.padding){
      if(this.title){
        this.padding = '0 16px 16px';
      } else {
        this.padding = '16px';
      }
    }
  }

  static get properties() {
    return {
      _config: Object,
      noTitle: {
        type: Boolean,
        reflectToAttribute: true,
        computed: '_computeNoTitle(_config.title)',
      },
    };
  }

  _computeNoTitle(title) {
    return !title;
  }

  getCardSize()
  {
    return this.content.split('\n').length;
  }

  set hass(hass) {
    this._hass = hass;
    if(this.$){
      if(!this.$.md.style.padding){
        this.$.md.style.padding = this.padding;
      }
    }
    this.renderedContent = this.process(this.content);
  }
}

customElements.define('useful-markdown-card', UsefulMarkdownCard);
