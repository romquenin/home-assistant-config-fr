"use strict";function t(t,e){return o(t)||r(t,e)||s(t,e)||n()}function n(){throw new TypeError(
"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
function r(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,l=t[Symbol.iterator]();!(r=(
i=l.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==l.return||l.return()}finally{if(o)throw a}}
return n}}function o(t){if(Array.isArray(t))return t}function e(t){return l(t)||i(t)||s(t)||a()}function a(){throw new TypeError(
"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t){
if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return c(t)}function v(t,e){var n
;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=s(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,e=function(
){};return{s:e,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e}}throw new TypeError(
"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,
i=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){i=!0,o=t},f:function(){try{
a||null==n.return||n.return()}finally{if(i)throw o}}}}function s(t,e){if(t){if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t
).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t
):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,
r=new Array(e);n<e;n++)r[n]=t[n];return r}function w(t){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u,S,g,
A=document.querySelector("home-assistant"),y=A.shadowRoot.querySelector("home-assistant-main").shadowRoot,f=y.querySelector("partial-panel-resolver"),
x=0,E={},M=["APP-HEADER","HA-SLIDER","SWIPE-CARD","HUI-MAP-CARD","ROUND-SLIDER","XIAOMI-VACUUM-MAP-CARD","HA-SIDEBAR"];function p(){
var t=y.querySelector("ha-panel-lovelace");t&&(E={},d(t))}function d(e){x++;try{var t=e.lovelace.config;E=t.swipe_nav||{},
u=e.shadowRoot.querySelector("hui-root"),S=u.shadowRoot.querySelector("ha-app-layout"),g=S.querySelector('[id="view"]'),h()}catch(t){x<40&&setTimeout(
function(){return d(e)},50)}}function h(){x=0;var r,o,e,n,a,i,l,s,c=S.querySelector("paper-tabs")||S.querySelector("ha-tabs"),u=c?Array.from(
c.querySelectorAll("paper-tab")):[],t="rtl"==A.style.direction,y=null!=E.animate?E.animate:"none",f=null==E.wrap||E.wrap,
p=null!=E.prevent_default&&E.prevent_default,d=null!=E.swipe_amount?E.swipe_amount/Math.pow(10,2):.15,h=null==E.skip_hidden||E.skip_hidden,
b=null!=E.skip_tabs?String(E.skip_tabs).replace(/\s+/g,"").split(",").map(function(t){return parseInt(t,10)}):[];function m(t){var e,n
;0==a&&!f&&s||a==u.length-1&&!f&&!s||("swipe"==y?(e=(s?"":"-").concat(screen.width/1.5,"px"),n=(s?"-":"").concat(screen.width/1.5,"px"),
g.style.transitionDuration="200ms",g.style.opacity=0,g.style.transform="translate(".concat(e,", 0)"),
g.style.transition="transform 0.20s, opacity 0.18s",setTimeout(function(){u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})),
g.style.transitionDuration="0ms",g.style.transform="translate(".concat(n,", 0)"),g.style.transition="transform 0s"},210),setTimeout(function(){
g.style.transitionDuration="200ms",g.style.opacity=1,g.style.transform="translate(0px, 0)",g.style.transition="transform 0.20s, opacity 0.18s"},250)
):"fade"==y?(g.style.transitionDuration="200ms",g.style.transition="opacity 0.20s",g.style.opacity=0,setTimeout(function(){u[t].dispatchEvent(
new MouseEvent("click",{bubbles:!1,cancelable:!0})),g.style.transitionDuration="0ms",g.style.opacity=0,g.style.transition="opacity 0s"},210),
setTimeout(function(){g.style.transitionDuration="200ms",g.style.transition="opacity 0.20s",g.style.opacity=1},250)):"flip"==y?(
g.style.transitionDuration="200ms",g.style.transform="rotatey(90deg)",g.style.transition="transform 0.20s, opacity 0.20s",g.style.opacity=.25,
setTimeout(function(){u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))},210),setTimeout(function(){
g.style.transitionDuration="200ms",g.style.transform="rotatey(0deg)",g.style.transition="transform 0.20s, opacity 0.20s",g.style.opacity=1},250)
):u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})))}c&&(S.addEventListener("touchstart",function(t){if("object"==w(t.path)){
var e=v(t.path);try{for(e.s();!(n=e.n()).done;){var n=n.value;if("HUI-VIEW"==n.nodeName)break;if(-1<M.indexOf(n.nodeName))return}}catch(t){e.e(t)
}finally{e.f()}}r=t.touches[0].clientX,o=t.touches[0].clientY,l||(u=h?u.filter(function(t){return!b.includes(u.indexOf(t))&&"none"!=getComputedStyle(t
,null).display}):u.filter(function(t){return!b.includes(u.indexOf(t))}),i=f?0:null,l=f?u.length-1:null);a=u.indexOf(c.querySelector(".iron-selected"))
},{passive:!0}),S.addEventListener("touchmove",function(t){r&&o&&(e=r-t.touches[0].clientX,n=o-t.touches[0].clientY,Math.abs(e)>Math.abs(n
)&&p&&t.preventDefault())},{passive:!1}),S.addEventListener("touchend",function(){if(a<0||Math.abs(e)<Math.abs(n))return void(r=o=e=n=null);t&&(e=-e)
;e>Math.abs(screen.width*d)?(s=!1,a==u.length-1?m(i):m(a+1)):e<-Math.abs(screen.width*d)&&(s=!0,m(0==a?l:a-1));t&&(s=!s);r=o=e=n=null},{passive:!0}),
"swipe"==y&&(S.style.overflow="hidden"))}function b(t){I(t,"ha-panel-lovelace",m)}function m(t){I(t,"hui-root",D)}function D(t){I(t,"ha-app-layout",
null)}function I(t,e,n){var r,o=v(t);try{for(o.s();!(r=o.n()).done;){var a=v(r.value.addedNodes);try{for(a.s();!(i=a.n()).done;){var i=i.value;if(
i.localName==e)return void(n?new MutationObserver(n).observe(i.shadowRoot,{childList:!0}):p())}}catch(t){a.e(t)}finally{a.f()}}}catch(t){o.e(t)
}finally{o.f()}}p(),new MutationObserver(b).observe(f,{childList:!0});for(var O={header:"%c≡ swipe-navigation".padEnd(27),ver:"%cversion 1.3.5 "},
R="%c\n",k=Math.max.apply(Math,e(Object.values(O).map(function(t){return t.length}))),q=0,j=Object.entries(O);q<j.length;q++){var T=t(j[q],1),_=T[0]
;O[_].length<=k&&(O[_]=O[_].padEnd(k)),"header"==_&&(O[_]="".concat(O[_].slice(0,-1),"⋮ "))}
var L="display:inline-block;border-width:1px 1px 0 1px;border-style:solid;border-color:#424242;color:white;background:#03a9f4;font-size:12px;padding:4px 4.5px 5px 6px;"
,C="border-width:0px 1px 1px 1px;padding:7px;background:white;color:#424242;line-height:0.7;";console.info(O.header+R+O.ver,L,"","".concat(L," "
).concat(C));