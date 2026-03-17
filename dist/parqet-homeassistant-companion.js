var ParqetCard=function(t){"use strict";function e(t,e,o,i){var r,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,o,a):r(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let a=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new a(o,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:v}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",g=f.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:r}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);r?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=o.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const r=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(e,o.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const s=r.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,o,i=!1,r){if(void 0!==t){const s=this.constructor;if(!1===i&&(r=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??$)(r,e)||o.useDefault&&o.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:r},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=t=>t,C=k.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,I=`<${T}>`,q=document,z=()=>q.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,V=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),K=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,G=q.createTreeWalker(q,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const o=t.length-1,i=[];let r,s=2===e?"<svg>":3===e?"<math>":"",a=L;for(let e=0;e<o;e++){const o=t[e];let n,l,c=-1,d=0;for(;d<o.length&&(a.lastIndex=d,l=a.exec(o),null!==l);)d=a.lastIndex,a===L?"!--"===l[1]?a=D:void 0!==l[1]?a=V:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=N):void 0!==l[3]&&(a=N):a===N?">"===l[0]?(a=r??L,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?N:'"'===l[3]?H:R):a===H||a===R?a=N:a===D||a===V?a=L:(a=N,r=void 0);const p=a===N&&t[e+1].startsWith("/>")?" ":"";s+=a===L?o+I:c>=0?(i.push(n),o.slice(0,c)+P+o.slice(c)+E+p):o+E+(-2===c?e:p)}return[J(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,c]=Y(t,e);if(this.el=X.createElement(l,o),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(P)){const e=c[s++],o=i.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:o,ctor:"."===a[1]?ot:"?"===a[1]?it:"@"===a[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],z()),G.nextNode(),n.push({type:2,index:++r});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===T)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const o=q.createElement("template");return o.innerHTML=t,o}}function Z(t,e,o=t,i){if(e===K)return e;let r=void 0!==i?o._$Co?.[i]:o._$Cl;const s=O(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=r:o._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??q).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),s=0,a=0,n=o[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new tt(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=o[++a]}s!==n?.index&&(r=G.nextNode(),s++)}return G.currentNode=q,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=X.createElement(J(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new X(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const r of t)i===e.length?e.push(o=new tt(this.O(z()),this.O(z()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=B}_$AI(t,e=this,o,i){const r=this.strings;let s=!1;if(void 0===r)t=Z(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==K,s&&(this._$AH=t);else{const i=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=Z(this,i[o+a],e,a),n===K&&(n=this._$AH[a]),s||=!O(n)||n!==this._$AH[a],n===B?t=B:t!==B&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}s&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class rt extends et{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===K)return;const o=this._$AH,i=t===B&&o!==B||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==B&&(o===B||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=k.litHtmlPolyfillSupport;at?.(X,tt),(k.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=o?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(z(),t),t,void 0,o??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}lt._$litElement$=!0,lt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:lt});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:lt}),(nt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ht=(t=pt,e,o)=>{const{kind:i,metadata:r}=o;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const r=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,r,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const r=this[i];e.call(this,o),this.requestUpdate(i,r,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,o)=>"object"==typeof o?ht(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function vt(t){return ut({...t,state:!0,attribute:!1})}const ft="019cf96b-44f0-73c4-81f2-e8827d5c1e65",_t="https://parqet-token-proxy.oliver-f26.workers.dev",mt=`${_t}/oauth2/token`,gt=_t,yt="https://mcp.parqet.com",bt="undefined"!=typeof window&&"localhost"===window.location.hostname?"http://localhost:3000/callback.html":"https://cubinet-code.github.io/parqet-homeassistant-companion/callback.html",$t="https://developer.parqet.com/img/parqet-icon-trans.svg",xt=[{value:"1d",label:"1D"},{value:"1w",label:"1W"},{value:"mtd",label:"MTD"},{value:"1m",label:"1M"},{value:"3m",label:"3M"},{value:"6m",label:"6M"},{value:"1y",label:"1Y"},{value:"ytd",label:"YTD"},{value:"3y",label:"3Y"},{value:"5y",label:"5Y"},{value:"10y",label:"10Y"},{value:"max",label:"Max"}];function wt(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}const kt=new class{constructor(){this._messageListener=null,this._pendingCsrf=null,this._popup=null}_storageKey(t){return`parqet_card_auth_${null!=t?t:ft}`}getStoredToken(t){try{const e=localStorage.getItem(this._storageKey(t));return e?JSON.parse(e):null}catch(t){return null}}isTokenValid(t){const e=this.getStoredToken(t);return!!e&&e.expires_at>Date.now()+6e4}clearToken(t){localStorage.removeItem(this._storageKey(t))}async startAuth(t,e,o){const i=null!=t?t:ft,r=null!=e?e:bt,s=await async function(){const t=new Uint8Array(96);return crypto.getRandomValues(t),wt(t)}(),a=await async function(t){const e=(new TextEncoder).encode(t),o=await crypto.subtle.digest("SHA-256",e);return wt(new Uint8Array(o))}(s),n=function(){const t=new Uint8Array(16);return crypto.getRandomValues(t),wt(t)}();this._pendingCsrf=n;const l=function(t,e,o,i){const r=JSON.stringify({s:t,v:e,c:o,r:i});return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}(n,s,i,r),c=`https://connect.parqet.com/oauth2/authorize?${new URLSearchParams({response_type:"code",client_id:i,redirect_uri:r,scope:"portfolio:read portfolio:write",code_challenge:a,code_challenge_method:"S256",state:l})}`;let d;return o&&!o.closed?(o.location.href=c,d=o):d=window.open(c,"parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes"),this._popup=d,new Promise((t,e)=>{const o=setTimeout(()=>{this._cleanup(),null==d||d.close(),e(new Error("Authorization timed out. Please try again."))},12e4);this._messageListener=r=>{var s;if("parqet-oauth"!==(null===(s=r.data)||void 0===s?void 0:s.type))return;const a=r.data;if(a.state!==this._pendingCsrf)return this._cleanup(),clearTimeout(o),null==d||d.close(),void e(new Error("OAuth state mismatch — possible CSRF attack."));if(this._cleanup(),clearTimeout(o),null==d||d.close(),a.error)return void e(new Error(`Authorization failed: ${a.error}`));if(!a.token)return void e(new Error("No token received from authorization callback."));const n=this._normalizeToken(a.token);this._storeToken(n,i),t(n)},window.addEventListener("message",this._messageListener)})}async refreshToken(t){const e=null!=t?t:ft,o=this.getStoredToken(e);if(!(null==o?void 0:o.refresh_token))throw this.clearToken(e),new Error("No refresh token available. Please reconnect.");const i=await fetch(mt,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:o.refresh_token,client_id:e})});if(!i.ok)throw this.clearToken(e),new Error(`Token refresh failed (${i.status}). Please reconnect.`);const r=await i.json(),s=this._normalizeToken(r);return this._storeToken(s,e),s}async getValidToken(t){if(this.isTokenValid(t))return this.getStoredToken(t).access_token;return(await this.refreshToken(t)).access_token}_normalizeToken(t){var e,o;const i=null!==(e=t.expires_in)&&void 0!==e?e:3600;return{access_token:t.access_token,refresh_token:t.refresh_token,token_type:null!==(o=t.token_type)&&void 0!==o?o:"Bearer",expires_in:i,expires_at:Date.now()+1e3*i}}_storeToken(t,e){localStorage.setItem(this._storageKey(e),JSON.stringify(t))}_cleanup(){this._messageListener&&(window.removeEventListener("message",this._messageListener),this._messageListener=null),this._pendingCsrf=null,this._popup=null}};const At=new class{configure(t){this.clientId=t}async _get(t){const e=await kt.getValidToken(this.clientId),o=await fetch(`${gt}${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!o.ok){const e=await o.text().catch(()=>"");throw new Error(`Parqet API error ${o.status} at ${t}: ${e}`)}return o.json()}async _post(t,e){const o=await kt.getValidToken(this.clientId),i=await fetch(`${gt}${t}`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok){const e=await i.text().catch(()=>"");throw new Error(`Parqet API error ${i.status} at ${t}: ${e}`)}return i.json()}async getUser(){return this._get("/user")}async listPortfolios(){return(await this._get("/portfolios")).items}async getPerformance(t,e){const o={portfolioIds:Array.isArray(t)?t:[t],interval:null!=e?e:{type:"relative",value:"max"}};return this._post("/performance",o)}async getActivities(t,e={}){const o=new URLSearchParams;if(e.activityType){(Array.isArray(e.activityType)?e.activityType:[e.activityType]).forEach(t=>o.append("activityType",t))}if(e.assetType){(Array.isArray(e.assetType)?e.assetType:[e.assetType]).forEach(t=>o.append("assetType",t))}if(e.holdingId){(Array.isArray(e.holdingId)?e.holdingId:[e.holdingId]).forEach(t=>o.append("holdingId",t))}null!=e.limit&&o.set("limit",String(e.limit)),e.cursor&&o.set("cursor",e.cursor);const i=o.toString();return this._get(`/portfolios/${t}/activities${i?`?${i}`:""}`)}};const Ct=new class{constructor(){this._reqId=0,this._initialized=!1}configure(t){this.clientId=t}async _send(t){var e;const o=await kt.getValidToken(this.clientId),i=await fetch(`${yt}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json",Accept:"application/json, text/event-stream"},body:JSON.stringify(t)});if(!i.ok){const t=await i.text().catch(()=>"");throw new Error(`MCP server error ${i.status}: ${t}`)}return(null!==(e=i.headers.get("content-type"))&&void 0!==e?e:"").includes("text/event-stream")?this._parseSSE(await i.text()):i.json()}_parseSSE(t){for(const e of t.split("\n"))if(e.startsWith("data: "))try{return JSON.parse(e.slice(6))}catch(t){}throw new Error("No valid JSON found in MCP SSE response.")}async _initialize(){const t=await kt.getValidToken(this.clientId);await fetch(`${yt}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:++this._reqId,method:"initialize",params:{protocolVersion:"2024-11-05",capabilities:{},clientInfo:{name:"parqet-ha-companion",version:"0.1.0"}}})}),this._initialized=!0}async _callTool(t,e={}){var o,i,r,s;this._initialized||await this._initialize();const a={jsonrpc:"2.0",id:++this._reqId,method:"tools/call",params:{name:t,arguments:e}},n=await this._send(a);if(n.error)throw new Error(`MCP tool error (${t}): ${n.error.message}`);if(null===(o=n.result)||void 0===o?void 0:o.isError)throw new Error(`MCP tool returned error for ${t}`);const l=null===(s=null===(r=null===(i=n.result)||void 0===i?void 0:i.content)||void 0===r?void 0:r[0])||void 0===s?void 0:s.text;if(!l)throw new Error(`Empty MCP response for tool ${t}`);return JSON.parse(l)}async getUser(){return this._callTool("parqet_get_user")}async listPortfolios(){return(await this._callTool("parqet_list_portfolios")).items}async getPerformance(t,e){const o=Array.isArray(t)?t:[t],i=await this._callTool("parqet_get_performance",Object.assign({portfolioIds:o},e?{intervalType:e.type,intervalValue:e.value}:{}));return"holdings"in i?i:{performance:i,holdings:[]}}async getActivities(t,e={}){return this._callTool("parqet_get_activities",Object.assign(Object.assign(Object.assign({portfolioId:t},null!=e.activityType?{activityType:e.activityType}:{}),null!=e.limit?{limit:e.limit}:{}),e.cursor?{cursor:e.cursor}:{}))}};let St=class extends lt{constructor(){super(...arguments),this.loading=!1,this.error=""}_handleConnect(){this.dispatchEvent(new CustomEvent("connect",{bubbles:!0,composed:!0}))}render(){return F`
      <div class="container">
        <img class="brand-icon" src="${$t}" alt="Parqet" width="64" height="64" />
        <h3 class="title">Parqet Home Assistant Companion</h3>
        <p class="subtitle">
          Connect your Parqet account to display portfolio data in your Home Assistant dashboard.
        </p>

        ${this.error?F`<div class="error-box" role="alert">${this.error}</div>`:""}

        <button
          class="connect-btn"
          @click=${this._handleConnect}
          ?disabled=${this.loading}
          aria-label="Connect with Parqet"
        >
          ${this.loading?F`<span class="spinner"></span> Connecting…`:F`
                <img
                  src="${$t}"
                  alt=""
                  aria-hidden="true"
                  class="btn-icon"
                  width="20"
                  height="20"
                />
                Connect with Parqet
              `}
        </button>
      </div>
    `}};St.styles=n`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 24px;
      gap: 12px;
      text-align: center;
    }
    .brand-icon {
      border-radius: 12px;
    }
    .title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .subtitle {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
      max-width: 300px;
      line-height: 1.5;
    }
    .error-box {
      background: var(--error-color, #f44336);
      color: white;
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 0.8rem;
      max-width: 300px;
    }
    .connect-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background-color: #009991;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 4px;
    }
    .connect-btn:hover:not(:disabled) {
      background-color: #5bcec2;
    }
    .connect-btn:focus-visible {
      outline: 2px solid #009991;
      outline-offset: 2px;
    }
    .connect-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .btn-icon {
      border-radius: 50%;
    }
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,e([ut({type:Boolean})],St.prototype,"loading",void 0),e([ut()],St.prototype,"error",void 0),St=e([dt("parqet-auth-prompt")],St);let Pt=class extends lt{constructor(){super(...arguments),this.portfolios=[],this.selected=null}_handleChange(t){const e=t.target;this.dispatchEvent(new CustomEvent("portfolio-change",{detail:{portfolioId:e.value},bubbles:!0,composed:!0}))}render(){return 0===this.portfolios.length?F``:F`
      <select
        class="selector"
        aria-label="Select portfolio"
        @change=${this._handleChange}
      >
        ${this.portfolios.map(t=>F`
            <option value=${t.id} ?selected=${t.id===this.selected}>${t.name}</option>
          `)}
      </select>
    `}};Pt.styles=n`
    .selector {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }
    .selector:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
  `,e([ut({type:Array})],Pt.prototype,"portfolios",void 0),e([ut()],Pt.prototype,"selected",void 0),Pt=e([dt("parqet-portfolio-selector")],Pt);let Et=class extends lt{render(){return F`
      <div class="container" role="status" aria-label="Loading">
        <div class="spinner"></div>
      </div>
    `}};Et.styles=n`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px;
    }
    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid var(--divider-color, #e0e0e0);
      border-top-color: var(--primary-color, #03a9f4);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,Et=e([dt("parqet-loading-spinner")],Et);let Tt=class extends lt{constructor(){super(...arguments),this.selected="1y"}_select(t){this.selected=t,this.dispatchEvent(new CustomEvent("interval-change",{detail:{interval:t},bubbles:!0,composed:!0}))}render(){return F`
      <div class="intervals" role="group" aria-label="Time interval">
        ${xt.map(({value:t,label:e})=>F`
            <button
              class="btn ${this.selected===t?"active":""}"
              @click=${()=>this._select(t)}
              aria-pressed=${this.selected===t}
            >
              ${e}
            </button>
          `)}
      </div>
    `}};Tt.styles=n`
    .intervals {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 8px 16px;
    }
    .btn {
      padding: 3px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: none;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn.active {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn:hover:not(.active) {
      color: var(--primary-text-color);
      border-color: var(--primary-text-color);
    }
    .btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
  `,e([ut()],Tt.prototype,"selected",void 0),Tt=e([dt("parqet-interval-selector")],Tt);let It=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._data=null,this._loading=!1,this._interval="1y",this._error=""}connectedCallback(){var t,e;super.connectedCallback(),this._interval=null!==(e=null===(t=this.config)||void 0===t?void 0:t.default_interval)&&void 0!==e?e:"1y",this._load()}updated(t){t.has("portfolioId")&&this.portfolioId&&this._load()}async _load(){if(this.portfolioId&&this.client){this._loading=!0,this._error="";try{const t=await this.client.getPerformance(this.portfolioId,{type:"relative",value:this._interval});this._data=t.performance}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _onIntervalChange(t){this._interval=t.detail.interval,await this._load()}_sym(){var t,e;return null!==(e=null===(t=this.config)||void 0===t?void 0:t.currency_symbol)&&void 0!==e?e:"€"}_fmtCurrency(t){return null==t?"—":`${this._sym()}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtPct(t){if(null==t)return"—";const e=100*t;return`${e>=0?"+":""}${e.toFixed(2)}%`}_kpiClass(t){return null==t?"":t>0?"positive":t<0?"negative":""}render(){var t,e,o,i,r,s,a,n,l,c,d,p,h,u,v,f,_,m,g,y,b,$,x,w;const k=this._data;return F`
      <parqet-interval-selector
        .selected=${this._interval}
        @interval-change=${this._onIntervalChange}
      ></parqet-interval-selector>

      ${this._error?F`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?F`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      ${k?F`
            <div class="kpi-grid ${(null===(t=this.config)||void 0===t?void 0:t.compact)?"compact":""}">
              ${this._renderKpi("Total Value",this._fmtCurrency(null===(e=k.valuation)||void 0===e?void 0:e.atIntervalEnd))}
              ${this._renderKpi("XIRR",this._fmtPct(null===(i=null===(o=k.kpis)||void 0===o?void 0:o.inInterval)||void 0===i?void 0:i.xirr),null===(s=null===(r=k.kpis)||void 0===r?void 0:r.inInterval)||void 0===s?void 0:s.xirr)}
              ${this._renderKpi("TTWROR",this._fmtPct(null===(n=null===(a=k.kpis)||void 0===a?void 0:a.inInterval)||void 0===n?void 0:n.ttwror),null===(c=null===(l=k.kpis)||void 0===l?void 0:l.inInterval)||void 0===c?void 0:c.ttwror)}
              ${this._renderKpi("Unrealized Gain",this._fmtCurrency(null===(p=null===(d=k.unrealizedGains)||void 0===d?void 0:d.inInterval)||void 0===p?void 0:p.gainGross),null===(u=null===(h=k.unrealizedGains)||void 0===h?void 0:h.inInterval)||void 0===u?void 0:u.gainGross)}
              ${(()=>{var t,e,o,i;const r=null!==(e=null===(t=k.valuation)||void 0===t?void 0:t.atIntervalStart)&&void 0!==e?e:0,s=null!==(i=null===(o=k.valuation)||void 0===o?void 0:o.atIntervalEnd)&&void 0!==i?i:0,a=r>0?(s-r)/r:null;return this._renderKpi("Period Return",this._fmtPct(a),a)})()}
              ${this._renderKpi("Realized Gain",this._fmtCurrency(null===(f=null===(v=k.realizedGains)||void 0===v?void 0:v.inInterval)||void 0===f?void 0:f.gainGross),null===(m=null===(_=k.realizedGains)||void 0===_?void 0:_.inInterval)||void 0===m?void 0:m.gainGross)}
              ${this._renderKpi("Dividends",this._fmtCurrency(null===(y=null===(g=k.dividends)||void 0===g?void 0:g.inInterval)||void 0===y?void 0:y.gainGross))}
              ${this._renderKpi("Fees",this._fmtCurrency(null===($=null===(b=k.fees)||void 0===b?void 0:b.inInterval)||void 0===$?void 0:$.fees))}
              ${this._renderKpi("Taxes",this._fmtCurrency(null===(w=null===(x=k.taxes)||void 0===x?void 0:x.inInterval)||void 0===w?void 0:w.taxes))}
            </div>
          `:this._loading?"":F`<div class="empty">No data available.</div>`}
    `}_renderKpi(t,e,o){return F`
      <div class="kpi-tile">
        <div class="kpi-label">${t}</div>
        <div class="kpi-value ${this._kpiClass(o)}">${e}</div>
      </div>
    `}};It.styles=n`
    :host {
      display: block;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      padding: 8px 16px 16px;
    }
    .kpi-grid.compact {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 4px;
      padding: 6px 10px 10px;
    }
    .kpi-tile {
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .kpi-grid.compact .kpi-tile {
      padding: 6px 8px;
      border-radius: 6px;
    }
    .kpi-label {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .kpi-grid.compact .kpi-label {
      font-size: 0.6rem;
      margin-bottom: 2px;
    }
    .kpi-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .kpi-grid.compact .kpi-value {
      font-size: 0.8rem;
    }
    .kpi-value.positive {
      color: var(--success-color, #4caf50);
    }
    .kpi-value.negative {
      color: var(--error-color, #f44336);
    }
    .error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
  `,e([ut()],It.prototype,"portfolioId",void 0),e([ut({attribute:!1})],It.prototype,"client",void 0),e([ut({attribute:!1})],It.prototype,"config",void 0),e([vt()],It.prototype,"_data",void 0),e([vt()],It.prototype,"_loading",void 0),e([vt()],It.prototype,"_interval",void 0),e([vt()],It.prototype,"_error",void 0),It=e([dt("parqet-performance-view")],It);let qt=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._holdings=[],this._loading=!1,this._error="",this._sortKey="value",this._sortAsc=!1,this._expandedId=null}connectedCallback(){super.connectedCallback(),this._load()}updated(t){t.has("portfolioId")&&this.portfolioId&&this._load()}async _load(){var t;if(this.portfolioId&&this.client){this._loading=!0,this._error="";try{const e=await this.client.getPerformance(this.portfolioId,{type:"relative",value:"max"});this._holdings=null!==(t=e.holdings)&&void 0!==t?t:[]}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}_handleSort(t){this._sortKey===t?this._sortAsc=!this._sortAsc:(this._sortKey=t,this._sortAsc=!1)}_assetLabel(t){if(t.nickname)return t.nickname;const e=t.asset;return e.name?e.name:e.symbol?e.symbol:`…${t.id.slice(-8)}`}_sortHoldings(t){const e=t.reduce((t,e)=>t+e.position.currentValue,0);return[...t].sort((t,o)=>{let i,r;const s=t.position.currentValue-t.position.purchaseValue,a=o.position.currentValue-o.position.purchaseValue;switch(this._sortKey){case"name":return this._sortAsc?this._assetLabel(t).localeCompare(this._assetLabel(o)):this._assetLabel(o).localeCompare(this._assetLabel(t));case"value":i=t.position.currentValue,r=o.position.currentValue;break;case"pl":i=s,r=a;break;case"plPct":i=t.position.purchaseValue>0?s/t.position.purchaseValue:0,r=o.position.purchaseValue>0?a/o.position.purchaseValue:0;break;case"weight":i=e>0?t.position.currentValue/e:0,r=e>0?o.position.currentValue/e:0;break;default:return 0}return this._sortAsc?i-r:r-i})}_sym(){var t,e;return null!==(e=null===(t=this.config)||void 0===t?void 0:t.currency_symbol)&&void 0!==e?e:"€"}_fmtC(t){return null==t?"—":`${this._sym()}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtNum(t,e=4){return null==t?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}_sortIcon(t){return this._sortKey!==t?" ↕":this._sortAsc?" ↑":" ↓"}render(){var t,e;if(this._loading&&0===this._holdings.length)return F`<parqet-loading-spinner></parqet-loading-spinner>`;const o=this._holdings.filter(t=>!t.position.isSold),i=this._sortHoldings(o),r=o.reduce((t,e)=>t+e.position.currentValue,0),s=!1!==(null===(t=this.config)||void 0===t?void 0:t.show_logo),a=!!(null===(e=this.config)||void 0===e?void 0:e.compact);return F`
      ${this._error?F`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?F`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${s?F`<th class="logo-col"></th>`:""}
              <th @click=${()=>this._handleSort("name")}>Name${this._sortIcon("name")}</th>
              <th class="num" @click=${()=>this._handleSort("value")}>
                Value${this._sortIcon("value")}
              </th>
              <th class="num" @click=${()=>this._handleSort("pl")}>
                P&amp;L${this._sortIcon("pl")}
              </th>
              <th class="num" @click=${()=>this._handleSort("plPct")}>
                P&amp;L %${this._sortIcon("plPct")}
              </th>
              <th class="num" @click=${()=>this._handleSort("weight")}>
                Weight${this._sortIcon("weight")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(t=>{var e,o,i,n,l,c,d,p,h;const u=t.position.currentValue-t.position.purchaseValue,v=t.position.purchaseValue>0?u/t.position.purchaseValue:0,f=r>0?t.position.currentValue/r:0,_=u>0?"positive":u<0?"negative":"",m=this._expandedId===t.id,g=null!==(o=null!==(e=t.asset.isin)&&void 0!==e?e:t.asset.symbol)&&void 0!==o?o:"";return F`
                <tr
                  class="row ${a?"compact":""}"
                  @click=${()=>this._expandedId=m?null:t.id}
                  role="button"
                  tabindex="0"
                  aria-expanded=${m}
                  @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(this._expandedId=m?null:t.id)}}
                >
                  ${s?F`<td class="logo-col">
                        ${t.logo?F`<img class="logo" src=${t.logo} alt="" loading="lazy" />`:F`<div class="logo-placeholder"></div>`}
                      </td>`:""}
                  <td class="name-col">
                    <span class="holding-name">${this._assetLabel(t)}</span>
                    ${g?F`<span class="ticker">${g}</span>`:""}
                  </td>
                  <td class="num">${this._fmtC(t.position.currentValue)}</td>
                  <td class="num ${_}">${this._fmtC(u)}</td>
                  <td class="num ${_}">
                    ${100*v>=0?"+":""}${(100*v).toFixed(2)}%
                  </td>
                  <td class="num">${(100*f).toFixed(1)}%</td>
                </tr>
                ${m?F`
                      <tr class="expanded-row">
                        <td colspan=${s?6:5}>
                          <div class="expanded">
                            <span>Shares: ${this._fmtNum(t.position.shares)}</span>
                            <span>Avg Price: ${this._fmtC(t.position.purchasePrice)}</span>
                            <span>Curr Price: ${this._fmtC(t.position.currentPrice)}</span>
                            <span>
                              XIRR:
                              ${null!=(null===(n=null===(i=t.performance.kpis)||void 0===i?void 0:i.inInterval)||void 0===n?void 0:n.xirr)?`${(100*t.performance.kpis.inInterval.xirr).toFixed(2)}%`:"—"}
                            </span>
                            <span>
                              Dividends: ${this._fmtC(null===(c=null===(l=t.performance.dividends)||void 0===l?void 0:l.inInterval)||void 0===c?void 0:c.gainGross)}
                            </span>
                            <span>Fees: ${this._fmtC(null===(p=null===(d=t.performance.fees)||void 0===d?void 0:d.inInterval)||void 0===p?void 0:p.fees)}</span>
                            ${(null===(h=t.quote)||void 0===h?void 0:h.exchange)?F`<span>Exchange: ${t.quote.exchange}</span>`:""}
                          </div>
                        </td>
                      </tr>
                    `:""}
              `})}
          </tbody>
        </table>
        ${0!==i.length||this._loading?"":F`<div class="empty">No holdings found.</div>`}
      </div>
    `}};qt.styles=n`
    :host {
      display: block;
    }
    .table-wrap {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.83rem;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--card-background-color, var(--primary-background-color));
    }
    th {
      padding: 8px 12px;
      text-align: left;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
    th:hover {
      color: var(--primary-text-color);
    }
    th.num,
    td.num {
      text-align: right;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid var(--divider-color, #eee);
      color: var(--primary-text-color);
      vertical-align: middle;
    }
    .row {
      cursor: pointer;
      transition: background 0.12s;
    }
    .row:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .row.compact td {
      padding: 3px 8px;
      font-size: 0.75rem;
    }
    .row.compact .holding-name {
      font-size: 0.78rem;
    }
    .row.compact .ticker {
      display: none;
    }
    .row.compact .logo,
    .row.compact .logo-placeholder {
      width: 18px;
      height: 18px;
    }
    .logo-col {
      width: 32px;
      padding-right: 4px;
    }
    .logo,
    .logo-placeholder {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .logo-placeholder {
      background: var(--divider-color, #e0e0e0);
    }
    .name-col {
      max-width: 180px;
    }
    .holding-name {
      display: block;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ticker {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .positive {
      color: var(--success-color, #4caf50);
    }
    .negative {
      color: var(--error-color, #f44336);
    }
    .expanded-row td {
      padding: 6px 12px 10px;
    }
    .expanded {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
    .error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
  `,e([ut()],qt.prototype,"portfolioId",void 0),e([ut({attribute:!1})],qt.prototype,"client",void 0),e([ut({attribute:!1})],qt.prototype,"config",void 0),e([vt()],qt.prototype,"_holdings",void 0),e([vt()],qt.prototype,"_loading",void 0),e([vt()],qt.prototype,"_error",void 0),e([vt()],qt.prototype,"_sortKey",void 0),e([vt()],qt.prototype,"_sortAsc",void 0),e([vt()],qt.prototype,"_expandedId",void 0),qt=e([dt("parqet-holdings-view")],qt);const zt=[{value:"all",label:"All",color:"var(--primary-color, #03a9f4)"},{value:"buy",label:"Buy",color:"#4caf50"},{value:"sell",label:"Sell",color:"#f44336"},{value:"dividend",label:"Dividend",color:"#2196f3"},{value:"interest",label:"Interest",color:"#00bcd4"},{value:"transfer_in",label:"Transfer In",color:"#9c27b0"},{value:"transfer_out",label:"Transfer Out",color:"#7b1fa2"},{value:"fees_taxes",label:"Fees/Taxes",color:"#ff9800"},{value:"deposit",label:"Deposit",color:"#009688"},{value:"withdrawal",label:"Withdrawal",color:"#795548"}],Ot=Object.fromEntries(zt.map(t=>[t.value,t.color]));let Mt=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._activities=[],this._cursor=null,this._loading=!1,this._loadingMore=!1,this._hasMore=!1,this._filter="all",this._error=""}connectedCallback(){var t,e;super.connectedCallback(),this._filter=null!==(e=null===(t=this.config)||void 0===t?void 0:t.default_activity_type)&&void 0!==e?e:"all",this._load(!0)}updated(t){t.has("portfolioId")&&this.portfolioId&&(this._reset(),this._load(!0))}_reset(){this._activities=[],this._cursor=null,this._hasMore=!1}async _load(t=!1){var e,o;if(this.portfolioId&&this.client){t&&this._reset(),t?this._loading=!0:this._loadingMore=!0,this._error="";try{const i=await this.client.getActivities(this.portfolioId,{activityType:"all"!==this._filter?this._filter:void 0,limit:Math.max(10,null!==(o=null===(e=this.config)||void 0===e?void 0:e.activities_limit)&&void 0!==o?o:10),cursor:t?null:this._cursor});this._activities=t?i.activities:[...this._activities,...i.activities],this._cursor=i.cursor,this._hasMore=!!i.cursor}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1,this._loadingMore=!1}}}async _setFilter(t){this._filter=t,await this._load(!0)}_fmtDate(t){return new Date(t).toLocaleDateString(void 0,{day:"2-digit",month:"2-digit",year:"numeric"})}_fmtC(t){var e,o;if(null==t)return"—";return`${null!==(o=null===(e=this.config)||void 0===e?void 0:e.currency_symbol)&&void 0!==o?o:"€"}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_typeLabel(t){return t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}render(){var t,e,o;const i=!!(null===(t=this.config)||void 0===t?void 0:t.compact);return F`
      <!-- Filter chips -->
      <div class="filters" role="group" aria-label="Filter activities">
        ${zt.map(t=>F`
            <button
              class="chip ${this._filter===t.value?"active":""}"
              style="--chip-color: ${t.color}"
              @click=${()=>this._setFilter(t.value)}
              aria-pressed=${this._filter===t.value}
            >
              ${t.label}
            </button>
          `)}
      </div>

      ${this._error?F`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?F`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      <div class="list">
        ${this._activities.slice(0,null!==(o=null===(e=this.config)||void 0===e?void 0:e.activities_limit)&&void 0!==o?o:10).map(t=>this._renderActivity(t,i))}
        ${0!==this._activities.length||this._loading?"":F`<div class="empty">No activities found.</div>`}
      </div>

      ${this._hasMore?F`
            <div class="load-more">
              <button
                class="load-more-btn"
                @click=${()=>this._load(!1)}
                ?disabled=${this._loadingMore}
              >
                ${this._loadingMore?"Loading…":"Load more"}
              </button>
            </div>
          `:""}
    `}_assetLabel(t){var e,o,i;return(null===(e=t.asset)||void 0===e?void 0:e.name)?t.asset.name:(null===(o=t.asset)||void 0===o?void 0:o.symbol)?t.asset.symbol:(null===(i=t.asset)||void 0===i?void 0:i.isin)?t.asset.isin:`…${t.holdingId.slice(-8)}`}_renderActivity(t,e){var o;const i=null!==(o=Ot[t.type])&&void 0!==o?o:"#888",r=null!=t.tax&&0!==t.tax||null!=t.fee&&0!==t.fee;return F`
      <div class="activity ${e?"compact":""}">
        <span class="badge" style="background: ${i}">${this._typeLabel(t.type)}</span>
        <div class="info">
          <span class="asset">${this._assetLabel(t)}</span>
          <span class="date">
            ${this._fmtDate(t.datetime)}${t.broker?F` · <span class="broker">${t.broker.replace(/_/g," ")}</span>`:""}
          </span>
          ${r?F`<span class="taxfee">
                ${t.tax?`Tax: ${this._fmtC(t.tax)}`:""}${t.tax&&t.fee?" · ":""}${t.fee?`Fee: ${this._fmtC(t.fee)}`:""}
              </span>`:""}
        </div>
        <div class="amounts">
          ${null!=t.shares?F`<span class="shares">${t.shares.toLocaleString()} shares</span>`:""}
          <span class="amount">${this._fmtC(t.amount)}</span>
        </div>
      </div>
    `}};Mt.styles=n`
    :host {
      display: block;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 8px 16px;
    }
    .chip {
      padding: 3px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: none;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .chip.active {
      background: var(--chip-color, var(--primary-color));
      color: white;
      border-color: var(--chip-color, var(--primary-color));
    }
    .chip:hover:not(.active) {
      color: var(--primary-text-color);
      border-color: var(--primary-text-color);
    }
    .chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .list {
      padding: 0 8px;
    }
    .activity {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 8px;
      border-bottom: 1px solid var(--divider-color, #eee);
    }
    .activity.compact {
      padding: 3px 6px;
      font-size: 0.78rem;
    }
    .activity.compact .badge {
      font-size: 0.62rem;
      padding: 1px 5px;
      min-width: 60px;
    }
    .activity.compact .asset {
      font-size: 0.78rem;
    }
    .activity.compact .date {
      font-size: 0.65rem;
    }
    .activity.compact .broker,
    .activity.compact .taxfee {
      display: none;
    }
    .activity.compact .amount {
      font-size: 0.78rem;
    }
    .activity.compact .shares {
      display: none;
    }
    .activity:last-child {
      border-bottom: none;
    }
    .badge {
      min-width: 76px;
      text-align: center;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.68rem;
      font-weight: 600;
      color: white;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .asset {
      display: block;
      font-size: 0.83rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .date {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .broker {
      text-transform: capitalize;
    }
    .taxfee {
      display: block;
      font-size: 0.68rem;
      color: var(--secondary-text-color);
    }
    .amounts {
      text-align: right;
      flex-shrink: 0;
    }
    .shares {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .amount {
      display: block;
      font-size: 0.83rem;
      font-weight: 600;
    }
    .error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
    .load-more {
      padding: 12px;
      text-align: center;
    }
    .load-more-btn {
      padding: 6px 20px;
      background: none;
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      border-radius: 16px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.15s;
    }
    .load-more-btn:hover:not(:disabled) {
      background: var(--primary-color, #03a9f4);
      color: white;
    }
    .load-more-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,e([ut()],Mt.prototype,"portfolioId",void 0),e([ut({attribute:!1})],Mt.prototype,"client",void 0),e([ut({attribute:!1})],Mt.prototype,"config",void 0),e([vt()],Mt.prototype,"_activities",void 0),e([vt()],Mt.prototype,"_cursor",void 0),e([vt()],Mt.prototype,"_loading",void 0),e([vt()],Mt.prototype,"_loadingMore",void 0),e([vt()],Mt.prototype,"_hasMore",void 0),e([vt()],Mt.prototype,"_filter",void 0),e([vt()],Mt.prototype,"_error",void 0),Mt=e([dt("parqet-activities-view")],Mt);const Ut=window;Ut.customCards=Ut.customCards||[],Ut.customCards.push({type:"parqet-companion-card",name:"Parqet Home Assistant Companion",description:"Display your Parqet portfolio data — performance, holdings and activities.",preview:!0,documentationURL:"https://github.com/cubinet-code/parqet-homeassistant-companion"}),t.ParqetCompanionCard=class extends lt{constructor(){super(...arguments),this._authenticated=!1,this._portfolios=[],this._portfolioId=null,this._activeView="performance",this._loading=!1,this._authLoading=!1,this._error=""}connectedCallback(){var t;super.connectedCallback(),this._authenticated=kt.isTokenValid(null===(t=this._config)||void 0===t?void 0:t.client_id),this._authenticated&&this._loadPortfolios()}updated(t){var e;t.has("hass")&&!this._authenticated&&kt.isTokenValid(null===(e=this._config)||void 0===e?void 0:e.client_id)&&(this._authenticated=!0,this._loadPortfolios())}setConfig(t){this._config=Object.assign({data_source:"rest",view_layout:"tabs",default_view:"performance",default_interval:"1y",show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€",activities_limit:25},t),this._activeView=this._config.default_view,At.configure(this._config.client_id),Ct.configure(this._config.client_id)}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:6,min_columns:6,min_rows:4}}static getConfigElement(){return document.createElement("parqet-companion-card-editor")}static getStubConfig(){return{data_source:"rest",default_view:"performance",default_interval:"1y",show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€"}}static getConfigForm(){return[{name:"data_source",label:"Data Source",selector:{select:{options:[{value:"rest",label:"Connect REST API (recommended)"},{value:"mcp",label:"MCP Server (mcp.parqet.com)"}]}}},{type:"expandable",title:"Layout",flatten:!0,schema:[{name:"view_layout",label:"View Layout",selector:{select:{options:[{value:"tabs",label:"Tabs (all views)"},{value:"single",label:"Single view only"}]}}},{name:"default_view",label:"Default View",selector:{select:{options:[{value:"performance",label:"Performance"},{value:"holdings",label:"Holdings"},{value:"activities",label:"Activities"}]}}},{name:"compact",label:"Compact mode",selector:{boolean:{}}},{name:"hide_header",label:"Hide portfolio header (useful when portfolio is locked)",selector:{boolean:{}}}]},{type:"expandable",title:"Performance",flatten:!0,schema:[{name:"default_interval",label:"Default Time Interval",selector:{select:{options:[{value:"1d",label:"1 Day"},{value:"1w",label:"1 Week"},{value:"mtd",label:"Month to Date"},{value:"1m",label:"1 Month"},{value:"3m",label:"3 Months"},{value:"6m",label:"6 Months"},{value:"1y",label:"1 Year"},{value:"ytd",label:"Year to Date"},{value:"3y",label:"3 Years"},{value:"5y",label:"5 Years"},{value:"10y",label:"10 Years"},{value:"max",label:"All Time"}]}}}]},{type:"expandable",title:"Holdings",flatten:!0,schema:[{name:"show_logo",label:"Show holding logos",selector:{boolean:{}}}]},{type:"expandable",title:"Activities",flatten:!0,schema:[{name:"activities_limit",label:"Activities to show (1–25)",selector:{number:{min:1,max:25,step:1,mode:"box"}}},{name:"default_activity_type",label:"Default activity filter",selector:{select:{options:[{value:"all",label:"All"},{value:"buy",label:"Buy"},{value:"sell",label:"Sell"},{value:"dividend",label:"Dividend"},{value:"interest",label:"Interest"},{value:"transfer_in",label:"Transfer In"},{value:"transfer_out",label:"Transfer Out"},{value:"fees_taxes",label:"Fees / Taxes"},{value:"deposit",label:"Deposit"},{value:"withdrawal",label:"Withdrawal"}]}}}]},{type:"expandable",title:"Display",flatten:!0,schema:[{name:"currency_symbol",label:"Currency Symbol",selector:{text:{}}}]},{type:"expandable",title:"Advanced",flatten:!0,schema:[{name:"client_id",label:"Parqet Connect Client ID (optional — leave blank to use shared default)",selector:{text:{}}},{name:"redirect_uri",label:"OAuth Redirect URI (optional — required when using your own Client ID)",selector:{text:{}}}]}]}get _client(){var t;return"mcp"===(null===(t=this._config)||void 0===t?void 0:t.data_source)?Ct:At}async _loadPortfolios(){var t,e,o,i,r;this._loading=!0,this._error="";try{this._portfolios=await this._client.listPortfolios(),this._portfolioId=null!==(i=null!==(e=null===(t=this._config)||void 0===t?void 0:t.portfolio_id)&&void 0!==e?e:null===(o=this._portfolios[0])||void 0===o?void 0:o.id)&&void 0!==i?i:null}catch(t){this._error=t instanceof Error?t.message:String(t),String(t).includes("401")&&(kt.clearToken(null===(r=this._config)||void 0===r?void 0:r.client_id),this._authenticated=!1)}finally{this._loading=!1}}async _handleConnect(){var t,e;this._authLoading=!0,this._error="";const o=window.open("","parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes");try{await kt.startAuth(null===(t=this._config)||void 0===t?void 0:t.client_id,null===(e=this._config)||void 0===e?void 0:e.redirect_uri,o),this._authenticated=!0,await this._loadPortfolios()}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._authLoading=!1}}_handleDisconnect(){var t;kt.clearToken(null===(t=this._config)||void 0===t?void 0:t.client_id),this._authenticated=!1,this._portfolios=[],this._portfolioId=null,this._error=""}_handlePortfolioChange(t){this._portfolioId=t.detail.portfolioId}render(){var t,e,o,i;if(!this._authenticated)return F`
        <ha-card>
          <parqet-auth-prompt
            .loading=${this._authLoading}
            .error=${this._error}
            @connect=${this._handleConnect}
          ></parqet-auth-prompt>
        </ha-card>
      `;if(this._loading&&0===this._portfolios.length)return F`
        <ha-card>
          <parqet-loading-spinner></parqet-loading-spinner>
        </ha-card>
      `;const r="single"!==(null===(t=this._config)||void 0===t?void 0:t.view_layout);return F`
      <ha-card>
        <!-- Header row -->
        ${(null===(e=this._config)||void 0===e?void 0:e.hide_header)?"":F`
              <div class="card-header">
                ${this._portfolios.length>1?F`
                      <parqet-portfolio-selector
                        .portfolios=${this._portfolios}
                        .selected=${this._portfolioId}
                        @portfolio-change=${this._handlePortfolioChange}
                      ></parqet-portfolio-selector>
                    `:F`<span class="portfolio-name">${null!==(i=null===(o=this._portfolios[0])||void 0===o?void 0:o.name)&&void 0!==i?i:""}</span>`}
              </div>
            `}

        <!-- Tabs -->
        ${r?F`
              <div class="tabs" role="tablist">
                ${["performance","holdings","activities"].map(t=>F`
                    <button
                      class="tab ${this._activeView===t?"active":""}"
                      role="tab"
                      aria-selected=${this._activeView===t}
                      @click=${()=>this._activeView=t}
                    >
                      ${t.charAt(0).toUpperCase()+t.slice(1)}
                    </button>
                  `)}
              </div>
            `:""}

        ${this._error?F`<div class="card-error">${this._error}</div>`:""}

        <!-- View content -->
        <div class="view-content" role="tabpanel">
          ${this._portfolioId?this._renderView():F`<div class="empty">No portfolio selected.</div>`}
        </div>
      </ha-card>
    `}_renderView(){const t=this._portfolioId,e=this._activeView;return"performance"===e?F`
        <parqet-performance-view
          .portfolioId=${t}
          .client=${this._client}
          .config=${this._config}
        ></parqet-performance-view>
      `:"holdings"===e?F`
        <parqet-holdings-view
          .portfolioId=${t}
          .client=${this._client}
          .config=${this._config}
        ></parqet-holdings-view>
      `:F`
      <parqet-activities-view
        .portfolioId=${t}
        .client=${this._client}
        .config=${this._config}
      ></parqet-activities-view>
    `}},t.ParqetCompanionCard.styles=n`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      min-height: 48px;
    }
    .portfolio-name {
      font-weight: 600;
      font-size: 1rem;
      color: var(--primary-text-color);
    }
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .tab {
      flex: 1;
      padding: 10px 4px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.15s, border-color 0.15s;
    }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
    }
    .tab:hover:not(.active) {
      color: var(--primary-text-color);
    }
    .tab:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .card-error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .view-content {
      overflow: hidden;
    }
    .empty {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
  `,e([ut({attribute:!1})],t.ParqetCompanionCard.prototype,"hass",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_config",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_authenticated",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_portfolios",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_portfolioId",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_activeView",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_loading",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_authLoading",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_error",void 0),t.ParqetCompanionCard=e([dt("parqet-companion-card")],t.ParqetCompanionCard);let Lt=class extends lt{constructor(){super(...arguments),this._connected=!1,this._portfolios=[],this._loadingPortfolios=!1}setConfig(t){this._config=t,this._connected=kt.isTokenValid(t.client_id),this._connected&&0===this._portfolios.length&&this._fetchPortfolios()}async _fetchPortfolios(){var t;this._loadingPortfolios=!0;try{const e="mcp"===(null===(t=this._config)||void 0===t?void 0:t.data_source)?Ct:At;this._portfolios=await e.listPortfolios()}catch(t){}finally{this._loadingPortfolios=!1}}render(){return this._config&&this.hass?F`
      <div class="auth-row">
        <div class="auth-status">
          <span class="auth-dot ${this._connected?"connected":"disconnected"}"></span>
          ${this._connected?"Connected to Parqet":"Not connected"}
        </div>
        ${this._connected?F`
              <button class="disconnect-btn" @click=${this._handleDisconnect}>
                Disconnect
              </button>
            `:""}
      </div>

      <!-- Portfolio picker -->
      <div class="portfolio-row">
        <label class="portfolio-label">Portfolio</label>
        ${this._loadingPortfolios?F`<div class="portfolio-hint">Loading portfolios…</div>`:this._portfolios.length>0?F`
                <select class="portfolio-select" @change=${this._portfolioChanged}>
                  <option value="" ?selected=${!this._config.portfolio_id}>
                    Show portfolio picker in card
                  </option>
                  ${this._portfolios.map(t=>{var e;return F`
                      <option
                        value=${t.id}
                        ?selected=${(null===(e=this._config)||void 0===e?void 0:e.portfolio_id)===t.id}
                      >
                        ${t.name}
                      </option>
                    `})}
                </select>
              `:F`<div class="portfolio-hint">
                ${this._connected?"No portfolios found":"Connect to Parqet first, then re-open the editor"}
              </div>`}
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t.ParqetCompanionCard.getConfigForm()}
        .computeLabel=${t=>{var e;return null!==(e=t.label)&&void 0!==e?e:""}}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:F``}_portfolioChanged(t){const e=t.target.value,o=Object.assign({},this._config);e?o.portfolio_id=e:delete o.portfolio_id,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}_handleDisconnect(){var t;kt.clearToken(null===(t=this._config)||void 0===t?void 0:t.client_id),this._connected=!1}_valueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};return Lt.styles=n`
    .auth-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }
    .auth-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--primary-text-color);
    }
    .auth-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .auth-dot.connected    { background: #4caf50; }
    .auth-dot.disconnected { background: var(--secondary-text-color, #9e9e9e); }
    .disconnect-btn {
      background: none;
      border: 1px solid var(--error-color, #f44336);
      color: var(--error-color, #f44336);
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background 0.15s;
    }
    .disconnect-btn:hover {
      background: rgba(244, 67, 54, 0.08);
    }
    .portfolio-row {
      padding: 8px 16px 4px;
    }
    .portfolio-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }
    .portfolio-select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.875rem;
      cursor: pointer;
    }
    .portfolio-select:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .portfolio-hint {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `,e([ut({attribute:!1})],Lt.prototype,"hass",void 0),e([vt()],Lt.prototype,"_config",void 0),e([vt()],Lt.prototype,"_connected",void 0),e([vt()],Lt.prototype,"_portfolios",void 0),e([vt()],Lt.prototype,"_loadingPortfolios",void 0),Lt=e([dt("parqet-companion-card-editor")],Lt),t}({});
