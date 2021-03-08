function t(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${n}`),a="$lit$";class r{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],r=document.createTreeWalker(e.content,133,null,!1);let h=0,l=-1,g=0;const{strings:u,values:{length:w}}=t;for(;g<w;){const t=r.nextNode();if(null!==t){if(l++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)p(e[t].name,a)&&s++;for(;s-- >0;){const e=u[g],i=c.exec(e)[2],s=i.toLowerCase()+a,n=t.getAttribute(s);t.removeAttribute(s);const r=n.split(o);this.parts.push({type:"attribute",index:l,name:i,strings:r}),g+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(o),r=n.length-1;for(let e=0;e<r;e++){let i,o=n[e];if(""===o)i=d();else{const t=c.exec(o);null!==t&&p(t[2],a)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-a.length)+t[3]),i=document.createTextNode(o)}s.insertBefore(i,t),this.parts.push({type:"node",index:++l})}""===n[r]?(s.insertBefore(d(),t),i.push(t)):t.data=n[r],g+=r}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&l!==h||(l++,e.insertBefore(d(),t)),h=l,this.parts.push({type:"node",index:l}),null===t.nextSibling?t.data="":(i.push(t),l--),g++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),g++}}else r.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},h=t=>-1!==t.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,l=133;function g(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,l,null,!1);let o=w(s),a=s[o],r=-1,p=0;const h=[];let d=null;for(;n.nextNode();){r++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(h.push(t),null===d&&(d=t)),null!==d&&p++;void 0!==a&&a.index===r;)a.index=null!==d?-1:a.index-p,a=s[o=w(s,o)]}h.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,l,null,!1);for(;i.nextNode();)e++;return e},w=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(h(e))return i}return-1};const x=new WeakMap,m=t=>"function"==typeof t&&x.has(t),y={},b={};class _{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,a=0,r=0,p=n.nextNode();for(;a<s.length;)if(o=s[a],h(o)){for(;r<o.index;)r++,"TEMPLATE"===p.nodeName&&(i.push(p),n.currentNode=p.content),null===(p=n.nextNode())&&(n.currentNode=i.pop(),p=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(p.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(p,o.name,o.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=` ${s} `;class f{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const p=c.exec(t);e+=null===p?t+(i?v:n):t.substr(0,p.index)+p[1]+p[2]+a+p[3]+s}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const k=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class M{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new I(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(k(t)||!S(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class I{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===y||k(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=y,t(this)}this.value!==y&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}const t=this.__pendingValue;t!==y&&(k(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===b?(this.value=b,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new N(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class j{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=y}}class C extends M{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new z(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class z extends I{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class L{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=P(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=y}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const P=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function A(t){let e=D.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},D.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return void 0===(i=e.keyString.get(n))&&(i=new r(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const D=new Map,O=new WeakMap;const $=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new C(t,e.slice(1),i).parts:"@"===n?[new L(t,e.slice(1),s.eventContext)]:"?"===n?[new j(t,e.slice(1),i)]:new M(t,e,i).parts}handleTextExpression(t){return new N(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const E=(t,...e)=>new f(t,e,"html",$),Z=(t,e)=>`${t}--${e}`;let H=!0;void 0===window.ShadyCSS?H=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),H=!1);const U=t=>e=>{const i=Z(e.type,t);let n=D.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},D.set(i,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(s);if(void 0===(o=n.keyString.get(a))){const i=e.getTemplateElement();H&&window.ShadyCSS.prepareTemplateDom(i,t),o=new r(e,i),n.keyString.set(a,o)}return n.stringsArray.set(e.strings,o),o},G=["html","svg"],W=new Set,R=(t,e,i)=>{W.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,t);const a=document.createElement("style");for(let t=0;t<o;t++){const e=n[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{G.forEach(e=>{const i=D.get(Z(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),g(t,i)})})})(t);const r=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,l,null,!1);let a=w(n),r=0,p=-1;for(;o.nextNode();)for(p++,o.currentNode===i&&(r=u(e),i.parentNode.insertBefore(e,i));-1!==a&&n[a].index===p;){if(r>0){for(;-1!==a;)n[a].index+=r,a=w(n,a);return}a=w(n,a)}}(i,a,r.firstChild):r.insertBefore(a,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const p=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==p)e.insertBefore(p.cloneNode(!0),e.firstChild);else if(i){r.insertBefore(a,r.firstChild);const t=new Set;t.add(a),g(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const V={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:B},Q=1,Y=4,J=8,X=16,q="finalized";class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this._requestUpdate(t,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||F}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(q)||t.finalize(),this[q]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||V,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||V.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=F){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|J,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~J}}_attributeToProperty(t,e){if(this._updateState&J)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=this._updateState|X,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s.getPropertyOptions(t);s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Y;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&Q}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(this._updateState&Q||(this._updateState=this._updateState|Q,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}K[q]=!0;const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}),it=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?it(t,e,i):et(t,e)}const nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const rt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new at(i,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const pt={};class ht extends K{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==pt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return pt}}ht.finalized=!0,ht.render=((t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,o=O.has(e),a=H&&11===e.nodeType&&!!e.host,r=a&&!W.has(n),p=r?document.createDocumentFragment():e;if(((t,e,s)=>{let n=O.get(e);void 0===n&&(i(e,e.firstChild),O.set(e,n=new N(Object.assign({templateFactory:A},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,p,Object.assign({templateFactory:U(n)},s)),r){const t=O.get(p);O.delete(p);const s=t.value instanceof _?t.value.template:void 0;R(n,p,s),i(e,e.firstChild),e.appendChild(p),O.set(e,t)}!o&&a&&window.ShadyCSS.styleElement(e.host)});const dt=rt`
  ha-card {
    cursor: pointer;
    position: relative;
  }
         
.spacer {
  padding-top: 1em;
  border-top: solid 1px var(--primary-text-color);
}
        
.variations {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  font-weight: 300;
  color: var(--primary-text-color);
  list-style: none;
  padding: 3px 1em;
  margin: 0;
  // border-top: solid 1px var(--primary-text-color);
}

      .variations ha-icon {
        height: 22px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }
      
      .variations svg {
        height: 15px;
        margin-right: 5px;
        fill: var(--paper-item-icon-color);
      }
      
      .variations li {
        flex-basis: auto;
        width: 50%;
        z-index: 200 ;
      }

      .variations li:nth-child(2n) {
        text-align: right;
      }

      .variations li:nth-child(2n) ha-icon {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
      .variations li:nth-child(2n) svg {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
`,ct=rt`
  .current {
    padding-top: 1.2em;
    margin-bottom: 3.5em;
  }
  
  .icon.bigger {
    width: 10em;
    height: 10em;
    margin-top: -4em;
    position: absolute;
    left: 0em;
  }
  
  .title {
    position: absolute;
    left: calc(140px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: 0.6em;
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
  }
  .moon {
    position: absolute;
    left: calc(115px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: calc(63px - (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    line-height:20px;
    display: inline-block;
  }
            
  .temp {
    position: absolute;
    // top: 0.65em;
    font-weight: 300;
    font-size: calc(35px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    right: 1em;
    margin-top: 2px;
  }

  .tempc {
    position: absolute;
    font-weight: 300;
    font-size: calc(12px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    // font-size: 1.5em;
    vertical-align: super;
    color: var(--primary-text-color);
    right: 0.7em;
    margin-top: -11px;
    margin-right: 7px;
  }      
     
`,lt=rt`
  .meter {
    background: #efefef; /* Grigio */
    border-radius: 8px;
    border: 1px solid transparent; /* 2 */
    box-shadow:
      0 1px 3px 1px rgba(0,0,0,0.15) inset,
      0 0 0 1px #333; /* 1 */
    height: .75em;
    max-width: 5.5em;
    overflow: hidden;
    width: 100%;
  }

  /* WebKit */
  .meter::-webkit-meter-bar {
    background: #efefef; /* Grigio */
    border: 1px solid transparent; /* 2 */
    border-radius: 8px;
  }

  .meter::-webkit-meter-optimum-value,
  .meter::-webkit-meter-suboptimum-value,
  .meter::-webkit-meter-even-less-good-value {
    border-radius: 8px; 
  }

  .meter::-webkit-meter-optimum-value {
    background: #85cc00; /* verde #3C5C00; */
  }
      
  .meter::-webkit-meter-suboptimum-value {
    background: #F5D000;
  }
      
  .meter::-webkit-meter-even-less-good-value  {
    background: #e65000 ; /* Rosso #D14900; */
  }

  /* Firefox */
  .meter::-moz-meter-bar {
    border-radius: 8px;
  }

  .meter:-moz-meter-optimum::-moz-meter-bar {
    background: #3C5C00;
  }

  .meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: #F5D000;
  }

  .meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: #D14900;
  }

`,gt=rt`
  .day {
    flex: 1;
    display: block;
    text-align: center;
    color: var(--primary-text-color);
    border-right: 0.1em solid #d9d9d9;
    line-height: 2;
    box-sizing: border-box;
    z-index: 200;
  }
  
  .dayname {
    text-transform: uppercase;
  }
      
  .icon {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    text-indent: -9999px;
  }   
      
  .forecast {
    width: 100%;
    margin: 0 auto;
    display: flex;
    z-index: 200;
  }
  
  .forecast .day:first-child {
    margin-left: 0;
        z-index: 200;
  }
  
  .forecast .day:nth-last-child(1) {
    border-right: none;
    margin-right: 0;
        z-index: 200;
  }  
`,ut=rt`
      .camera-container {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: stretch;
        // position: absolute;
        // background: #000;
      } 
      .camera-image {
        flex: 3;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .camera-image > img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
`,wt=rt`
  .nd-container {
    margin: auto;
    padding-top: 1.3em;
    padding-bottom: 1.3em;
    padding-left: 1em;
    padding-right: 1em;
    
    position: relative;
    // background: #5C97FF;
    overflow: hidden;
  }
// .ha-card-night:before {
//   content: ' ';
//   display: block;
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
//   opacity: calc(attr(data-opacity));
//   background-image: url('https://raw.githubusercontent.com/tingletech/moon-phase/gh-pages/background.jpg');
//   background-repeat: no-repeat;
//   background-position: 50% 0;
//  
//   -ms-background-size: cover;
//   -o-background-size: cover;
//   -moz-background-size: cover;
//   -webkit-background-size: cover;
//   background-size: cover;
// }
`,xt={freezing_rain_heavy:"rainy-3","heavy freezing rain":"rainy-3",freezing_rain:"rainy-2","freezing rain":"rainy-2",freezing_rain_light:"rainy-1","light freezing rain":"rainy-1",freezing_drizzle:"rain-and-sleet-mix","freezing drizzle":"rain-and-sleet-mix",ice_pellets_heavy:"rain-and-snow-mix","heavy ice pellets":"rain-and-snow-mix",ice_pellets:"rain-and-snow-mix","ice pellets":"rain-and-snow-mix",ice_pellets_light:"rain-and-snow-mix","light ice pellets":"rain-and-snow-mix",snow_heavy:"snowy-3","heavy snow":"snowy-3",snow:"snowy-2",snow_light:"snowy-1","light snow":"snowy-1",flurries:"wind",tstorm:"tropical-storm",rain_heavy:"rainy-3","heavy rain":"rainy-3",rain_light:"rainy-1","light rain":"rainy-1",rain:"rainy-2",drizzle:"rainy-1",fog_light:"haze","light fog":"haze",fog:"fog",cloudy:"cloudy-original",mostly_cloudy:"cloudy-day-3","mostly cloudy":"cloudy-day-3",partly_cloudy:"cloudy-day-2","partly cloudy":"cloudy-day-2",mostly_clear:"cloudy-day-1","mostly clear":"cloudy-day-1",clear:"day"},mt=Object.assign(Object.assign({},xt),{freezing_rain_heavy:"rainy-6","heavy freezing rain":"rainy-6",freezing_rain:"rainy-5","freezing rain":"rainy-5",freezing_rain_light:"rainy-4","light freezing rain":"rainy-4",snow_heavy:"snowy-6","heavy snow":"snowy-6",snow:"snowy-5",snow_light:"snowy-4","light snow":"snowy-4",rain_heavy:"rainy-6","heavy rain":"rainy-6",rain_light:"rainy-4","light rain":"rainy-4",rain:"rainy-5",drizzle:"rainy-4",mostly_cloudy:"cloudy-night-3","mostly cloudy":"cloudy-night-3",partly_cloudy:"cloudy-night-2","partly cloudy":"cloudy-night-2",mostly_clear:"cloudy-night-1","mostly clear":"cloudy-night-1",clear:"night",sunny:"night"}),yt={clear:"day","clear-day":"day",rain:"rainy-2",snow:"snowy-2",sleet:"rain-and-sleet-mix",wind:"cloudy-day-1",fog:"fog",cloudy:"cloudy-original","partly-cloudy-day":"cloudy-day-2"},bt=Object.assign(Object.assign({},yt),{clear:"night","clear-night":"night",wind:"cloudy-night-1","partly-cloudy-day":"cloudy-night-2","partly-cloudy-night":"cloudy-night-2"}),_t={"clear sky":"day","few clouds":"cloudy-day-1","scattered clouds":"cloudy-day-2","broken clouds":"cloudy-day-3","shower rain":"rainy-3",rain:"rainy-2",thunderstorm:"tropical-storm",snow:"snowy-2",mist:"fog"},vt=Object.assign(Object.assign({},_t),{"clear sky":"day-night","few clouds":"cloudy-night-1","scattered clouds":"cloudy-night-2","broken clouds":"cloudy-night-3"}),ft={snowy:"snowy-3","light-snow":"snowy-2","snowy-rainy":"snowy-1","partlycloudy-light-snow":"snowy-1","partlycloudy-snow":"snowy-1","partlycloudy-light-rain":"rainy-1","light-rain":"rainy-1",rainy:"rainy-2","partlycloudy-rain":"rainy-1","partlycloudy-fog":"fog",cloudy:"cloudy-original",partlycloudy:"cloudy-day-2","partlycloudy-lightning":"cloudy-day-1",lightning:"cloudy-day-1",clear:"day"},kt=Object.assign({},ft),St={cloudy:"cloudy-day-3",exceptional:"severe-thunderstorm",fog:"fog",hail:"snow-and-sleet-mix",lightning:"severe-thunderstorm","lightning-rainy":"scattered-thunderstorms",partlycloudy:"cloudy-day-3",pouring:"rainy-6",rainy:"rainy-5",snowy:"snowy-6","snowy-rainy":"snow-and-sleet-mix",sunny:"clear-day",windy:"wind","windy-variant":"wind"},Mt=Object.assign(Object.assign({},St),{"clear-night":"clear-night"});let It={en:0,it:1,nl:2,es:3,de:4,fr:5,"sr-latn":6,pt:7,da:8,"no-no":9},Nt={new_moon:"🌑",new:"🌑",waxing_crescent:"🌒",first_quarter:"🌓",waxing_gibbous:"🌔",full:"🌕",full_moon:"🌕",waning_gibbous:"🌖",third_quarter:"🌗",waning_crescent:"🌘"};function jt(t,e,i){return i=i||"0",(t+="").length>=e?t:new Array(e-t.length+1).join(i)+t}function Ct(t){return new Promise(e=>{setTimeout(()=>{let i=new Image;i.onload=(()=>{e(!0)}),i.onerror=(()=>{e(!1)}),i.src=t},100)})}const zt=(t,e)=>e[Object.keys(e).find(e=>e.toLowerCase()===t.toLowerCase())]?e[Object.keys(e).find(e=>e.toLowerCase()===t.toLowerCase())]:t,Tt=(t,e,i)=>{let s=i&&"below_horizon"==i,n=s?e.iconsNight[t]:e.iconsDay[t];return null==e.path&&console.info("Image path not found. (hacsImagePathExist="+qt+")(manImagePathExist="+Kt),void 0===n&&console.info("Icons issue. States: icons_model="+e.icons_model+" - isDay="+!s+" - condition: "+t+"."),`${e.path}/${e.iconType}/${n}.svg`},Lt=(t,e)=>{const i=t.config.unit_system.length;switch(e){case"air_pressure":return"km"===i?"hPa":"inHg";case"length":return i;case"precipitation":return"km"===i?"mm":"in";default:return t.config.unit_system[e]||""}};function Pt(t){return new Promise(e=>{setTimeout(()=>{let i=new XMLHttpRequest;i.overrideMimeType("application/json"),i.open("GET",t,!0),i.onreadystatechange=(()=>{if(4===i.readyState&&200===i.status)e(i.responseText);else if(200!==i.status){let e="ERROR during json file retrieve: '"+t+"', readyState: "+i.readyState+", status: "+i.status+", statusText: "+i.statusText+", responseText: "+i.responseText;console.info(e)}}),i.send(null)},100)})}function At(t,e=1){switch(e){case 0:return ne.format(parseFloat(t));case 1:return oe.format(parseFloat(t))}}const Dt=(t,e,i,s,n)=>{let o,a,r=e.sun&&t.states[e.sun]?t.states[e.sun].state:void 0,p=e.moon_phase&&t.states[e.moon_phase]?t.states[e.moon_phase].state:void 0,h=p?function(t){return Nt[t.toLowerCase()]}(p):void 0,d=e.current_conditions&&t.states[e.current_conditions]?t.states[e.current_conditions].state:"Na";return o=e.temperature&&t.states[e.temperature]?At(t.states[e.temperature].state):"Na",a=e.feels_like&&t.states[e.feels_like]?At(t.states[e.feels_like].state):"Na",E`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${Tt(d.toLowerCase(),s,r)}') no-repeat ; 
            background-size: contain;">${d}</span>
        ${i?E`<span class="title"> ${i} </span>`:""}
        ${p?E`<span class="moon"> ${h} <span style="font-size: 70%">${zt(p,n.words)}</span></spa>`:""}
        ${"Na"!==o?E`
          <span class="temp">${o}</span>
          <span class="tempc"> ${Lt(t,"temperature")}</span>
        `:""}
      </div>
      ${"Na"!==a?E`
        <ul class="variations polles" style="border: 0;margin-top: 4px;">
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
          <li>
            <ha-icon icon="${t.states[e.feels_like].attributes.icon}"></ha-icon>${zt("Feels Like",n.words)} ${a}
            <span class="unit"> ${Lt(t,"temperature")}</span>
          </li>
        </ul>      
      `:""}
   `},Ot=(t,e,i,s,n)=>void 0!==t||void 0!==i?E`
    <li>
      <ha-icon icon="${n}"></ha-icon>${void 0!==t?t:"Na"} ${e} /
          <b>${void 0!==i?i:"Na"} ${s}</b>
    </li>
  `:"",$t=(t,e,i)=>E`
    <li>
      <ha-icon icon="${i}"></ha-icon>${void 0!==t?t:"Na"} ${e}
    </li>
  `,Et=(t,e,i,s,n,o)=>{let a,r,p,h,d,c;s||t.selectedLanguage||t.language;let l=e.sun?t.states[e.sun]:void 0;if(l&&(d=new Date(l.attributes.next_rising),c=new Date(l.attributes.next_setting)),e.forecast){let e=i.temperature_high?Object.entries(i.temperature_high):void 0,s=i.temperature_low?Object.entries(i.temperature_low):void 0,n=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,o=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0;a=Object.isSet(e)&&Object.isSet(t.states[e[0][1]])?At(t.states[e[0][1]].state,0):void 0,r=Object.isSet(s)&&Object.isSet(t.states[s[0][1]])?At(t.states[s[0][1]].state,0):void 0,p=Object.isSet(n)&&Object.isSet(t.states[n[0][1]])?At(t.states[n[0][1]].state,0):void 0,h=Object.isSet(o)&&Object.isSet(t.states[o[0][1]])?At(t.states[o[0][1]].state,0):void 0}let g=Object.isSet(e.precipitation)&&Object.isSet(t.states[e.precipitation])?At(t.states[e.precipitation].state,0):void 0,u=Object.isSet(e.humidity)&&Object.isSet(t.states[e.humidity])?At(t.states[e.humidity].state,0):void 0,w=Object.isSet(e.wind_bearing)&&Object.isSet(t.states[e.wind_bearing])?At(t.states[e.wind_bearing].state):void 0,x=Object.isSet(e.wind_speed)&&Object.isSet(t.states[e.wind_speed])?At(t.states[e.wind_speed].state):void 0,m=Object.isSet(e.pressure)&&Object.isSet(t.states[e.pressure])?At(t.states[e.pressure].state,0):void 0,y=Object.isSet(e.visibility)&&Object.isSet(t.states[e.visibility])?At(t.states[e.visibility].state,0):void 0;return E`
    <ul class="variations ${o?"spacer":""}">
        ${void 0!==typeof p||void 0!==typeof h?Ot(p,"%",h,Lt(t,"precipitation")+"/h","mdi:weather-rainy"):""}
        ${!e.forecast||void 0===r&&void 0===a?"":Ot(r,"",a,Lt(t,"temperature"),"mdi:thermometer")}
        ${void 0!==g&&g>0?E`
          <li>
            <ha-icon icon="mdi:weather-rainy"></ha-icon>${g}
            <span class="unit"> ${Lt(t,"precipitation")}/h</span>
          </li>
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
        `:""}            
        ${void 0!==m?$t(m,Lt(t,"air_pressure"),"mdi:gauge"):""}
        ${void 0!==u?$t(u,"%","mdi:water-percent"):""}
        ${void 0!==y?$t(y,Lt(t,"length"),"mdi:weather-fog"):""}
        ${x||w?E`
          <li>
            <ha-icon icon="mdi:weather-windy"></ha-icon> ${((t,e)=>t<0||t>360?(console.log("Enter a degree between 0 and 360 degrees."),null):t>=0&&t<=11.25?e.N:t>348.75&&t<=360?e.N:t>11.25&&t<=33.75?e.NNE:t>33.75&&t<=56.25?e.NE:t>56.25&&t<=78.75?e.ENE:t>78.75&&t<=101.25?e.E:t>101.25&&t<=123.75?e.ESE:t>123.75&&t<=146.25?e.SE:t>146.25&&t<=168.75?e.SSE:t>168.75&&t<=191.25?e.S:t>191.25&&t<=213.75?e.SSW:t>213.75&&t<=236.25?e.SW:t>236.25&&t<=258.75?e.WSW:t>258.75&&t<=281.25?e.W:t>281.25&&t<=303.75?e.WNW:t>303.75&&t<=326.25?e.NW:t>326.25&&t<=348.75?e.NNW:null)(w,n.windDirections)} ${x}
            <span class="unit">${Lt(t,"length")}/h</span>
          </li>
        `:""}        
        ${void 0!==d?$t(d.toLocaleTimeString(s),"","mdi:weather-sunset-up"):""}               
        ${void 0!==c?$t(c.toLocaleTimeString(s),"","mdi:weather-sunset-down"):""}           
    </ul>
  `},Zt=(t,e,i,s)=>null==t&&null==i?E``:null==t?E`
            <div class="highTemp">
              <b>${i}</b> ${s}
            </div>   
      `:null==i?E`
            <div class="lowTemp">
              ${t} ${e}
            </div>  
      `:E`
            <div class="highTemp">
              ${t} ${e} / <b>${i} ${s}</b>
            </div>
      `,Ht=(t,e)=>{let i=t.states[e.entity],s=e.icon||i.attributes.icon,n=void 0!==e.min?e.min:0,o=void 0!==e.max?e.max:5,a=void 0!==e.low?e.low:n,r=void 0!==e.high?e.high:o,p=0==n?1:0;return i?E`
     <li>
       <ha-icon icon="${s}"></ha-icon>
       <meter class="meter" value="${parseInt(i.state)+p}" optimum="${(r-a)/2}"
            min="${n}" max="${o+p}" low="${a+p}" high="${r+p}">${i.state}/${o}</meter>
     </li>
  `:""};const Ut=(t,e,i)=>t?E`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${i}</text>
      </svg>${t} ${e.unit_of_measurement?e.unit_of_measurement:""}
    </li>    
  `:"",Gt=["I","II","III","IV","V","VI"],Wt=["#F1D1B1","#E4B590","#CF9F7D","#B67851","#A15E2D","#513938"],Rt=(t,e,i)=>{let s=i?At(t.state,0):t.state;return t?E`
    <li>
        <ha-icon icon="${e}"></ha-icon>${s} ${t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}
    </li>    
  `:""},Vt=(t,e,i)=>{let s=void 0!==e.protection_window&&t.states[e.protection_window]?Rt(t.states[e.protection_window],"mdi:sunglasses",!1):void 0,n=void 0!==e.uv_level&&t.states[e.uv_level]?Rt(t.states[e.uv_level],"mdi:weather-sunny",!1):void 0,o=void 0!==e.uv_index&&void 0!==e.max_uv_index?((t,e,i)=>{let s=void 0!==t?At(t.state):"--",n=void 0!==e?At(e.state):"--";return t||e?E`
    <li>
        <ha-icon icon="${i}"></ha-icon>${s} / <b>${n}</b>
        ${t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}
    </li>    
  `:""})(t.states[e.uv_index],t.states[e.max_uv_index],"mdi:weather-sunny"):"",a=void 0!==e.ozone_level&&t.states[e.ozone_level]?Rt(t.states[e.ozone_level],"mdi:vector-triangle",!0):void 0;return E`
    <ul class="variations ${i?"spacer":""}">
        ${n||""}${s||""}
        ${o||""}${a||""}
    </ul>
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${[1,2,3,4,5,6].map(i=>{let s=e["set_skin_type_"+i],n=void 0!==typeof s&&void 0!==typeof t.states[s]?t.states[s]:void 0;return n?E`
        <div class="day ${i}">
            <div id="rectangle" style="color: black; background: ${Wt[i-1]};width:32px;height:32px;display: table;margin: 0 auto;">${Gt[i-1]}</div>
            <div class="lowTemp">
              ${(t=>{let e="- -";if(t&&"unknown"!==t){let i=Math.floor(parseInt(t)/60),s=t-60*i;e=i>0?i+":"+jt(s,2)+" h":s+" m"}return e})(n.state)}
            </div>  
        </div>
      `:""})}
    </div>
  `},Bt=(t,e,i)=>{let s=Object.entries(e);return E`
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${s.map(e=>{e[0];let i=e[1],s=!0,n=t.states[i.entity];if(void 0!==n){let t,e="- -",o=0;n.state&&"unknown"!==n.state&&(t=void 0!==i.icon?i.icon:n.attributes.icon,void 0!==i.min&&void 0!==i.max?(e=At(n.state),o=Math.abs(100*(parseFloat(e)-i.min)/(i.max-i.min))/100,void 0!==i.show_if_ge&&parseFloat(e)<i.show_if_ge&&(s=!1)):(o="on"==(e=n.state).toLowerCase()?1:0,i.show_if_on&&"off"==e.toLowerCase()&&(s=!1)));let a=function(t){let e=(120*(1-t)).toString(10);return{color:Ft(Qt(e,100,50)),bgcolor:["hsl(",e,",100%,50%)"].join("")}}(o);return s?E`
        <div class="day">
            <div id="rectangle" style="color: ${a.color};background: ${a.bgcolor};width:32px;height:32px;display: table;margin: 0 auto;"><ha-icon icon="${t}"></ha-icon></div>
            <div class="lowTemp">${e}</div>  
        </div>
        `:""}return""})}
    </div>
  `};function Ft(t){return t=t.replace("#",""),(299*parseInt(t.substr(0,2),16)+587*parseInt(t.substr(2,2),16)+114*parseInt(t.substr(4,2),16))/1e3>=128?"black":"white"}function Qt(t,e,i){e/=100,i/=100;let s=(1-Math.abs(2*i-1))*e,n=s*(1-Math.abs(t/60%2-1)),o=i-s/2,a=0,r=0,p=0;0<=t&&t<60?(a=s,r=n,p=0):60<=t&&t<120?(a=n,r=s,p=0):120<=t&&t<180?(a=0,r=s,p=n):180<=t&&t<240?(a=0,r=n,p=s):240<=t&&t<300?(a=n,r=0,p=s):300<=t&&t<360&&(a=s,r=0,p=n);let h=Math.round(255*(a+o)).toString(16),d=Math.round(255*(r+o)).toString(16),c=Math.round(255*(p+o)).toString(16);return 1==h.length&&(h="0"+h),1==d.length&&(d="0"+d),1==c.length&&(c="0"+c),"#"+h+d+c}const Yt="/local/community/ha-card-weather-conditions/icons",Jt="/local/ha-card-weather-conditions/icons";let Xt,qt=!1,Kt=!1,te="%c WEATHER-CONDITION-CARD %c 1.9.9",ee="color: white; background: green; font-weight: 700;",ie="color: green; background: white; font-weight: 700;",se="color: black; background: white; font-weight: 700;",ne=null,oe=null;Object.defineProperty(Object.prototype,"isSet",{value:function(t,e){let i=!(null==t);return e?i&&t.length>0:i},writable:!0,configurable:!0,enumerable:!1}),console.info(te,ee,ie);let ae=[Ct(Yt+"/static/cloudy.svg"),Ct(Jt+"/static/cloudy.svg")];Promise.all(ae).then(e=>{let i,s;i=qt=e[0],s=Kt=e[1];let n=(Xt=i?Yt:s?Jt:null)+"/../transl/",o=[Pt(n+"en.json"),Pt(n+"it.json"),Pt(n+"nl.json"),Pt(n+"es.json"),Pt(n+"de.json"),Pt(n+"fr.json"),Pt(n+"sr-latn.json"),Pt(n+"pt.json"),Pt(n+"da.json"),Pt(n+"no-NO.json")];i?console.info(te+"%c use HACS path to retrieve icons.",ee,ie,se):s?console.info(te+"%c use www root path to retrieve icons.",ee,ie,se):console.info(te+"%c error setting right icons path.",ee,ie,se),Promise.all(o).then(e=>{let n=class extends ht{constructor(){super(...arguments),this._iconsConfig=new class{},this._terms=new class{},this.invalidConfig=!1,this.numberElements=0,this._header=!0,this._name="",this._hasCurrent=!1,this._hasForecast=!1,this._hasMeteogram=!1,this._hasAirQuality=!1,this._hasPollen=!1,this._hasUv=!1,this._hasAlert=!1,this._hasSea=!1,this._displayTop=!0,this._displayCurrent=!0,this._displayForecast=!0,this._showSummary=!0,this._showPresent=!0,this._showUv=!0,this._showAirQuality=!0,this._showPollen=!0,this._showForecast=!0,this._showAlert=!0,this._showSea=!0}setConfig(t){if(console.log({card_config:t}),!t)throw this.invalidConfig=!0,new Error("Invalid configuration");let n;t.name&&t.name.length>0&&(this._name=t.name),t.language&&t.language.length>0?this._language=t.language.toLowerCase():this._language="en";try{n=JSON.parse(e[It[this._language]]),this._terms.windDirections=n.cwcLocWindDirections,this._terms.words=n.cwcTerms,console.info(te+'%c card "'+this._name+"\", locale is '"+this._language+"'.",ee,ie,se)}catch(t){n=JSON.parse(e[It.en]),this._terms.windDirections=n.cwcLocWindDirections,this._terms.words=n.cwcTerms,console.info(te+'%c card "'+this._name+"\" unable to use '"+this._language+"' locale, set as default 'en'.",ee,ie,se)}if(ne=new Intl.NumberFormat(this._language,{maximumFractionDigits:0}),oe=new Intl.NumberFormat(this._language,{maximumFractionDigits:1}),void 0!==t.display&&(this._displayTop=t.display.findIndex(t=>"top"===t.toLowerCase())>=0,this._displayCurrent=t.display.findIndex(t=>"current"===t.toLowerCase())>=0,this._displayForecast=t.display.findIndex(t=>"forecast"===t.toLowerCase())>=0),this._hasCurrent=!!t.weather&&!!t.weather.current,this._hasForecast=!!t.weather&&!!t.weather.forecast,this._hasMeteogram=this._hasForecast&&!!t.weather.forecast.meteogram,this._hasAirQuality=!!t.air_quality,this._hasPollen=!(!t.pollen||!t.pollen.tree&&!t.pollen.weed&&!t.pollen.grass),this._hasUv=!!t.uv,this._hasAlert=!!t.alert,this._hasSea=!!t.sea,this._iconsConfig.path=i?Yt:s?Jt:null,this._iconsConfig.iconType=t.animation?"animated":"static",this._iconsConfig.iconsDay=xt,this._iconsConfig.iconsNight=mt,this._iconsConfig.icons_model="climacell",t.weather&&t.weather.icons_model)switch(t.weather.icons_model.toLowerCase()){case"darksky":this._iconsConfig.iconsDay=yt,this._iconsConfig.iconsNight=bt,this._iconsConfig.icons_model="darksky";break;case"openweathermap":this._iconsConfig.iconsDay=_t,this._iconsConfig.iconsNight=vt,this._iconsConfig.icons_model="openweathermap";break;case"buienradar":this._iconsConfig.iconsDay=ft,this._iconsConfig.iconsNight=kt,this._iconsConfig.icons_model="buienradar";break;case"defaulthass":this._iconsConfig.iconsDay=St,this._iconsConfig.iconsNight=Mt,this._iconsConfig.icons_model="defaulthass"}this._config=t}getCardSize(){return 1}static get styles(){return rt`${dt}${ct}${gt}${lt}${ut}${wt}${(t=>new at(String(t),ot))((t=>`\n  \n  \n.synoptic {\n  width: 100%;\n  border-collapse: collapse;\n}\n\ntable.synoptic tr:not(:last-child) {\n  border-bottom: 1px solid #476b6b;\n  // background-color: cadetblue;\n}\n  \ntable.synoptic td {\n  vertical-align: top;\n}\n  \n.msw-sw\n{\n    display:            inline-block;\n    width:              30px;\n    height:             30px;\n    background:         url("${t}/we-sprite.png") no-repeat top left;\n}\n.msw-sw-1{ background-position: 0 0; width: 30px; height: 30px; } \n.msw-sw-10{ background-position: 0 -60px; width: 30px; height: 30px; } \n.msw-sw-11{ background-position: 0 -120px; width: 30px; height: 30px; } \n.msw-sw-12{ background-position: 0 -180px; width: 30px; height: 30px; } \n.msw-sw-13{ background-position: 0 -240px; width: 30px; height: 30px; } \n.msw-sw-14{ background-position: 0 -300px; width: 30px; height: 30px; } \n.msw-sw-15{ background-position: 0 -360px; width: 30px; height: 30px; } \n.msw-sw-16{ background-position: 0 -420px; width: 30px; height: 30px; } \n.msw-sw-17{ background-position: 0 -480px; width: 30px; height: 30px; } \n.msw-sw-18{ background-position: 0 -540px; width: 30px; height: 30px; } \n.msw-sw-19{ background-position: 0 -600px; width: 30px; height: 30px; } \n.msw-sw-2{ background-position: 0 -660px; width: 30px; height: 30px; } \n.msw-sw-20{ background-position: 0 -720px; width: 30px; height: 30px; } \n.msw-sw-21{ background-position: 0 -780px; width: 30px; height: 30px; } \n.msw-sw-22{ background-position: 0 -840px; width: 30px; height: 30px; } \n.msw-sw-23{ background-position: 0 -900px; width: 30px; height: 30px; } \n.msw-sw-24{ background-position: 0 -960px; width: 30px; height: 30px; } \n.msw-sw-25{ background-position: 0 -1020px; width: 30px; height: 30px; } \n.msw-sw-26{ background-position: 0 -1080px; width: 30px; height: 30px; } \n.msw-sw-27{ background-position: 0 -1140px; width: 30px; height: 30px; } \n.msw-sw-28{ background-position: 0 -1200px; width: 30px; height: 30px; } \n.msw-sw-29{ background-position: 0 -1260px; width: 30px; height: 30px; } \n.msw-sw-3{ background-position: 0 -1320px; width: 30px; height: 30px; } \n.msw-sw-30{ background-position: 0 -1380px; width: 30px; height: 30px; } \n.msw-sw-31{ background-position: 0 -1440px; width: 30px; height: 30px; } \n.msw-sw-32{ background-position: 0 -1500px; width: 30px; height: 30px; } \n.msw-sw-33{ background-position: 0 -1560px; width: 30px; height: 30px; } \n.msw-sw-34{ background-position: 0 -1620px; width: 30px; height: 30px; } \n.msw-sw-35{ background-position: 0 -1680px; width: 30px; height: 30px; } \n.msw-sw-36{ background-position: 0 -1740px; width: 30px; height: 30px; } \n.msw-sw-37{ background-position: 0 -1800px; width: 30px; height: 30px; } \n.msw-sw-38{ background-position: 0 -1860px; width: 30px; height: 30px; } \n.msw-sw-4{ background-position: 0 -1920px; width: 30px; height: 30px; } \n.msw-sw-5{ background-position: -60px 0; width: 30px; height: 30px; } \n.msw-sw-6{ background-position: -60px -60px; width: 30px; height: 30px; } \n.msw-sw-7{ background-position: -60px -120px; width: 30px; height: 30px; } \n.msw-sw-8{ background-position: -60px -180px; width: 30px; height: 30px; } \n.msw-sw-9{ background-position: -60px -240px; width: 30px; height: 30px; }\n\n.msw-swa /* Inherits from swell arrows */\n{\n    background:         url("${t}/sa-sprite.png") no-repeat top left;\n}\n.msw-swa-10{ background-position: 0 0; width: 26px; height: 26px; } \n.msw-swa-100{ background-position: 0 -52px; width: 26px; height: 26px; } \n.msw-swa-105{ background-position: 0 -104px; width: 26px; height: 26px; } \n.msw-swa-110{ background-position: 0 -156px; width: 26px; height: 26px; } \n.msw-swa-115{ background-position: 0 -208px; width: 26px; height: 26px; } \n.msw-swa-120{ background-position: 0 -260px; width: 26px; height: 26px; } \n.msw-swa-125{ background-position: 0 -312px; width: 26px; height: 26px; } \n.msw-swa-130{ background-position: 0 -364px; width: 26px; height: 26px; } \n.msw-swa-135{ background-position: 0 -416px; width: 26px; height: 26px; } \n.msw-swa-140{ background-position: 0 -468px; width: 26px; height: 26px; } \n.msw-swa-145{ background-position: 0 -520px; width: 26px; height: 26px; } \n.msw-swa-15{ background-position: 0 -572px; width: 26px; height: 26px; } \n.msw-swa-150{ background-position: 0 -624px; width: 26px; height: 26px; } \n.msw-swa-155{ background-position: 0 -676px; width: 26px; height: 26px; } \n.msw-swa-160{ background-position: 0 -728px; width: 26px; height: 26px; } \n.msw-swa-165{ background-position: 0 -780px; width: 26px; height: 26px; } \n.msw-swa-170{ background-position: 0 -832px; width: 26px; height: 26px; } \n.msw-swa-175{ background-position: 0 -884px; width: 26px; height: 26px; } \n.msw-swa-180{ background-position: 0 -936px; width: 26px; height: 26px; } \n.msw-swa-185{ background-position: 0 -988px; width: 26px; height: 26px; } \n.msw-swa-190{ background-position: 0 -1040px; width: 26px; height: 26px; } \n.msw-swa-195{ background-position: 0 -1092px; width: 26px; height: 26px; } \n.msw-swa-20{ background-position: 0 -1144px; width: 26px; height: 26px; } \n.msw-swa-200{ background-position: 0 -1196px; width: 26px; height: 26px; } \n.msw-swa-205{ background-position: 0 -1248px; width: 26px; height: 26px; } \n.msw-swa-210{ background-position: 0 -1300px; width: 26px; height: 26px; } \n.msw-swa-215{ background-position: 0 -1352px; width: 26px; height: 26px; } \n.msw-swa-220{ background-position: 0 -1404px; width: 26px; height: 26px; } \n.msw-swa-225{ background-position: 0 -1456px; width: 26px; height: 26px; } \n.msw-swa-230{ background-position: 0 -1508px; width: 26px; height: 26px; } \n.msw-swa-235{ background-position: 0 -1560px; width: 26px; height: 26px; } \n.msw-swa-240{ background-position: 0 -1612px; width: 26px; height: 26px; } \n.msw-swa-245{ background-position: 0 -1664px; width: 26px; height: 26px; } \n.msw-swa-25{ background-position: 0 -1716px; width: 26px; height: 26px; } \n.msw-swa-250{ background-position: 0 -1768px; width: 26px; height: 26px; } \n.msw-swa-255{ background-position: 0 -1820px; width: 26px; height: 26px; } \n.msw-swa-260{ background-position: 0 -1872px; width: 26px; height: 26px; } \n.msw-swa-265{ background-position: 0 -1924px; width: 26px; height: 26px; } \n.msw-swa-270{ background-position: -52px 0; width: 26px; height: 26px; } \n.msw-swa-275{ background-position: -52px -52px; width: 26px; height: 26px; } \n.msw-swa-280{ background-position: -52px -104px; width: 26px; height: 26px; } \n.msw-swa-285{ background-position: -52px -156px; width: 26px; height: 26px; } \n.msw-swa-290{ background-position: -52px -208px; width: 26px; height: 26px; } \n.msw-swa-295{ background-position: -52px -260px; width: 26px; height: 26px; } \n.msw-swa-30{ background-position: -52px -312px; width: 26px; height: 26px; } \n.msw-swa-300{ background-position: -52px -364px; width: 26px; height: 26px; } \n.msw-swa-305{ background-position: -52px -416px; width: 26px; height: 26px; } \n.msw-swa-310{ background-position: -52px -468px; width: 26px; height: 26px; } \n.msw-swa-315{ background-position: -52px -520px; width: 26px; height: 26px; } \n.msw-swa-320{ background-position: -52px -572px; width: 26px; height: 26px; } \n.msw-swa-325{ background-position: -52px -624px; width: 26px; height: 26px; } \n.msw-swa-330{ background-position: -52px -676px; width: 26px; height: 26px; } \n.msw-swa-335{ background-position: -52px -728px; width: 26px; height: 26px; } \n.msw-swa-340{ background-position: -52px -780px; width: 26px; height: 26px; } \n.msw-swa-345{ background-position: -52px -832px; width: 26px; height: 26px; } \n.msw-swa-35{ background-position: -52px -884px; width: 26px; height: 26px; } \n.msw-swa-350{ background-position: -52px -936px; width: 26px; height: 26px; } \n.msw-swa-355{ background-position: -52px -988px; width: 26px; height: 26px; } \n.msw-swa-360{ background-position: -52px -1040px; width: 26px; height: 26px; } \n.msw-swa-40{ background-position: -52px -1092px; width: 26px; height: 26px; } \n.msw-swa-45{ background-position: -52px -1144px; width: 26px; height: 26px; } \n.msw-swa-5{ background-position: -52px -1196px; width: 26px; height: 26px; } \n.msw-swa-50{ background-position: -52px -1248px; width: 26px; height: 26px; } \n.msw-swa-55{ background-position: -52px -1300px; width: 26px; height: 26px; } \n.msw-swa-60{ background-position: -52px -1352px; width: 26px; height: 26px; } \n.msw-swa-65{ background-position: -52px -1404px; width: 26px; height: 26px; } \n.msw-swa-70{ background-position: -52px -1456px; width: 26px; height: 26px; } \n.msw-swa-75{ background-position: -52px -1508px; width: 26px; height: 26px; } \n.msw-swa-80{ background-position: -52px -1560px; width: 26px; height: 26px; } \n.msw-swa-85{ background-position: -52px -1612px; width: 26px; height: 26px; } \n.msw-swa-90{ background-position: -52px -1664px; width: 26px; height: 26px; } \n.msw-swa-95{ background-position: -52px -1716px; width: 26px; height: 26px; }\n\n.msw-ssa,\n.msw-swa /* Wind arrows */\n{\n    display:            inline-block;\n    width:              26px;\n    height:             26px;\n    background:         url("${t}/wa-sprite.png") no-repeat top left;\n}\n.msw-ssa-10{ background-position: 0 0; width: 26px; height: 26px; } \n.msw-ssa-100{ background-position: 0 -52px; width: 26px; height: 26px; } \n.msw-ssa-105{ background-position: 0 -104px; width: 26px; height: 26px; } \n.msw-ssa-110{ background-position: 0 -156px; width: 26px; height: 26px; } \n.msw-ssa-115{ background-position: 0 -208px; width: 26px; height: 26px; } \n.msw-ssa-120{ background-position: 0 -260px; width: 26px; height: 26px; } \n.msw-ssa-125{ background-position: 0 -312px; width: 26px; height: 26px; } \n.msw-ssa-130{ background-position: 0 -364px; width: 26px; height: 26px; } \n.msw-ssa-135{ background-position: 0 -416px; width: 26px; height: 26px; } \n.msw-ssa-140{ background-position: 0 -468px; width: 26px; height: 26px; } \n.msw-ssa-145{ background-position: 0 -520px; width: 26px; height: 26px; } \n.msw-ssa-15{ background-position: 0 -572px; width: 26px; height: 26px; } \n.msw-ssa-150{ background-position: 0 -624px; width: 26px; height: 26px; } \n.msw-ssa-155{ background-position: 0 -676px; width: 26px; height: 26px; } \n.msw-ssa-160{ background-position: 0 -728px; width: 26px; height: 26px; } \n.msw-ssa-165{ background-position: 0 -780px; width: 26px; height: 26px; } \n.msw-ssa-170{ background-position: 0 -832px; width: 26px; height: 26px; } \n.msw-ssa-175{ background-position: 0 -884px; width: 26px; height: 26px; } \n.msw-ssa-180{ background-position: 0 -936px; width: 26px; height: 26px; } \n.msw-ssa-185{ background-position: 0 -988px; width: 26px; height: 26px; } \n.msw-ssa-190{ background-position: 0 -1040px; width: 26px; height: 26px; } \n.msw-ssa-195{ background-position: 0 -1092px; width: 26px; height: 26px; } \n.msw-ssa-20{ background-position: 0 -1144px; width: 26px; height: 26px; } \n.msw-ssa-200{ background-position: 0 -1196px; width: 26px; height: 26px; } \n.msw-ssa-205{ background-position: 0 -1248px; width: 26px; height: 26px; } \n.msw-ssa-210{ background-position: 0 -1300px; width: 26px; height: 26px; } \n.msw-ssa-215{ background-position: 0 -1352px; width: 26px; height: 26px; } \n.msw-ssa-220{ background-position: 0 -1404px; width: 26px; height: 26px; } \n.msw-ssa-225{ background-position: 0 -1456px; width: 26px; height: 26px; } \n.msw-ssa-230{ background-position: 0 -1508px; width: 26px; height: 26px; } \n.msw-ssa-235{ background-position: 0 -1560px; width: 26px; height: 26px; } \n.msw-ssa-240{ background-position: 0 -1612px; width: 26px; height: 26px; } \n.msw-ssa-245{ background-position: 0 -1664px; width: 26px; height: 26px; } \n.msw-ssa-25{ background-position: 0 -1716px; width: 26px; height: 26px; } \n.msw-ssa-250{ background-position: 0 -1768px; width: 26px; height: 26px; } \n.msw-ssa-255{ background-position: 0 -1820px; width: 26px; height: 26px; } \n.msw-ssa-260{ background-position: 0 -1872px; width: 26px; height: 26px; } \n.msw-ssa-265{ background-position: 0 -1924px; width: 26px; height: 26px; } \n.msw-ssa-270{ background-position: -52px 0; width: 26px; height: 26px; } \n.msw-ssa-275{ background-position: -52px -52px; width: 26px; height: 26px; } \n.msw-ssa-280{ background-position: -52px -104px; width: 26px; height: 26px; } \n.msw-ssa-285{ background-position: -52px -156px; width: 26px; height: 26px; } \n.msw-ssa-290{ background-position: -52px -208px; width: 26px; height: 26px; } \n.msw-ssa-295{ background-position: -52px -260px; width: 26px; height: 26px; } \n.msw-ssa-30{ background-position: -52px -312px; width: 26px; height: 26px; } \n.msw-ssa-300{ background-position: -52px -364px; width: 26px; height: 26px; } \n.msw-ssa-305{ background-position: -52px -416px; width: 26px; height: 26px; } \n.msw-ssa-310{ background-position: -52px -468px; width: 26px; height: 26px; } \n.msw-ssa-315{ background-position: -52px -520px; width: 26px; height: 26px; } \n.msw-ssa-320{ background-position: -52px -572px; width: 26px; height: 26px; } \n.msw-ssa-325{ background-position: -52px -624px; width: 26px; height: 26px; } \n.msw-ssa-330{ background-position: -52px -676px; width: 26px; height: 26px; } \n.msw-ssa-335{ background-position: -52px -728px; width: 26px; height: 26px; } \n.msw-ssa-340{ background-position: -52px -780px; width: 26px; height: 26px; } \n.msw-ssa-345{ background-position: -52px -832px; width: 26px; height: 26px; } \n.msw-ssa-35{ background-position: -52px -884px; width: 26px; height: 26px; } \n.msw-ssa-350{ background-position: -52px -936px; width: 26px; height: 26px; } \n.msw-ssa-355{ background-position: -52px -988px; width: 26px; height: 26px; } \n.msw-ssa-40{ background-position: -52px -1040px; width: 26px; height: 26px; } \n.msw-ssa-45{ background-position: -52px -1092px; width: 26px; height: 26px; } \n.msw-ssa-5{ background-position: -52px -1144px; width: 26px; height: 26px; } \n.msw-ssa-50{ background-position: -52px -1196px; width: 26px; height: 26px; } \n.msw-ssa-55{ background-position: -52px -1248px; width: 26px; height: 26px; } \n.msw-ssa-60{ background-position: -52px -1300px; width: 26px; height: 26px; } \n.msw-ssa-65{ background-position: -52px -1352px; width: 26px; height: 26px; } \n.msw-ssa-70{ background-position: -52px -1404px; width: 26px; height: 26px; } \n.msw-ssa-75{ background-position: -52px -1456px; width: 26px; height: 26px; } \n.msw-ssa-80{ background-position: -52px -1508px; width: 26px; height: 26px; } \n.msw-ssa-85{ background-position: -52px -1560px; width: 26px; height: 26px; } \n.msw-ssa-90{ background-position: -52px -1612px; width: 26px; height: 26px; } \n.msw-ssa-95{ background-position: -52px -1664px; width: 26px; height: 26px; }\n\n.list-group-content {\n    display: inline-block;\n    vertical-align: middle;\n}\n\n.inline-block {\n    display: inline-block;\n    *display: inline;\n    zoom: 1;\n}\n\n.svg {\n    display: none\n}\n\n.svg-icon-container {\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: 5px\n}\n\n.svg {\n    display: none!important\n}\n\n.svg-icon {\n    display: inline-block;\n    vertical-align: middle\n}\n\n\n\n.svg-wind-icon {\n    width: 20px;\n    height: 27px;\n    background-size: auto 100%;\n    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjguODc0cHgiIGhlaWdodD0iMTkuOTAxcHgiIHZpZXdCb3g9IjAgMCAyOC44NzQgMTkuOTAxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyOC44NzQgMTkuOTAxIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNy42MTYgOS43NTVjMCAwIDAuMjA3LTIuMjI3IDAuNjQ1LTQuNjY3QzguNDY4IDMuOSA5IDAgOSAwSDYuNTkxSDQuMTQ4YzAgMCAwLjYgMy45IDAuOCA1LjEgQzUuMzYgNy41IDUuNiA5LjggNS42IDkuNzU1TDAgNy40MzlsNi41OTEgMTIuMzM0bDYuNTkxLTEyLjMzNEw3LjYxNiA5Ljc1NXoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjMuMTg4IDkuNzU1YzAgMCAwLjIwNy0yLjIyNyAwLjY0NS00LjY2N0MyNC4wNCAzLjkgMjQuNiAwIDI0LjYgMGgtMi40NDNoLTIuNDQzIGMwIDAgMC42IDMuOSAwLjggNS4wODhjMC40MzggMi40IDAuNiA0LjcgMC42IDQuNjY3bC01LjU2Ny0yLjMxNmw2LjU5MSAxMi4zMzRsNi41OTEtMTIuMzM0TDIzLjE4OCA5Ljc1NXoiLz48L3N2Zz4=")\n}\n\n.svg-wind-icon.svg-icon-white {\n    background-position: 100% 0\n}\n\n.svg-wind-icon.svg-icon-sm {\n    width: 13px;\n    height: 20px\n}\n\n.svg-wind-icon-dark {\n    width: 27px;\n    height: 27px;\n    background-size: 100%;\n    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDMwIDMwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMCAzMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgaWQ9IkxheWVyXzIiPjxjaXJjbGUgZmlsbD0ibm9uZSIgY3g9IjE1IiBjeT0iMTUiIHI9IjE1Ii8+PC9nPjxnIGlkPSJMYXllcl8xIj48cGF0aCBmaWxsPSIjMUExQTFBIiBkPSJNMTYuNTU0LDE1LjA0MWMwLDAsMC4zMDktMy4zMjUsMC45NjMtNi45NjhjMC4zMDktMS43MTUsMS4xNTQtNy41OTcsMS4xNTQtNy41OTdoLTMuNjQ3aC0zLjY0NmMwLDAsMC44NDYsNS44ODIsMS4xNTQsNy41OTdjMC42NTQsMy42NDMsMC45NjMsNi45NjgsMC45NjMsNi45NjhsLTguMzEyLTMuNDU3TDE1LjAyMywzMGw5Ljg0Mi0xOC40MTZMMTYuNTU0LDE1LjA0MXoiLz48L2c+PC9zdmc+")\n}\n\n.svg-wind-icon-danger {\n    width: 27px;\n    height: 27px;\n    background-position: top;\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwIDMwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6bm9uZTt9LnN0MXtmaWxsOiNFNzRDM0M7fTwvc3R5bGU+PGcgaWQ9IkxheWVyXzIiPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjE1IiBjeT0iMTUiIHI9IjE1Ii8+PC9nPjxnIGlkPSJMYXllcl8xXzFfIj48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYuNiwxNWMwLDAsMC4zLTMuMywxLTdjMC4zLTEuNywxLjItNy42LDEuMi03LjZIMTVoLTMuNmMwLDAsMC44LDUuOSwxLjIsNy42YzAuNywzLjYsMSw3LDEsN2wtOC4zLTMuNUwxNSwzMGw5LjgtMTguNEwxNi42LDE1eiIvPjwvZz48L3N2Zz4=)\n}\n\n.svg-wind-icon-gray {\n    width: 27px;\n    height: 27px;\n    background-position: top;\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNC41IDcuMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNC41IDcuMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiM1NTU1NTU7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQuNCwzSDNWMEgxLjZ2M0gwLjJDMCwzLDAsMy4yLDAsMy4zTDIuMSw3YzAuMSwwLjEsMC4zLDAuMSwwLjMsMGwyLjEtMy42QzQuNiwzLjIsNC41LDMsNC40LDN6Ii8+PC9zdmc+)\n}\n\n.svg-wind-icon-light {\n    width: 30px;\n    height: 30px;\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU1LjMsMTQyLjFjMCwwLDIuMi0yMy43LDYuOS00OS42YzIuMi0xMi4yLDguMi01NC4xLDguMi01NC4xaC0yNmgtMjZjMCwwLDYsNDEuOSw4LjIsNTQuMWM0LjcsMjUuOSw2LjksNDkuNiw2LjksNDkuNmwtNTkuMi0yNC42bDcwLjEsMTMxLjJsNzAuMS0xMzEuMkwxNTUuMywxNDIuMXoiLz48L3N2Zz4=)\n}\n\n// ----\n.svg-swell-icon {\n    width: 21px;\n    height: 21px\n}\n.svg-swell-icon {\n    text-indent: -9999px\n}\n\n.svg-swell-icon,.svg .svg-wind-icon {\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    display: inline-block;\n    text-align: center\n}\n\n.svg-swell-icon {\n    width: 17px;\n    height: 23px;\n    background-size: auto 100%;\n    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDMuOTU4cHgiIGhlaWdodD0iMTkuOTAxcHgiIHZpZXdCb3g9IjAgMCA0My45NTggMTkuOTAxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0My45NTggMTkuOTAxIiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGU+LnN0eWxlMHtmaWxsOgkjRkZGRkZGO30uc3R5bGUxe2ZpbGw6CSMzQ0JCRTg7fTwvc3R5bGU+PHBvbHlnb24gcG9pbnRzPSI2LjIsMTkuOSAxMi40LDAuNCA2LjIsNCAwLDAuNCIvPjxwb2x5Z29uIHBvaW50cz0iMjIsMTkuOSAyOC4yLDAuNCAyMiw0IDE1LjgsMC40IiBjbGFzcz0ic3R5bGUwIi8+PHBvbHlnb24gcG9pbnRzPSIzNy44LDE5LjkgNDQsMC40IDM3LjgsNCAzMS42LDAuNCIgY2xhc3M9InN0eWxlMSIvPjwvc3ZnPg==")\n}\n\n.svg-swell-icon.svg-icon-white {\n    background-position: 60% 0\n}\n\n.svg-swell-icon-dark {\n    width: 23px;\n    height: 23px;\n    background-size: 100%;\n    background-position: 0 0;\n    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGlkPSJMYXllcl8yIj48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iMCIgY3g9IjI0Ljk5IiBjeT0iMjQuOTQ2IiByPSIyNC45NDYiLz48L2c+PGcgaWQ9IkxheWVyXzFfMV8iPjxwb2x5Z29uIGZpbGw9IiMxQTFBMUEiIHBvaW50cz0iMzkuOTYxLDUuMDA4IDI0Ljk2OSw0OS44OTMgMTAuMDM3LDUuMDA4IDI1LjAzOCwxMS4yNDIgIi8+PC9nPjwvc3ZnPg==")\n}\n`)(Xt))}`}render(){return this.invalidConfig?E`
            <ha-card class="ha-card-weather-conditions">
                <div class='banner'>
                    <div class="header">ha-card-weather-conditions</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `:this._render()}_render(){let t,e,i,s,n,o,a,r,p=0,h=this.hass.states;if(this._showSummary&&this._hasCurrent){let e=this._config.weather.current;e.current_conditions&&void 0!==typeof h[e.current_conditions]||e.temperature&&void 0!==typeof h[e.temperature]?(t=Dt(this.hass,this._config.weather.current,this._config.name,this._iconsConfig,this._terms),p++):t=""}else t="";if(this._showPresent&&this._hasCurrent){let t=this._config.weather.current;if(t.sun&&void 0!==typeof h[t.sun]||t.humidity&&void 0!==typeof h[t.humidity]||t.pressure&&void 0!==typeof h[t.pressure]||t.visibility&&void 0!==typeof h[t.visibility]||t.wind_bearing&&void 0!==typeof h[t.wind_bearing]||t.wind_speed&&void 0!==typeof h[t.wind_speed])e=Et(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,this._terms,p>0),p++;else if(t.forecast&&this._hasForecast){let t=this._config.weather.forecast;t.temperature_low&&t.temperature_low.day_1&&void 0!==typeof h[t.temperature_low.day_1]||t.temperature_high&&t.temperature_high.day_1&&void 0!==typeof h[t.temperature_high.day_1]||t.precipitation_intensity&&t.precipitation_intensity.day_1&&void 0!==typeof h[t.precipitation_intensity.day_1]||t.precipitation_probability&&t.precipitation_probability.day_1&&void 0!==typeof h[t.precipitation_probability.day_1]?(e=Et(this.hass,this._config.weather.current,this._config.weather.forecast,this._language,this._terms,p>0),p++):e=""}else e=""}else e="";if(this._showAirQuality&&this._hasAirQuality){let t=this._config.air_quality;t.co&&void 0!==typeof h[t.co]||t.epa_aqi&&void 0!==typeof h[t.epa_aqi]||t.epa_health_concern&&void 0!==typeof h[t.epa_health_concern]||t.no2&&void 0!==typeof h[t.no2]||t.o3&&void 0!==typeof h[t.o3]||t.pm10&&void 0!==typeof h[t.pm10]||t.pm25&&void 0!==typeof h[t.pm25]||t.so2&&void 0!==typeof h[t.so2]?(s=((t,e,i)=>{let s=void 0!==e.pm25&&void 0!==t.states[e.pm25]?Ut(At(t.states[e.pm25].state),t.states[e.pm25].attributes,"pm25"):void 0,n=void 0!==e.pm10&&void 0!==t.states[e.pm10]?Ut(At(t.states[e.pm10].state),t.states[e.pm10].attributes,"pm10"):void 0,o=void 0!==e.o3&&void 0!==t.states[e.o3]?Ut(At(t.states[e.o3].state),t.states[e.o3].attributes,"o3"):void 0,a=void 0!==e.no2&&void 0!==t.states[e.no2]?Ut(At(t.states[e.no2].state),t.states[e.no2].attributes,"no2"):void 0,r=void 0!==e.co&&void 0!==t.states[e.co]?Ut(At(t.states[e.co].state),t.states[e.co].attributes,"co"):void 0,p=void 0!==e.so2&&void 0!==t.states[e.so2]?Ut(At(t.states[e.so2].state),t.states[e.so2].attributes,"so2"):void 0,h=void 0!==e.epa_aqi&&void 0!==t.states[e.epa_aqi]?Ut(At(t.states[e.epa_aqi].state),t.states[e.epa_aqi].attributes,"aqi"):void 0,d=void 0!==e.epa_health_concern&&void 0!==t.states[e.epa_health_concern]?Ut(t.states[e.epa_health_concern].state,t.states[e.epa_health_concern].attributes,"aqi"):void 0;return E`
    <ul class="variations ${i?"spacer":""}">
        ${h||""}${d||""}
        ${s||""}${n||""}${o||""}${a||""}${r||""}${p||""}
    </ul>
  `})(this.hass,this._config.air_quality,p>0),p++):s=""}else s="";if(this._showUv&&this._hasUv){let t=this._config.uv;t.protection_window&&void 0!==typeof h[t.protection_window]||t.ozone_level&&void 0!==typeof h[t.ozone_level]||t.uv_index&&void 0!==typeof h[t.uv_index]||t.uv_level&&void 0!==typeof h[t.uv_level]||t.max_uv_index&&void 0!==typeof h[t.max_uv_index]?(i=Vt(this.hass,this._config.uv,p>0),p++):i=""}else i="";if(this._showPollen&&this._hasPollen){let t=this._config.pollen;t.grass&&t.grass.entity&&void 0!==typeof h[t.grass.entity]||t.tree&&t.tree.entity&&void 0!==typeof h[t.tree.entity]||t.weed&&t.weed.entity&&void 0!==typeof h[t.weed.entity]?(n=function(t,e,i){let s=e.tree&&e.tree.entity?Ht(t,e.tree):void 0,n=e.weed&&e.weed.entity?Ht(t,e.weed):void 0,o=e.grass&&e.grass.entity?Ht(t,e.grass):void 0;return E`
    <ul class="variations polles ${i?"spacer":""}">
        ${s||""}${n||""}${o||""}
    </ul>
  `}(this.hass,this._config.pollen,p>0),p++):n=""}else n="";if(this._showForecast&&this._hasForecast){let t=this._config.weather.forecast;o=((t,e,i,s,n,o)=>{let a=new Date,r=Object.isSet(e)&&Object.isSet(e.sun)&&Object.isSet(t.states[e.sun])?t.states[e.sun].state:void 0,p=i.icons?Object.entries(i.icons):void 0,h=i.temperature_high?Object.entries(i.temperature_high):void 0,d=i.temperature_low?Object.entries(i.temperature_low):void 0,c=i.precipitation_probability?Object.entries(i.precipitation_probability):void 0,l=i.precipitation_intensity?Object.entries(i.precipitation_intensity):void 0,g=Math.max(p?p.length:0,h?h.length:0,d?d.length:0,c?c.length:0,l?l.length:0),u=1,w=g>0?Array(g-u).fill(1,0,g-u).map(()=>u++):Array();return g>1?E`
      <div class="forecast clear ${o?"spacer":""}">
        ${w.map(e=>{let i,o,g,u,w,x=new Date(a.setDate(a.getDate()+1)).toLocaleDateString(n,{weekday:"short"});return p&&p[e]&&t.states[p[e][1]]&&(i=t.states[p[e][1]].state.toLowerCase()),d&&d[e]&&t.states[d[e][1]]&&(o=At(t.states[d[e][1]].state,0)),h&&h[e]&&t.states[h[e][1]]&&(g=At(t.states[h[e][1]].state,0)),c&&c[e]&&t.states[c[e][1]]&&(u=At(t.states[c[e][1]].state,0)),l&&l[e]&&t.states[l[e][1]]&&(w=At(t.states[l[e][1]].state,0)),E`
          <div class="day ${e}">
              <div class="dayname">${x}</div>
              ${i?E`
              <i class="icon" style="background: none, url('${Tt(i,s,r)}') no-repeat; 
                    background-size: contain"></i>                
              `:""}
              ${Zt(o,"",g,Lt(t,"temperature"))} 
              ${Zt(u,"%",w,Lt(t,"precipitation")+"/h")}                       
          </div>
          `})}
      </div>
    `:E``})(this.hass,this._config.weather.current,t,this._iconsConfig,this._language,p>0),p++}else o="";if(this._showAlert&&this._hasAlert){let t=this._config.alert;a=Bt(this.hass,t),p++}else a="";if(this._showSea&&this._hasSea){let t=this._config.sea;r=((t,e,i,s,n)=>{let o=e.swell_direction?Object.entries(e.swell_direction):void 0,a=e.swell_height?Object.entries(e.swell_height):void 0,r=e.swell_period?Object.entries(e.swell_period):void 0,p=e.wind_direction?Object.entries(e.wind_direction):void 0,h=e.wind_speed?Object.entries(e.wind_speed):void 0,d=e.air_temperature?Object.entries(e.air_temperature):void 0,c=e.water_temperature?Object.entries(e.water_temperature):void 0,l=Math.max(o?o.length:0,a?a.length:0,r?r.length:0),g=0,u=l>0?Array(l-g).fill(1,0,l-g).map(()=>g++):Array();return E`
    <div class="forecast clear ${n?"spacer":""}">
      <div class="day">
        <div class="highTemp">
            <table class="synoptic">
                <thead>
                    <tr>
                        <th>Time</th><th>Swell</th><th>Wind</th><th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
        ${u.map(e=>{let i=o[e.toString()][1],s=t.states[i],n=a[e.toString()][1],l=t.states[n],g=r[e.toString()][1],u=t.states[g],w=p[e.toString()][1],x=t.states[w],m=h[e.toString()][1],y=t.states[m],b=d[e.toString()][1],_=t.states[b],v=c[e.toString()][1],f=t.states[v],k=parseFloat(s.state)+"deg",S=At(l.state),M=l.attributes.unit_of_measurement,I=At(u.state,0),N=u.attributes.unit_of_measurement,j=parseFloat(x.state)+"deg",C=At(y.state,0),z=y.attributes.unit_of_measurement,T=At(_.state,0),L=(_.attributes.unit_of_measurement,At(f.state,1)),P=f.attributes.unit_of_measurement;return E`
            <tr>
            <td>${jt(new Date(s.attributes.observation_time).getHours(),2)}:00</td>
            <td>${S}${M} / ${I}${N}
                <span class="svg-icon svg-swell-icon svg-swell-icon-dark" style="transform: rotate(${k});
                    -ms-transform: rotate(${k}); -webkit-transform: rotate(${k});"></span>
            </td>
            <td>${C} ${z}
                <span class="svg-icon svg-wind-icon svg-wind-icon-light" style="transform: rotate(${j});
                    -ms-transform: rotate(${j}); -webkit-transform: rotate(${j});"></span>
            </td>
            <td>${L} - ${T} ${P}</td>
            </tr> 
                `})}
                               </tbody>
                    </table>      
                </div>
      </div>           
    </div>
  `})(this.hass,t,this._iconsConfig,this._language,p>0),p++}else r="";return E`
      ${""}
      
      <ha-card class="ha-card-weather-conditions ">
        <div class="nd-container ${""}">
        ${this._header?E`
            ${t}
            ${a}
            ${e}
            ${i}
            ${s}
            ${n}
            ${o}
            ${r}
            ${this._hasMeteogram?this.renderCamera(this.hass,this._config.weather.forecast.meteogram):""}
            ${this._config.camera?this.renderCamera(this.hass,this._config.camera):""}
        `:E``}
        </div>
      </ha-card>
    `}renderCamera(t,e){let i=t.states[e],s=i?i.attributes.entity_picture:void 0;return s?E`
        <div @click=${t=>this.handlePopup(t,e)} class="camera-container">
          <div class="camera-image">
            <img src="${s}" alt="${i.attributes.friendly_name}"/>
          </div>
        </div>
      `:E``}handlePopup(t,e){t.stopPropagation();let i=new Event("hass-more-info",{composed:!0});i.detail={entityId:e},this.dispatchEvent(i)}};t([st()],n.prototype,"hass",void 0),t([st()],n.prototype,"_config",void 0),n=t([tt("ha-card-weather-conditions")],n)})});export{qt as hacsImagePathExist,Kt as manImagePathExist,ne as numberFormat_0dec,oe as numberFormat_1dec};
