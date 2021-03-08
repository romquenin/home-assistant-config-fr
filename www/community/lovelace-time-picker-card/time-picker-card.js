/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function e(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}var t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,i="[^\\s]+",n=/\[([^]*?)\]/gm;function s(e,t){for(var i=[],n=0,s=e.length;n<s;n++)i.push(e[n].substr(0,t));return i}var r=function(e){return function(t,i){var n=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return n>-1?n:null}};function o(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var n=0,s=t;n<s.length;n++){var r=s[n];for(var o in r)e[o]=r[o]}return e}var a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c=["January","February","March","April","May","June","July","August","September","October","November","December"],d=s(c,3),l={dayNamesShort:s(a,3),dayNames:a,monthNamesShort:d,monthNames:c,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},h=o({},l),u=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},p={D:function(e){return String(e.getDate())},DD:function(e){return u(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return u(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return u(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return u(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return u(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return u(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return u(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return u(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return u(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return u(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return u(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+u(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+u(Math.floor(Math.abs(t)/60),2)+":"+u(Math.abs(t)%60,2)}},m=function(e){return+e-1},g=[null,"[1-9]\\d?"],f=[null,i],v=["isPm",i,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],y=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],_=(r("monthNamesShort"),r("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var S=function(e,i,s){if(void 0===i&&(i=_.default),void 0===s&&(s={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var r=[];i=(i=_[i]||i).replace(n,(function(e,t){return r.push(t),"@@@"}));var a=o(o({},h),s);return(i=i.replace(t,(function(t){return p[t](e,a)}))).replace(/@@@/g,(function(){return r.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function b(e){return e.substr(0,e.indexOf("."))}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,x=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},C=`{{lit-${String(Math.random()).slice(2)}}}`,E=`\x3c!--${C}--\x3e`,N=new RegExp(`${C}|${E}`);class P{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],s=document.createTreeWalker(t.content,133,null,!1);let r=0,o=-1,a=0;const{strings:c,values:{length:d}}=e;for(;a<d;){const e=s.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)M(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=c[a],i=O.exec(t)[2],n=i.toLowerCase()+"$lit$",s=e.getAttribute(n);e.removeAttribute(n);const r=s.split(N);this.parts.push({type:"attribute",index:o,name:i,strings:r}),a+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),s.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(C)>=0){const n=e.parentNode,s=t.split(N),r=s.length-1;for(let t=0;t<r;t++){let i,r=s[t];if(""===r)i=k();else{const e=O.exec(r);null!==e&&M(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(r)}n.insertBefore(i,e),this.parts.push({type:"node",index:++o})}""===s[r]?(n.insertBefore(k(),e),i.push(e)):e.data=s[r],a+=r}}else if(8===e.nodeType)if(e.data===C){const t=e.parentNode;null!==e.previousSibling&&o!==r||(o++,t.insertBefore(k(),e)),r=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(i.push(e),o--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(C,t+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const M=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},T=e=>-1!==e.index,k=()=>document.createComment(""),O=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function $(e,t){const{element:{content:i},parts:n}=e,s=document.createTreeWalker(i,133,null,!1);let r=A(n),o=n[r],a=-1,c=0;const d=[];let l=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===l&&(l=null),t.has(e)&&(d.push(e),null===l&&(l=e)),null!==l&&c++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-c,r=A(n,r),o=n[r]}d.forEach(e=>e.parentNode.removeChild(e))}const V=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},A=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(T(t))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const H=new WeakMap,j=e=>"function"==typeof e&&H.has(e),I={},U={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class D{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=w?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let s,r=0,o=0,a=n.nextNode();for(;r<i.length;)if(s=i[r],T(s)){for(;o<s.index;)o++,"TEMPLATE"===a.nodeName&&(t.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=t.pop(),a=n.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return w&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const L=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),R=` ${C} `;class Y{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],s=e.lastIndexOf("\x3c!--");i=(s>-1||i)&&-1===e.indexOf("--\x3e",s+1);const r=O.exec(e);t+=null===r?e+(i?R:E):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+C}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==L&&(t=L.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const z=e=>null===e||!("object"==typeof e||"function"==typeof e),F=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class B{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new q(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!F(e))return e}let n="";for(let s=0;s<t;s++){n+=e[s];const t=i[s];if(void 0!==t){const e=t.value;if(z(e)||!F(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class q{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===I||z(e)&&e===this.value||(this.value=e,j(e)||(this.committer.dirty=!0))}commit(){for(;j(this.value);){const e=this.value;this.value=I,e(this)}this.value!==I&&this.committer.commit()}}class W{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(k()),this.endNode=e.appendChild(k())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=k()),e.__insert(this.endNode=k())}insertAfterPart(e){e.__insert(this.startNode=k()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;j(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=I,e(this)}const e=this.__pendingValue;e!==I&&(z(e)?e!==this.value&&this.__commitText(e):e instanceof Y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):F(e)?this.__commitIterable(e):e===U?(this.value=U,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof D&&this.value.template===t)this.value.update(e.values);else{const i=new D(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const s of e)i=t[n],void 0===i&&(i=new W(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(s),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){x(this.startNode.parentNode,e.nextSibling,this.endNode)}}class G{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;j(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=I,e(this)}if(this.__pendingValue===I)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=I}}class J extends B{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new Z(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Z extends q{}let K=!1;(()=>{try{const e={get capture(){return K=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class Q{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;j(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=I,e(this)}if(this.__pendingValue===I)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=X(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=I}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const X=e=>e&&(K?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function ee(e){let t=te.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},te.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(C);return i=t.keyString.get(n),void 0===i&&(i=new P(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const te=new Map,ie=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const ne=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,i,n){const s=t[0];if("."===s){return new J(e,t.slice(1),i).parts}if("@"===s)return[new Q(e,t.slice(1),n.eventContext)];if("?"===s)return[new G(e,t.slice(1),i)];return new B(e,t,i).parts}handleTextExpression(e){return new W(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const se=(e,...t)=>new Y(e,t,"html",ne)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,re=(e,t)=>`${e}--${t}`;let oe=!0;void 0===window.ShadyCSS?oe=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),oe=!1);const ae=e=>t=>{const i=re(t.type,e);let n=te.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},te.set(i,n));let s=n.stringsArray.get(t.strings);if(void 0!==s)return s;const r=t.strings.join(C);if(s=n.keyString.get(r),void 0===s){const i=t.getTemplateElement();oe&&window.ShadyCSS.prepareTemplateDom(i,e),s=new P(t,i),n.keyString.set(r,s)}return n.stringsArray.set(t.strings,s),s},ce=["html","svg"],de=new Set,le=(e,t,i)=>{de.add(e);const n=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:r}=s;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,e);const o=document.createElement("style");for(let e=0;e<r;e++){const t=s[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{ce.forEach(t=>{const i=te.get(re(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),$(e,i)})})})(e);const a=n.content;i?function(e,t,i=null){const{element:{content:n},parts:s}=e;if(null==i)return void n.appendChild(t);const r=document.createTreeWalker(n,133,null,!1);let o=A(s),a=0,c=-1;for(;r.nextNode();){c++;for(r.currentNode===i&&(a=V(t),i.parentNode.insertBefore(t,i));-1!==o&&s[o].index===c;){if(a>0){for(;-1!==o;)s[o].index+=a,o=A(s,o);return}o=A(s,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),$(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const he={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},ue=(e,t)=>t!==e&&(t==t||e==e),pe={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:ue};class me extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=pe){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const s=this[e];this[t]=n,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||pe}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=ue){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||he,s="function"==typeof n?n:n.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||he.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=pe){const n=this.constructor,s=n._attributeNameForProperty(e,i);if(void 0!==s){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let n=!0;if(void 0!==e){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}me.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const ge=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t),fe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function ve(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):fe(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const ye=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol();class Se{constructor(e,t){if(t!==_e)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ye?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const be=(e,...t)=>{const i=t.reduce((t,i,n)=>t+(e=>{if(e instanceof Se)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1],e[0]);return new Se(i,_e)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const we={};class xe extends me{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),n=[];i.forEach(e=>n.unshift(e)),this._styles=n}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!ye){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new Se(String(t),_e)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ye?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==we&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return we}}xe.finalized=!0,xe.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,s=ie.has(t),r=oe&&11===t.nodeType&&!!t.host,o=r&&!de.has(n),a=o?document.createDocumentFragment():t;if(((e,t,i)=>{let n=ie.get(t);void 0===n&&(x(t,t.firstChild),ie.set(t,n=new W(Object.assign({templateFactory:ee},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,a,Object.assign({templateFactory:ae(n)},i)),o){const e=ie.get(a);ie.delete(a);const i=e.value instanceof D?e.value.template:void 0;le(n,a,i),x(t,t.firstChild),t.appendChild(a),ie.set(t,e)}!s&&r&&window.ShadyCSS.styleElement(t.host)};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class Ce{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const Ee=new WeakMap,Ne=(Pe=e=>t=>{if(!(t instanceof q)||t instanceof Z||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=t,{element:n}=i;let s=Ee.get(t);void 0===s&&(n.setAttribute("class",i.strings.join(" ")),Ee.set(t,s=new Set));const r=n.classList||new Ce(n);s.forEach(t=>{t in e||(r.remove(t),s.delete(t))});for(const t in e){const i=e[t];i!=s.has(t)&&(i?(r.add(t),s.add(t)):(r.remove(t),s.delete(t)))}"function"==typeof r.commit&&r.commit()},(...e)=>{const t=Pe(...e);return H.set(t,!0),t});var Pe,Me,Te,ke,Oe;!function(e){let t,i;!function(e){e.LEFT="left",e.CENTER="center",e.RIGHT="right"}(t=e.AlignControls||(e.AlignControls={})),function(e){e.HEADER="header",e.INSIDE="inside"}(i=e.Name||(e.Name={}))}(Me||(Me={})),function(e){e.UP="up",e.DOWN="down"}(Te||(Te={})),function(e){e.AM="AM",e.PM="PM"}(ke||(ke={}));let $e=Oe=class extends xe{get amClass(){return{"time-period":!0,active:this.period===ke.AM}}get pmClass(){return{"time-period":!0,active:this.period===ke.PM}}render(){return se`<div class="time-period-selector">
      ${"single"===this.mode?this.renderSingle():this.renderDouble()}
    </div>`}onTimePeriodChange(){const e=new CustomEvent(Oe.EVENT_TOGGLE);this.dispatchEvent(e)}renderSingle(){return se`<div class="time-period active" @click=${this.onTimePeriodChange}>
      ${this.period}<mwc-ripple></mwc-ripple>
    </div>`}renderDouble(){return se`<div class=${Ne(this.amClass)} @click=${this.onTimePeriodChange}>
        AM<mwc-ripple></mwc-ripple>
      </div>
      <div class=${Ne(this.pmClass)} @click=${this.onTimePeriodChange}>
        PM<mwc-ripple></mwc-ripple>
      </div>`}static get styles(){return be`
      .time-period-selector {
        padding: 0 8px;
      }

      .time-period {
        width: 30px;
        padding: 8px;
        background: var(--tpc-off-color);
        color: var(--tpc-text-color);
        text-align: center;
        font-size: 1em;
        cursor: pointer;
      }

      .time-period.active {
        background: var(--tpc-accent-color);
      }
    `}};var Ve;$e.EVENT_TOGGLE="toggle",e([ve()],$e.prototype,"period",void 0),e([ve()],$e.prototype,"mode",void 0),$e=Oe=e([ge("time-period")],$e);let Ae=Ve=class extends xe{render(){return se`
      <div class="time-unit">
        ${this.renderStepChanger(Te.UP)}
        <input
          class="time-input"
          type="number"
          placeholder="MM"
          min=${this.unit.minValue}
          max=${this.unit.maxValue}
          .value="${this.unit.toString()}"
          @change=${this.onInputChange}
        />
        ${this.renderStepChanger(Te.DOWN)}
      </div>
    `}onInputChange({target:{value:e}}){this.unit.setStringValue(e);const t=new CustomEvent(Ve.EVENT_UPDATE);this.dispatchEvent(t)}onStepChangerClick(e){const t=new CustomEvent(Ve.EVENT_STEP_CHANGE,{detail:{direction:e}});this.dispatchEvent(t)}renderStepChanger(e){return se`
      <div class="time-picker-icon" @click=${()=>this.onStepChangerClick(e)}>
        <ha-icon .icon="hass:chevron-${e}"></ha-icon>
        <mwc-ripple id="ripple"></mwc-ripple>
      </div>
    `}static get styles(){return be`
      .time-unit {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 8px;
      }

      .time-picker-icon {
        width: 30px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        color: var(--tpc-icon-color);
      }

      .time-input {
        width: 30px;
        padding: 8px 8px 6px;
        background: var(--tpc-elements-background-color);
        border: 0;
        border-bottom: 2px solid var(--tpc-elements-background-color);
        color: var(--tpc-text-color, #fff);
        text-align: center;
        font-size: 1em;
        -moz-appearance: textfield;

        transition: border-color 0.2s ease-in-out;
      }

      .time-input:focus {
        outline: none;
      }

      .time-input:invalid {
        box-shadow: none;
        outline: none;
        border: 0;
        border-bottom: 2px solid red;
      }

      .time-input::-webkit-inner-spin-button,
      .time-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}};Ae.EVENT_UPDATE="update",Ae.EVENT_STEP_CHANGE="stepChange",e([ve()],Ae.prototype,"unit",void 0),Ae=Ve=e([ge("time-unit")],Ae);const He=Me.AlignControls.CENTER,je=Me.Name.HEADER;var Ie;let Ue=Ie=class extends xe{get entity(){return this.hass.states[this.config.entity]}get datetimeEntities(){return Object.keys(this.hass.states).filter(e=>"input_datetime"===b(e)&&!0===this.hass.states[e].attributes.has_time)}render(){var e,t,i,n,s,r,o,a,c;return se`<div class="card-config">
      <paper-dropdown-menu
        style="width: 100%"
        label="Entity (Required)"
        .configValue=${"entity"}
        @value-changed=${this.onValueChange}
      >
        <paper-listbox
          slot="dropdown-content"
          .selected=${this.datetimeEntities.indexOf(this.config.entity)}
        >
          ${this.datetimeEntities.map(e=>se`<paper-item>${e}</paper-item>`)}
        </paper-listbox>
      </paper-dropdown-menu>
      <paper-input
        label="Name (Optional)"
        .configValue=${"name"}
        .value=${this.config.name}
        .placeholder=${null===(e=this.entity)||void 0===e?void 0:e.attributes.friendly_name}
        @value-changed=${this.onValueChange}
      ></paper-input>
      <div class="side-by-side">
        <div>
          <ha-switch
            style="margin-left: 10px"
            .checked="${!Boolean(null===(t=this.config.hide)||void 0===t?void 0:t.name)}"
            @change="${this.onHideNameChange}"
          ></ha-switch>
          Show name?
        </div>
        <paper-dropdown-menu
          style="width: 100%"
          label="Name Position (Optional)"
          @value-changed=${this.onLayoutNameChange}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${Object.values(Me.Name).indexOf(null!==(n=null===(i=this.config.layout)||void 0===i?void 0:i.name)&&void 0!==n?n:je)}
          >
            ${Object.values(Me.Name).map(e=>se`<paper-item>${e}</paper-item>`)}
          </paper-listbox>
        </paper-dropdown-menu>
      </div>
      <div class="side-by-side">
        <paper-input
          type="number"
          label="Hour Step (Optional)"
          .configValue=${"hour_step"}
          .value=${this.config.hour_step||1}
          @value-changed=${this.onValueChange}
        ></paper-input>
        <paper-input
          type="number"
          label="Minute Step (Optional)"
          .configValue=${"minute_step"}
          .value=${this.config.minute_step||5}
          @value-changed=${this.onValueChange}
        ></paper-input>
      </div>
      <div class="side-by-side">
        <div>
          <ha-switch
            style="margin-left: 10px"
            .checked="${!1===(null===(s=this.config.hide)||void 0===s?void 0:s.seconds)}"
            @change="${this.onHideSecondsChange}"
          ></ha-switch>
          Show seconds?
        </div>
        <paper-input
          type="number"
          label="Second Step (Optional)"
          .configValue=${"second_step"}
          .value=${this.config.second_step||5}
          @value-changed=${this.onValueChange}
        ></paper-input>
      </div>
      <div class="side-by-side">
        <div>
          <ha-switch
            .checked="${12===this.config.hour_mode}"
            @change="${this.onHourModeChange}"
          ></ha-switch>
          12-Hour mode
        </div>
        ${12===this.config.hour_mode?se`<div>
              <ha-switch
                .checked="${"single"===(null===(r=this.config.layout)||void 0===r?void 0:r.hour_mode)}"
                @change="${this.onHourModeLayoutChange}"
              ></ha-switch>
              "Single" hour mode layout
            </div>`:""}
      </div>
      <div class="side-by-side">
        <paper-dropdown-menu
          style="width: 100%"
          label="Align Controls (Optional)"
          @value-changed=${this.onLayoutAlignChange}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${Object.values(Me.AlignControls).indexOf(null!==(a=null===(o=this.config.layout)||void 0===o?void 0:o.align_controls)&&void 0!==a?a:He)}
          >
            ${Object.values(Me.AlignControls).map(e=>se`<paper-item>${e}</paper-item>`)}
          </paper-listbox>
        </paper-dropdown-menu>
        <div>
          <ha-switch
            .checked="${this.config.link_values}"
            @change="${this.onLinkValuesChange}"
          ></ha-switch>
          Link Values
        </div>
      </div>
      <div class="side-by-side">
        <div>
          <ha-switch
            .checked="${null===(c=this.config.layout)||void 0===c?void 0:c.embedded}"
            @change="${this.onEmbeddedChange}"
          ></ha-switch>
          Embedded
        </div>
      </div>
    </div>`}setConfig(e){this.config=e}onHourModeChange({target:{checked:e}}){const t=e?12:24,i=Object.assign(Object.assign({},this.config),{hour_mode:t});this.dispatch(i)}onHideNameChange({target:{checked:e}}){const t=Object.assign(Object.assign({},this.config.hide),{name:!e}),i=Object.assign(Object.assign({},this.config),{hide:t});this.dispatch(i)}onHideSecondsChange({target:{checked:e}}){const t=Object.assign(Object.assign({},this.config.hide),{seconds:!e}),i=Object.assign(Object.assign({},this.config),{hide:t});this.dispatch(i)}onLayoutAlignChange({detail:{value:e}}){const t=Object.assign(Object.assign({},this.config.layout),{align_controls:e}),i=Object.assign(Object.assign({},this.config),{layout:t});this.dispatch(i)}onLayoutNameChange({detail:{value:e}}){const t=Object.assign(Object.assign({},this.config.layout),{name:e}),i=Object.assign(Object.assign({},this.config),{layout:t});this.dispatch(i)}onHourModeLayoutChange({target:{checked:e}}){const t=e?"single":"double",i=Object.assign(Object.assign({},this.config),{layout:Object.assign(Object.assign({},this.config.layout),{hour_mode:t})});this.dispatch(i)}onLinkValuesChange({target:{checked:e}}){const t=Object.assign(Object.assign({},this.config),{link_values:e});this.dispatch(t)}onEmbeddedChange({target:{checked:e}}){const t=Object.assign(Object.assign({},this.config),{layout:{embedded:e}});this.dispatch(t)}onValueChange(e){const t=e.target.configValue;let i=e.detail.value;if(Ie.NUMBER_PROPERTIES.indexOf(t)>-1&&(i=parseInt(i),isNaN(i)))return;if(this.config[t]===i)return;const n=Object.assign(Object.assign({},this.config),{[t]:i});this.dispatch(n)}dispatch(e){const t=new CustomEvent(Ie.CONFIG_CHANGED_EVENT,{bubbles:!0,composed:!0,detail:{config:e}});this.dispatchEvent(t)}static get styles(){return be`
      ha-switch {
        padding: 16px 0;
        margin-right: 16px;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }
      .suffix {
        margin: 0 8px;
      }
    `}};Ue.NUMBER_PROPERTIES=["hour_step","minute_step","second_step","hour_mode"],Ue.CONFIG_CHANGED_EVENT="config-changed",e([ve({type:Object})],Ue.prototype,"hass",void 0),e([ve()],Ue.prototype,"config",void 0),Ue=Ie=e([ge("time-picker-card-editor")],Ue);class De{constructor(e,t,i){this._value=e,this._step=t,this._limit=i}get value(){return this._value}setStringValue(e){this.isValidString(e)&&this.setValue(parseInt(e))}stepUpdate(e,t=this._step){e===Te.UP?this.increment(t):this.decrement(t)}toString(){return this.value<10?"0"+this.value:this.value.toString()}increment(e=this._step){this.setValue(this.value+e)}decrement(e=this._step){this.setValue(this.value-e)}setValue(e){isNaN(e)||((e>=this._limit||e<0)&&(e=(e+this._limit)%this._limit),this._value=e)}isValidString(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<this._limit}}class Le extends De{constructor(e,t=1,i){super(e,t,Le.VALUE_LIMIT),this.hourMode=i}get minValue(){return 12===this.hourMode?1:0}get maxValue(){return 12===this.hourMode?12:Le.VALUE_LIMIT-1}togglePeriod(){this.setValue(this.value+12)}toString(){let e;return 12===this.hourMode?(e=(this.value+12)%12,e=0===e?12:e):e=this.value,e<10?"0"+e:e.toString()}}Le.VALUE_LIMIT=24;class Re extends De{constructor(e,t=5){super(e,t,Re.VALUE_LIMIT),this.minValue=0,this.maxValue=Re.VALUE_LIMIT-1}willOverflow(e){const t=e===Te.UP?this.value+this._step:this.value-this._step;return t>=this._limit||t<0}}Re.VALUE_LIMIT=60;class Ye extends De{constructor(e,t=5){super(e,t,Ye.VALUE_LIMIT),this.minValue=0,this.maxValue=Ye.VALUE_LIMIT-1}willOverflow(e){const t=e===Te.UP?this.value+this._step:this.value-this._step;return t>=this._limit||t<0}}Ye.VALUE_LIMIT=60;class ze{constructor(e,t,i,n=!1){this.hour=e,this.minute=t,this.second=i,this._linkValues=n}hourStep(e){this.hour.stepUpdate(e)}minuteStep(e){this._linkValues&&this.minute.willOverflow(e)&&this.hour.stepUpdate(e,1),this.minute.stepUpdate(e)}secondStep(e){this._linkValues&&this.second.willOverflow(e)&&this.minute.stepUpdate(e,1),this.second.stepUpdate(e)}get value(){return`${this.hour.value}:${this.minute.value}:${this.second.value}`}}class Fe{static error(e,t){const i=document.createElement("hui-error-card");return i.setConfig({type:"error",error:e,origConfig:t}),se`${i}`}static headerName(e){return se`<div class="time-picker-header">${e}</div>`}static nestedName(e,t){return se`<state-badge .stateObj=${t}></state-badge>
      <div class="entity-name-inside">${e}</div>`}}console.info("%c  TIME-PICKER-CARD  \n%c  Version 1.1.1    ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"time-picker-card",name:"Time Picker Card",description:"A Time Picker card for setting the time value of Input Datetime entities."});let Be=class extends xe{get entity(){return this.hass.states[this.config.entity]}get isEmbedded(){var e;return!0===(null===(e=this.config.layout)||void 0===e?void 0:e.embedded)}get hasNameInHeader(){var e,t,i;return Boolean(this.name)&&!1===Boolean(null===(e=this.config.hide)||void 0===e?void 0:e.name)&&(null===(t=this.config.layout)||void 0===t?void 0:t.name)!==Me.Name.INSIDE&&!1===Boolean(null===(i=this.config.layout)||void 0===i?void 0:i.embedded)}get hasNameInside(){var e,t,i;return Boolean(this.name)&&!1===Boolean(null===(e=this.config.hide)||void 0===e?void 0:e.name)&&((null===(t=this.config.layout)||void 0===t?void 0:t.name)===Me.Name.INSIDE||Boolean(null===(i=this.config.layout)||void 0===i?void 0:i.embedded))}get name(){var e;return this.config.name||(null===(e=this.entity)||void 0===e?void 0:e.attributes.friendly_name)}get shouldShowPeriod(){return 12===this.config.hour_mode}get layoutAlign(){var e,t;return null!==(t=null===(e=this.config.layout)||void 0===e?void 0:e.align_controls)&&void 0!==t?t:He}get haCardClass(){return{embedded:this.isEmbedded}}get rowClass(){return{"time-picker-row":!0,"with-header-name":this.hasNameInHeader,embedded:this.isEmbedded}}get contentClass(){return{"time-picker-content":!0,["layout-"+this.layoutAlign]:!0}}render(){var e,t,i;if(!this.entity)return Fe.error("Entity not found",this.config);if("input_datetime"!==b(this.entity.entity_id))return Fe.error("You must set an input_datetime entity",this.config);if(!this.entity.attributes.has_time)return Fe.error("You must set an input_datetime entity that sets has_time: true",this.config);const{hour:n,minute:s,second:r}=this.entity.attributes,o=new Le(n,this.config.hour_step,this.config.hour_mode),a=new Re(s,this.config.minute_step),c=new Ye(r,this.config.second_step);return this.time=new ze(o,a,c,this.config.link_values),this.period=o.value>=12?ke.PM:ke.AM,se`
      <ha-card class=${Ne(this.haCardClass)}>
        ${this.hasNameInHeader?Fe.headerName(this.name):""}
        <div class=${Ne(this.rowClass)}>
          ${this.hasNameInside?Fe.nestedName(this.name,this.entity):""}

          <div class=${Ne(this.contentClass)}>
            <time-unit
              .unit=${this.time.hour}
              @stepChange=${this.onHourStepChange}
              @update=${this.callHassService}
            ></time-unit>
            <div class="time-separator">:</div>
            <time-unit
              .unit=${this.time.minute}
              @stepChange=${this.onMinuteStepChange}
              @update=${this.callHassService}
            ></time-unit>
            ${!1===(null===(e=this.config.hide)||void 0===e?void 0:e.seconds)?se`<div class="time-separator">:</div>
                  <time-unit
                    .unit=${this.time.second}
                    @stepChange=${this.onSecondStepChange}
                    @update=${this.callHassService}
                  ></time-unit>`:""}
            ${this.shouldShowPeriod?se`<time-period
                  .period=${this.period}
                  .mode=${null!==(i=null===(t=this.config.layout)||void 0===t?void 0:t.hour_mode)&&void 0!==i?i:"double"}
                  @toggle=${this.onPeriodToggle}
                ></time-period>`:""}
          </div>
        </div>
      </ha-card>
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");if(!e.entity)throw new Error("You must set an entity");if(e.hour_mode&&12!==e.hour_mode&&24!==e.hour_mode)throw new Error("Invalid hour_mode: select either 12 or 24");this.config=e}getCardSize(){return 3}onPeriodToggle(){this.time.hour.togglePeriod(),this.callHassService()}onHourStepChange(e){this.time.hourStep(e.detail.direction),this.callHassService()}onMinuteStepChange(e){this.time.minuteStep(e.detail.direction),this.callHassService()}onSecondStepChange(e){this.time.secondStep(e.detail.direction),this.callHassService()}callHassService(){if(!this.hass)throw new Error("Unable to update datetime");return this.hass.callService("input_datetime","set_datetime",{entity_id:this.entity.entity_id,time:this.time.value})}static get styles(){return be`
      :host {
        --tpc-elements-background-color: var(
          --time-picker-elements-background-color,
          var(--primary-color)
        );

        --tpc-icon-color: var(--time-picker-icon-color, var(--primary-text-color));
        --tpc-text-color: var(--time-picker-text-color, #fff);
        --tpc-accent-color: var(--time-picker-accent-color, var(--primary-color));
        --tpc-off-color: var(--time-picker-off-color, var(--disabled-text-color));

        --tpc-border-radius: var(--time-picker-border-radius, var(--ha-card-border-radius, 4px));
      }

      ha-card.embedded {
        box-shadow: none;
      }

      .time-picker-header {
        padding: 16px;
        color: var(--tpc-text-color);
        background-color: var(--tpc-elements-background-color);
        border-top-left-radius: var(--tpc-border-radius);
        border-top-right-radius: var(--tpc-border-radius);
        font-size: 1em;
        text-align: center;
      }

      .time-picker-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
      }

      .time-picker-row.embedded {
        padding: 0;
      }

      .time-picker-row.with-header-name {
        padding: 8px 16px 16px;
      }

      .time-picker-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1 0 auto;
      }

      .time-picker-content.layout-left {
        justify-content: flex-start;
      }

      .time-picker-content.layout-center {
        justify-content: center;
      }

      .time-picker-content.layout-right {
        justify-content: flex-end;
      }

      .entity-name-inside {
        margin-left: 16px;
      }
    `}static getStubConfig(e,t){return{entity:t.find(e=>"input_datetime"===b(e))||"input_datetime.example_entity",hour_mode:24,hour_step:1,minute_step:5}}static getConfigElement(){return document.createElement("time-picker-card-editor")}};e([ve({type:Object})],Be.prototype,"hass",void 0),e([ve()],Be.prototype,"config",void 0),e([ve()],Be.prototype,"time",void 0),e([ve()],Be.prototype,"period",void 0),Be=e([ge("time-picker-card")],Be);export{Be as TimePickerCard};
