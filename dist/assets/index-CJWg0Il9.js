(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Ro=()=>{};var $s={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw He(e)},He=function(n){return new Error("Firebase Database ("+Bi.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ko=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},jn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(d=64)),s.push(t[h],t[u],t[d],t[p])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wi(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ko(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new Ao;const d=r<<2|a>>4;if(s.push(d),c!==64){const p=a<<4&240|c>>2;if(s.push(p),u!==64){const m=c<<6&192|u;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ao extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hi=function(n){const e=Wi(n);return jn.encodeByteArray(e,!0)},At=function(n){return Hi(n).replace(/\./g,"")},Tn=function(n){try{return jn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n){return Ui(void 0,n)}function Ui(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Do(t)||(n[t]=Ui(n[t],e[t]));return n}function Do(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo=()=>Lo().__FIREBASE_DEFAULTS__,Oo=()=>{if(typeof process>"u"||typeof $s>"u")return;const n=$s.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fo=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Tn(n[1]);return e&&JSON.parse(e)},Vi=()=>{try{return Ro()||Mo()||Oo()||Fo()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$o=n=>{var e,t;return(t=(e=Vi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Bo=n=>{const e=$o(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},zi=()=>{var n;return(n=Vi())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[At(JSON.stringify(t)),At(JSON.stringify(o)),""].join(".")}const Xe={};function Uo(){const n={prod:[],emulator:[]};for(const e of Object.keys(Xe))Xe[e]?n.emulator.push(e):n.prod.push(e);return n}function Vo(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Bs=!1;function zo(n,e){if(typeof window>"u"||typeof document>"u"||!qn(window.location.host)||Xe[n]===e||Xe[n]||Bs)return;Xe[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=Uo().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,p){d.setAttribute("width","24"),d.setAttribute("id",p),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Bs=!0,o()},d}function h(d,p){d.setAttribute("id",p),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=Vo(s),p=t("text"),m=document.getElementById(p)||document.createElement("span"),C=t("learnmore"),R=document.getElementById(C)||document.createElement("a"),se=t("preprendIcon"),ie=document.getElementById(se)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const ye=d.element;a(ye),h(R,C);const fn=c();l(ie,se),ye.append(ie,m,R,fn),document.body.appendChild(ye)}r?(m.innerText="Preview backend disconnected.",ie.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ie.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,m.innerText="Preview backend running in this workspace."),m.setAttribute("id",p)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ji(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(jo())}function qo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Go(){return Bi.NODE_ADMIN===!0}function Qo(){try{return typeof indexedDB=="object"}catch{return!1}}function Yo(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko="FirebaseError";class mt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ko,Object.setPrototypeOf(this,mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qi.prototype.create)}}class qi{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Xo(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new mt(i,a,s)}}function Xo(n,e){return n.replace(Jo,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Jo=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n){return JSON.parse(n)}function k(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=st(Tn(r[0])||""),t=st(Tn(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},Zo=function(n){const e=Gi(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ea=function(n){const e=Gi(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Fe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ws(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Pt(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Dt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Hs(r)&&Hs(o)){if(!Dt(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Hs(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const d=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(i<<5|i>>>27)+c+l+h+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Gn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,f(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Kt=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(n){return n&&n._delegate?n._delegate:n}class it{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Yt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(oa(e))try{this.getOrInitializeService({instanceIdentifier:be})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=be){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=be){return this.instances.has(e)}getOptions(e=be){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){var s;const i=this.normalizeInstanceIdentifier(t),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:ra(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=be){return this.component?this.component.multipleInstances?e:be:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ra(n){return n===be?void 0:n}function oa(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ia(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const la={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},ca=S.INFO,da={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},ua=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=da[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Qi{constructor(e){this.name=e,this._logLevel=ca,this._logHandler=ua,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?la[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const ha=(n,e)=>e.some(t=>n instanceof t);let Us,Vs;function fa(){return Us||(Us=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pa(){return Vs||(Vs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yi=new WeakMap,Nn=new WeakMap,Ki=new WeakMap,pn=new WeakMap,Qn=new WeakMap;function ma(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ue(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Yi.set(t,n)}).catch(()=>{}),Qn.set(e,n),e}function _a(n){if(Nn.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Nn.set(n,e)}let xn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Nn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ki.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ue(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ga(n){xn=n(xn)}function va(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(mn(this),e,...t);return Ki.set(s,e.sort?e.sort():[e]),ue(s)}:pa().includes(n)?function(...e){return n.apply(mn(this),e),ue(Yi.get(this))}:function(...e){return ue(n.apply(mn(this),e))}}function ya(n){return typeof n=="function"?va(n):(n instanceof IDBTransaction&&_a(n),ha(n,fa())?new Proxy(n,xn):n)}function ue(n){if(n instanceof IDBRequest)return ma(n);if(pn.has(n))return pn.get(n);const e=ya(n);return e!==n&&(pn.set(n,e),Qn.set(e,n)),e}const mn=n=>Qn.get(n);function ba(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=ue(o);return s&&o.addEventListener("upgradeneeded",l=>{s(ue(o.result),l.oldVersion,l.newVersion,ue(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ea=["get","getKey","getAll","getAllKeys","count"],Ca=["put","add","delete","clear"],_n=new Map;function zs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(_n.get(e))return _n.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Ca.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Ea.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return _n.set(e,r),r}ga(n=>({...n,get:(e,t,s)=>zs(e,t)||n.get(e,t,s),has:(e,t)=>!!zs(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ia(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Ia(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rn="@firebase/app",js="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae=new Qi("@firebase/app"),Sa="@firebase/app-compat",Ta="@firebase/analytics-compat",Na="@firebase/analytics",xa="@firebase/app-check-compat",Ra="@firebase/app-check",ka="@firebase/auth",Aa="@firebase/auth-compat",Pa="@firebase/database",Da="@firebase/data-connect",La="@firebase/database-compat",Ma="@firebase/functions",Oa="@firebase/functions-compat",Fa="@firebase/installations",$a="@firebase/installations-compat",Ba="@firebase/messaging",Wa="@firebase/messaging-compat",Ha="@firebase/performance",Ua="@firebase/performance-compat",Va="@firebase/remote-config",za="@firebase/remote-config-compat",ja="@firebase/storage",qa="@firebase/storage-compat",Ga="@firebase/firestore",Qa="@firebase/ai",Ya="@firebase/firestore-compat",Ka="firebase",Xa="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn="[DEFAULT]",Ja={[Rn]:"fire-core",[Sa]:"fire-core-compat",[Na]:"fire-analytics",[Ta]:"fire-analytics-compat",[Ra]:"fire-app-check",[xa]:"fire-app-check-compat",[ka]:"fire-auth",[Aa]:"fire-auth-compat",[Pa]:"fire-rtdb",[Da]:"fire-data-connect",[La]:"fire-rtdb-compat",[Ma]:"fire-fn",[Oa]:"fire-fn-compat",[Fa]:"fire-iid",[$a]:"fire-iid-compat",[Ba]:"fire-fcm",[Wa]:"fire-fcm-compat",[Ha]:"fire-perf",[Ua]:"fire-perf-compat",[Va]:"fire-rc",[za]:"fire-rc-compat",[ja]:"fire-gcs",[qa]:"fire-gcs-compat",[Ga]:"fire-fst",[Ya]:"fire-fst-compat",[Qa]:"fire-vertex","fire-js":"fire-js",[Ka]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=new Map,Za=new Map,An=new Map;function qs(n,e){try{n.container.addComponent(e)}catch(t){ae.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Mt(n){const e=n.name;if(An.has(e))return ae.debug(`There were multiple attempts to register component ${e}.`),!1;An.set(e,n);for(const t of Lt.values())qs(t,n);for(const t of Za.values())qs(t,n);return!0}function el(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function tl(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},he=new qi("app","Firebase",nl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new it("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw he.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=Xa;function Xi(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:kn,automaticDataCollectionEnabled:!0},e),i=s.name;if(typeof i!="string"||!i)throw he.create("bad-app-name",{appName:String(i)});if(t||(t=zi()),!t)throw he.create("no-options");const r=Lt.get(i);if(r){if(Dt(t,r.options)&&Dt(s,r.config))return r;throw he.create("duplicate-app",{appName:i})}const o=new aa(i);for(const l of An.values())o.addComponent(l);const a=new sl(t,s,o);return Lt.set(i,a),a}function rl(n=kn){const e=Lt.get(n);if(!e&&n===kn&&zi())return Xi();if(!e)throw he.create("no-app",{appName:n});return e}function Me(n,e,t){var s;let i=(s=Ja[n])!==null&&s!==void 0?s:n;t&&(i+=`-${t}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ae.warn(a.join(" "));return}Mt(new it(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="firebase-heartbeat-database",al=1,rt="firebase-heartbeat-store";let gn=null;function Ji(){return gn||(gn=ba(ol,al,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(rt)}catch(t){console.warn(t)}}}}).catch(n=>{throw he.create("idb-open",{originalErrorMessage:n.message})})),gn}async function ll(n){try{const t=(await Ji()).transaction(rt),s=await t.objectStore(rt).get(Zi(n));return await t.done,s}catch(e){if(e instanceof mt)ae.warn(e.message);else{const t=he.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ae.warn(t.message)}}}async function Gs(n,e){try{const s=(await Ji()).transaction(rt,"readwrite");await s.objectStore(rt).put(e,Zi(n)),await s.done}catch(t){if(t instanceof mt)ae.warn(t.message);else{const s=he.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ae.warn(s.message)}}}function Zi(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl=1024,dl=30;class ul{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new fl(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Qs();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>dl){const o=pl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ae.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Qs(),{heartbeatsToSend:s,unsentEntries:i}=hl(this._heartbeatsCache.heartbeats),r=At(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return ae.warn(t),""}}}function Qs(){return new Date().toISOString().substring(0,10)}function hl(n,e=cl){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Ys(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ys(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class fl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qo()?Yo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ll(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ys(n){return At(JSON.stringify({version:2,heartbeats:n})).length}function pl(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ml(n){Mt(new it("platform-logger",e=>new wa(e),"PRIVATE")),Mt(new it("heartbeat",e=>new ul(e),"PRIVATE")),Me(Rn,js,n),Me(Rn,js,"esm2017"),Me("fire-js","")}ml("");var _l="firebase",gl="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me(_l,gl,"app");var Ks={};const Xs="@firebase/database",Js="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let er="";function vl(n){er=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),k(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:st(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return te(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new yl(e)}}catch{}return new bl},Ce=tr("localStorage"),El=tr("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=new Qi("@firebase/database"),Cl=(function(){let n=1;return function(){return n++}})(),nr=function(n){const e=sa(n),t=new na;t.update(e);const s=t.digest();return jn.encodeByteArray(s)},_t=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=_t.apply(null,s):typeof s=="object"?e+=k(s):e+=s,e+=" "}return e};let Je=null,Zs=!0;const wl=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Oe.logLevel=S.VERBOSE,Je=Oe.log.bind(Oe)},W=function(...n){if(Zs===!0&&(Zs=!1,Je===null&&El.get("logging_enabled")===!0&&wl()),Je){const e=_t.apply(null,n);Je(e)}},gt=function(n){return function(...e){W(n,...e)}},Pn=function(...n){const e="FIREBASE INTERNAL ERROR: "+_t(...n);Oe.error(e)},le=function(...n){const e=`FIREBASE FATAL ERROR: ${_t(...n)}`;throw Oe.error(e),new Error(e)},j=function(...n){const e="FIREBASE WARNING: "+_t(...n);Oe.warn(e)},Il=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&j("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Yn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Sl=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ne="[MIN_NAME]",me="[MAX_NAME]",Ue=function(n,e){if(n===e)return 0;if(n===Ne||e===me)return-1;if(e===Ne||n===me)return 1;{const t=ei(n),s=ei(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Tl=function(n,e){return n===e?0:n<e?-1:1},qe=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+k(e))},Kn=function(n){if(typeof n!="object"||n===null)return k(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=k(e[s]),t+=":",t+=Kn(n[e[s]]);return t+="}",t},sr=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function q(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const ir=function(n){f(!Yn(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},Nl=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},xl=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Rl(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const kl=new RegExp("^-?(0*)\\d{1,10}$"),Al=-2147483648,Pl=2147483647,ei=function(n){if(kl.test(n)){const e=Number(n);if(e>=Al&&e<=Pl)return e}return null},Ve=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw j("Exception was thrown by user callback.",t),e},Math.floor(0))}},Dl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ze=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,tl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){j(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(W("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',j(e)}}class xt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}xt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="5",rr="v",or="s",ar="r",lr="f",cr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,dr="ls",ur="p",Dn="ac",hr="websocket",fr="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ce.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ce.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Ol(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function mr(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let s;if(e===hr)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===fr)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ol(n)&&(t.ns=n.namespace);const i=[];return q(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(){this.counters_={}}incrementCounter(e,t=1){te(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Po(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn={},yn={};function Jn(n){const e=n.toString();return vn[e]||(vn[e]=new Fl),vn[e]}function $l(n,e){const t=n.toString();return yn[t]||(yn[t]=e()),yn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Ve(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="start",Wl="close",Hl="pLPCommand",Ul="pRTLPCB",_r="id",gr="pw",vr="ser",Vl="cb",zl="seg",jl="ts",ql="d",Gl="dframe",yr=1870,br=30,Ql=yr-br,Yl=25e3,Kl=3e4;class Le{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=gt(e),this.stats_=Jn(t),this.urlFn=l=>(this.appCheckToken&&(l[Dn]=this.appCheckToken),mr(t,fr,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Bl(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Kl)),Sl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Zn((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ti)this.id=a,this.password=l;else if(o===Wl)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[ti]="t",s[vr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Vl]=this.scriptTagHolder.uniqueCallbackIdentifier),s[rr]=Xn,this.transportSessionId&&(s[or]=this.transportSessionId),this.lastSessionId&&(s[dr]=this.lastSessionId),this.applicationId&&(s[ur]=this.applicationId),this.appCheckToken&&(s[Dn]=this.appCheckToken),typeof location<"u"&&location.hostname&&cr.test(location.hostname)&&(s[ar]=lr);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Le.forceAllow_=!0}static forceDisallow(){Le.forceDisallow_=!0}static isAvailable(){return Le.forceAllow_?!0:!Le.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Nl()&&!xl()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=k(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Hi(t),i=sr(s,Ql);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[Gl]="t",s[_r]=e,s[gr]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=k(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Zn{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Cl(),window[Hl+this.uniqueCallbackIdentifier]=e,window[Ul+this.uniqueCallbackIdentifier]=t,this.myIFrame=Zn.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){W("frame writing exception"),a.stack&&W(a.stack),W(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||W("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[_r]=this.myID,e[gr]=this.myPW,e[vr]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+br+s.length<=yr;){const o=this.pendingSegs.shift();s=s+"&"+zl+i+"="+o.seg+"&"+jl+i+"="+o.ts+"&"+ql+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(Yl)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{W("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=16384,Jl=45e3;let Ot=null;typeof MozWebSocket<"u"?Ot=MozWebSocket:typeof WebSocket<"u"&&(Ot=WebSocket);class Y{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=gt(this.connId),this.stats_=Jn(t),this.connURL=Y.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[rr]=Xn,typeof location<"u"&&location.hostname&&cr.test(location.hostname)&&(o[ar]=lr),t&&(o[or]=t),s&&(o[dr]=s),i&&(o[Dn]=i),r&&(o[ur]=r),mr(e,hr,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ce.set("previous_websocket_failure",!0);try{let s;Go(),this.mySock=new Ot(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Y.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Ot!==null&&!Y.forceDisallow_}static previouslyFailed(){return Ce.isInMemoryStorage||Ce.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ce.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=st(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=k(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=sr(t,Xl);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Jl))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Y.responsesRequiredToBeHealthy=2;Y.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{static get ALL_TRANSPORTS(){return[Le,Y]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Y&&Y.isAvailable();let s=t&&!Y.previouslyFailed();if(e.webSocketOnly&&(t||j("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Y];else{const i=this.transports_=[];for(const r of ot.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);ot.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ot.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=6e4,ec=5e3,tc=10*1024,nc=100*1024,bn="t",ni="d",sc="s",si="r",ic="e",ii="o",ri="a",oi="n",ai="p",rc="h";class oc{constructor(e,t,s,i,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=gt("c:"+this.id+":"),this.transportManager_=new ot(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ze(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>nc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>tc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(bn in e){const t=e[bn];t===ri?this.upgradeIfSecondaryHealthy_():t===si?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ii&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=qe("t",e),s=qe("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ai,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ri,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:oi,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=qe("t",e),s=qe("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=qe(bn,e);if(ni in e){const s=e[ni];if(t===rc){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===oi){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===sc?this.onConnectionShutdown_(s):t===si?this.onReset_(s):t===ic?Pn("Server Error: "+s):t===ii?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Pn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xn!==s&&j("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Ze(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Zl))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ze(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ec))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ai,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ce.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Cr{static getInstance(){return new Ft}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ji()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li=32,ci=768;class I{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new I("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function _e(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new I(n.pieces_,e)}function wr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function ac(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ir(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Sr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new I(e,0)}function A(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof I)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new I(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function U(n,e){const t=g(n),s=g(e);if(t===null)return e;if(t===s)return U(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function es(n,e){if(_e(n)!==_e(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function K(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(_e(n)>_e(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class lc{constructor(e,t){this.errorPrefix_=t,this.parts_=Ir(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Kt(this.parts_[s]);Tr(this)}}function cc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Kt(e),Tr(n)}function dc(n){const e=n.parts_.pop();n.byteLength_-=Kt(e),n.parts_.length>0&&(n.byteLength_-=1)}function Tr(n){if(n.byteLength_>ci)throw new Error(n.errorPrefix_+"has a key path longer than "+ci+" bytes ("+n.byteLength_+").");if(n.parts_.length>li)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+li+") or object contains a cycle "+Ee(n))}function Ee(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts extends Cr{static getInstance(){return new ts}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge=1e3,uc=300*1e3,di=30*1e3,hc=1.3,fc=3e4,pc="server_kill",ui=3;class oe extends Er{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=oe.nextPersistentConnectionId_++,this.log_=gt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ge,this.maxReconnectDelay_=uc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ts.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ft.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(k(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Yt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;oe.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&te(e,"w")){const s=Fe(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();j(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ea(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=di)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zo(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+k(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Pn("Unrecognized action received from server: "+k(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>fc&&(this.reconnectDelay_=Ge),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*hc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+oe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?W("getToken() completed but was canceled"):(W("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new oc(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,p=>{j(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(pc)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&j(u),l())}}}interrupt(e){W("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){W("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ws(this.interruptReasons_)&&(this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>Kn(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new I(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){W("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ui&&(this.reconnectDelay_=di,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){W("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ui&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+er.replace(/\./g,"-")]=1,ji()?e["framework.cordova"]=1:qo()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ft.getInstance().currentlyOnline();return Ws(this.interruptReasons_)&&e}}oe.nextPersistentConnectionId_=0;oe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new y(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new y(Ne,e),i=new y(Ne,t);return this.compare(s,i)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let St;class Nr extends Xt{static get __EMPTY_NODE(){return St}static set __EMPTY_NODE(e){St=e}compare(e,t){return Ue(e.name,t.name)}isDefinedOn(e){throw He("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(me,St)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,St)}toString(){return".key"}}const Te=new Nr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class D{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??D.RED,this.left=i??z.EMPTY_NODE,this.right=r??z.EMPTY_NODE}copy(e,t,s,i,r){return new D(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return z.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return z.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,D.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,D.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}D.RED=!0;D.BLACK=!1;class mc{copy(e,t,s,i,r){return this}insert(e,t,s){return new D(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class z{constructor(e,t=z.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new z(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,D.BLACK,null,null))}remove(e){return new z(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,D.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Tt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Tt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Tt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Tt(this.root_,null,this.comparator_,!0,e)}}z.EMPTY_NODE=new mc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(n,e){return Ue(n.name,e.name)}function ns(n,e){return Ue(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ln;function gc(n){Ln=n}const xr=function(n){return typeof n=="number"?"number:"+ir(n):"string:"+n},Rr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&te(e,".sv"),"Priority must be a string or number.")}else f(n===Ln||n.isEmpty(),"priority of unexpected type.");f(n===Ln||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;class P{static set __childrenNodeConstructor(e){hi=e}static get __childrenNodeConstructor(){return hi}constructor(e,t=P.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Rr(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new P(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:P.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:g(e)===".priority"?this.priorityNode_:P.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:P.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=g(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(f(s!==".priority"||_e(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,P.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+xr(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=ir(this.value_):e+=this.value_,this.lazyHash_=nr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===P.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof P.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=P.VALUE_TYPE_ORDER.indexOf(t),r=P.VALUE_TYPE_ORDER.indexOf(s);return f(i>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}P.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kr,Ar;function vc(n){kr=n}function yc(n){Ar=n}class bc extends Xt{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Ue(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(me,new P("[PRIORITY-POST]",Ar))}makePost(e,t){const s=kr(e);return new y(t,new P("[PRIORITY-POST]",s))}toString(){return".priority"}}const x=new bc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec=Math.log(2);class Cc{constructor(e){const t=r=>parseInt(Math.log(r)/Ec,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $t=function(n,e,t,s){n.sort(e);const i=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=n[l],d=t?t(u):u,new D(d,u.node,D.BLACK,null,null);{const p=parseInt(h/2,10)+l,m=i(l,p),C=i(p+1,c);return u=n[p],d=t?t(u):u,new D(d,u.node,D.BLACK,m,C)}},r=function(l){let c=null,h=null,u=n.length;const d=function(m,C){const R=u-m,se=u;u-=m;const ie=i(R+1,se),ye=n[R],fn=t?t(ye):ye;p(new D(fn,ye.node,C,null,ie))},p=function(m){c?(c.left=m,c=m):(h=m,c=m)};for(let m=0;m<l.count;++m){const C=l.nextBitIsOne(),R=Math.pow(2,l.count-(m+1));C?d(R,D.BLACK):(d(R,D.BLACK),d(R,D.RED))}return h},o=new Cc(n.length),a=r(o);return new z(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En;const De={};class re{static get Default(){return f(De&&x,"ChildrenNode.ts has not been loaded"),En=En||new re({".priority":De},{".priority":x}),En}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Fe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof z?t:null}hasIndex(e){return te(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Te,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=$t(s,e.getCompare()):a=De;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new re(h,c)}addToIndexes(e,t){const s=Pt(this.indexes_,(i,r)=>{const o=Fe(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),i===De)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),$t(a,o.getCompare())}else return De;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new re(s,this.indexSet_)}removeFromIndexes(e,t){const s=Pt(this.indexes_,i=>{if(i===De)return i;{const r=t.get(e.name);return r?i.remove(new y(e.name,r)):i}});return new re(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qe;class _{static get EMPTY_NODE(){return Qe||(Qe=new _(new z(ns),null,re.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Rr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Qe}updatePriority(e){return this.children_.isEmpty()?this:new _(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Qe:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new y(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Qe:this.priorityNode_;return new _(i,o,r)}}updateChild(e,t){const s=g(e);if(s===null)return t;{f(g(e)!==".priority"||_e(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(T(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(x,(o,a)=>{t[o]=a.val(e),s++,r&&_.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+xr(this.getPriority().val())+":"),this.forEachChild(x,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":nr(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===vt?-1:0}withIndex(e){if(e===Te||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new _(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Te||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(x),i=t.getIterator(x);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Te?null:this.indexMap_.get(e.toString())}}_.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class wc extends _{constructor(){super(new z(ns),_.EMPTY_NODE,re.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return _.EMPTY_NODE}isEmpty(){return!1}}const vt=new wc;Object.defineProperties(y,{MIN:{value:new y(Ne,_.EMPTY_NODE)},MAX:{value:new y(me,vt)}});Nr.__EMPTY_NODE=_.EMPTY_NODE;P.__childrenNodeConstructor=_;gc(vt);yc(vt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic=!0;function L(n,e=null){if(n===null)return _.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new P(t,L(e))}if(!(n instanceof Array)&&Ic){const t=[];let s=!1;if(q(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=L(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new y(o,l)))}}),t.length===0)return _.EMPTY_NODE;const r=$t(t,_c,o=>o.name,ns);if(s){const o=$t(t,x.getCompare());return new _(r,L(e),new re({".priority":o},{".priority":x}))}else return new _(r,L(e),re.Default)}else{let t=_.EMPTY_NODE;return q(n,(s,i)=>{if(te(n,s)&&s.substring(0,1)!=="."){const r=L(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(L(e))}}vc(L);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss extends Xt{constructor(e){super(),this.indexPath_=e,f(!v(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Ue(e.name,t.name):r}makePost(e,t){const s=L(e),i=_.EMPTY_NODE.updateChild(this.indexPath_,s);return new y(t,i)}maxPost(){const e=_.EMPTY_NODE.updateChild(this.indexPath_,vt);return new y(me,e)}toString(){return Ir(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc extends Xt{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ue(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const s=L(e);return new y(t,s)}toString(){return".value"}}const Pr=new Sc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(n){return{type:"value",snapshotNode:n}}function $e(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function at(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function lt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Tc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(at(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange($e(t,s)):o.trackChildChange(lt(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(x,(i,r)=>{t.hasChild(i)||s.trackChildChange(at(i,r))}),t.isLeafNode()||t.forEachChild(x,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(lt(i,r,o))}else s.trackChildChange($e(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?_.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.indexedFilter_=new is(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ct.getStartPost_(e),this.endPost_=ct.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new y(t,s))||(s=_.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=_.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(_.EMPTY_NODE);const r=this;return t.forEachChild(x,(o,a)=>{r.matches(new y(o,a))||(i=i.updateImmediateChild(o,_.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new ct(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new y(t,s))||(s=_.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=_.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=_.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(_.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,_.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,p)=>u(p,d)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const p=d==null?1:o(d,l);if(h&&!s.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(lt(t,s,u)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(at(t,u));const C=a.updateImmediateChild(t,_.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange($e(d.name,d.node)),C.updateImmediateChild(d.name,d.node)):C}}else return s.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(at(c.name,c.node)),r.trackChildChange($e(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,_.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=x}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ne}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:me}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===x}copy(){const e=new rs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function xc(n){return n.loadsAllData()?new is(n.getIndex()):n.hasLimit()?new Nc(n):new ct(n)}function Rc(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function kc(n,e){const t=n.copy();return t.index_=e,t}function fi(n){const e={};if(n.isDefault())return e;let t;if(n.index_===x?t="$priority":n.index_===Pr?t="$value":n.index_===Te?t="$key":(f(n.index_ instanceof ss,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=k(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=k(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+k(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=k(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+k(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function pi(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==x&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Er{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=gt("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Bt.getListenId_(e,s),a={};this.listens_[o]=a;const l=fi(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),Fe(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=Bt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=fi(e._queryParams),s=e._path.toString(),i=new Yt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ta(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=st(a.responseText)}catch{j("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&j("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(){this.rootNode_=_.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(){return{value:null,children:new Map}}function Lr(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=g(e);n.children.has(s)||n.children.set(s,Wt());const i=n.children.get(s);e=T(e),Lr(i,e,t)}}function Mn(n,e,t){n.value!==null?t(e,n.value):Pc(n,(s,i)=>{const r=new I(e.toString()+"/"+s);Mn(i,r,t)})}function Pc(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&q(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi=10*1e3,Lc=30*1e3,Mc=300*1e3;class Oc{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Dc(e);const s=mi+(Lc-mi)*Math.random();Ze(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;q(e,(i,r)=>{r>0&&te(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Ze(this.reportStats_.bind(this),Math.floor(Math.random()*2*Mc))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(X||(X={}));function Mr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function os(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function as(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=X.ACK_USER_WRITE,this.source=Mr()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new I(e));return new Ht(E(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Ht(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t){this.source=e,this.path=t,this.type=X.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new dt(this.source,E()):new dt(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=X.OVERWRITE}operationForChild(e){return v(this.path)?new xe(this.source,E(),this.snap.getImmediateChild(e)):new xe(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=X.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new I(e));return t.isEmpty()?null:t.value?new xe(this.source,E(),t.value):new ut(this.source,E(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ut(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function $c(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Tc(o.childName,o.snapshotNode))}),Ye(n,i,"child_removed",e,s,t),Ye(n,i,"child_added",e,s,t),Ye(n,i,"child_moved",r,s,t),Ye(n,i,"child_changed",e,s,t),Ye(n,i,"value",e,s,t),i}function Ye(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Wc(n,a,l)),o.forEach(a=>{const l=Bc(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Bc(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Wc(n,e,t){if(e.childName==null||t.childName==null)throw He("Should only compare child_ events.");const s=new y(e.childName,e.snapshotNode),i=new y(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(n,e){return{eventCache:n,serverCache:e}}function et(n,e,t,s){return Jt(new ge(e,t,s),n.serverCache)}function Or(n,e,t,s){return Jt(n.eventCache,new ge(e,t,s))}function Ut(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Re(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cn;const Hc=()=>(Cn||(Cn=new z(Tl)),Cn);class N{static fromObject(e){let t=new N(null);return q(e,(s,i)=>{t=t.set(new I(s),i)}),t}constructor(e,t=Hc()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const s=g(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new I(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=g(e),s=this.children.get(t);return s!==null?s.subtree(T(e)):new N(null)}}set(e,t){if(v(e))return new N(t,this.children);{const s=g(e),r=(this.children.get(s)||new N(null)).set(T(e),t),o=this.children.insert(s,r);return new N(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new N(null):new N(null,this.children);{const t=g(e),s=this.children.get(t);if(s){const i=s.remove(T(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new N(null):new N(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=g(e),s=this.children.get(t);return s?s.get(T(e)):null}}setTree(e,t){if(v(e))return t;{const s=g(e),r=(this.children.get(s)||new N(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new N(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(A(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(v(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,s){if(v(e))return this;{this.value&&s(t,this.value);const i=g(e),r=this.children.get(i);return r?r.foreachOnPath_(T(e),A(t,i),s):new N(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(A(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.writeTree_=e}static empty(){return new J(new N(null))}}function tt(n,e,t){if(v(e))return new J(new N(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=U(i,e);return r=r.updateChild(o,t),new J(n.writeTree_.set(i,r))}else{const i=new N(t),r=n.writeTree_.setTree(e,i);return new J(r)}}}function _i(n,e,t){let s=n;return q(t,(i,r)=>{s=tt(s,A(e,i),r)}),s}function gi(n,e){if(v(e))return J.empty();{const t=n.writeTree_.setTree(e,new N(null));return new J(t)}}function On(n,e){return Ae(n,e)!=null}function Ae(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(U(t.path,e)):null}function vi(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(x,(s,i)=>{e.push(new y(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new y(s,i.value))}),e}function fe(n,e){if(v(e))return n;{const t=Ae(n,e);return t!=null?new J(new N(t)):new J(n.writeTree_.subtree(e))}}function Fn(n){return n.writeTree_.isEmpty()}function Be(n,e){return Fr(E(),n.writeTree_,e)}function Fr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Fr(A(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(A(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(n,e){return Hr(e,n)}function Uc(n,e,t,s,i){f(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=tt(n.visibleWrites,e,t)),n.lastWriteId=s}function Vc(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function zc(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&jc(a,s.path)?i=!1:K(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return qc(n),!0;if(s.snap)n.visibleWrites=gi(n.visibleWrites,s.path);else{const a=s.children;q(a,l=>{n.visibleWrites=gi(n.visibleWrites,A(s.path,l))})}return!0}else return!1}function jc(n,e){if(n.snap)return K(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&K(A(n.path,t),e))return!0;return!1}function qc(n){n.visibleWrites=$r(n.allWrites,Gc,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Gc(n){return n.visible}function $r(n,e,t){let s=J.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)K(t,o)?(a=U(t,o),s=tt(s,a,r.snap)):K(o,t)&&(a=U(o,t),s=tt(s,E(),r.snap.getChild(a)));else if(r.children){if(K(t,o))a=U(t,o),s=_i(s,a,r.children);else if(K(o,t))if(a=U(o,t),v(a))s=_i(s,E(),r.children);else{const l=Fe(r.children,g(a));if(l){const c=l.getChild(T(a));s=tt(s,E(),c)}}}else throw He("WriteRecord should have .snap or .children")}}return s}function Br(n,e,t,s,i){if(!s&&!i){const r=Ae(n.visibleWrites,e);if(r!=null)return r;{const o=fe(n.visibleWrites,e);if(Fn(o))return t;if(t==null&&!On(o,E()))return null;{const a=t||_.EMPTY_NODE;return Be(o,a)}}}else{const r=fe(n.visibleWrites,e);if(!i&&Fn(r))return t;if(!i&&t==null&&!On(r,E()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(K(c.path,e)||K(e,c.path))},a=$r(n.allWrites,o,e),l=t||_.EMPTY_NODE;return Be(a,l)}}}function Qc(n,e,t){let s=_.EMPTY_NODE;const i=Ae(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(x,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=fe(n.visibleWrites,e);return t.forEachChild(x,(o,a)=>{const l=Be(fe(r,new I(o)),a);s=s.updateImmediateChild(o,l)}),vi(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=fe(n.visibleWrites,e);return vi(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Yc(n,e,t,s,i){f(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(On(n.visibleWrites,r))return null;{const o=fe(n.visibleWrites,r);return Fn(o)?i.getChild(t):Be(o,i.getChild(t))}}function Kc(n,e,t,s){const i=A(e,t),r=Ae(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=fe(n.visibleWrites,i);return Be(o,s.getNode().getImmediateChild(t))}else return null}function Xc(n,e){return Ae(n.visibleWrites,e)}function Jc(n,e,t,s,i,r,o){let a;const l=fe(n.visibleWrites,e),c=Ae(l,E());if(c!=null)a=c;else if(t!=null)a=Be(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let p=d.getNext();for(;p&&h.length<i;)u(p,s)!==0&&h.push(p),p=d.getNext();return h}else return[]}function Zc(){return{visibleWrites:J.empty(),allWrites:[],lastWriteId:-1}}function Vt(n,e,t,s){return Br(n.writeTree,n.treePath,e,t,s)}function ls(n,e){return Qc(n.writeTree,n.treePath,e)}function yi(n,e,t,s){return Yc(n.writeTree,n.treePath,e,t,s)}function zt(n,e){return Xc(n.writeTree,A(n.treePath,e))}function ed(n,e,t,s,i,r){return Jc(n.writeTree,n.treePath,e,t,s,i,r)}function cs(n,e,t){return Kc(n.writeTree,n.treePath,e,t)}function Wr(n,e){return Hr(A(n.treePath,e),n.writeTree)}function Hr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,lt(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,at(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,$e(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,lt(s,e.snapshotNode,i.oldSnap));else throw He("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Ur=new nd;class ds{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ge(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return cs(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Re(this.viewCache_),r=ed(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(n){return{filter:n}}function id(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function rd(n,e,t,s,i){const r=new td;let o,a;if(t.type===X.OVERWRITE){const c=t;c.source.fromUser?o=$n(n,e,c.path,c.snap,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=jt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===X.MERGE){const c=t;c.source.fromUser?o=ad(n,e,c.path,c.children,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Bn(n,e,c.path,c.children,s,i,a,r))}else if(t.type===X.ACK_USER_WRITE){const c=t;c.revert?o=dd(n,e,c.path,s,i,r):o=ld(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===X.LISTEN_COMPLETE)o=cd(n,e,t.path,s,r);else throw He("Unknown operation type: "+t.type);const l=r.getChanges();return od(e,o,l),{viewCache:o,changes:l}}function od(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ut(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Dr(Ut(e)))}}function Vr(n,e,t,s,i,r){const o=e.eventCache;if(zt(s,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Re(e),h=c instanceof _?c:_.EMPTY_NODE,u=ls(s,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Vt(s,Re(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(_e(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=yi(s,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=yi(s,t,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=cs(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,i,r):a=o.getNode()}}return et(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function jt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=h.updateFullNode(l.getNode(),s,null);else if(h.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,s);c=h.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&_e(t)>1)return e;const m=T(t),R=l.getNode().getImmediateChild(p).updateChild(m,s);p===".priority"?c=h.updatePriority(l.getNode(),R):c=h.updateChild(l.getNode(),p,R,m,Ur,null)}const u=Or(e,c,l.isFullyInitialized()||v(t),h.filtersNodes()),d=new ds(i,u,r);return Vr(n,u,t,i,d,a)}function $n(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const h=new ds(i,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=et(e,c,!0,n.filter.filtersNodes());else{const u=g(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=et(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=T(t),p=a.getNode().getImmediateChild(u);let m;if(v(d))m=s;else{const C=h.getCompleteChild(u);C!=null?wr(d)===".priority"&&C.getChild(Sr(d)).isEmpty()?m=C:m=C.updateChild(d,s):m=_.EMPTY_NODE}if(p.equals(m))l=e;else{const C=n.filter.updateChild(a.getNode(),u,m,d,h,o);l=et(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function bi(n,e){return n.eventCache.isCompleteForChild(e)}function ad(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const h=A(t,l);bi(e,g(h))&&(a=$n(n,a,h,c,i,r,o))}),s.foreach((l,c)=>{const h=A(t,l);bi(e,g(h))||(a=$n(n,a,h,c,i,r,o))}),a}function Ei(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Bn(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=s:c=new N(null).setTree(t,s);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),m=Ei(n,p,d);l=jt(n,l,new I(u),m,i,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const p=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!p){const m=e.serverCache.getNode().getImmediateChild(u),C=Ei(n,m,d);l=jt(n,l,new I(u),C,i,r,o,a)}}),l}function ld(n,e,t,s,i,r,o){if(zt(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return jt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(v(t)){let c=new N(null);return l.getNode().forEachChild(Te,(h,u)=>{c=c.set(new I(h),u)}),Bn(n,e,t,c,i,r,a,o)}else return e}else{let c=new N(null);return s.foreach((h,u)=>{const d=A(t,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),Bn(n,e,t,c,i,r,a,o)}}function cd(n,e,t,s,i){const r=e.serverCache,o=Or(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return Vr(n,o,t,s,Ur,i)}function dd(n,e,t,s,i,r){let o;if(zt(s,t)!=null)return e;{const a=new ds(s,e,i),l=e.eventCache.getNode();let c;if(v(t)||g(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Vt(s,Re(e));else{const u=e.serverCache.getNode();f(u instanceof _,"serverChildren would be complete if leaf node"),h=ls(s,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=g(t);let u=cs(s,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,T(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,_.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Vt(s,Re(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||zt(s,E())!=null,et(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new is(s.getIndex()),r=xc(s);this.processor_=sd(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(_.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(_.EMPTY_NODE,a.getNode(),null),h=new ge(l,o.isFullyInitialized(),i.filtersNodes()),u=new ge(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Jt(u,h),this.eventGenerator_=new Fc(this.query_)}get query(){return this.query_}}function hd(n){return n.viewCache_.serverCache.getNode()}function fd(n){return Ut(n.viewCache_)}function pd(n,e){const t=Re(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function Ci(n){return n.eventRegistrations_.length===0}function md(n,e){n.eventRegistrations_.push(e)}function wi(n,e,t){const s=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Ii(n,e,t,s){e.type===X.MERGE&&e.source.queryId!==null&&(f(Re(n.viewCache_),"We should always have a full cache before handling merges"),f(Ut(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=rd(n.processor_,i,e,t,s);return id(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,zr(n,r.changes,r.viewCache.eventCache.getNode(),null)}function _d(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(x,(r,o)=>{s.push($e(r,o))}),t.isFullyInitialized()&&s.push(Dr(t.getNode())),zr(n,s,t.getNode(),e)}function zr(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return $c(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qt;class jr{constructor(){this.views=new Map}}function gd(n){f(!qt,"__referenceConstructor has already been defined"),qt=n}function vd(){return f(qt,"Reference.ts has not been loaded"),qt}function yd(n){return n.views.size===0}function us(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return f(r!=null,"SyncTree gave us an op for an invalid query."),Ii(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Ii(o,e,t,s));return r}}function qr(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Vt(t,i?s:null),l=!1;a?l=!0:s instanceof _?(a=ls(t,s),l=!1):(a=_.EMPTY_NODE,l=!1);const c=Jt(new ge(a,l,!1),new ge(s,i,!1));return new ud(e,c)}return o}function bd(n,e,t,s,i,r){const o=qr(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),md(o,t),_d(o,t)}function Ed(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ve(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(wi(c,t,s)),Ci(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(wi(l,t,s)),Ci(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ve(n)&&r.push(new(vd())(e._repo,e._path)),{removed:r,events:o}}function Gr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function pe(n,e){let t=null;for(const s of n.views.values())t=t||pd(s,e);return t}function Qr(n,e){if(e._queryParams.loadsAllData())return en(n);{const s=e._queryIdentifier;return n.views.get(s)}}function Yr(n,e){return Qr(n,e)!=null}function ve(n){return en(n)!=null}function en(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gt;function Cd(n){f(!Gt,"__referenceConstructor has already been defined"),Gt=n}function wd(){return f(Gt,"Reference.ts has not been loaded"),Gt}let Id=1;class Si{constructor(e){this.listenProvider_=e,this.syncPointTree_=new N(null),this.pendingWriteTree_=Zc(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Kr(n,e,t,s,i){return Uc(n.pendingWriteTree_,e,t,s,i),i?bt(n,new xe(Mr(),e,t)):[]}function we(n,e,t=!1){const s=Vc(n.pendingWriteTree_,e);if(zc(n.pendingWriteTree_,e)){let r=new N(null);return s.snap!=null?r=r.set(E(),!0):q(s.children,o=>{r=r.set(new I(o),!0)}),bt(n,new Ht(s.path,r,t))}else return[]}function yt(n,e,t){return bt(n,new xe(os(),e,t))}function Sd(n,e,t){const s=N.fromObject(t);return bt(n,new ut(os(),e,s))}function Td(n,e){return bt(n,new dt(os(),e))}function Nd(n,e,t){const s=fs(n,t);if(s){const i=ps(s),r=i.path,o=i.queryId,a=U(r,e),l=new dt(as(o),a);return ms(n,r,l)}else return[]}function Qt(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Yr(o,e))){const l=Ed(o,e,t,s);yd(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(d,p)=>ve(p));if(h&&!u){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const p=kd(d);for(let m=0;m<p.length;++m){const C=p[m],R=C.query,se=eo(n,C);n.listenProvider_.startListening(nt(R),ht(n,R),se.hashFn,se.onComplete)}}}!u&&c.length>0&&!s&&(h?n.listenProvider_.stopListening(nt(e),null):c.forEach(d=>{const p=n.queryToTagMap.get(tn(d));n.listenProvider_.stopListening(nt(d),p)}))}Ad(n,c)}return a}function Xr(n,e,t,s){const i=fs(n,s);if(i!=null){const r=ps(i),o=r.path,a=r.queryId,l=U(o,e),c=new xe(as(a),l,t);return ms(n,o,c)}else return[]}function xd(n,e,t,s){const i=fs(n,s);if(i){const r=ps(i),o=r.path,a=r.queryId,l=U(o,e),c=N.fromObject(t),h=new ut(as(a),l,c);return ms(n,o,h)}else return[]}function Wn(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,p)=>{const m=U(d,i);r=r||pe(p,m),o=o||ve(p)});let a=n.syncPointTree_.get(i);a?(o=o||ve(a),r=r||pe(a,E())):(a=new jr,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=_.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((p,m)=>{const C=pe(m,E());C&&(r=r.updateImmediateChild(p,C))}));const c=Yr(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=tn(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const p=Pd();n.queryToTagMap.set(d,p),n.tagToQueryMap.set(p,d)}const h=Zt(n.pendingWriteTree_,i);let u=bd(a,e,t,h,r,l);if(!c&&!o&&!s){const d=Qr(a,e);u=u.concat(Dd(n,e,d))}return u}function hs(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=U(o,e),c=pe(a,l);if(c)return c});return Br(i,e,r,t,!0)}function Rd(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=U(c,t);s=s||pe(h,u)});let i=n.syncPointTree_.get(t);i?s=s||pe(i,E()):(i=new jr,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new ge(s,!0,!1):null,a=Zt(n.pendingWriteTree_,e._path),l=qr(i,e,a,r?o.getNode():_.EMPTY_NODE,r);return fd(l)}function bt(n,e){return Jr(e,n.syncPointTree_,null,Zt(n.pendingWriteTree_,E()))}function Jr(n,e,t,s){if(v(n.path))return Zr(n,e,t,s);{const i=e.get(E());t==null&&i!=null&&(t=pe(i,E()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=Wr(s,o);r=r.concat(Jr(a,l,c,h))}return i&&(r=r.concat(us(i,n,s,t))),r}}function Zr(n,e,t,s){const i=e.get(E());t==null&&i!=null&&(t=pe(i,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Wr(s,o),h=n.operationForChild(o);h&&(r=r.concat(Zr(h,a,l,c)))}),i&&(r=r.concat(us(i,n,s,t))),r}function eo(n,e){const t=e.query,s=ht(n,t);return{hashFn:()=>(hd(e)||_.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Nd(n,t._path,s):Td(n,t._path);{const r=Rl(i,t);return Qt(n,t,null,r)}}}}function ht(n,e){const t=tn(e);return n.queryToTagMap.get(t)}function tn(n){return n._path.toString()+"$"+n._queryIdentifier}function fs(n,e){return n.tagToQueryMap.get(e)}function ps(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new I(n.substr(0,e))}}function ms(n,e,t){const s=n.syncPointTree_.get(e);f(s,"Missing sync point for query tag that we're tracking");const i=Zt(n.pendingWriteTree_,e);return us(s,t,i,null)}function kd(n){return n.fold((e,t,s)=>{if(t&&ve(t))return[en(t)];{let i=[];return t&&(i=Gr(t)),q(s,(r,o)=>{i=i.concat(o)}),i}})}function nt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(wd())(n._repo,n._path):n}function Ad(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=tn(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Pd(){return Id++}function Dd(n,e,t){const s=e._path,i=ht(n,e),r=eo(n,t),o=n.listenProvider_.startListening(nt(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)f(!ve(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!v(c)&&h&&ve(h))return[en(h).query];{let d=[];return h&&(d=d.concat(Gr(h).map(p=>p.query))),q(u,(p,m)=>{d=d.concat(m)}),d}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(nt(h),ht(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new _s(t)}node(){return this.node_}}class gs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new gs(this.syncTree_,t)}node(){return hs(this.syncTree_,this.path_)}}const Ld=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ti=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Md(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Od(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Md=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Od=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&f(!1,"Unexpected increment value: "+s);const i=e.node();if(f(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Fd=function(n,e,t,s){return vs(e,new gs(t,n),s)},to=function(n,e,t){return vs(n,new _s(e),t)};function vs(n,e,t){const s=n.getPriority().val(),i=Ti(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ti(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new P(a,L(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new P(i))),o.forEachChild(x,(a,l)=>{const c=vs(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function bs(n,e){let t=e instanceof I?e:new I(e),s=n,i=g(t);for(;i!==null;){const r=Fe(s.node.children,i)||{children:{},childCount:0};s=new ys(i,s,r),t=T(t),i=g(t)}return s}function ze(n){return n.node.value}function no(n,e){n.node.value=e,Hn(n)}function so(n){return n.node.childCount>0}function $d(n){return ze(n)===void 0&&!so(n)}function nn(n,e){q(n.node.children,(t,s)=>{e(new ys(t,n,s))})}function io(n,e,t,s){t&&e(n),nn(n,i=>{io(i,e,!0)})}function Bd(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Et(n){return new I(n.parent===null?n.name:Et(n.parent)+"/"+n.name)}function Hn(n){n.parent!==null&&Wd(n.parent,n.name,n)}function Wd(n,e,t){const s=$d(t),i=te(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Hn(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Hn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd=/[\[\].#$\/\u0000-\u001F\u007F]/,Ud=/[\[\].#$\u0000-\u001F\u007F]/,wn=10*1024*1024,ro=function(n){return typeof n=="string"&&n.length!==0&&!Hd.test(n)},oo=function(n){return typeof n=="string"&&n.length!==0&&!Ud.test(n)},Vd=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),oo(n)},Ni=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Yn(n)||n&&typeof n=="object"&&te(n,".sv")},zd=function(n,e,t,s){Es(Gn(n,"value"),e,t)},Es=function(n,e,t){const s=t instanceof I?new lc(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ee(s));if(typeof e=="function")throw new Error(n+"contains a function "+Ee(s)+" with contents = "+e.toString());if(Yn(e))throw new Error(n+"contains "+e.toString()+" "+Ee(s));if(typeof e=="string"&&e.length>wn/3&&Kt(e)>wn)throw new Error(n+"contains a string greater than "+wn+" utf8 bytes "+Ee(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(q(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ro(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ee(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);cc(s,o),Es(n,a,s),dc(s)}),i&&r)throw new Error(n+' contains ".value" child '+Ee(s)+" in addition to actual children.")}},Cs=function(n,e,t,s){if(!oo(t))throw new Error(Gn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},jd=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Cs(n,e,t)},qd=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Gd=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ro(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Vd(t))throw new Error(Gn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ws(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!es(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function ao(n,e,t){ws(n,t),lo(n,s=>es(s,e))}function ee(n,e,t){ws(n,t),lo(n,s=>K(s,e)||K(e,s))}function lo(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(Yd(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Yd(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Je&&W("event: "+t.toString()),Ve(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="repo_interrupt",Xd=25;class Jd{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Qd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Wt(),this.transactionQueueTree_=new ys,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Zd(n,e,t){if(n.stats_=Jn(n.repoInfo_),n.forceRestClient_||Dl())n.server_=new Bt(n.repoInfo_,(s,i,r,o)=>{xi(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ri(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{k(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new oe(n.repoInfo_,e,(s,i,r,o)=>{xi(n,s,i,r,o)},s=>{Ri(n,s)},s=>{tu(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=$l(n.repoInfo_,()=>new Oc(n.stats_,n.server_)),n.infoData_=new Ac,n.infoSyncTree_=new Si({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=yt(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ss(n,"connected",!1),n.serverSyncTree_=new Si({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);ee(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function eu(n){const t=n.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Is(n){return Ld({timestamp:eu(n)})}function xi(n,e,t,s,i){n.dataUpdateCount++;const r=new I(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Pt(t,c=>L(c));o=xd(n.serverSyncTree_,r,l,i)}else{const l=L(t);o=Xr(n.serverSyncTree_,r,l,i)}else if(s){const l=Pt(t,c=>L(c));o=Sd(n.serverSyncTree_,r,l)}else{const l=L(t);o=yt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=rn(n,r)),ee(n.eventQueue_,a,o)}function Ri(n,e){Ss(n,"connected",e),e===!1&&iu(n)}function tu(n,e){q(e,(t,s)=>{Ss(n,t,s)})}function Ss(n,e,t){const s=new I("/.info/"+e),i=L(t);n.infoData_.updateSnapshot(s,i);const r=yt(n.infoSyncTree_,s,i);ee(n.eventQueue_,s,r)}function co(n){return n.nextWriteId_++}function nu(n,e,t){const s=Rd(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=L(i).withIndex(e._queryParams.getIndex());Wn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=yt(n.serverSyncTree_,e._path,r);else{const a=ht(n.serverSyncTree_,e);o=Xr(n.serverSyncTree_,e._path,r,a)}return ee(n.eventQueue_,e._path,o),Qt(n.serverSyncTree_,e,t,null,!0),r},i=>(sn(n,"get for query "+k(e)+" failed: "+i),Promise.reject(new Error(i))))}function su(n,e,t,s,i){sn(n,"set",{path:e.toString(),value:t,priority:s});const r=Is(n),o=L(t,s),a=hs(n.serverSyncTree_,e),l=to(o,a,r),c=co(n),h=Kr(n.serverSyncTree_,e,l,c,!0);ws(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,p)=>{const m=d==="ok";m||j("set at "+e+" failed: "+d);const C=we(n.serverSyncTree_,c,!m);ee(n.eventQueue_,e,C),lu(n,i,d,p)});const u=mo(n,e);rn(n,u),ee(n.eventQueue_,u,[])}function iu(n){sn(n,"onDisconnectEvents");const e=Is(n),t=Wt();Mn(n.onDisconnect_,E(),(i,r)=>{const o=Fd(i,r,n.serverSyncTree_,e);Lr(t,i,o)});let s=[];Mn(t,E(),(i,r)=>{s=s.concat(yt(n.serverSyncTree_,i,r));const o=mo(n,i);rn(n,o)}),n.onDisconnect_=Wt(),ee(n.eventQueue_,E(),s)}function ru(n,e,t){let s;g(e._path)===".info"?s=Wn(n.infoSyncTree_,e,t):s=Wn(n.serverSyncTree_,e,t),ao(n.eventQueue_,e._path,s)}function ou(n,e,t){let s;g(e._path)===".info"?s=Qt(n.infoSyncTree_,e,t):s=Qt(n.serverSyncTree_,e,t),ao(n.eventQueue_,e._path,s)}function au(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Kd)}function sn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),W(t,...e)}function lu(n,e,t,s){e&&Ve(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function uo(n,e,t){return hs(n.serverSyncTree_,e,t)||_.EMPTY_NODE}function Ts(n,e=n.transactionQueueTree_){if(e||on(n,e),ze(e)){const t=fo(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&cu(n,Et(e),t)}else so(e)&&nn(e,t=>{Ts(n,t)})}function cu(n,e,t){const s=t.map(c=>c.currentWriteId),i=uo(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];f(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=U(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{sn(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(we(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();on(n,bs(n.transactionQueueTree_,e)),Ts(n,n.transactionQueueTree_),ee(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)Ve(u[d])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{j("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}rn(n,e)}},o)}function rn(n,e){const t=ho(n,e),s=Et(t),i=fo(n,t);return du(n,i,s),s}function du(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=U(t,l.path);let h=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,i=i.concat(we(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Xd)h=!0,u="maxretry",i=i.concat(we(n.serverSyncTree_,l.currentWriteId,!0));else{const d=uo(n,l.path,o);l.currentInputSnapshot=d;const p=e[a].update(d.val());if(p!==void 0){Es("transaction failed: Data returned ",p,l.path);let m=L(p);typeof p=="object"&&p!=null&&te(p,".priority")||(m=m.updatePriority(d.getPriority()));const R=l.currentWriteId,se=Is(n),ie=to(m,d,se);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=ie,l.currentWriteId=co(n),o.splice(o.indexOf(R),1),i=i.concat(Kr(n.serverSyncTree_,l.path,ie,l.currentWriteId,l.applyLocally)),i=i.concat(we(n.serverSyncTree_,R,!0))}else h=!0,u="nodata",i=i.concat(we(n.serverSyncTree_,l.currentWriteId,!0))}ee(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}on(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Ve(s[a]);Ts(n,n.transactionQueueTree_)}function ho(n,e){let t,s=n.transactionQueueTree_;for(t=g(e);t!==null&&ze(s)===void 0;)s=bs(s,t),e=T(e),t=g(e);return s}function fo(n,e){const t=[];return po(n,e,t),t.sort((s,i)=>s.order-i.order),t}function po(n,e,t){const s=ze(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);nn(e,i=>{po(n,i,t)})}function on(n,e){const t=ze(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,no(e,t.length>0?t:void 0)}nn(e,s=>{on(n,s)})}function mo(n,e){const t=Et(ho(n,e)),s=bs(n.transactionQueueTree_,e);return Bd(s,i=>{In(n,i)}),In(n,s),io(s,i=>{In(n,i)}),t}function In(n,e){const t=ze(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(we(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?no(e,void 0):t.length=r+1,ee(n.eventQueue_,Et(e),i);for(let o=0;o<s.length;o++)Ve(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uu(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function hu(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):j(`Invalid query segment '${t}' in query '${n}'`)}return e}const ki=function(n,e){const t=fu(n),s=t.namespace;t.domain==="firebase.com"&&le(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&le("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Il();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new pr(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new I(t.pathString)}},fu=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(i=uu(n.substring(h,u)));const d=hu(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),t=e.substring(m+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+k(this.snapshot.exportVal())}}class mu{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return v(this._path)?null:wr(this._path)}get ref(){return new ce(this._repo,this._path)}get _queryIdentifier(){const e=pi(this._queryParams),t=Kn(e);return t==="{}"?"default":t}get _queryObject(){return pi(this._queryParams)}isEqual(e){if(e=ke(e),!(e instanceof Ct))return!1;const t=this._repo===e._repo,s=es(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+ac(this._path)}}function _u(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function gu(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===Te){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==Ne)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==me)throw new Error(s);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===x){if(e!=null&&!Ni(e)||t!=null&&!Ni(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(f(n.getIndex()instanceof ss||n.getIndex()===Pr,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class ce extends Ct{constructor(e,t){super(e,t,new rs,!1)}get parent(){const e=Sr(this._path);return e===null?null:new ce(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ft{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new I(e),s=Un(this.ref,e);return new ft(this._node.getChild(t),s,x)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new ft(i,Un(this.ref,s),x)))}hasChild(e){const t=new I(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ns(n,e){return n=ke(n),n._checkNotDeleted("ref"),e!==void 0?Un(n._root,e):n._root}function Un(n,e){return n=ke(n),g(n._path)===null?jd("child","path",e):Cs("child","path",e),new ce(n._repo,A(n._path,e))}function Ai(n,e){n=ke(n),qd("set",n._path),zd("set",e,n._path);const t=new Yt;return su(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function go(n){n=ke(n);const e=new _o(()=>{}),t=new an(e);return nu(n._repo,n,t).then(s=>new ft(s,new ce(n._repo,n._path),n._queryParams.getIndex()))}class an{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new pu("value",this,new ft(e.snapshotNode,new ce(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new mu(this,e,t):null}matches(e){return e instanceof an?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function vu(n,e,t,s,i){const r=new _o(t,void 0),o=new an(r);return ru(n._repo,n,o),()=>ou(n._repo,n,o)}function yu(n,e,t,s){return vu(n,"value",e)}class vo{}class bu extends vo{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ct(e._repo,e._path,Rc(e._queryParams,this._limit),e._orderByCalled)}}function yo(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new bu(n)}class Eu extends vo{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){_u(e,"orderByChild");const t=new I(this._path);if(v(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const s=new ss(t),i=kc(e._queryParams,s);return gu(i),new Ct(e._repo,e._path,i,!0)}}function bo(n){return Cs("orderByChild","path",n),new Eu(n)}function Eo(n,...e){let t=ke(n);for(const s of e)t=s._apply(t);return t}gd(ce);Cd(ce);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="FIREBASE_DATABASE_EMULATOR_HOST",Vn={};let wu=!1;function Iu(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=qn(r);n.repoInfo_=new pr(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Su(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||le("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),W("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=ki(r,i),a=o.repoInfo,l;typeof process<"u"&&Ks&&(l=Ks[Cu]),l?(r=`http://${l}?ns=${a.namespace}`,o=ki(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Ml(n.name,n.options,e);Gd("Invalid Firebase Database URL",o),v(o.path)||le("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Nu(a,n,c,new Ll(n,t));return new xu(h,n)}function Tu(n,e){const t=Vn[e];(!t||t[n.key]!==n)&&le(`Database ${e}(${n.repoInfo_}) has already been deleted.`),au(n),delete t[n.key]}function Nu(n,e,t,s){let i=Vn[e.name];i||(i={},Vn[e.name]=i);let r=i[n.toURLString()];return r&&le("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Jd(n,wu,t,s),i[n.toURLString()]=r,r}class xu{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Zd(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ce(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Tu(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&le("Cannot call "+e+" on a deleted database.")}}function Ru(n=rl(),e){const t=el(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Bo("database");s&&ku(t,...s)}return t}function ku(n,e,t,s={}){n=ke(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Dt(s,r.repoInfo_.emulatorOptions))return;le("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&le('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new xt(xt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ho(s.mockUserToken,n.app.options.projectId);o=new xt(a)}qn(e)&&(Wo(e),zo("Database",!0)),Iu(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(n){vl(il),Mt(new it("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Su(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Me(Xs,Js,n),Me(Xs,Js,"esm2017")}oe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};oe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Au();const Pi={apiKey:"AIzaSyCdjqi9HWTze561v2HAu_s3orKXVhC3tdA",authDomain:"trombinoscope-87ae6.firebaseapp.com",databaseURL:"https://trombinoscope-87ae6-default-rtdb.europe-west1.firebasedatabase.app",projectId:"trombinoscope-87ae6",storageBucket:"trombinoscope-87ae6.firebasestorage.app",messagingSenderId:"872375555849",appId:"1:872375555849:web:3d21c50733c79fae0c25d8",measurementId:"G-9GRF3XVRPB"};let Di=null,ln=null,wt=!1;function Pu(){try{return Pi.apiKey==="REMPLACE-MOI"?(console.warn("⚠️ Firebase n'est pas configuré. Le leaderboard sera en mode hors-ligne."),!1):(Di=Xi(Pi),ln=Ru(Di),wt=!0,console.log("✅ Firebase initialisé avec succès"),!0)}catch(n){return console.error("❌ Erreur Firebase :",n),!1}}function Li(){return wt}async function cn(n,e,t="general"){if(!wt){Mi(n,e,t);return}try{const s=Ns(ln,`leaderboard/${n}`),i=await go(s);if(i.exists()){const r=i.val();await Ai(s,{pseudo:n,score:(r.score||0)+e,gamesPlayed:(r.gamesPlayed||0)+1,bestScore:Math.max(r.bestScore||0,e),lastPlayed:new Date().toISOString(),lastMode:t})}else await Ai(s,{pseudo:n,score:e,gamesPlayed:1,bestScore:e,lastPlayed:new Date().toISOString(),lastMode:t})}catch(s){console.error("❌ Erreur sauvegarde score :",s),Mi(n,e,t)}}async function Du(n=50){if(!wt)return zn();try{const e=Ns(ln,"leaderboard"),t=Eo(e,bo("score"),yo(n)),s=await go(t);if(!s.exists())return[];const i=[];return s.forEach(r=>{i.push({id:r.key,...r.val()})}),i.sort((r,o)=>o.score-r.score)}catch(e){return console.error("❌ Erreur récupération leaderboard :",e),zn()}}function Lu(n){if(!wt)return n(zn()),()=>{};const e=Ns(ln,"leaderboard"),t=Eo(e,bo("score"),yo(50));return yu(t,i=>{if(!i.exists()){n([]);return}const r=[];i.forEach(o=>{r.push({id:o.key,...o.val()})}),n(r.sort((o,a)=>a.score-o.score))})}function Mi(n,e,t){const s=JSON.parse(localStorage.getItem("leaderboard")||"{}");s[n]?(s[n].score=(s[n].score||0)+e,s[n].gamesPlayed=(s[n].gamesPlayed||0)+1,s[n].bestScore=Math.max(s[n].bestScore||0,e),s[n].lastPlayed=new Date().toISOString(),s[n].lastMode=t):s[n]={pseudo:n,score:e,gamesPlayed:1,bestScore:e,lastPlayed:new Date().toISOString(),lastMode:t},localStorage.setItem("leaderboard",JSON.stringify(s))}function zn(){const n=JSON.parse(localStorage.getItem("leaderboard")||"{}");return Object.values(n).sort((e,t)=>t.score-e.score)}const Mu="LucasBode67";function Ou(n){n.innerHTML=`
    <div class="page" id="login-page">
      <div class="page-content">
        <!-- Step 1: Password -->
        <div id="step-password" class="animate-fade-in-up">
          <div class="header">
            <span class="header-emoji animate-float">🔒</span>
            <h1 class="heading-display">Trombinoscope</h1>
            <p class="header-subtitle">Entre le mot de passe pour accéder au jeu</p>
          </div>

          <div class="card">
            <form id="password-form">
              <div class="input-group" style="margin-bottom: var(--space-lg);">
                <label class="input-label" for="password-input">Mot de passe</label>
                <input
                  type="password"
                  id="password-input"
                  class="input"
                  placeholder="Tape le mot de passe..."
                  autocomplete="off"
                  autofocus
                />
              </div>
              <div id="password-error" class="error-msg" style="display: none; margin-bottom: var(--space-md);">
                ❌ Mot de passe incorrect
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg" id="password-submit">
                Entrer →
              </button>
            </form>
          </div>
        </div>

        <!-- Step 2: Pseudo -->
        <div id="step-pseudo" style="display: none;">
          <div class="header">
            <span class="header-emoji animate-float">👋</span>
            <h1 class="heading-display">Bienvenue !</h1>
            <p class="header-subtitle">Choisis ton pseudo pour jouer</p>
          </div>

          <div class="card animate-scale-in">
            <form id="pseudo-form">
              <div class="input-group" style="margin-bottom: var(--space-lg);">
                <label class="input-label" for="pseudo-input">Ton pseudo</label>
                <input
                  type="text"
                  id="pseudo-input"
                  class="input"
                  placeholder="Ex: LucasB, MarieDupont..."
                  maxlength="20"
                  autocomplete="off"
                />
              </div>
              <div id="pseudo-error" class="error-msg" style="display: none; margin-bottom: var(--space-md);">
                ❌ Entre un pseudo (2 à 20 caractères)
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg" id="pseudo-submit">
                🎮 C'est parti !
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;const e=document.getElementById("password-form"),t=document.getElementById("password-input"),s=document.getElementById("password-error"),i=document.getElementById("step-password"),r=document.getElementById("step-pseudo"),o=document.getElementById("pseudo-form"),a=document.getElementById("pseudo-input"),l=document.getElementById("pseudo-error");e.addEventListener("submit",c=>{c.preventDefault(),t.value.trim()===Mu?(i.style.opacity="0",i.style.transform="translateX(-30px)",setTimeout(()=>{i.style.display="none",r.style.display="block",r.classList.add("animate-fade-in-up"),a.focus()},300)):(s.style.display="block",t.classList.add("input-error"),t.parentElement.parentElement.classList.add("animate-shake"),setTimeout(()=>{t.parentElement.parentElement.classList.remove("animate-shake")},500),setTimeout(()=>{s.style.display="none",t.classList.remove("input-error")},3e3))}),o.addEventListener("submit",c=>{c.preventDefault();const h=a.value.trim();h.length>=2&&h.length<=20?(th(h),M("menu")):(l.style.display="block",a.classList.add("input-error"),setTimeout(()=>{l.style.display="none",a.classList.remove("input-error")},3e3))}),i.style.transition="opacity 0.3s ease, transform 0.3s ease",setTimeout(()=>t.focus(),100)}function Oi(n,e){var r,o;const t=je(),s=((r=e==null?void 0:e.lists)==null?void 0:r.reduce((a,l)=>a+l.poles.reduce((c,h)=>c+h.people.length,0),0))||0,i=((o=e==null?void 0:e.lists)==null?void 0:o.length)||0;n.innerHTML=`
    <div class="page">
      <div class="page-content" style="max-width: 600px;">
        <!-- Header -->
        <div class="header animate-fade-in-up">
          <span class="header-emoji">🎓</span>
          <h1 class="heading-display">Salut ${t} !</h1>
          <p class="header-subtitle">
            ${s} personnes à apprendre dans ${i} listes
          </p>
        </div>

        <!-- Game Modes -->
        <div class="menu-grid">
          <!-- Trouve le nom -->
          <div class="menu-card animate-fade-in-up stagger-1" id="btn-find-name">
            <span class="menu-card-icon">📸</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve le nom</div>
              <div class="menu-card-desc">
                Une photo s'affiche, choisis le bon nom parmi 4 propositions
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Trouve la tête -->
          <div class="menu-card animate-fade-in-up stagger-2" id="btn-find-face">
            <span class="menu-card-icon">🧑</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve la tête</div>
              <div class="menu-card-desc">
                Un nom s'affiche, choisis la bonne photo parmi 4 propositions
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Trouve les infos -->
          <div class="menu-card animate-fade-in-up stagger-3" id="btn-find-infos">
            <span class="menu-card-icon">🕵️</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve les infos</div>
              <div class="menu-card-desc">
                Une vraie enquête ! Trouve le prénom, nom, pôle, BDE, et rôle d'un membre
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Révision par pôle -->
          <div class="menu-card animate-fade-in-up stagger-3" id="btn-review-pole">
            <span class="menu-card-icon">📋</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Révision par pôle</div>
              <div class="menu-card-desc">
                Révise ou teste-toi sur les membres d'un pôle spécifique
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Leaderboard -->
          <div class="menu-card animate-fade-in-up stagger-4" id="btn-leaderboard">
            <span class="menu-card-icon">🏆</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Classement</div>
              <div class="menu-card-desc">
                Consulte le classement global de tous les joueurs
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer-links animate-fade-in stagger-5">
          <button class="btn btn-ghost" id="btn-logout">
            🚪 Déconnexion
          </button>
        </div>
      </div>
    </div>
  `,document.getElementById("btn-find-name").addEventListener("click",()=>{M("find-name")}),document.getElementById("btn-find-face").addEventListener("click",()=>{M("find-face")}),document.getElementById("btn-find-infos").addEventListener("click",()=>{M("find-infos")}),document.getElementById("btn-review-pole").addEventListener("click",()=>{M("review-pole")}),document.getElementById("btn-leaderboard").addEventListener("click",()=>{M("leaderboard")}),document.getElementById("btn-logout").addEventListener("click",()=>{nh()})}function pt(n){const e=[...n];for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}function xs(n){return n!=null&&n.lists?n.lists.flatMap(e=>(e.poles||[]).map(t=>({...t,listId:e.id,listName:e.name}))):(n==null?void 0:n.poles)||[]}function dn(n){return xs(n).flatMap(t=>(t.people||[]).map(s=>({...s,id:s.photo||`${s.firstName}_${s.lastName}`,poleName:t.name,poleId:t.id,listId:t.listId||"",listName:t.listName||""})))}function Fu(n,e){const s=xs(n).find(i=>i.id===e);return s?(s.people||[]).map(i=>({...i,id:i.photo||`${i.firstName}_${i.lastName}`,poleName:s.name,poleId:s.id,listId:s.listId||"",listName:s.listName||""})):[]}function Co(n,e){if(!(n!=null&&n.lists))return[];const t=n.lists.find(s=>s.id===e);return t?(t.poles||[]).flatMap(s=>(s.people||[]).map(i=>({...i,id:i.photo||`${i.firstName}_${i.lastName}`,poleName:s.name,poleId:s.id,listId:t.id,listName:t.name}))):[]}function Rs(n,e){const t=n.id||n.photo,s=e.filter(r=>(r.id||r.photo)!==t),i=pt(s).slice(0,3);return pt([n,...i])}function $u(n,e=5e3){if(!n)return 0;const t=100,s=50,i=Math.max(0,1-e/1e4),r=Math.floor(i*s);return t+r}function Pe(n,e=10){const t=pt(n);return{questions:e>0?t.slice(0,Math.min(e,t.length)):t,currentIndex:0,score:0,correct:0,wrong:0,streak:0,bestStreak:0,startTime:Date.now(),questionStartTime:Date.now(),finished:!1}}function ks(n){return n.currentIndex++,n.questionStartTime=Date.now(),n.currentIndex>=n.questions.length&&(n.finished=!0),n}function As(n,e){const t=Date.now()-n.questionStartTime,s=$u(e,t);return n.score+=s,e?(n.correct++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak)):(n.wrong++,n.streak=0),{points:s,timeMs:t}}function It(n,e=""){var r,o;const t=e||"photo-frame-lg";if(n.photo)return`
      <div class="photo-frame ${t}">
        <img src="/trmbs/${n.photo}" alt="${n.firstName}" loading="lazy" />
      </div>
    `;const s=`${((r=n.firstName)==null?void 0:r[0])||"?"}${((o=n.lastName)==null?void 0:o[0])||""}`.toUpperCase(),i=Bu(n.id||n.firstName||"")%360;return`
    <div class="photo-frame ${t}" style="background: hsl(${i}, 50%, 25%);">
      <span class="photo-placeholder" style="font-size: ${t==="photo-frame-sm"?"1.5rem":"3rem"}; color: hsl(${i}, 80%, 75%);">
        ${s}
      </span>
    </div>
  `}function We(n,e="success"){document.querySelectorAll(".toast").forEach(s=>s.remove());const t=document.createElement("div");t.className=`toast toast-${e}`,t.textContent=n,document.body.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},2e3)}function ne(n,e,t){return`
    <div class="nav-bar">
      <button class="nav-back" id="nav-back-btn">
        ← Retour
      </button>
      <span class="nav-title">${n}</span>
      <span class="nav-score">⭐ ${e}</span>
    </div>
  `}function de(n){const e=document.getElementById("nav-back-btn");e&&e.addEventListener("click",n)}function un(n,e,t){const s=Math.floor((Date.now()-n.startTime)/1e3),i=n.questions.length>0?Math.round(n.correct/n.questions.length*100):0;return`
    <div class="page">
      <div class="page-content text-center">
        <div class="header animate-bounce-in">
          <span class="header-emoji">${i>=80?"🎉":i>=50?"👍":"💪"}</span>
          <h1 class="heading-display">
            ${i>=80?"Excellent !":i>=50?"Pas mal !":"Continue !"}
          </h1>
        </div>

        <div class="card animate-fade-in-up stagger-1" style="margin-bottom: var(--space-xl);">
          <div class="score-display" style="justify-content: center; margin-bottom: var(--space-lg);">
            <div>
              <div class="score-value" style="font-size: var(--font-size-4xl);">${n.score}</div>
              <div class="score-label">points</div>
            </div>
          </div>

          <div class="summary-stat">
            <span class="summary-stat-label">✅ Bonnes réponses</span>
            <span class="summary-stat-value" style="color: var(--color-success);">${n.correct}/${n.questions.length}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">🎯 Précision</span>
            <span class="summary-stat-value">${i}%</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">🔥 Meilleure série</span>
            <span class="summary-stat-value">${n.bestStreak}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">⏱ Temps total</span>
            <span class="summary-stat-value">${s}s</span>
          </div>
        </div>

        <div class="animate-fade-in-up stagger-3" style="display: flex; flex-direction: column; gap: var(--space-md);">
          <button class="btn btn-primary btn-full btn-lg" id="btn-replay">
            🔄 Rejouer
          </button>
          <button class="btn btn-secondary btn-full" id="btn-back-menu">
            ← Retour au menu
          </button>
        </div>
      </div>
    </div>
  `}function Bu(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return Math.abs(e)}let $=null,Ie=[];function Wu(n,e){if(Ie=dn(e),Ie.length<4){n.innerHTML=`
      <div class="page">
        <div class="page-content text-center">
          <span class="emoji-icon">⚠️</span>
          <h2 class="heading-2">Pas assez de données</h2>
          <p class="text-secondary" style="margin: var(--space-md) 0;">
            Il faut au moins 4 personnes pour jouer à ce mode.
          </p>
          <button class="btn btn-primary" id="btn-back">← Retour</button>
        </div>
      </div>
    `,document.getElementById("btn-back").addEventListener("click",()=>M("menu"));return}$=Pe(Ie,Math.min(10,Ie.length)),Ps(n)}function Ps(n){if($.finished){Uu(n);return}const e=$.questions[$.currentIndex],t=Rs(e,Ie),s=$.currentIndex/$.questions.length*100;n.innerHTML=`
    ${ne("Trouve le nom",$.score)}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content">
        <!-- Progress -->
        <div class="game-counter animate-fade-in">
          Question ${$.currentIndex+1} / ${$.questions.length}
          ${$.streak>=3?`<span class="badge badge-accent" style="margin-left: var(--space-sm);">🔥 ${$.streak}</span>`:""}
        </div>
        <div class="progress-bar" style="margin-bottom: var(--space-xl);">
          <div class="progress-fill" style="width: ${s}%;"></div>
        </div>

        <!-- Photo -->
        <div class="game-photo-container animate-scale-in">
          ${It(e)}
        </div>

        <p class="text-center text-secondary" style="margin-bottom: var(--space-lg);">
          Qui est cette personne ?
        </p>

        <!-- Badge pôle -->
        <div class="text-center" style="margin-bottom: var(--space-lg);">
          <span class="badge badge-accent">${e.poleName}</span>
        </div>

        <!-- Options -->
        <div class="options-grid options-grid-2">
          ${t.map((i,r)=>`
            <button class="option-card animate-fade-in-up stagger-${r+1}" data-id="${i.id}" id="option-${r}">
              ${i.firstName} ${i.lastName}
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 4px;">
                ${i.role}
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,de(()=>M("menu")),t.forEach((i,r)=>{document.getElementById(`option-${r}`).addEventListener("click",()=>{Hu(n,i.id===e.id,e.id)})})}function Hu(n,e,t,s){const{points:i}=As($,e);document.querySelectorAll(".option-card").forEach(r=>{r.classList.add("disabled"),r.dataset.id===t?r.classList.add("correct"):!e&&r===document.activeElement&&r.classList.add("wrong")}),e?We(`✅ +${i} points !`,"success"):(document.querySelector(".option-card:not(.correct):hover, .option-card:not(.correct):focus"),document.querySelectorAll(".option-card").forEach(r=>{r.dataset.id!==t&&r.classList.contains("correct")}),We("❌ Raté !","error")),setTimeout(()=>{ks($),Ps(n)},1500)}async function Uu(n){const e=je();await cn(e,$.score,"find-name"),n.innerHTML=un($),document.getElementById("btn-replay").addEventListener("click",()=>{$=Pe(Ie,Math.min(10,Ie.length)),Ps(n)}),document.getElementById("btn-back-menu").addEventListener("click",()=>{M("menu")})}let B=null,Se=[];function Vu(n,e){if(Se=dn(e),Se.length<4){n.innerHTML=`
      <div class="page">
        <div class="page-content text-center">
          <span class="emoji-icon">⚠️</span>
          <h2 class="heading-2">Pas assez de données</h2>
          <p class="text-secondary" style="margin: var(--space-md) 0;">
            Il faut au moins 4 personnes pour jouer à ce mode.
          </p>
          <button class="btn btn-primary" id="btn-back">← Retour</button>
        </div>
      </div>
    `,document.getElementById("btn-back").addEventListener("click",()=>M("menu"));return}B=Pe(Se,Math.min(10,Se.length)),Ds(n)}function Ds(n){if(B.finished){ju(n);return}const e=B.questions[B.currentIndex],t=Rs(e,Se),s=B.currentIndex/B.questions.length*100;n.innerHTML=`
    ${ne("Trouve la tête",B.score)}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content">
        <!-- Progress -->
        <div class="game-counter animate-fade-in">
          Question ${B.currentIndex+1} / ${B.questions.length}
          ${B.streak>=3?`<span class="badge badge-accent" style="margin-left: var(--space-sm);">🔥 ${B.streak}</span>`:""}
        </div>
        <div class="progress-bar" style="margin-bottom: var(--space-xl);">
          <div class="progress-fill" style="width: ${s}%;"></div>
        </div>

        <!-- Name Display -->
        <div class="game-name-display animate-scale-in">
          <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-sm);">
            Trouve la photo de
          </div>
          ${e.firstName} ${e.lastName}
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-sm);">
            ${e.role}
          </div>
        </div>

        <!-- Badge pôle -->
        <div class="text-center" style="margin-bottom: var(--space-lg);">
          <span class="badge badge-accent">${e.poleName}</span>
        </div>

        <!-- Photo Options -->
        <div class="options-grid options-grid-2">
          ${t.map((i,r)=>`
            <button class="option-card option-photo animate-fade-in-up stagger-${r+1}" data-id="${i.id}" id="option-${r}">
              ${It(i,"photo-frame-sm")}
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,de(()=>M("menu")),t.forEach((i,r)=>{document.getElementById(`option-${r}`).addEventListener("click",()=>{zu(n,i.id===e.id,e.id)})})}function zu(n,e,t,s){const{points:i}=As(B,e);document.querySelectorAll(".option-card").forEach(r=>{r.classList.add("disabled"),r.dataset.id===t&&r.classList.add("correct")}),e?We(`✅ +${i} points !`,"success"):We("❌ Raté !","error"),setTimeout(()=>{ks(B),Ds(n)},1500)}async function ju(n){const e=je();await cn(e,B.score,"find-face"),n.innerHTML=un(B),document.getElementById("btn-replay").addEventListener("click",()=>{B=Pe(Se,Math.min(10,Se.length)),Ds(n)}),document.getElementById("btn-back-menu").addEventListener("click",()=>{M("menu")})}const wo={KSK:"🟡",PRK:"🟣",RNK:"🔵",TMK:"🔴"},qu={Ambassador:"🤝",Animation:"🎉",Communication:"📢",Event:"🎪",IS:"💻",Logistics:"📦",Members:"👥",Partnerships:"🤝",Presidency:"👑",Secretary:"📋",Travel:"✈️",Treasury:"💰"};let H=null,V=null,G="fiches",F=null,hn=[];function Gu(n,e,t=null){hn=dn(e),t?(V=t,Z(n,e)):V?Z(n,e):H?Ms(n,e):Ls(n,e)}function Ls(n,e){const t=(e==null?void 0:e.lists)||[];n.innerHTML=`
    ${ne("Révision par pôle","")}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">📋</span>
          <h1 class="heading-1">Choisis une liste</h1>
          <p class="text-secondary">Sélectionne le BDE à réviser</p>
        </div>

        <div class="pole-grid">
          ${t.map((s,i)=>{const r=s.poles.reduce((o,a)=>o+a.people.length,0);return`
              <div class="pole-card animate-fade-in-up stagger-${i+1}" data-list="${s.id}" id="list-${s.id}">
                <div class="pole-card-emoji">${wo[s.id]||"📌"}</div>
                <div class="pole-card-name">${s.name}</div>
                <div class="pole-card-count">${s.poles.length} pôles · ${r} personnes</div>
              </div>
            `}).join("")}

          <!-- Toutes les listes -->
          <div class="pole-card animate-fade-in-up stagger-${t.length+1}" data-list="ALL" id="list-ALL">
            <div class="pole-card-emoji">🌟</div>
            <div class="pole-card-name">Toutes les listes</div>
            <div class="pole-card-count">${hn.length} personnes</div>
          </div>
        </div>
      </div>
    </div>
  `,de(()=>M("menu")),t.forEach(s=>{document.getElementById(`list-${s.id}`).addEventListener("click",()=>{H=s.id,Ms(n,e)})}),document.getElementById("list-ALL").addEventListener("click",()=>{H="ALL",V="ALL",G="fiches",Z(n,e)})}function Ms(n,e){var r;const t=(r=e==null?void 0:e.lists)==null?void 0:r.find(o=>o.id===H),s=(t==null?void 0:t.poles)||[],i=Co(e,H);n.innerHTML=`
    ${ne(`${(t==null?void 0:t.name)||H}`,"")}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">${wo[H]||"📋"}</span>
          <h1 class="heading-1">Pôles de ${(t==null?void 0:t.name)||H}</h1>
          <p class="text-secondary">Sélectionne un pôle</p>
        </div>

        <div class="pole-grid">
          ${s.map((o,a)=>`
            <div class="pole-card animate-fade-in-up stagger-${a%8+1}" data-pole="${o.id}" id="pole-${o.id}">
              <div class="pole-card-emoji">${qu[o.name]||"📌"}</div>
              <div class="pole-card-name">${o.name}</div>
              <div class="pole-card-count">${o.people.length} personnes</div>
            </div>
          `).join("")}

          <!-- Tous les pôles de cette liste -->
          <div class="pole-card animate-fade-in-up stagger-${s.length%8+1}" data-pole="LIST_ALL" id="pole-LIST_ALL">
            <div class="pole-card-emoji">🌟</div>
            <div class="pole-card-name">Toute la liste</div>
            <div class="pole-card-count">${i.length} personnes</div>
          </div>
        </div>
      </div>
    </div>
  `,de(()=>{H=null,Ls(n,e)}),s.forEach(o=>{document.getElementById(`pole-${o.id}`).addEventListener("click",()=>{V=o.id,G="fiches",Z(n,e)})}),document.getElementById("pole-LIST_ALL").addEventListener("click",()=>{V="LIST_ALL",G="fiches",Z(n,e)})}function Z(n,e){var r;let t,s;if(V==="ALL")t=hn,s="Toutes les listes";else if(V==="LIST_ALL"){t=Co(e,H);const o=(r=e==null?void 0:e.lists)==null?void 0:r.find(a=>a.id===H);s=(o==null?void 0:o.name)||H}else{t=Fu(e,V);const a=xs(e).find(l=>l.id===V);s=(a==null?void 0:a.name)||V}if(G==="quiz"){Qu(n,e,t,s);return}const i=()=>{V=null,H==="ALL"||V==="ALL"?(H=null,Ls(n,e)):Ms(n,e)};n.innerHTML=`
    ${ne(s,"")}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <!-- Tabs -->
        <div class="tabs animate-fade-in">
          <button class="tab ${G==="fiches"?"active":""}" id="tab-fiches">
            📖 Fiches
          </button>
          <button class="tab ${G==="quiz"?"active":""}" id="tab-quiz">
            🎮 Quiz
          </button>
        </div>

        <!-- People Grid -->
        <div class="person-grid">
          ${t.map((o,a)=>`
            <div class="person-card animate-fade-in-up stagger-${a%8+1}">
              ${It(o,"photo-frame-sm")}
              <div class="person-name">${o.firstName} ${o.lastName}</div>
              <div class="person-role">${o.roleDisplay||o.role}</div>
              ${o.poleName?`<div style="margin-top: 4px;"><span class="badge badge-accent">${o.poleName}</span></div>`:""}
            </div>
          `).join("")}
        </div>

        ${t.length===0?`
          <div class="text-center" style="padding: var(--space-3xl);">
            <span class="emoji-icon">🤷</span>
            <p class="text-secondary">Aucune personne dans ce pôle</p>
          </div>
        `:""}
      </div>
    </div>
  `,de(i),document.getElementById("tab-fiches").addEventListener("click",()=>{G="fiches",Z(n,e)}),document.getElementById("tab-quiz").addEventListener("click",()=>{G="quiz",Z(n,e)})}function Qu(n,e,t,s){if(t.length===0){n.innerHTML=`
      ${ne(s,"")}
      <div class="page">
        <div class="page-content text-center">
          <span class="emoji-icon">⚠️</span>
          <h2 class="heading-2">Pas de personnes</h2>
          <p class="text-secondary" style="margin: var(--space-md) 0;">
            Il n'y a personne dans ce pôle pour faire un quiz.
          </p>
          <button class="btn btn-secondary" id="btn-back-fiches">← Fiches</button>
        </div>
      </div>
    `,de(()=>{G="fiches",Z(n,e)}),document.getElementById("btn-back-fiches").addEventListener("click",()=>{G="fiches",Z(n,e)});return}F=Pe(t,Math.min(10,t.length)),Os(n,e,t,s)}function Os(n,e,t,s){if(F.finished){Yu(n,e,t,s);return}const i=F.questions[F.currentIndex],r=t.length>=4?t:hn,o=Rs(i,r),a=F.currentIndex/F.questions.length*100;n.innerHTML=`
    ${ne(`Quiz ${s}`,F.score)}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content">
        <div class="tabs animate-fade-in">
          <button class="tab" id="tab-fiches">📖 Fiches</button>
          <button class="tab active" id="tab-quiz">🎮 Quiz</button>
        </div>

        <div class="game-counter">
          Question ${F.currentIndex+1} / ${F.questions.length}
          ${F.streak>=3?`<span class="badge badge-accent" style="margin-left: var(--space-sm);">🔥 ${F.streak}</span>`:""}
        </div>
        <div class="progress-bar" style="margin-bottom: var(--space-xl);">
          <div class="progress-fill" style="width: ${a}%;"></div>
        </div>

        <div class="game-photo-container animate-scale-in">
          ${It(i)}
        </div>

        <p class="text-center text-secondary" style="margin-bottom: var(--space-lg);">
          Qui est cette personne ?
        </p>

        <div class="options-grid options-grid-2">
          ${o.map((l,c)=>`
            <button class="option-card animate-fade-in-up stagger-${c+1}" data-id="${l.id}" id="option-${c}">
              ${l.firstName} ${l.lastName}
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 4px;">
                ${l.role}
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `,de(()=>{G="fiches",Z(n,e)}),document.getElementById("tab-fiches").addEventListener("click",()=>{G="fiches",Z(n,e)}),o.forEach((l,c)=>{document.getElementById(`option-${c}`).addEventListener("click",()=>{const h=i.id||i.photo,d=(l.id||l.photo)===h,{points:p}=As(F,d);document.querySelectorAll(".option-card").forEach(m=>{m.classList.add("disabled"),m.dataset.id===h&&m.classList.add("correct")}),d?We(`✅ +${p} points !`,"success"):(document.getElementById(`option-${c}`).classList.add("wrong"),We("❌ Raté !","error")),setTimeout(()=>{ks(F),Os(n,e,t,s)},1500)})})}async function Yu(n,e,t,s){const i=je();await cn(i,F.score,`review-${V}`),n.innerHTML=un(F),document.getElementById("btn-replay").addEventListener("click",()=>{F=Pe(t,Math.min(10,t.length)),Os(n,e,t,s)}),document.getElementById("btn-back-menu").addEventListener("click",()=>{H=null,V=null,M("menu")})}const Rt=[{key:"firstName",label:"Prénom ?"},{key:"lastName",label:"Nom de famille ?"},{key:"list",label:"Liste BDE ?"},{key:"poleName",label:"Dans quel Pôle ?"},{key:"role",label:"Rôle principal ?"},{key:"roleTransverse",label:"Rôle transverse ?"}];let Io=[],So=[],To=[],kt=[];function Ku(n){Io=[...new Set(n.map(e=>e.list))].filter(Boolean),So=[...new Set(n.map(e=>e.poleName||e.pole))].filter(Boolean),To=[...new Set(n.map(e=>e.role))].filter(Boolean),kt=[...new Set(n.map(e=>e.roleTransverse))].filter(Boolean),kt.includes("Aucun (❌)")||kt.push("Aucun (❌)")}function Xu(n,e,t){const s=Rt[n];let i=e[s.key];s.key==="poleName"&&(i=e.poleName||e.pole),s.key==="roleTransverse"&&!i&&(i="Aucun (❌)");let r=[];s.key==="firstName"?r=[...new Set(t.map(c=>c.firstName))]:s.key==="lastName"?r=[...new Set(t.map(c=>c.lastName))]:s.key==="list"?r=Io:s.key==="poleName"?r=So:s.key==="role"?r=To:s.key==="roleTransverse"&&(r=kt);const o=String(i||"");r=r.filter(c=>String(c||"")!==o&&c),pt(r);let a=r.slice(0,3);for(;a.length<3&&r.length>0;)a.push(r[Math.floor(Math.random()*r.length)]);const l=[o,...a];return pt(l),{options:l,correctAnswer:o}}let Q=0,Ke=0,b=null;function No(n,e){const t=dn(e);if(Ku(t),t.length<4){n.innerHTML=`
      ${ne("Trouve les infos","")}
      <div class="page"><div class="text-center" style="padding-top: 100px;">Pas assez de données pour jouer.</div></div>
    `;return}b=Pe(t,Math.min(10,t.length)),Q=0,Ke=0,xo(n,e,t,()=>M("menu"))}function xo(n,e,t,s){if(!b||b.currentIndex>=b.questions.length){cn(je(),b.score,"find-infos"),n.innerHTML=un(b),document.getElementById("btn-replay").addEventListener("click",()=>{No(n,e)}),document.getElementById("btn-back-menu").addEventListener("click",s);return}const i=b.questions[b.currentIndex];Q===0&&!b.startTimerObj&&(Ke=0,b.startTime=Date.now(),b.startTimerObj=!0);const r=Rt[Q],{options:o,correctAnswer:a}=Xu(Q,i,t);n.innerHTML=`
    ${ne(`Personne ${b.currentIndex+1} / ${b.totalQuestions}`,"",s,b.score)}

    <div class="page">
      <div class="page-content page-narrow text-center">
        <!-- Progress bar for steps -->
        <div class="step-dots" style="margin-bottom: var(--space-lg); display: flex; justify-content: center; gap: 8px;">
           ${Rt.map((l,c)=>`
             <div style="width: 12px; height: 12px; border-radius: 50%; opacity: ${c<Q||c===Q?"1":"0.3"}; background: ${c<Q?"var(--color-success)":c===Q?"var(--color-primary)":"var(--text-color)"};"></div>
           `).join("")}
        </div>

        <div class="animate-fade-in">
          ${It(i,"photo-frame-lg")}
        </div>

        <div class="step-container" style="min-height: 250px;">
          <h2 class="heading-2 animate-fade-in-up stagger-1" style="margin: var(--space-xl) 0 var(--space-lg) 0;">
            ${r.label}
          </h2>

          <div class="options-grid options-text animate-fade-in-up stagger-2">
            ${o.map((l,c)=>`
              <button class="option-card option-text" data-val="${l}" id="option-${c}">
                <div class="option-text-name">${l}</div>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `,de(s),o.forEach((l,c)=>{const h=document.getElementById(`option-${c}`);h.addEventListener("click",()=>{n.querySelectorAll(".option-card").forEach(d=>{d.style.pointerEvents="none",d.dataset.val===a?d.classList.add("correct"):d===h?d.classList.add("wrong"):d.style.opacity="0.5"}),l!==a&&Ke++,setTimeout(()=>{Q++,Q>=Rt.length&&(Ke===0?(b.score+=b.scoreMultiplier||100,b.correct=(b.correct||0)+1,b.streak=(b.streak||0)+1,b.bestStreak=Math.max(b.bestStreak||0,b.streak)):(b.wrong=(b.wrong||0)+1,b.streak=0),b.answers=b.answers||[],b.answers.push({correctPerson:i,isCorrect:Ke===0,timeTaken:Date.now()-b.startTime}),b.currentIndex++,Q=0,b.startTimerObj=!1),xo(n,e,t,s)},1e3)})})}let Nt=null;async function Ju(n){const e=je();if(n.innerHTML=`
    ${ne("Classement","")}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content" style="max-width: 600px;">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">🏆</span>
          <h1 class="heading-1">Classement</h1>
          <p class="text-secondary">
            ${Li()?"Classement en temps réel":"⚠️ Mode hors-ligne (localStorage)"}
          </p>
        </div>

        <div id="leaderboard-list">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  `,de(()=>{Nt&&(Nt(),Nt=null),M("menu")}),Li())Nt=Lu(t=>{Fi(t,e)});else{const t=await Du();Fi(t,e)}}function Fi(n,e){var r,o;const t=document.getElementById("leaderboard-list");if(!t)return;if(n.length===0){t.innerHTML=`
      <div class="card text-center animate-fade-in" style="padding: var(--space-3xl);">
        <span class="emoji-icon">🏜️</span>
        <h3 class="heading-3" style="margin-bottom: var(--space-sm);">Aucun score</h3>
        <p class="text-secondary">Sois le premier à jouer pour apparaître ici !</p>
        <button class="btn btn-primary" style="margin-top: var(--space-lg);" id="btn-play-now">
          🎮 Jouer maintenant
        </button>
      </div>
    `,(r=document.getElementById("btn-play-now"))==null||r.addEventListener("click",()=>M("menu"));return}const s=n.slice(0,3),i=n.slice(3);t.innerHTML=`
    <!-- Podium Top 3 -->
    ${s.length>0?`
      <div class="animate-fade-in-up" style="
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: var(--space-md);
        margin-bottom: var(--space-2xl);
        padding: var(--space-lg) 0;
      ">
        ${s.length>=2?Sn(s[1],2,e,"90px"):""}
        ${Sn(s[0],1,e,"120px")}
        ${s.length>=3?Sn(s[2],3,e,"70px"):""}
      </div>
    `:""}

    <!-- Rest of the list -->
    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
      ${i.map((a,l)=>`
        <div class="leaderboard-item animate-fade-in-up stagger-${l%8+1} ${a.pseudo===e?"current-user":""}">
          <span class="leaderboard-rank">${l+4}</span>
          <span class="leaderboard-name">
            ${a.pseudo===e?"👉 ":""}${a.pseudo}
          </span>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
            ${a.gamesPlayed||0} parties
          </span>
          <span class="leaderboard-score">${a.score}</span>
        </div>
      `).join("")}
    </div>

    <!-- Current user not in list? -->
    ${n.find(a=>a.pseudo===e)?"":`
      <div class="divider"></div>
      <div class="card text-center" style="margin-top: var(--space-lg);">
        <p class="text-secondary">Tu n'es pas encore classé·e !</p>
        <button class="btn btn-primary" style="margin-top: var(--space-md);" id="btn-play-to-rank">
          🎮 Jouer pour apparaître
        </button>
      </div>
    `}
  `,(o=document.getElementById("btn-play-to-rank"))==null||o.addEventListener("click",()=>M("menu"))}function Sn(n,e,t,s){const i={1:"🥇",2:"🥈",3:"🥉"},r=n.pseudo===t;return`
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      ${e===1?"order: 0;":e===2?"order: -1;":"order: 1;"}
    ">
      <div style="font-size: 2rem;">${i[e]}</div>
      <div style="
        width: 80px;
        height: ${s};
        background: ${e===1?"linear-gradient(180deg, #FFD700 0%, rgba(255,215,0,0.2) 100%)":e===2?"linear-gradient(180deg, #C0C0C0 0%, rgba(192,192,192,0.2) 100%)":"linear-gradient(180deg, #CD7F32 0%, rgba(205,127,50,0.2) 100%)"};
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: var(--space-md);
        border: 1px solid ${e===1?"rgba(255,215,0,0.3)":e===2?"rgba(192,192,192,0.3)":"rgba(205,127,50,0.3)"};
        ${r?"box-shadow: 0 0 15px var(--color-accent-glow);":""}
      ">
        <div style="font-weight: 700; font-size: var(--font-size-lg);">${n.score}</div>
      </div>
      <div style="
        font-weight: 600;
        font-size: var(--font-size-sm);
        max-width: 90px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${r?"color: var(--color-accent-secondary);":""}
      ">
        ${r?"👉 ":""}${n.pseudo}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
        ${n.gamesPlayed||0} parties
      </div>
    </div>
  `}const w={authenticated:!1,pseudo:"",currentRoute:"login",peopleData:null,selectedPole:null},$i=sessionStorage.getItem("pseudo"),Zu=sessionStorage.getItem("authenticated");$i&&Zu==="true"&&(w.authenticated=!0,w.pseudo=$i,w.currentRoute="menu");Pu();async function eh(){if(w.peopleData)return w.peopleData;try{const n=await fetch("/trmbs/data/people.json");if(!n.ok)throw new Error(`HTTP ${n.status}`);return w.peopleData=await n.json(),w.peopleData}catch(n){return console.error("❌ Erreur chargement données :",n),w.peopleData={lists:[]},w.peopleData}}const O=document.getElementById("app");function M(n,e={}){w.currentRoute=n,e.pole&&(w.selectedPole=e.pole),Fs()}function th(n){w.authenticated=!0,w.pseudo=n,sessionStorage.setItem("pseudo",n),sessionStorage.setItem("authenticated","true")}function nh(){w.authenticated=!1,w.pseudo="",w.currentRoute="login",sessionStorage.removeItem("pseudo"),sessionStorage.removeItem("authenticated"),Fs()}function je(){return w.pseudo}async function Fs(){switch(!w.authenticated&&w.currentRoute!=="login"&&(w.currentRoute="login"),O.style.opacity="0",O.style.transform="translateY(10px)",await new Promise(n=>setTimeout(n,150)),w.authenticated&&!w.peopleData&&(O.innerHTML=`
      <div class="page">
        <div class="spinner"></div>
        <p class="text-secondary" style="margin-top: var(--space-md)">Chargement des données...</p>
      </div>
    `,O.style.opacity="1",O.style.transform="translateY(0)",await eh()),w.currentRoute){case"login":Ou(O);break;case"menu":Oi(O,w.peopleData);break;case"find-name":Wu(O,w.peopleData);break;case"find-face":Vu(O,w.peopleData);break;case"find-infos":No(O,w.peopleData);break;case"review-pole":Gu(O,w.peopleData,w.selectedPole);break;case"leaderboard":Ju(O);break;default:Oi(O,w.peopleData)}requestAnimationFrame(()=>{O.style.transition="opacity 0.3s ease, transform 0.3s ease",O.style.opacity="1",O.style.transform="translateY(0)"})}Fs();
