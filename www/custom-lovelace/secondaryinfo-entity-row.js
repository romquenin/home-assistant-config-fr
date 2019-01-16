/**
 * Custom type for entities shown in the Entities card, which displays a user-specified
 * entity attribute in the "Secondary Info" section of the generic entity row.
 *
 * This extends the current functionality of the entity card, which only allows
 * 'last-changed' and 'entity-id' to be displayed in that section.
 *
 * To use:
 * - Place this file in <config_dir>/www/secondaryinfo-entity-row.js
 * - Include this file in <config_dir>/ui-lovelace.yaml:
 *
 *      resources:
 *      - url: /local/secondaryinfo-entity-row.js
 *        type: module
 *
 * - To use this customization for elements in your Enities card, configure according to
 *   https://www.home-assistant.io/lovelace/entities/
 *
 *   Set the entity type:
 *     type: custom:secondaryinfo-entity-row
 *
 *   Configure the secondary_info to be displayed.  You can use the built-in values, such as
 *   last-changed and entity-id.  Or you can specify an attribute value of the entity using the
 *   following format:
 *     secondary_info: attribute:<attribute_name>
 */
class SecondaryInfoEntityRow extends Polymer.Element {

    static get template() {
        return Polymer.html`
        <div id="current"></div><div id="next" style="display: none"></div>
        `;
    }

    set hass(hass) {
        this._hass = hass;
        this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
        this.update();
    }

    setConfig(config) {
        this._config = config;
        this.update();
    }

    ready() {
        super.ready();
        this.update();
    }

    async update() {
        if (!this._config || !this._hass)
            return;

        // Render the standard hui entity row in a dummy entities card.
        // This allows us to use the existing logic for selecting a row type based on the entity's domain.
        // Copy the rendered row from the dummy card into this custom row
        let dummyEntityCard = document.createElement("hui-entities-card");
        let entityConfigTypeDefault = Object.assign(this._config, {type: "default"});
        dummyEntityCard.setConfig({entities: [entityConfigTypeDefault]});
        dummyEntityCard.hass = this._hass;
        await dummyEntityCard.updateComplete;
        let entityRow = dummyEntityCard.shadowRoot.querySelector(".state-card-dialog");

        // Restore the custom entityRow type to the config of the newly rendered row
        entityRow._config.type = "custom:secondaryinfo-entity-row";

        let current = this.$.current;
        let next = this.$.next;

        // Prepare the updated entity within a hidden 'next' div.  This triggers the rendering of this element
        // any nested shadow DOMs, so we can further manipulate their content, without impacting the
        // currently displayed row.
        next.appendChild(entityRow);

        // Wait in a loop for the necessary nested shadow DOMs to render
        // and find the secondary info div
        let secondaryInfoDiv = null;
        let maxDelay = 5000;
        while (maxDelay) {
            if (next.firstChild &&
                next.firstChild.shadowRoot &&
                next.firstChild.shadowRoot.querySelector("hui-generic-entity-row") &&
                next.firstChild.shadowRoot.querySelector("hui-generic-entity-row").shadowRoot &&
                next.firstChild.shadowRoot.querySelector("hui-generic-entity-row").shadowRoot.querySelector("div .secondary")) {
                secondaryInfoDiv = next.firstChild.shadowRoot.querySelector("hui-generic-entity-row").shadowRoot.querySelector("div .secondary");
                break;
            }
            maxDelay -= 100;
            await new Promise(resolve => setTimeout(() => resolve(), 100));
        }

        // Insert custom text into the secondary info div.
        // Currently inserts an attribute of the entity if the config's
        // secondary_info value is set to attribute:<insert_attr_name>
        if (secondaryInfoDiv && this._config.secondary_info) {
            let secInfo = this._config.secondary_info.split(":");
            if (secInfo[0] === "attribute" && secInfo[1]) {
                let attrValue = this.stateObj.attributes[secInfo[1]];
                secondaryInfoDiv.innerHTML = attrValue;
            }
        }

        // If we have a updated entity row, replace the current one
        if (next.lastChild) {
            if (current.lastChild)
                current.removeChild(current.lastChild);
            current.appendChild(next.lastChild);
        }

        // Clean up any remaining 'next' rows that may built-up due to concurrency
        if (next.children && next.children.length > 3) {
            while (next.hasChildNodes()) {
                next.removeChild(next.lastChild);
            }
        }
    }
}

customElements.define('secondaryinfo-entity-row', SecondaryInfoEntityRow);