var ParqetCard=function(t){"use strict";function e(t,e,i,o){var r,s=arguments.length,n=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(s<3?r(n):s>3?r(e,i,n):r(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,r)},l=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:v}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,k=t=>t,C=A.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+P,T=`<${I}>`,q=document,z=()=>q.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,N=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),K=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),G=new WeakMap,W=q.createTreeWalker(q,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===D?"!--"===l[1]?n=V:void 0!==l[1]?n=N:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=r??D,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?H:L):n===H||n===L?n=R:n===V||n===N?n=D:(n=R,r=void 0);const p=n===R&&t[e+1].startsWith("/>")?" ":"";s+=n===D?i+T:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+P+p):i+P+(-2===c?e:p)}return[J(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class X{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const n=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=X.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=c[s++],i=o.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?ot:"@"===n[1]?rt:et}),o.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(j.test(o.tagName)){const t=o.textContent.split(P),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],z()),W.nextNode(),a.push({type:2,index:++r});o.append(t[e],z())}}}else if(8===o.nodeType)if(o.data===I)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=q.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,o){if(e===K)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=O(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??q).importNode(e,!0);W.currentNode=o;let r=W.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}s!==a?.index&&(r=W.nextNode(),s++)}return W.currentNode=q,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new tt(this.O(z()),this.O(z()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=Z(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==K,s&&(this._$AH=t);else{const o=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,o[i+n],e,n),a===K&&(a=this._$AH[n]),s||=!O(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}s&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class rt extends et{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===K)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(X,tt),(A.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new tt(e.insertBefore(z(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ht=(t=pt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function vt(t){return ut({...t,state:!0,attribute:!1})}const _t="019cf96b-44f0-73c4-81f2-e8827d5c1e65",ft="https://parqet-token-proxy.oliver-f26.workers.dev",gt=`${ft}/oauth2/token`,mt=ft,yt="https://mcp.parqet.com",bt="undefined"!=typeof window&&"localhost"===window.location.hostname?"http://localhost:3000/callback.html":"https://cubinet-code.github.io/parqet-homeassistant-companion/callback.html",$t="https://developer.parqet.com/img/parqet-icon-trans.svg",xt=[{value:"1d",label:"1D"},{value:"1w",label:"1W"},{value:"mtd",label:"MTD"},{value:"1m",label:"1M"},{value:"3m",label:"3M"},{value:"6m",label:"6M"},{value:"1y",label:"1Y"},{value:"ytd",label:"YTD"},{value:"3y",label:"3Y"},{value:"5y",label:"5Y"},{value:"10y",label:"10Y"},{value:"max",label:"Max"}];function wt(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}const At=new class{constructor(){this._messageListener=null,this._pendingCsrf=null,this._popup=null}_storageKey(t){return`parqet_card_auth_${null!=t?t:_t}`}getStoredToken(t){try{const e=localStorage.getItem(this._storageKey(t));return e?JSON.parse(e):null}catch(t){return null}}isTokenValid(t){const e=this.getStoredToken(t);return!!e&&e.expires_at>Date.now()+6e4}clearToken(t){localStorage.removeItem(this._storageKey(t))}async startAuth(t,e,i){const o=null!=t?t:_t,r=null!=e?e:bt,s=await async function(){const t=new Uint8Array(96);return crypto.getRandomValues(t),wt(t)}(),n=await async function(t){const e=(new TextEncoder).encode(t),i=await crypto.subtle.digest("SHA-256",e);return wt(new Uint8Array(i))}(s),a=function(){const t=new Uint8Array(16);return crypto.getRandomValues(t),wt(t)}();this._pendingCsrf=a;const l=function(t,e,i,o){const r=JSON.stringify({s:t,v:e,c:i,r:o});return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}(a,s,o,r),c=`https://connect.parqet.com/oauth2/authorize?${new URLSearchParams({response_type:"code",client_id:o,redirect_uri:r,scope:"portfolio:read portfolio:write",code_challenge:n,code_challenge_method:"S256",state:l})}`;let d;return i&&!i.closed?(i.location.href=c,d=i):d=window.open(c,"parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes"),this._popup=d,new Promise((t,e)=>{const i=setTimeout(()=>{this._cleanup(),null==d||d.close(),e(new Error("Authorization timed out. Please try again."))},12e4);this._messageListener=r=>{var s;if("parqet-oauth"!==(null===(s=r.data)||void 0===s?void 0:s.type))return;const n=r.data;if(n.state!==this._pendingCsrf)return this._cleanup(),clearTimeout(i),null==d||d.close(),void e(new Error("OAuth state mismatch — possible CSRF attack."));if(this._cleanup(),clearTimeout(i),null==d||d.close(),n.error)return void e(new Error(`Authorization failed: ${n.error}`));if(!n.token)return void e(new Error("No token received from authorization callback."));const a=this._normalizeToken(n.token);this._storeToken(a,o),t(a)},window.addEventListener("message",this._messageListener)})}async refreshToken(t){const e=null!=t?t:_t,i=this.getStoredToken(e);if(!(null==i?void 0:i.refresh_token))throw this.clearToken(e),new Error("No refresh token available. Please reconnect.");const o=await fetch(gt,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:i.refresh_token,client_id:e})});if(!o.ok)throw this.clearToken(e),new Error(`Token refresh failed (${o.status}). Please reconnect.`);const r=await o.json(),s=this._normalizeToken(r);return this._storeToken(s,e),s}async getValidToken(t){if(this.isTokenValid(t))return this.getStoredToken(t).access_token;return(await this.refreshToken(t)).access_token}_normalizeToken(t){var e,i;const o=null!==(e=t.expires_in)&&void 0!==e?e:3600;return{access_token:t.access_token,refresh_token:t.refresh_token,token_type:null!==(i=t.token_type)&&void 0!==i?i:"Bearer",expires_in:o,expires_at:Date.now()+1e3*o}}_storeToken(t,e){localStorage.setItem(this._storageKey(e),JSON.stringify(t))}_cleanup(){this._messageListener&&(window.removeEventListener("message",this._messageListener),this._messageListener=null),this._pendingCsrf=null,this._popup=null}};const kt=new class{configure(t){this.clientId=t}async _get(t){const e=await At.getValidToken(this.clientId),i=await fetch(`${mt}${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!i.ok){const e=await i.text().catch(()=>"");throw new Error(`Parqet API error ${i.status} at ${t}: ${e}`)}return i.json()}async _post(t,e){const i=await At.getValidToken(this.clientId),o=await fetch(`${mt}${t}`,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(e)});if(!o.ok){const e=await o.text().catch(()=>"");throw new Error(`Parqet API error ${o.status} at ${t}: ${e}`)}return o.json()}async getUser(){return this._get("/user")}async listPortfolios(){return(await this._get("/portfolios")).items}async getPerformance(t,e){const i={portfolioIds:Array.isArray(t)?t:[t],interval:null!=e?e:{type:"relative",value:"max"}};return this._post("/performance",i)}async getActivities(t,e={}){const i=new URLSearchParams;if(e.activityType){(Array.isArray(e.activityType)?e.activityType:[e.activityType]).forEach(t=>i.append("activityType",t))}if(e.assetType){(Array.isArray(e.assetType)?e.assetType:[e.assetType]).forEach(t=>i.append("assetType",t))}if(e.holdingId){(Array.isArray(e.holdingId)?e.holdingId:[e.holdingId]).forEach(t=>i.append("holdingId",t))}null!=e.limit&&i.set("limit",String(e.limit)),e.cursor&&i.set("cursor",e.cursor);const o=i.toString();return this._get(`/portfolios/${t}/activities${o?`?${o}`:""}`)}};const Ct=new class{constructor(){this._reqId=0,this._initialized=!1}configure(t){this.clientId=t}async _send(t){var e;const i=await At.getValidToken(this.clientId),o=await fetch(`${yt}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json",Accept:"application/json, text/event-stream"},body:JSON.stringify(t)});if(!o.ok){const t=await o.text().catch(()=>"");throw new Error(`MCP server error ${o.status}: ${t}`)}return(null!==(e=o.headers.get("content-type"))&&void 0!==e?e:"").includes("text/event-stream")?this._parseSSE(await o.text()):o.json()}_parseSSE(t){for(const e of t.split("\n"))if(e.startsWith("data: "))try{return JSON.parse(e.slice(6))}catch(t){}throw new Error("No valid JSON found in MCP SSE response.")}async _initialize(){const t=await At.getValidToken(this.clientId);await fetch(`${yt}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:++this._reqId,method:"initialize",params:{protocolVersion:"2024-11-05",capabilities:{},clientInfo:{name:"parqet-ha-companion",version:"0.1.0"}}})}),this._initialized=!0}async _callTool(t,e={}){var i,o,r,s;this._initialized||await this._initialize();const n={jsonrpc:"2.0",id:++this._reqId,method:"tools/call",params:{name:t,arguments:e}},a=await this._send(n);if(a.error)throw new Error(`MCP tool error (${t}): ${a.error.message}`);if(null===(i=a.result)||void 0===i?void 0:i.isError)throw new Error(`MCP tool returned error for ${t}`);const l=null===(s=null===(r=null===(o=a.result)||void 0===o?void 0:o.content)||void 0===r?void 0:r[0])||void 0===s?void 0:s.text;if(!l)throw new Error(`Empty MCP response for tool ${t}`);return JSON.parse(l)}async getUser(){return this._callTool("parqet_get_user")}async listPortfolios(){return(await this._callTool("parqet_list_portfolios")).items}async getPerformance(t,e){const i=Array.isArray(t)?t:[t];return{performance:await this._callTool("parqet_get_performance",Object.assign({portfolioIds:i},e?{intervalType:e.type,intervalValue:e.value}:{}))}}async getActivities(t,e={}){return this._callTool("parqet_get_activities",Object.assign(Object.assign(Object.assign({portfolioId:t},null!=e.activityType?{activityType:e.activityType}:{}),null!=e.limit?{limit:e.limit}:{}),e.cursor?{cursor:e.cursor}:{}))}};let St=class extends lt{constructor(){super(...arguments),this.loading=!1,this.error=""}_handleConnect(){this.dispatchEvent(new CustomEvent("connect",{bubbles:!0,composed:!0}))}render(){return F`
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
    `}};St.styles=a`
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
  `,e([ut({type:Boolean})],St.prototype,"loading",void 0),e([ut()],St.prototype,"error",void 0),St=e([dt("parqet-auth-prompt")],St);let Et=class extends lt{constructor(){super(...arguments),this.portfolios=[],this.selected=null}_handleChange(t){const e=t.target;this.dispatchEvent(new CustomEvent("portfolio-change",{detail:{portfolioId:e.value},bubbles:!0,composed:!0}))}render(){return 0===this.portfolios.length?F``:F`
      <select
        class="selector"
        aria-label="Select portfolio"
        @change=${this._handleChange}
      >
        ${this.portfolios.map(t=>F`
            <option value=${t.id} ?selected=${t.id===this.selected}>${t.name}</option>
          `)}
      </select>
    `}};Et.styles=a`
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
  `,e([ut({type:Array})],Et.prototype,"portfolios",void 0),e([ut()],Et.prototype,"selected",void 0),Et=e([dt("parqet-portfolio-selector")],Et);let Pt=class extends lt{render(){return F`
      <div class="container" role="status" aria-label="Loading">
        <div class="spinner"></div>
      </div>
    `}};Pt.styles=a`
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
  `,Pt=e([dt("parqet-loading-spinner")],Pt);let It=class extends lt{constructor(){super(...arguments),this.selected="1y"}_select(t){this.selected=t,this.dispatchEvent(new CustomEvent("interval-change",{detail:{interval:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}};It.styles=a`
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
  `,e([ut()],It.prototype,"selected",void 0),It=e([dt("parqet-interval-selector")],It);let Tt=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._data=null,this._loading=!1,this._interval="1y",this._error=""}connectedCallback(){var t,e;super.connectedCallback(),this._interval=null!==(e=null===(t=this.config)||void 0===t?void 0:t.default_interval)&&void 0!==e?e:"1y",this._load()}updated(t){t.has("portfolioId")&&this.portfolioId&&this._load()}async _load(){if(this.portfolioId&&this.client){this._loading=!0,this._error="";try{const t=await this.client.getPerformance(this.portfolioId,{type:"relative",value:this._interval});this._data=t.performance}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _onIntervalChange(t){this._interval=t.detail.interval,await this._load()}_sym(){var t,e;return null!==(e=null===(t=this.config)||void 0===t?void 0:t.currency_symbol)&&void 0!==e?e:"€"}_fmtCurrency(t){return null==t?"—":`${this._sym()}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtPct(t){if(null==t)return"—";const e=100*t;return`${e>=0?"+":""}${e.toFixed(2)}%`}_kpiClass(t){return null==t?"":t>0?"positive":t<0?"negative":""}render(){var t,e,i,o,r,s,n,a,l,c,d,p,h,u,v,_,f,g,m,y,b,$,x,w,A,k,C;const S=this._data;return F`
      <parqet-interval-selector
        .selected=${this._interval}
        @interval-change=${this._onIntervalChange}
      ></parqet-interval-selector>

      ${this._error?F`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?F`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      ${S?F`
            <div class="kpi-grid">
              ${this._renderKpi("Total Value",this._fmtCurrency(null===(t=S.valuation)||void 0===t?void 0:t.atIntervalEnd))}
              ${this._renderKpi("XIRR",this._fmtPct(null===(i=null===(e=S.kpis)||void 0===e?void 0:e.inInterval)||void 0===i?void 0:i.xirr),null===(r=null===(o=S.kpis)||void 0===o?void 0:o.inInterval)||void 0===r?void 0:r.xirr)}
              ${this._renderKpi("TTWROR",this._fmtPct(null===(n=null===(s=S.kpis)||void 0===s?void 0:s.inInterval)||void 0===n?void 0:n.ttwror),null===(l=null===(a=S.kpis)||void 0===a?void 0:a.inInterval)||void 0===l?void 0:l.ttwror)}
              ${this._renderKpi("Unrealized Gain",this._fmtCurrency(null===(d=null===(c=S.unrealizedGains)||void 0===c?void 0:c.inInterval)||void 0===d?void 0:d.gainGross),null===(h=null===(p=S.unrealizedGains)||void 0===p?void 0:p.inInterval)||void 0===h?void 0:h.gainGross)}
              ${this._renderKpi("Return (gross)",this._fmtPct(null===(v=null===(u=S.unrealizedGains)||void 0===u?void 0:u.inInterval)||void 0===v?void 0:v.returnGross),null===(f=null===(_=S.unrealizedGains)||void 0===_?void 0:_.inInterval)||void 0===f?void 0:f.returnGross)}
              ${this._renderKpi("Realized Gain",this._fmtCurrency(null===(m=null===(g=S.realizedGains)||void 0===g?void 0:g.inInterval)||void 0===m?void 0:m.gainGross),null===(b=null===(y=S.realizedGains)||void 0===y?void 0:y.inInterval)||void 0===b?void 0:b.gainGross)}
              ${this._renderKpi("Dividends",this._fmtCurrency(null===(x=null===($=S.dividends)||void 0===$?void 0:$.inInterval)||void 0===x?void 0:x.amountGross))}
              ${this._renderKpi("Fees",this._fmtCurrency(null===(A=null===(w=S.fees)||void 0===w?void 0:w.inInterval)||void 0===A?void 0:A.fees))}
              ${this._renderKpi("Taxes",this._fmtCurrency(null===(C=null===(k=S.taxes)||void 0===k?void 0:k.inInterval)||void 0===C?void 0:C.taxes))}
            </div>
          `:this._loading?"":F`<div class="empty">No data available.</div>`}
    `}_renderKpi(t,e,i){return F`
      <div class="kpi-tile">
        <div class="kpi-label">${t}</div>
        <div class="kpi-value ${this._kpiClass(i)}">${e}</div>
      </div>
    `}};Tt.styles=a`
    :host {
      display: block;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      padding: 8px 16px 16px;
    }
    .kpi-tile {
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .kpi-label {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .kpi-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color);
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
  `,e([ut()],Tt.prototype,"portfolioId",void 0),e([ut({attribute:!1})],Tt.prototype,"client",void 0),e([ut({attribute:!1})],Tt.prototype,"config",void 0),e([vt()],Tt.prototype,"_data",void 0),e([vt()],Tt.prototype,"_loading",void 0),e([vt()],Tt.prototype,"_interval",void 0),e([vt()],Tt.prototype,"_error",void 0),Tt=e([dt("parqet-performance-view")],Tt);let qt=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._data=null,this._loading=!1,this._interval="1y",this._error="",this._sortKey="value",this._sortAsc=!1,this._expandedId=null}connectedCallback(){var t,e;super.connectedCallback(),this._interval=null!==(e=null===(t=this.config)||void 0===t?void 0:t.default_interval)&&void 0!==e?e:"1y",this._load()}updated(t){t.has("portfolioId")&&this.portfolioId&&this._load()}async _load(){if(this.portfolioId&&this.client){this._loading=!0,this._error="";try{const t=await this.client.getPerformance(this.portfolioId,{type:"relative",value:this._interval});this._data=t.performance}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _onIntervalChange(t){this._interval=t.detail.interval,await this._load()}_handleSort(t){this._sortKey===t?this._sortAsc=!this._sortAsc:(this._sortKey=t,this._sortAsc=!1)}_sortHoldings(t){const e=t.reduce((t,e)=>t+e.position.currentValue,0);return[...t].sort((t,i)=>{let o,r;const s=t.position.currentValue-t.position.purchaseValue,n=i.position.currentValue-i.position.purchaseValue;switch(this._sortKey){case"name":return this._sortAsc?t.asset.name.localeCompare(i.asset.name):i.asset.name.localeCompare(t.asset.name);case"value":o=t.position.currentValue,r=i.position.currentValue;break;case"pl":o=s,r=n;break;case"plPct":o=t.position.purchaseValue>0?s/t.position.purchaseValue:0,r=i.position.purchaseValue>0?n/i.position.purchaseValue:0;break;case"weight":o=e>0?t.position.currentValue/e:0,r=e>0?i.position.currentValue/e:0;break;default:return 0}return this._sortAsc?o-r:r-o})}_sym(){var t,e;return null!==(e=null===(t=this.config)||void 0===t?void 0:t.currency_symbol)&&void 0!==e?e:"€"}_fmtC(t){return null==t?"—":`${this._sym()}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtNum(t,e=4){return null==t?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}_sortIcon(t){return this._sortKey!==t?" ↕":this._sortAsc?" ↑":" ↓"}render(){var t,e,i,o;if(this._loading&&!this._data)return F`<parqet-loading-spinner></parqet-loading-spinner>`;const r=(null!==(e=null===(t=this._data)||void 0===t?void 0:t.holdings)&&void 0!==e?e:[]).filter(t=>!t.position.isSold),s=this._sortHoldings(r),n=r.reduce((t,e)=>t+e.position.currentValue,0),a=!1!==(null===(i=this.config)||void 0===i?void 0:i.show_logo),l=!!(null===(o=this.config)||void 0===o?void 0:o.compact);return F`
      <parqet-interval-selector
        .selected=${this._interval}
        @interval-change=${this._onIntervalChange}
      ></parqet-interval-selector>

      ${this._error?F`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?F`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${a?F`<th class="logo-col"></th>`:""}
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
            ${s.map(t=>{var e,i,o,r,s,c,d,p,h;const u=t.position.currentValue-t.position.purchaseValue,v=t.position.purchaseValue>0?u/t.position.purchaseValue:0,_=n>0?t.position.currentValue/n:0,f=u>0?"positive":u<0?"negative":"",g=this._expandedId===t.holdingId,m=null!==(i=null!==(e=t.asset.isin)&&void 0!==e?e:t.asset.symbol)&&void 0!==i?i:"";return F`
                <tr
                  class="row ${l?"compact":""}"
                  @click=${()=>this._expandedId=g?null:t.holdingId}
                  role="button"
                  tabindex="0"
                  aria-expanded=${g}
                  @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(this._expandedId=g?null:t.holdingId)}}
                >
                  ${a?F`<td class="logo-col">
                        ${t.logo?F`<img class="logo" src=${t.logo} alt="" loading="lazy" />`:F`<div class="logo-placeholder"></div>`}
                      </td>`:""}
                  <td class="name-col">
                    <span class="holding-name">${null!==(o=t.nickname)&&void 0!==o?o:t.asset.name}</span>
                    ${m?F`<span class="ticker">${m}</span>`:""}
                  </td>
                  <td class="num">${this._fmtC(t.position.currentValue)}</td>
                  <td class="num ${f}">${this._fmtC(u)}</td>
                  <td class="num ${f}">
                    ${100*v>=0?"+":""}${(100*v).toFixed(2)}%
                  </td>
                  <td class="num">${(100*_).toFixed(1)}%</td>
                </tr>
                ${g?F`
                      <tr class="expanded-row">
                        <td colspan=${a?6:5}>
                          <div class="expanded">
                            <span>Shares: ${this._fmtNum(t.position.shares)}</span>
                            <span>Avg Price: ${this._fmtC(t.position.purchasePrice)}</span>
                            <span>Curr Price: ${this._fmtC(t.position.currentPrice)}</span>
                            <span>
                              XIRR:
                              ${null!=(null===(s=null===(r=t.kpis)||void 0===r?void 0:r.inInterval)||void 0===s?void 0:s.xirr)?`${(100*t.kpis.inInterval.xirr).toFixed(2)}%`:"—"}
                            </span>
                            <span>
                              Dividends: ${this._fmtC(null===(d=null===(c=t.dividends)||void 0===c?void 0:c.inInterval)||void 0===d?void 0:d.amountGross)}
                            </span>
                            <span>Fees: ${this._fmtC(null===(h=null===(p=t.fees)||void 0===p?void 0:p.inInterval)||void 0===h?void 0:h.fees)}</span>
                          </div>
                        </td>
                      </tr>
                    `:""}
              `})}
          </tbody>
        </table>
        ${0!==s.length||this._loading?"":F`<div class="empty">No holdings found.</div>`}
      </div>
    `}};qt.styles=a`
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
      padding: 6px 12px;
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
  `,e([ut()],qt.prototype,"portfolioId",void 0),e([ut({attribute:!1})],qt.prototype,"client",void 0),e([ut({attribute:!1})],qt.prototype,"config",void 0),e([vt()],qt.prototype,"_data",void 0),e([vt()],qt.prototype,"_loading",void 0),e([vt()],qt.prototype,"_interval",void 0),e([vt()],qt.prototype,"_error",void 0),e([vt()],qt.prototype,"_sortKey",void 0),e([vt()],qt.prototype,"_sortAsc",void 0),e([vt()],qt.prototype,"_expandedId",void 0),qt=e([dt("parqet-holdings-view")],qt);const zt=[{value:"all",label:"All",color:"var(--primary-color, #03a9f4)"},{value:"buy",label:"Buy",color:"#4caf50"},{value:"sell",label:"Sell",color:"#f44336"},{value:"dividend",label:"Dividend",color:"#2196f3"},{value:"interest",label:"Interest",color:"#00bcd4"},{value:"transfer_in",label:"Transfer In",color:"#9c27b0"},{value:"transfer_out",label:"Transfer Out",color:"#7b1fa2"},{value:"fees_taxes",label:"Fees/Taxes",color:"#ff9800"},{value:"deposit",label:"Deposit",color:"#009688"},{value:"withdrawal",label:"Withdrawal",color:"#795548"}],Ot=Object.fromEntries(zt.map(t=>[t.value,t.color]));let Mt=class extends lt{constructor(){super(...arguments),this.portfolioId="",this._activities=[],this._cursor=null,this._loading=!1,this._loadingMore=!1,this._hasMore=!1,this._filter="all",this._error=""}connectedCallback(){var t,e;super.connectedCallback(),this._filter=null!==(e=null===(t=this.config)||void 0===t?void 0:t.default_activity_type)&&void 0!==e?e:"all",this._load(!0)}updated(t){t.has("portfolioId")&&this.portfolioId&&(this._reset(),this._load(!0))}_reset(){this._activities=[],this._cursor=null,this._hasMore=!1}async _load(t=!1){var e,i;if(this.portfolioId&&this.client){t&&this._reset(),t?this._loading=!0:this._loadingMore=!0,this._error="";try{const o=await this.client.getActivities(this.portfolioId,{activityType:"all"!==this._filter?this._filter:void 0,limit:null!==(i=null===(e=this.config)||void 0===e?void 0:e.activities_limit)&&void 0!==i?i:25,cursor:t?null:this._cursor});this._activities=t?o.activities:[...this._activities,...o.activities],this._cursor=o.cursor,this._hasMore=!!o.cursor}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1,this._loadingMore=!1}}}async _setFilter(t){this._filter=t,await this._load(!0)}_fmtDate(t){return new Date(t).toLocaleDateString(void 0,{day:"2-digit",month:"2-digit",year:"numeric"})}_fmtC(t){var e,i;if(null==t)return"—";return`${null!==(i=null===(e=this.config)||void 0===e?void 0:e.currency_symbol)&&void 0!==i?i:"€"}${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_typeLabel(t){return t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}render(){var t;const e=!!(null===(t=this.config)||void 0===t?void 0:t.compact);return F`
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
        ${this._activities.map(t=>this._renderActivity(t,e))}
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
    `}_renderActivity(t,e){var i,o,r;const s=null!==(i=Ot[t.type])&&void 0!==i?i:"#888";return F`
      <div class="activity ${e?"compact":""}">
        <span class="badge" style="background: ${s}">${this._typeLabel(t.type)}</span>
        <div class="info">
          <span class="asset">${null!==(r=null===(o=t.asset)||void 0===o?void 0:o.name)&&void 0!==r?r:t.holdingId}</span>
          <span class="date">${this._fmtDate(t.datetime)}</span>
        </div>
        <div class="amounts">
          ${null!=t.shares?F`<span class="shares">${t.shares.toLocaleString()} shares</span>`:""}
          <span class="amount">${this._fmtC(t.amount)}</span>
        </div>
      </div>
    `}};Mt.styles=a`
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
      padding: 6px 8px;
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
  `,e([ut()],Mt.prototype,"portfolioId",void 0),e([ut({attribute:!1})],Mt.prototype,"client",void 0),e([ut({attribute:!1})],Mt.prototype,"config",void 0),e([vt()],Mt.prototype,"_activities",void 0),e([vt()],Mt.prototype,"_cursor",void 0),e([vt()],Mt.prototype,"_loading",void 0),e([vt()],Mt.prototype,"_loadingMore",void 0),e([vt()],Mt.prototype,"_hasMore",void 0),e([vt()],Mt.prototype,"_filter",void 0),e([vt()],Mt.prototype,"_error",void 0),Mt=e([dt("parqet-activities-view")],Mt);const Ut=window;Ut.customCards=Ut.customCards||[],Ut.customCards.push({type:"parqet-companion-card",name:"Parqet Home Assistant Companion",description:"Display your Parqet portfolio data — performance, holdings and activities.",preview:!0,documentationURL:"https://github.com/cubinet-code/parqet-homeassistant-companion"}),t.ParqetCompanionCard=class extends lt{constructor(){super(...arguments),this._authenticated=!1,this._portfolios=[],this._portfolioId=null,this._activeView="performance",this._loading=!1,this._authLoading=!1,this._error=""}connectedCallback(){var t;super.connectedCallback(),this._authenticated=At.isTokenValid(null===(t=this._config)||void 0===t?void 0:t.client_id),this._authenticated&&this._loadPortfolios()}updated(t){var e;t.has("hass")&&!this._authenticated&&At.isTokenValid(null===(e=this._config)||void 0===e?void 0:e.client_id)&&(this._authenticated=!0,this._loadPortfolios())}setConfig(t){this._config=Object.assign({data_source:"rest",view_layout:"tabs",default_view:"performance",default_interval:"1y",show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€",activities_limit:25},t),this._activeView=this._config.default_view,kt.configure(this._config.client_id),Ct.configure(this._config.client_id)}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:6,min_columns:6,min_rows:4}}static getConfigElement(){return document.createElement("parqet-companion-card-editor")}static getStubConfig(){return{data_source:"rest",default_view:"performance",default_interval:"1y",show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€"}}static getConfigForm(){return[{name:"data_source",label:"Data Source",selector:{select:{options:[{value:"rest",label:"Connect REST API (recommended)"},{value:"mcp",label:"MCP Server (mcp.parqet.com)"}]}}},{name:"portfolio_id",label:"Portfolio ID (leave empty to show picker)",selector:{text:{}}},{name:"default_view",label:"Default View",selector:{select:{options:[{value:"performance",label:"Performance"},{value:"holdings",label:"Holdings"},{value:"activities",label:"Activities"}]}}},{name:"view_layout",label:"View Layout",selector:{select:{options:[{value:"tabs",label:"Tabs (all views)"},{value:"single",label:"Single view only"}]}}},{name:"default_interval",label:"Default Time Interval",selector:{select:{options:[{value:"1d",label:"1 Day"},{value:"1w",label:"1 Week"},{value:"1m",label:"1 Month"},{value:"3m",label:"3 Months"},{value:"6m",label:"6 Months"},{value:"1y",label:"1 Year"},{value:"ytd",label:"Year to Date"},{value:"3y",label:"3 Years"},{value:"5y",label:"5 Years"},{value:"max",label:"All Time"}]}}},{name:"currency_symbol",label:"Currency Symbol",selector:{text:{}}},{name:"show_logo",label:"Show holding logos",selector:{boolean:{}}},{name:"compact",label:"Compact mode",selector:{boolean:{}}},{name:"activities_limit",label:"Activities per page (10–500)",selector:{number:{min:10,max:500,step:10,mode:"box"}}},{name:"client_id",label:"Parqet Connect Client ID (optional — leave blank to use shared default)",selector:{text:{}}},{name:"redirect_uri",label:"OAuth Redirect URI (optional — required when using your own Client ID)",selector:{text:{}}}]}get _client(){var t;return"mcp"===(null===(t=this._config)||void 0===t?void 0:t.data_source)?Ct:kt}async _loadPortfolios(){var t,e,i,o,r;this._loading=!0,this._error="";try{this._portfolios=await this._client.listPortfolios(),this._portfolioId=null!==(o=null!==(e=null===(t=this._config)||void 0===t?void 0:t.portfolio_id)&&void 0!==e?e:null===(i=this._portfolios[0])||void 0===i?void 0:i.id)&&void 0!==o?o:null}catch(t){this._error=t instanceof Error?t.message:String(t),String(t).includes("401")&&(At.clearToken(null===(r=this._config)||void 0===r?void 0:r.client_id),this._authenticated=!1)}finally{this._loading=!1}}async _handleConnect(){var t,e;this._authLoading=!0,this._error="";const i=window.open("","parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes");try{await At.startAuth(null===(t=this._config)||void 0===t?void 0:t.client_id,null===(e=this._config)||void 0===e?void 0:e.redirect_uri,i),this._authenticated=!0,await this._loadPortfolios()}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._authLoading=!1}}_handleDisconnect(){var t;At.clearToken(null===(t=this._config)||void 0===t?void 0:t.client_id),this._authenticated=!1,this._portfolios=[],this._portfolioId=null,this._error=""}_handlePortfolioChange(t){this._portfolioId=t.detail.portfolioId}render(){var t,e,i;if(!this._authenticated)return F`
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
      `;const o="single"!==(null===(t=this._config)||void 0===t?void 0:t.view_layout);return F`
      <ha-card>
        <!-- Header row -->
        <div class="card-header">
          ${this._portfolios.length>1?F`
                <parqet-portfolio-selector
                  .portfolios=${this._portfolios}
                  .selected=${this._portfolioId}
                  @portfolio-change=${this._handlePortfolioChange}
                ></parqet-portfolio-selector>
              `:F`<span class="portfolio-name">${null!==(i=null===(e=this._portfolios[0])||void 0===e?void 0:e.name)&&void 0!==i?i:""}</span>`}

          <button
            class="disconnect-btn"
            @click=${this._handleDisconnect}
            title="Disconnect Parqet account"
            aria-label="Disconnect Parqet account"
          >
            ⏏
          </button>
        </div>

        <!-- Tabs -->
        ${o?F`
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
    `}},t.ParqetCompanionCard.styles=a`
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
    .disconnect-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 4px 6px;
      border-radius: 4px;
      opacity: 0.5;
      font-size: 1rem;
      line-height: 1;
      transition: opacity 0.15s;
    }
    .disconnect-btn:hover {
      opacity: 1;
    }
    .disconnect-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
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
  `,e([ut({attribute:!1})],t.ParqetCompanionCard.prototype,"hass",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_config",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_authenticated",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_portfolios",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_portfolioId",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_activeView",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_loading",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_authLoading",void 0),e([vt()],t.ParqetCompanionCard.prototype,"_error",void 0),t.ParqetCompanionCard=e([dt("parqet-companion-card")],t.ParqetCompanionCard);let Dt=class extends lt{constructor(){super(...arguments),this._connected=!1}setConfig(t){this._config=t,this._connected=At.isTokenValid(t.client_id)}render(){return this._config&&this.hass?F`
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

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t.ParqetCompanionCard.getConfigForm()}
        .computeLabel=${t=>{var e;return null!==(e=t.label)&&void 0!==e?e:""}}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:F``}_handleDisconnect(){var t;At.clearToken(null===(t=this._config)||void 0===t?void 0:t.client_id),this._connected=!1}_valueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};return Dt.styles=a`
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
  `,e([ut({attribute:!1})],Dt.prototype,"hass",void 0),e([vt()],Dt.prototype,"_config",void 0),e([vt()],Dt.prototype,"_connected",void 0),Dt=e([dt("parqet-companion-card-editor")],Dt),t}({});
