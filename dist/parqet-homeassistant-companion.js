var ParqetCard=function(e){"use strict";function t(e,t,i,o){var r,a=arguments.length,s=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new s(i,e,r)},l=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:v}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);r?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=v(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(o)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of t){const t=document.createElement("style"),r=i.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=o.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const a=r.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){const a=this.constructor;if(!1===o&&(r=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??x)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,C=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+P,I=`<${E}>`,z=document,q=()=>z.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,V=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,j=/"/g,H=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),G=F(1),B=F(2),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,J=z.createTreeWalker(z,129);function X(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,o=[];let r,a=2===t?"<svg>":3===t?"<math>":"",s=M;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===M?"!--"===l[1]?s=R:void 0!==l[1]?s=U:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=V):void 0!==l[3]&&(s=V):s===V?">"===l[0]?(s=r??M,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?V:'"'===l[3]?j:N):s===j||s===N?s=V:s===R||s===U?s=M:(s=V,r=void 0);const p=s===V&&e[t+1].startsWith("/>")?" ":"";a+=s===M?i+I:c>=0?(o.push(n),i.slice(0,c)+T+i.slice(c)+P+p):i+P+(-2===c?t:p)}return[X(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Q{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,a=0;const s=e.length-1,n=this.parts,[l,c]=Z(e,t);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&n.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(T)){const t=c[a++],i=o.getAttribute(e).split(P),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?re:"?"===s[1]?ae:"@"===s[1]?se:oe}),o.removeAttribute(e)}else e.startsWith(P)&&(n.push({type:6,index:r}),o.removeAttribute(e));if(H.test(o.tagName)){const e=o.textContent.split(P),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],q()),J.nextNode(),n.push({type:2,index:++r});o.append(e[t],q())}}}else if(8===o.nodeType)if(o.data===E)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(P,e+1));)n.push({type:7,index:r}),e+=P.length-1}r++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function ee(e,t,i=e,o){if(t===K)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const a=O(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e),r._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=ee(e,r._$AS(e,t.values),r,o)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??z).importNode(t,!0);J.currentNode=o;let r=J.nextNode(),a=0,s=0,n=i[0];for(;void 0!==n;){if(a===n.index){let t;2===n.type?t=new ie(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ne(r,this,e)),this._$AV.push(t),n=i[++s]}a!==n?.index&&(r=J.nextNode(),a++)}return J.currentNode=z,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ie{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new te(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new Q(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new ie(this.O(q()),this.O(q()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,o){const r=this.strings;let a=!1;if(void 0===r)e=ee(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==K,a&&(this._$AH=e);else{const o=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=ee(this,o[i+s],t,s),n===K&&(n=this._$AH[s]),a||=!O(n)||n!==this._$AH[s],n===W?e=W:e!==W&&(e+=(n??"")+r[s+1]),this._$AH[s]=n}a&&!o&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ae extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends oe{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??W)===K)return;const i=this._$AH,o=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const le=k.litHtmlPolyfillSupport;le?.(Q,ie),(k.litHtmlVersions??=[]).push("3.3.2");const ce=globalThis;class de extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let r=o._$litPart$;if(void 0===r){const e=i?.renderBefore??null;o._$litPart$=r=new ie(t.insertBefore(q(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const pe=ce.litElementPolyfillSupport;pe?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},ve=(e=ue,t,i)=>{const{kind:o,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];t.call(this,i),this.requestUpdate(o,r,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function fe(e){return(t,i)=>"object"==typeof i?ve(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return fe({...e,state:!0,attribute:!1})}const _e="019cf96b-44f0-73c4-81f2-e8827d5c1e65",me="https://parqet-token-proxy.oliver-f26.workers.dev",ye=`${me}/oauth2/token`,be=me,xe="https://mcp.parqet.com",$e="undefined"!=typeof window&&"localhost"===window.location.hostname?"http://localhost:3000/callback.html":"https://cubinet-code.github.io/parqet-homeassistant-companion/callback.html",we=[{value:"1d",label:"1D"},{value:"1w",label:"1W"},{value:"mtd",label:"MTD"},{value:"1m",label:"1M"},{value:"3m",label:"3M"},{value:"6m",label:"6M"},{value:"1y",label:"1Y"},{value:"ytd",label:"YTD"},{value:"3y",label:"3Y"},{value:"5y",label:"5Y"},{value:"10y",label:"10Y"},{value:"max",label:"Max"}];function ke(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}const Ce=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function Ae(e,t){return t>>>e|t<<32-e}async function Se(e){const t=(new TextEncoder).encode(e);let i;return i="undefined"!=typeof crypto&&crypto.subtle?await crypto.subtle.digest("SHA-256",t):function(e){let t=1779033703,i=3144134277,o=1013904242,r=2773480762,a=1359893119,s=2600822924,n=528734635,l=1541459225;const c=8*e.length,d=64*Math.ceil((e.length+9)/64),p=new Uint8Array(d);p.set(e),p[e.length]=128;const h=new DataView(p.buffer);h.setUint32(d-4,c,!1);const u=new Uint32Array(64);for(let e=0;e<d;e+=64){for(let t=0;t<16;t++)u[t]=h.getUint32(e+4*t,!1);for(let e=16;e<64;e++){const t=Ae(7,u[e-15])^Ae(18,u[e-15])^u[e-15]>>>3,i=Ae(17,u[e-2])^Ae(19,u[e-2])^u[e-2]>>>10;u[e]=u[e-16]+t+u[e-7]+i|0}let c=t,d=i,p=o,v=r,f=a,g=s,_=n,m=l;for(let e=0;e<64;e++){const t=m+(Ae(6,f)^Ae(11,f)^Ae(25,f))+(f&g^~f&_)+Ce[e]+u[e]|0,i=c&d^c&p^d&p;m=_,_=g,g=f,f=v+t|0,v=p,p=d,d=c,c=t+((Ae(2,c)^Ae(13,c)^Ae(22,c))+i|0)|0}t=t+c|0,i=i+d|0,o=o+p|0,r=r+v|0,a=a+f|0,s=s+g|0,n=n+_|0,l=l+m|0}const v=new Uint8Array(32),f=new DataView(v.buffer);return f.setUint32(0,t,!1),f.setUint32(4,i,!1),f.setUint32(8,o,!1),f.setUint32(12,r,!1),f.setUint32(16,a,!1),f.setUint32(20,s,!1),f.setUint32(24,n,!1),f.setUint32(28,l,!1),v}(t),ke(new Uint8Array(i))}const Te=new class{constructor(){this._messageListener=null,this._pendingCsrf=null,this._popup=null}_storageKey(e){return`parqet_card_auth_${null!=e?e:_e}`}getStoredToken(e){try{const t=localStorage.getItem(this._storageKey(e));return t?JSON.parse(t):null}catch(e){return null}}isTokenValid(e){const t=this.getStoredToken(e);return!!t&&t.expires_at>Date.now()+6e4}clearToken(e){localStorage.removeItem(this._storageKey(e))}async startAuth(e,t,i){const o=null!=e?e:_e,r=null!=t?t:$e,a=await async function(){const e=new Uint8Array(96);return crypto.getRandomValues(e),ke(e)}(),s=await Se(a),n=function(){const e=new Uint8Array(16);return crypto.getRandomValues(e),ke(e)}();this._pendingCsrf=n;const l=function(e,t,i,o){const r=JSON.stringify({s:e,v:t,c:i,r:o});return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}(n,a,o,r),c=`https://connect.parqet.com/oauth2/authorize?${new URLSearchParams({response_type:"code",client_id:o,redirect_uri:r,scope:"portfolio:read portfolio:write",code_challenge:s,code_challenge_method:"S256",state:l})}`;let d;return i&&!i.closed?(i.location.href=c,d=i):d=window.open(c,"parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes"),this._popup=d,new Promise((e,t)=>{const i=setTimeout(()=>{this._cleanup(),null==d||d.close(),t(new Error("Authorization timed out. Please try again."))},12e4);this._messageListener=r=>{var a;if("parqet-oauth"!==(null===(a=r.data)||void 0===a?void 0:a.type))return;const s=r.data;if(s.state!==this._pendingCsrf)return this._cleanup(),clearTimeout(i),null==d||d.close(),void t(new Error("OAuth state mismatch — possible CSRF attack."));if(this._cleanup(),clearTimeout(i),null==d||d.close(),s.error)return void t(new Error(`Authorization failed: ${s.error}`));if(!s.token)return void t(new Error("No token received from authorization callback."));const n=this._normalizeToken(s.token);this._storeToken(n,o),e(n)},window.addEventListener("message",this._messageListener)})}async refreshToken(e){const t=null!=e?e:_e,i=this.getStoredToken(t);if(!(null==i?void 0:i.refresh_token))throw this.clearToken(t),new Error("No refresh token available. Please reconnect.");const o=await fetch(ye,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:i.refresh_token,client_id:t})});if(!o.ok)throw this.clearToken(t),new Error(`Token refresh failed (${o.status}). Please reconnect.`);const r=await o.json(),a=this._normalizeToken(r);return this._storeToken(a,t),a}async getValidToken(e){if(this.isTokenValid(e))return this.getStoredToken(e).access_token;return(await this.refreshToken(e)).access_token}_normalizeToken(e){var t,i;const o=null!==(t=e.expires_in)&&void 0!==t?t:3600;return{access_token:e.access_token,refresh_token:e.refresh_token,token_type:null!==(i=e.token_type)&&void 0!==i?i:"Bearer",expires_in:o,expires_at:Date.now()+1e3*o}}_storeToken(e,t){localStorage.setItem(this._storageKey(t),JSON.stringify(e))}_cleanup(){this._messageListener&&(window.removeEventListener("message",this._messageListener),this._messageListener=null),this._pendingCsrf=null,this._popup=null}};const Pe=new class{configure(e){this.clientId=e}async _get(e){const t=await Te.getValidToken(this.clientId),i=await fetch(`${be}${e}`,{headers:{Authorization:`Bearer ${t}`}});if(!i.ok){const t=await i.text().catch(()=>"");throw new Error(`Parqet API error ${i.status} at ${e}: ${t}`)}return i.json()}async _post(e,t){const i=await Te.getValidToken(this.clientId),o=await fetch(`${be}${e}`,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok){const t=await o.text().catch(()=>"");throw new Error(`Parqet API error ${o.status} at ${e}: ${t}`)}return o.json()}async getUser(){return this._get("/user")}async listPortfolios(){return(await this._get("/portfolios")).items}async getPerformance(e,t){const i={portfolioIds:Array.isArray(e)?e:[e],interval:null!=t?t:{type:"relative",value:"max"}};return this._post("/performance",i)}async getActivities(e,t={}){const i=new URLSearchParams;if(t.activityType){(Array.isArray(t.activityType)?t.activityType:[t.activityType]).forEach(e=>i.append("activityType",e))}if(t.assetType){(Array.isArray(t.assetType)?t.assetType:[t.assetType]).forEach(e=>i.append("assetType",e))}if(t.holdingId){(Array.isArray(t.holdingId)?t.holdingId:[t.holdingId]).forEach(e=>i.append("holdingId",e))}null!=t.limit&&i.set("limit",String(t.limit)),t.cursor&&i.set("cursor",t.cursor);const o=i.toString();return this._get(`/portfolios/${e}/activities${o?`?${o}`:""}`)}};const Ee=new class{constructor(){this._reqId=0,this._initialized=!1}configure(e){this.clientId=e}async _send(e){var t;const i=await Te.getValidToken(this.clientId),o=await fetch(`${xe}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json",Accept:"application/json, text/event-stream"},body:JSON.stringify(e)});if(!o.ok){const e=await o.text().catch(()=>"");throw new Error(`MCP server error ${o.status}: ${e}`)}return(null!==(t=o.headers.get("content-type"))&&void 0!==t?t:"").includes("text/event-stream")?this._parseSSE(await o.text()):o.json()}_parseSSE(e){for(const t of e.split("\n"))if(t.startsWith("data: "))try{return JSON.parse(t.slice(6))}catch(e){}throw new Error("No valid JSON found in MCP SSE response.")}async _initialize(){const e=await Te.getValidToken(this.clientId);await fetch(`${xe}/mcp`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:++this._reqId,method:"initialize",params:{protocolVersion:"2024-11-05",capabilities:{},clientInfo:{name:"parqet-ha-companion",version:"0.1.0"}}})}),this._initialized=!0}async _callTool(e,t={}){var i,o,r,a;this._initialized||await this._initialize();const s={jsonrpc:"2.0",id:++this._reqId,method:"tools/call",params:{name:e,arguments:t}},n=await this._send(s);if(n.error)throw new Error(`MCP tool error (${e}): ${n.error.message}`);if(null===(i=n.result)||void 0===i?void 0:i.isError)throw new Error(`MCP tool returned error for ${e}`);const l=null===(a=null===(r=null===(o=n.result)||void 0===o?void 0:o.content)||void 0===r?void 0:r[0])||void 0===a?void 0:a.text;if(!l)throw new Error(`Empty MCP response for tool ${e}`);return JSON.parse(l)}async getUser(){return this._callTool("parqet_get_user")}async listPortfolios(){return(await this._callTool("parqet_list_portfolios")).items}async getPerformance(e,t){const i=Array.isArray(e)?e:[e],o=await this._callTool("parqet_get_performance",Object.assign({portfolioIds:i},t?{intervalType:t.type,intervalValue:t.value}:{}));return"holdings"in o?o:{performance:o,holdings:[]}}async getActivities(e,t={}){return this._callTool("parqet_get_activities",Object.assign(Object.assign(Object.assign({portfolioId:e},null!=t.activityType?{activityType:t.activityType}:{}),null!=t.limit?{limit:t.limit}:{}),t.cursor?{cursor:t.cursor}:{}))}};let Ie=class extends de{constructor(){super(...arguments),this.portfolios=[],this.selected=null}_handleChange(e){const t=e.target;this.dispatchEvent(new CustomEvent("portfolio-change",{detail:{portfolioId:t.value},bubbles:!0,composed:!0}))}render(){return 0===this.portfolios.length?G``:G`
      <select
        class="selector"
        aria-label="Select portfolio"
        @change=${this._handleChange}
      >
        ${this.portfolios.map(e=>G`
            <option value=${e.id} ?selected=${e.id===this.selected}>${e.name}</option>
          `)}
      </select>
    `}};Ie.styles=n`
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
  `,t([fe({type:Array})],Ie.prototype,"portfolios",void 0),t([fe()],Ie.prototype,"selected",void 0),Ie=t([he("parqet-portfolio-selector")],Ie);let ze=class extends de{render(){return G`
      <div class="container" role="status" aria-label="Loading">
        <div class="spinner"></div>
      </div>
    `}};ze.styles=n`
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
  `,ze=t([he("parqet-loading-spinner")],ze);let qe=class extends de{constructor(){super(...arguments),this.selected="1y"}_select(e){this.selected=e,this.dispatchEvent(new CustomEvent("interval-change",{detail:{interval:e},bubbles:!0,composed:!0}))}render(){return G`
      <div class="intervals" role="group" aria-label="Time interval">
        ${we.map(({value:e,label:t})=>G`
            <button
              class="btn ${this.selected===e?"active":""}"
              @click=${()=>this._select(e)}
              aria-pressed=${this.selected===e}
            >
              ${t}
            </button>
          `)}
      </div>
    `}};qe.styles=n`
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
  `,t([fe()],qe.prototype,"selected",void 0),qe=t([he("parqet-interval-selector")],qe);let Oe=class extends de{constructor(){super(...arguments),this.segments=[],this.currencySymbol="€"}_fmt(e){return`${e<0?"−":""}${this.currencySymbol}${Math.abs(e).toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})}`}render(){const e=this.segments.filter(e=>0!==e.value);if(0===e.length)return G`<div class="empty">No data</div>`;const t=e.reduce((e,t)=>e+Math.abs(t.value),0);if(0===t)return G`<div class="empty">No data</div>`;const i=e.map(e=>Object.assign(Object.assign({},e),{pct:Math.abs(e.value)/t*100}));return G`
      <div class="chart-container">
        <div class="bar-track">
          ${i.map((e,t)=>G`
              <div
                class="bar-seg"
                style="width:${e.pct}%;background:${e.color};
                  ${0===t?"border-radius:4px 0 0 4px;":""}
                  ${t===i.length-1?"border-radius:0 4px 4px 0;":""}
                  ${1===i.length?"border-radius:4px;":""}"
                title="${e.label}: ${this._fmt(e.value)} (${e.pct.toFixed(1)}%)"
              ></div>
            `)}
        </div>
        <div class="legend">
          ${i.map(e=>G`
              <div class="legend-item">
                <span class="dot" style="background:${e.color}"></span>
                <span class="legend-label">${e.label}</span>
                <span class="legend-value">${this._fmt(e.value)}</span>
              </div>
            `)}
        </div>
      </div>
    `}};Oe.styles=n`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
    }
    .chart-container {
      padding: 8px 16px 16px;
    }
    .bar-track {
      display: flex;
      height: ${18}px;
      border-radius: ${4}px;
      overflow: hidden;
    }
    .bar-seg {
      min-width: 2px;
      opacity: 0.85;
      transition: opacity 0.15s;
    }
    .bar-seg:hover {
      opacity: 1;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 12px;
      margin-top: 8px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .legend-label {
      color: var(--secondary-text-color, #757575);
    }
    .legend-value {
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color, #212121);
    }
    .empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.82rem;
    }
  `,t([fe({type:Array})],Oe.prototype,"segments",void 0),t([fe({type:String})],Oe.prototype,"currencySymbol",void 0),Oe=t([he("parqet-stacked-bar")],Oe);let De=class extends de{constructor(){super(...arguments),this.portfolioId="",this.refreshTrigger=0,this._data=null,this._loading=!1,this._interval="1y",this._error=""}connectedCallback(){var e,t;super.connectedCallback(),this._interval=null!==(t=null===(e=this.config)||void 0===e?void 0:e.default_interval)&&void 0!==t?t:"1y",this._load()}updated(e){e.has("portfolioId")&&this.portfolioId&&this._load(),e.has("refreshTrigger")&&void 0!==e.get("refreshTrigger")&&this._load(!0)}async _load(e=!1){if(this.portfolioId&&this.client){e||(this._loading=!0),this._error="";try{const e=await this.client.getPerformance(this.portfolioId,{type:"relative",value:this._interval});this._data=e.performance}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{e||(this._loading=!1)}}}async _onIntervalChange(e){this._interval=e.detail.interval,await this._load()}_sym(){var e,t;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.currency_symbol)&&void 0!==t?t:"€"}_fmtCurrency(e){return null==e?"—":`${this._sym()}${e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtPct(e){return null==e?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}_kpiClass(e){return null==e?"":e>0?"positive":e<0?"negative":""}render(){var e,t,i,o,r,a,s,n,l,c,d,p,h,u,v,f,g,_,m,y,b,x,$,w,k,C;const A=this._data;return G`
      ${!1!==(null===(e=this.config)||void 0===e?void 0:e.show_interval_selector)?G`<parqet-interval-selector
            .selected=${this._interval}
            @interval-change=${this._onIntervalChange}
          ></parqet-interval-selector>`:""}

      ${this._error?G`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?G`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      ${A?G`
            <div class="kpi-grid ${(null===(t=this.config)||void 0===t?void 0:t.compact)?"compact":""}">
              ${this._renderKpi("Total Value",this._fmtCurrency(null===(i=A.valuation)||void 0===i?void 0:i.atIntervalEnd))}
              ${this._renderKpi("XIRR",this._fmtPct(null===(r=null===(o=A.kpis)||void 0===o?void 0:o.inInterval)||void 0===r?void 0:r.xirr),null===(s=null===(a=A.kpis)||void 0===a?void 0:a.inInterval)||void 0===s?void 0:s.xirr)}
              ${this._renderKpi("TTWROR",this._fmtPct(null===(l=null===(n=A.kpis)||void 0===n?void 0:n.inInterval)||void 0===l?void 0:l.ttwror),null===(d=null===(c=A.kpis)||void 0===c?void 0:c.inInterval)||void 0===d?void 0:d.ttwror)}
              ${this._renderKpi("Unrealized Gain",this._fmtCurrency(null===(h=null===(p=A.unrealizedGains)||void 0===p?void 0:p.inInterval)||void 0===h?void 0:h.gainGross),null===(v=null===(u=A.unrealizedGains)||void 0===u?void 0:u.inInterval)||void 0===v?void 0:v.gainGross)}
              ${(()=>{var e,t,i,o;const r=null!==(t=null===(e=A.valuation)||void 0===e?void 0:e.atIntervalStart)&&void 0!==t?t:0,a=null!==(o=null===(i=A.valuation)||void 0===i?void 0:i.atIntervalEnd)&&void 0!==o?o:0,s=r>0?(a-r)/r*100:null;return this._renderKpi("Period Return",this._fmtPct(s),s)})()}
              ${this._renderKpi("Realized Gain",this._fmtCurrency(null===(g=null===(f=A.realizedGains)||void 0===f?void 0:f.inInterval)||void 0===g?void 0:g.gainGross),null===(m=null===(_=A.realizedGains)||void 0===_?void 0:_.inInterval)||void 0===m?void 0:m.gainGross)}
              ${this._renderKpi("Dividends",this._fmtCurrency(null===(b=null===(y=A.dividends)||void 0===y?void 0:y.inInterval)||void 0===b?void 0:b.gainGross))}
              ${this._renderKpi("Fees",this._fmtCurrency(null===($=null===(x=A.fees)||void 0===x?void 0:x.inInterval)||void 0===$?void 0:$.fees))}
              ${this._renderKpi("Taxes",this._fmtCurrency(null===(k=null===(w=A.taxes)||void 0===w?void 0:w.inInterval)||void 0===k?void 0:k.taxes))}
            </div>
            ${!1!==(null===(C=this.config)||void 0===C?void 0:C.show_chart)?this._renderBreakdownChart(A):""}
          `:this._loading?"":G`<div class="empty">No data available.</div>`}
    `}_renderBreakdownChart(e){var t,i,o,r,a,s,n,l,c,d,p,h,u,v,f;const g=[{label:"Unrealized",value:null!==(o=null===(i=null===(t=e.unrealizedGains)||void 0===t?void 0:t.inInterval)||void 0===i?void 0:i.gainGross)&&void 0!==o?o:0,color:"var(--success-color, #4caf50)"},{label:"Realized",value:null!==(s=null===(a=null===(r=e.realizedGains)||void 0===r?void 0:r.inInterval)||void 0===a?void 0:a.gainGross)&&void 0!==s?s:0,color:"#4285f4"},{label:"Dividends",value:null!==(c=null===(l=null===(n=e.dividends)||void 0===n?void 0:n.inInterval)||void 0===l?void 0:l.gainGross)&&void 0!==c?c:0,color:"#46bdc6"},{label:"Fees",value:-(null!==(h=null===(p=null===(d=e.fees)||void 0===d?void 0:d.inInterval)||void 0===p?void 0:p.fees)&&void 0!==h?h:0),color:"#ff6d01"},{label:"Taxes",value:-(null!==(f=null===(v=null===(u=e.taxes)||void 0===u?void 0:u.inInterval)||void 0===v?void 0:v.taxes)&&void 0!==f?f:0),color:"var(--error-color, #f44336)"}].filter(e=>0!==e.value);return 0===g.length?"":G`
      <parqet-stacked-bar
        .segments=${g}
        .currencySymbol=${this._sym()}
      ></parqet-stacked-bar>
    `}_renderKpi(e,t,i){return G`
      <div class="kpi-tile">
        <div class="kpi-label">${e}</div>
        <div class="kpi-value ${this._kpiClass(i)}">${t}</div>
      </div>
    `}};De.styles=n`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
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
  `,t([fe()],De.prototype,"portfolioId",void 0),t([fe({attribute:!1})],De.prototype,"client",void 0),t([fe({attribute:!1})],De.prototype,"config",void 0),t([fe({type:Number})],De.prototype,"refreshTrigger",void 0),t([ge()],De.prototype,"_data",void 0),t([ge()],De.prototype,"_loading",void 0),t([ge()],De.prototype,"_interval",void 0),t([ge()],De.prototype,"_error",void 0),De=t([he("parqet-performance-view")],De);const Le=["#4285f4","#ea4335","#fbbc04","#34a853","#ff6d01","#46bdc6","#7b1fa2","#e91e63","#00acc1","#8d6e63"];function Me(e){return Le[e%Le.length]}const Re=160,Ue=2*Math.PI*66;let Ve=class extends de{constructor(){super(...arguments),this.segments=[],this.centerLabel="",this.centerSub=""}render(){const e=this.segments.reduce((e,t)=>e+Math.abs(t.value),0);if(0===e||0===this.segments.length)return G`<div class="empty">No data</div>`;const t=80;let i=0;return G`
      <div class="chart-container">
        <svg viewBox="0 0 ${Re} ${Re}" class="donut" role="img" aria-label="Portfolio allocation chart">
          ${this.segments.map(o=>{const r=Math.abs(o.value)/e,a=r*Ue,s=Ue-a,n=i/e*360-90;return i+=Math.abs(o.value),B`
              <circle
                cx="${t}" cy="${t}" r="${66}"
                fill="none"
                stroke="${o.color}"
                stroke-width="${28}"
                stroke-dasharray="${a} ${s}"
                transform="rotate(${n} ${t} ${t})"
                opacity="0.85"
              >
                <title>${o.label}: ${(100*r).toFixed(1)}%</title>
              </circle>
            `})}
          ${this.centerLabel?B`
                <text x="${t}" y="${t}" text-anchor="middle" dominant-baseline="central" class="center-text">
                  <tspan x="${t}" dy="-0.3em" class="center-val">${this.centerLabel}</tspan>
                  ${this.centerSub?B`<tspan x="${t}" dy="1.3em" class="center-sub">${this.centerSub}</tspan>`:""}
                </text>
              `:""}
        </svg>
        <div class="legend">
          ${this.segments.map(t=>{const i=Math.abs(t.value)/e*100;return G`
              <div class="legend-item">
                <span class="legend-dot" style="background:${t.color}"></span>
                <span class="legend-label">${t.label}</span>
                <span class="legend-pct">${i.toFixed(1)}%</span>
              </div>
            `})}
        </div>
      </div>
    `}};Ve.styles=n`
    :host { display: block; overflow: hidden; min-width: 0; }
    .chart-container {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 16px;
      max-width: 100%;
      box-sizing: border-box;
    }
    .donut {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
    }
    .center-text { pointer-events: none; }
    .center-val {
      font-size: 14px;
      font-weight: 600;
      fill: var(--primary-text-color, #333);
    }
    .center-sub {
      font-size: 9px;
      fill: var(--secondary-text-color, #757575);
    }
    .legend {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      color: var(--primary-text-color);
    }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .legend-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .legend-pct {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.82rem;
    }
  `,t([fe({type:Array})],Ve.prototype,"segments",void 0),t([fe({type:String})],Ve.prototype,"centerLabel",void 0),t([fe({type:String})],Ve.prototype,"centerSub",void 0),Ve=t([he("parqet-donut-chart")],Ve);let Ne=class extends de{constructor(){super(...arguments),this.portfolioId="",this.refreshTrigger=0,this._holdings=[],this._loading=!1,this._error="",this._sortKey="value",this._sortAsc=!1,this._expandedId=null}connectedCallback(){super.connectedCallback(),this._load()}updated(e){e.has("portfolioId")&&this.portfolioId&&this._load(),e.has("refreshTrigger")&&void 0!==e.get("refreshTrigger")&&this._load(!0)}async _load(e=!1){var t;if(this.portfolioId&&this.client){e||(this._loading=!0),this._error="";try{const e=await this.client.getPerformance(this.portfolioId,{type:"relative",value:"max"});this._holdings=null!==(t=e.holdings)&&void 0!==t?t:[]}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{e||(this._loading=!1)}}}_handleSort(e){this._sortKey===e?this._sortAsc=!this._sortAsc:(this._sortKey=e,this._sortAsc=!1)}_assetLabel(e){if(e.nickname)return e.nickname;const t=e.asset;return t.name?t.name:t.symbol?t.symbol:`…${e.id.slice(-8)}`}_sortHoldings(e){const t=e.reduce((e,t)=>e+t.position.currentValue,0);return[...e].sort((e,i)=>{let o,r;const a=e.position.currentValue-e.position.purchaseValue,s=i.position.currentValue-i.position.purchaseValue;switch(this._sortKey){case"name":return this._sortAsc?this._assetLabel(e).localeCompare(this._assetLabel(i)):this._assetLabel(i).localeCompare(this._assetLabel(e));case"value":o=e.position.currentValue,r=i.position.currentValue;break;case"pl":o=a,r=s;break;case"plPct":o=e.position.purchaseValue>0?a/e.position.purchaseValue:0,r=i.position.purchaseValue>0?s/i.position.purchaseValue:0;break;case"weight":o=t>0?e.position.currentValue/t:0,r=t>0?i.position.currentValue/t:0;break;default:return 0}return this._sortAsc?o-r:r-o})}_sym(){var e,t;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.currency_symbol)&&void 0!==t?t:"€"}_fmtC(e){return null==e?"—":`${this._sym()}${e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_fmtNum(e,t=4){return null==e?"—":e.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:t})}_sortIcon(e){return this._sortKey!==e?" ↕":this._sortAsc?" ↑":" ↓"}render(){var e,t,i;if(this._loading&&0===this._holdings.length)return G`<parqet-loading-spinner></parqet-loading-spinner>`;const o=this._holdings.filter(e=>!e.position.isSold),r=this._sortHoldings(o),a=o.reduce((e,t)=>e+t.position.currentValue,0),s=!1!==(null===(e=this.config)||void 0===e?void 0:e.show_logo),n=!!(null===(t=this.config)||void 0===t?void 0:t.compact);return G`
      ${this._error?G`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?G`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      ${!1!==(null===(i=this.config)||void 0===i?void 0:i.show_chart)?this._renderDonut(o,a):""}

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${s?G`<th class="logo-col"></th>`:""}
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
            ${r.map(e=>{var t,i,o,r,l,c,d,p,h;const u=e.position.currentValue-e.position.purchaseValue,v=e.position.purchaseValue>0?u/e.position.purchaseValue:0,f=a>0?e.position.currentValue/a:0,g=u>0?"positive":u<0?"negative":"",_=this._expandedId===e.id,m=null!==(i=null!==(t=e.asset.isin)&&void 0!==t?t:e.asset.symbol)&&void 0!==i?i:"";return G`
                <tr
                  class="row ${n?"compact":""}"
                  @click=${()=>this._expandedId=_?null:e.id}
                  role="button"
                  tabindex="0"
                  aria-expanded=${_}
                  @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(this._expandedId=_?null:e.id)}}
                >
                  ${s?G`<td class="logo-col">
                        ${e.logo?G`<img class="logo" src=${e.logo} alt="" loading="lazy" />`:G`<div class="logo-placeholder"></div>`}
                      </td>`:""}
                  <td class="name-col">
                    <span class="holding-name">${this._assetLabel(e)}</span>
                    ${m?G`<span class="ticker">${m}</span>`:""}
                  </td>
                  <td class="num">${this._fmtC(e.position.currentValue)}</td>
                  <td class="num ${g}">${this._fmtC(u)}</td>
                  <td class="num ${g}">
                    ${100*v>=0?"+":""}${(100*v).toFixed(2)}%
                  </td>
                  <td class="num">${(100*f).toFixed(1)}%</td>
                </tr>
                ${_?G`
                      <tr class="expanded-row">
                        <td colspan=${s?6:5}>
                          <div class="expanded">
                            <span>Shares: ${this._fmtNum(e.position.shares)}</span>
                            <span>Avg Price: ${this._fmtC(e.position.purchasePrice)}</span>
                            <span>Curr Price: ${this._fmtC(e.position.currentPrice)}</span>
                            <span>
                              XIRR:
                              ${null!=(null===(r=null===(o=e.performance.kpis)||void 0===o?void 0:o.inInterval)||void 0===r?void 0:r.xirr)?`${e.performance.kpis.inInterval.xirr.toFixed(2)}%`:"—"}
                            </span>
                            <span>
                              Dividends: ${this._fmtC(null===(c=null===(l=e.performance.dividends)||void 0===l?void 0:l.inInterval)||void 0===c?void 0:c.gainGross)}
                            </span>
                            <span>Fees: ${this._fmtC(null===(p=null===(d=e.performance.fees)||void 0===d?void 0:d.inInterval)||void 0===p?void 0:p.fees)}</span>
                            ${(null===(h=e.quote)||void 0===h?void 0:h.exchange)?G`<span>Exchange: ${e.quote.exchange}</span>`:""}
                          </div>
                        </td>
                      </tr>
                    `:""}
              `})}
          </tbody>
        </table>
        ${0!==r.length||this._loading?"":G`<div class="empty">No holdings found.</div>`}
      </div>
    `}_renderDonut(e,t){if(0===e.length)return"";const i=[...e].sort((e,t)=>t.position.currentValue-e.position.currentValue),o=[];let r=0;for(let e=0;e<i.length;e++)e<8?o.push({label:this._assetLabel(i[e]),value:i[e].position.currentValue,color:Me(e)}):r+=i[e].position.currentValue;r>0&&o.push({label:"Other",value:r,color:"#9e9e9e"});const a=`${this._sym()}${t.toLocaleString(void 0,{maximumFractionDigits:0})}`;return G`
      <parqet-donut-chart
        .segments=${o}
        .centerLabel=${a}
        .centerSub=${"Total Value"}
      ></parqet-donut-chart>
    `}};Ne.styles=n`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
    }
    .table-wrap {
      overflow-x: auto;
      max-width: 100%;
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
  `,t([fe()],Ne.prototype,"portfolioId",void 0),t([fe({attribute:!1})],Ne.prototype,"client",void 0),t([fe({attribute:!1})],Ne.prototype,"config",void 0),t([fe({type:Number})],Ne.prototype,"refreshTrigger",void 0),t([ge()],Ne.prototype,"_holdings",void 0),t([ge()],Ne.prototype,"_loading",void 0),t([ge()],Ne.prototype,"_error",void 0),t([ge()],Ne.prototype,"_sortKey",void 0),t([ge()],Ne.prototype,"_sortAsc",void 0),t([ge()],Ne.prototype,"_expandedId",void 0),Ne=t([he("parqet-holdings-view")],Ne);const je=[{value:"all",label:"All",color:"var(--primary-color, #03a9f4)"},{value:"buy",label:"Buy",color:"#4caf50"},{value:"sell",label:"Sell",color:"#f44336"},{value:"dividend",label:"Dividend",color:"#2196f3"},{value:"interest",label:"Interest",color:"#00bcd4"},{value:"transfer_in",label:"Transfer In",color:"#9c27b0"},{value:"transfer_out",label:"Transfer Out",color:"#7b1fa2"},{value:"fees_taxes",label:"Fees/Taxes",color:"#ff9800"},{value:"deposit",label:"Deposit",color:"#009688"},{value:"withdrawal",label:"Withdrawal",color:"#795548"}],He=Object.fromEntries(je.map(e=>[e.value,e.color]));let Fe=class extends de{constructor(){super(...arguments),this.portfolioId="",this.refreshTrigger=0,this._activities=[],this._cursor=null,this._loading=!1,this._loadingMore=!1,this._hasMore=!1,this._filter="all",this._error=""}connectedCallback(){var e,t;super.connectedCallback(),this._filter=null!==(t=null===(e=this.config)||void 0===e?void 0:e.default_activity_type)&&void 0!==t?t:"all",this._load(!0)}updated(e){e.has("portfolioId")&&this.portfolioId&&(this._reset(),this._load(!0)),e.has("refreshTrigger")&&void 0!==e.get("refreshTrigger")&&this._silentRefresh()}async _silentRefresh(){var e,t;if(this.portfolioId&&this.client)try{const i=await this.client.getActivities(this.portfolioId,{activityType:"all"!==this._filter?this._filter:void 0,limit:Math.max(10,null!==(t=null===(e=this.config)||void 0===e?void 0:e.activities_limit)&&void 0!==t?t:25),cursor:null});this._activities=i.activities,this._cursor=i.cursor,this._hasMore=!!i.cursor}catch(e){}}_reset(){this._activities=[],this._cursor=null,this._hasMore=!1}async _load(e=!1){var t,i;if(this.portfolioId&&this.client){e&&this._reset(),e?this._loading=!0:this._loadingMore=!0,this._error="";try{const o=await this.client.getActivities(this.portfolioId,{activityType:"all"!==this._filter?this._filter:void 0,limit:Math.max(10,null!==(i=null===(t=this.config)||void 0===t?void 0:t.activities_limit)&&void 0!==i?i:25),cursor:e?null:this._cursor});this._activities=e?o.activities:[...this._activities,...o.activities],this._cursor=o.cursor,this._hasMore=!!o.cursor}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{this._loading=!1,this._loadingMore=!1}}}async _setFilter(e){this._filter=e,await this._load(!0)}_fmtDate(e){return new Date(e).toLocaleDateString(void 0,{day:"2-digit",month:"2-digit",year:"numeric"})}_fmtC(e){var t,i;if(null==e)return"—";return`${null!==(i=null===(t=this.config)||void 0===t?void 0:t.currency_symbol)&&void 0!==i?i:"€"}${e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_typeLabel(e){return e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}render(){var e,t,i;const o=!!(null===(e=this.config)||void 0===e?void 0:e.compact);return G`
      <!-- Filter chips -->
      <div class="filters" role="group" aria-label="Filter activities">
        ${je.map(e=>G`
            <button
              class="chip ${this._filter===e.value?"active":""}"
              style="--chip-color: ${e.color}"
              @click=${()=>this._setFilter(e.value)}
              aria-pressed=${this._filter===e.value}
            >
              ${e.label}
            </button>
          `)}
      </div>

      ${this._error?G`<div class="error" role="alert">${this._error}</div>`:""}
      ${this._loading?G`<parqet-loading-spinner></parqet-loading-spinner>`:""}

      <div class="list">
        ${this._activities.slice(0,null!==(i=null===(t=this.config)||void 0===t?void 0:t.activities_limit)&&void 0!==i?i:25).map(e=>this._renderActivity(e,o))}
        ${0!==this._activities.length||this._loading?"":G`<div class="empty">No activities found.</div>`}
      </div>

      ${this._hasMore?G`
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
    `}_assetLabel(e){var t,i,o;return(null===(t=e.asset)||void 0===t?void 0:t.name)?e.asset.name:(null===(i=e.asset)||void 0===i?void 0:i.symbol)?e.asset.symbol:(null===(o=e.asset)||void 0===o?void 0:o.isin)?e.asset.isin:`…${e.holdingId.slice(-8)}`}_renderActivity(e,t){var i;const o=null!==(i=He[e.type])&&void 0!==i?i:"#888",r=null!=e.tax&&0!==e.tax||null!=e.fee&&0!==e.fee;return G`
      <div class="activity ${t?"compact":""}">
        <span class="badge" style="background: ${o}">${this._typeLabel(e.type)}</span>
        <div class="info">
          <span class="asset">${this._assetLabel(e)}</span>
          <span class="date">
            ${this._fmtDate(e.datetime)}${e.broker?G` · <span class="broker">${e.broker.replace(/_/g," ")}</span>`:""}
          </span>
          ${r?G`<span class="taxfee">
                ${e.tax?`Tax: ${this._fmtC(e.tax)}`:""}${e.tax&&e.fee?" · ":""}${e.fee?`Fee: ${this._fmtC(e.fee)}`:""}
              </span>`:""}
        </div>
        <div class="amounts">
          ${null!=e.shares?G`<span class="shares">${e.shares.toLocaleString()} shares</span>`:""}
          <span class="amount">${this._fmtC(e.amount)}</span>
        </div>
      </div>
    `}};Fe.styles=n`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
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
  `,t([fe()],Fe.prototype,"portfolioId",void 0),t([fe({attribute:!1})],Fe.prototype,"client",void 0),t([fe({attribute:!1})],Fe.prototype,"config",void 0),t([fe({type:Number})],Fe.prototype,"refreshTrigger",void 0),t([ge()],Fe.prototype,"_activities",void 0),t([ge()],Fe.prototype,"_cursor",void 0),t([ge()],Fe.prototype,"_loading",void 0),t([ge()],Fe.prototype,"_loadingMore",void 0),t([ge()],Fe.prototype,"_hasMore",void 0),t([ge()],Fe.prototype,"_filter",void 0),t([ge()],Fe.prototype,"_error",void 0),Fe=t([he("parqet-activities-view")],Fe);let Ge=class extends de{constructor(){super(...arguments),this.values=[]}render(){if(this.values.length<2)return G``;const e=this.values,t=Math.min(...e),i=Math.max(...e)-t||1,o=e.map((o,r)=>{const a=2+r/(e.length-1)*44,s=18-(o-t)/i*16;return`${a.toFixed(1)},${s.toFixed(1)}`}).join(" "),r=e[e.length-1]>=e[0];return G`
      <svg viewBox="0 0 ${48} ${20}" class="spark" role="img" aria-label="Trend sparkline">
        ${B`
          <polyline
            points="${o}"
            fill="none"
            stroke="${r?"var(--success-color, #4caf50)":"var(--error-color, #f44336)"}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        `}
      </svg>
    `}};var Be;Ge.styles=n`
    :host { display: inline-block; vertical-align: middle; }
    .spark {
      width: 48px;
      height: 20px;
    }
  `,t([fe({type:Array})],Ge.prototype,"values",void 0),Ge=t([he("parqet-sparkline")],Ge);const Ke=[{value:"total_value",label:"Total Value"},{value:"period_return",label:"Period Return"},{value:"xirr",label:"XIRR"},{value:"ttwror",label:"TTWROR"},{value:"unrealized_gain",label:"Unrealized Gain"},{value:"realized_gain",label:"Realized Gain"},{value:"dividends",label:"Dividends"},{value:"fees",label:"Fees"},{value:"taxes",label:"Taxes"}];let We=class extends de{constructor(){super(...arguments),this._authenticated=!1,this._portfolioId=null,this._data=null,this._loading=!1,this._interval="1y",this._error="",this._refreshTimer=null}setConfig(e){var t;const i=Object.assign({data_source:"rest",kpi:"total_value",default_interval:"1y",currency_symbol:"€",show_interval_selector:!0,layout:"vertical",refresh_interval:0},e);i.secondary_kpi&&!(null===(t=i.secondary_kpis)||void 0===t?void 0:t.length)&&(i.secondary_kpis=[i.secondary_kpi]),delete i.secondary_kpi,i.secondary_kpis&&(i.secondary_kpis=[...new Set(i.secondary_kpis)]),this._config=i,this._interval=this._config.default_interval,Pe.configure(this._config.client_id),Ee.configure(this._config.client_id),this._setupRefreshTimer()}getCardSize(){return 2}static getConfigElement(){return document.createElement("parqet-kpi-card-editor")}static getStubConfig(){return{data_source:"rest",kpi:"total_value",default_interval:"1y",currency_symbol:"€"}}connectedCallback(){var e;super.connectedCallback(),this._authenticated=Te.isTokenValid(null===(e=this._config)||void 0===e?void 0:e.client_id),this._authenticated&&this._loadData(),this._setupRefreshTimer()}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer()}updated(e){var t;e.has("hass")&&!this._authenticated&&Te.isTokenValid(null===(t=this._config)||void 0===t?void 0:t.client_id)&&(this._authenticated=!0,this._loadData(),this._setupRefreshTimer())}_setupRefreshTimer(){var e;this._clearRefreshTimer();const t=null===(e=this._config)||void 0===e?void 0:e.refresh_interval;t&&t>=1&&(this._refreshTimer=setInterval(()=>{this._loadData(!0)},6e4*t))}_clearRefreshTimer(){null!==this._refreshTimer&&(clearInterval(this._refreshTimer),this._refreshTimer=null)}get _client(){var e;return"mcp"===(null===(e=this._config)||void 0===e?void 0:e.data_source)?Ee:Pe}async _loadData(e=!1){var t,i,o;e||(this._loading=!0),this._error="";try{if(this._config.portfolio_id)this._portfolioId=this._config.portfolio_id;else{const e=await this._client.listPortfolios();this._portfolioId=null!==(i=null===(t=e[0])||void 0===t?void 0:t.id)&&void 0!==i?i:null}if(!this._portfolioId)return void(this._error="No portfolio found.");const e=await this._client.getPerformance(this._portfolioId,{type:"relative",value:this._interval});this._data=e.performance}catch(e){this._error=e instanceof Error?e.message:String(e),String(e).includes("401")&&(Te.clearToken(null===(o=this._config)||void 0===o?void 0:o.client_id),this._authenticated=!1)}finally{e||(this._loading=!1)}}async _onIntervalChange(e){this._interval=e.detail.interval,await this._loadData()}_extract(e,t){var i,o,r,a,s,n,l,c,d,p,h,u,v,f,g,_,m,y,b,x,$,w,k,C,A,S,T;switch(t){case"total_value":return null!==(o=null===(i=e.valuation)||void 0===i?void 0:i.atIntervalEnd)&&void 0!==o?o:null;case"period_return":{const t=null!==(a=null===(r=e.valuation)||void 0===r?void 0:r.atIntervalStart)&&void 0!==a?a:0,i=null!==(n=null===(s=e.valuation)||void 0===s?void 0:s.atIntervalEnd)&&void 0!==n?n:0;return t>0?(i-t)/t*100:null}case"xirr":return null!==(d=null===(c=null===(l=e.kpis)||void 0===l?void 0:l.inInterval)||void 0===c?void 0:c.xirr)&&void 0!==d?d:null;case"ttwror":return null!==(u=null===(h=null===(p=e.kpis)||void 0===p?void 0:p.inInterval)||void 0===h?void 0:h.ttwror)&&void 0!==u?u:null;case"unrealized_gain":return null!==(g=null===(f=null===(v=e.unrealizedGains)||void 0===v?void 0:v.inInterval)||void 0===f?void 0:f.gainGross)&&void 0!==g?g:null;case"realized_gain":return null!==(y=null===(m=null===(_=e.realizedGains)||void 0===_?void 0:_.inInterval)||void 0===m?void 0:m.gainGross)&&void 0!==y?y:null;case"dividends":return null!==($=null===(x=null===(b=e.dividends)||void 0===b?void 0:b.inInterval)||void 0===x?void 0:x.gainGross)&&void 0!==$?$:null;case"fees":return null!==(C=null===(k=null===(w=e.fees)||void 0===w?void 0:w.inInterval)||void 0===k?void 0:k.fees)&&void 0!==C?C:null;case"taxes":return null!==(T=null===(S=null===(A=e.taxes)||void 0===A?void 0:A.inInterval)||void 0===S?void 0:S.taxes)&&void 0!==T?T:null;default:return null}}_isPercent(e){return["period_return","xirr","ttwror"].includes(e)}_label(e){var t,i;return null!==(i=null===(t=Ke.find(t=>t.value===e))||void 0===t?void 0:t.label)&&void 0!==i?i:e}_format(e,t){var i,o;if(null==e)return"—";const r=null!==(o=null===(i=this._config)||void 0===i?void 0:i.currency_symbol)&&void 0!==o?o:"€";return this._isPercent(t)?`${e>=0?"+":""}${e.toFixed(2)}%`:`${r}${e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`}_colorClass(e,t){return null==e||"total_value"===t?"":e>0?"positive":e<0?"negative":""}render(){var e,t,i;if(!this._authenticated)return G`
        <ha-card>
          <div class="not-connected">
            <span>Not connected to Parqet</span>
            <span class="hint">Open the card editor to connect</span>
          </div>
        </ha-card>
      `;const o=null!==(e=this._config.kpi)&&void 0!==e?e:"total_value",r=null!==(t=this._config.secondary_kpis)&&void 0!==t?t:[],a=null!==(i=this._config.layout)&&void 0!==i?i:"vertical",s=this._data?this._extract(this._data,o):null,n=this._data?this._format(s,o):"—",l=this._colorClass(s,o),c=r.map(e=>{const t=this._data?this._extract(this._data,e):null;return{kpi:e,val:this._data?this._format(t,e):null,cls:this._colorClass(t,e)}});return G`
      <ha-card>
        <div class="upgrade-banner">
          <strong>Upgrade available!</strong> A full Home Assistant integration with sensors, entities, and automations is now available.
          <a href="https://github.com/cubinet-code/ha-parqet-companion" target="_blank" rel="noopener">Switch to ha-parqet-companion &rarr;</a>
          <span class="upgrade-sub">This card will no longer receive updates.</span>
        </div>

        ${!1!==this._config.show_interval_selector?G`<parqet-interval-selector
              .selected=${this._interval}
              @interval-change=${this._onIntervalChange}
            ></parqet-interval-selector>`:""}

        ${this._error?G`<div class="error">${this._error}</div>`:""}

        <div class="body ${a}">
          ${"horizontal"===a?this._renderHorizontal(o,n,l,c):this._renderVertical(o,n,l,c)}
        </div>
      </ha-card>
    `}get _sparklineValues(){var e,t,i,o;if(!this._data)return[];return[null!==(t=null===(e=this._data.valuation)||void 0===e?void 0:e.atIntervalStart)&&void 0!==t?t:0,null!==(o=null===(i=this._data.valuation)||void 0===i?void 0:i.atIntervalEnd)&&void 0!==o?o:0]}_renderVertical(e,t,i,o){return G`
      <div class="primary-block">
        <div class="label">${this._label(e)}</div>
        ${this._loading?G`<parqet-loading-spinner></parqet-loading-spinner>`:G`<div class="value-row">
              <div class="value ${i}">${t}</div>
              ${this._config.show_sparkline?G`<parqet-sparkline .values=${this._sparklineValues}></parqet-sparkline>`:""}
            </div>`}
      </div>
      ${o.map(e=>null!=e.val?G`<div class="secondary-block">
              <span class="secondary-label">${this._label(e.kpi)}</span>
              <span class="secondary-value ${e.cls}">${e.val}</span>
            </div>`:"")}
    `}_renderHorizontal(e,t,i,o){return G`
      <div class="h-labels">
        <div class="label">${this._label(e)}</div>
        ${o.map(e=>G`<div class="secondary-label">${this._label(e.kpi)}</div>`)}
      </div>
      <div class="h-values">
        ${this._loading?G`<parqet-loading-spinner></parqet-loading-spinner>`:G`<div class="value-row">
              <div class="value ${i}">${t}</div>
              ${this._config.show_sparkline?G`<parqet-sparkline .values=${this._sparklineValues}></parqet-sparkline>`:""}
            </div>`}
        ${o.map(e=>null!=e.val?G`<div class="secondary-value ${e.cls}">${e.val}</div>`:"")}
      </div>
    `}};We.styles=n`
    :host { display: block; overflow: hidden; min-width: 0; }
    ha-card { overflow: hidden; }
    .upgrade-banner {
      background: var(--info-color, #039be5);
      color: #fff;
      padding: 10px 14px;
      font-size: 0.8rem;
      line-height: 1.4;
    }
    .upgrade-banner a {
      color: #fff;
      font-weight: 600;
      text-decoration: underline;
    }
    .upgrade-banner .upgrade-sub {
      display: block;
      opacity: 0.85;
      font-size: 0.7rem;
      margin-top: 2px;
    }
    .not-connected {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 20px;
      font-size: 0.875rem;
      color: var(--secondary-text-color);
    }
    .hint { font-size: 0.75rem; opacity: 0.7; }
    .error {
      margin: 0 16px 8px;
      padding: 6px 10px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.8rem;
    }

    /* ── Vertical layout ── */
    .body.vertical {
      padding: 8px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .primary-block { display: flex; flex-direction: column; gap: 2px; }
    .secondary-block {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    /* ── Horizontal layout ── */
    .body.horizontal {
      padding: 8px 20px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .h-labels {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .h-values {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }

    /* ── Shared text styles ── */
    .label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    .value-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary-text-color);
      line-height: 1.15;
    }
    .body.horizontal .value { font-size: 1.5rem; }
    .value.positive { color: var(--success-color, #4caf50); }
    .value.negative { color: var(--error-color, #f44336); }
    .secondary-label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .secondary-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .secondary-value.positive { color: var(--success-color, #4caf50); }
    .secondary-value.negative { color: var(--error-color, #f44336); }
  `,t([fe({attribute:!1})],We.prototype,"hass",void 0),t([ge()],We.prototype,"_config",void 0),t([ge()],We.prototype,"_authenticated",void 0),t([ge()],We.prototype,"_portfolioId",void 0),t([ge()],We.prototype,"_data",void 0),t([ge()],We.prototype,"_loading",void 0),t([ge()],We.prototype,"_interval",void 0),t([ge()],We.prototype,"_error",void 0),We=t([he("parqet-kpi-card")],We);let Ye=Be=class extends de{constructor(){super(...arguments),this._connected=!1,this._authLoading=!1,this._portfolios=[],this._loadingPortfolios=!1,this._authError="",this._addingSecondary=!1}setConfig(e){var t;const i=Object.assign({},e);i.secondary_kpi&&!(null===(t=i.secondary_kpis)||void 0===t?void 0:t.length)&&(i.secondary_kpis=[i.secondary_kpi]),delete i.secondary_kpi,i.secondary_kpis&&(i.secondary_kpis=[...new Set(i.secondary_kpis)]),this._config=i,this._connected=Te.isTokenValid(i.client_id),this._connected&&0===this._portfolios.length&&this._fetchPortfolios()}async _fetchPortfolios(){var e;this._loadingPortfolios=!0;try{const t="mcp"===(null===(e=this._config)||void 0===e?void 0:e.data_source)?Ee:Pe;this._portfolios=await t.listPortfolios()}catch(e){}finally{this._loadingPortfolios=!1}}async _handleConnect(){var e,t;this._authLoading=!0,this._authError="";const i=window.open("","parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes");try{await Te.startAuth(null===(e=this._config)||void 0===e?void 0:e.client_id,null===(t=this._config)||void 0===t?void 0:t.redirect_uri,i),this._connected=!0,this._fetchPortfolios()}catch(e){this._authError=e instanceof Error?e.message:String(e)}finally{this._authLoading=!1}}_handleDisconnect(){var e;Te.clearToken(null===(e=this._config)||void 0===e?void 0:e.client_id),this._connected=!1,this._portfolios=[]}static getConfigForm(){return[{name:"default_interval",label:"Time Interval",selector:{select:{options:[{value:"1d",label:"1 Day"},{value:"1w",label:"1 Week"},{value:"mtd",label:"Month to Date"},{value:"1m",label:"1 Month"},{value:"3m",label:"3 Months"},{value:"6m",label:"6 Months"},{value:"1y",label:"1 Year"},{value:"ytd",label:"Year to Date"},{value:"3y",label:"3 Years"},{value:"5y",label:"5 Years"},{value:"10y",label:"10 Years"},{value:"max",label:"All Time"}]}}},{name:"show_interval_selector",label:"Show interval selector on card",selector:{boolean:{}}},{name:"data_source",label:"Data Source",selector:{select:{options:[{value:"rest",label:"Connect REST API (recommended)"},{value:"mcp",label:"MCP Server — unavailable (Parqet API limitation)",disabled:!0}]}}},{type:"expandable",title:"Display",flatten:!0,schema:[{name:"currency_symbol",label:"Currency Symbol",selector:{text:{}}},{name:"show_sparkline",label:"Show sparkline trend",selector:{boolean:{}}},{name:"refresh_interval",label:"Auto-refresh interval in minutes (0 = disabled)",selector:{number:{min:0,max:60,step:1,mode:"box"}}}]},{type:"expandable",title:"Advanced",flatten:!0,schema:[{name:"client_id",label:"Parqet Connect Client ID (leave blank to use shared default)",selector:{text:{}}},{name:"redirect_uri",label:"OAuth Redirect URI (required when using your own Client ID)",selector:{text:{}}}]}]}render(){var e,t,i;if(!this._config||!this.hass)return G``;const o=null!==(e=this._config.kpi)&&void 0!==e?e:"total_value",r=null!==(t=this._config.secondary_kpis)&&void 0!==t?t:[],a=null!==(i=this._config.layout)&&void 0!==i?i:"vertical",s=new Set([o,...r]),n=Ke.filter(e=>!s.has(e.value));return G`
      <!-- Auth row -->
      <div class="auth-row">
        <div class="auth-status">
          <span class="auth-dot ${this._connected?"connected":"disconnected"}"></span>
          ${this._connected?"Connected to Parqet":"Not connected to Parqet"}
        </div>
        ${this._connected?G`<button class="auth-btn disconnect" @click=${this._handleDisconnect}>Disconnect</button>`:G`<button class="auth-btn connect" @click=${this._handleConnect} ?disabled=${this._authLoading}>
              ${this._authLoading?"Connecting…":"Connect"}
            </button>`}
      </div>
      ${this._authError?G`<div class="auth-error">${this._authError}</div>`:""}

      <!-- Portfolio picker -->
      <div class="section-row">
        <label class="section-label">Portfolio</label>
        ${this._loadingPortfolios?G`<div class="hint-text">Loading portfolios…</div>`:this._portfolios.length>0?G`
                <select class="portfolio-select" @change=${this._portfolioChanged}>
                  <option value="" ?selected=${!this._config.portfolio_id}>
                    Use first portfolio automatically
                  </option>
                  ${this._portfolios.map(e=>{var t;return G`
                      <option value=${e.id} ?selected=${(null===(t=this._config)||void 0===t?void 0:t.portfolio_id)===e.id}>
                        ${e.name}
                      </option>
                    `})}
                </select>
              `:G`<div class="hint-text">
                ${this._connected?"No portfolios found":"Connect to load portfolios"}
              </div>`}
      </div>

      <!-- Content section (chip-style) -->
      <div class="section-row">
        <label class="section-label">Content</label>
        <div class="chip-row">
          <!-- Primary metric chip — always present, click to change via select -->
          <div class="chip primary-chip">
            <span class="chip-icon">≡</span>
            <select
              class="chip-select"
              @change=${this._primaryChanged}
            >
              ${Ke.map(e=>G`<option value=${e.value} ?selected=${e.value===o}>${e.label}</option>`)}
            </select>
          </div>

          <!-- Secondary metric chips -->
          ${r.map((e,t)=>G`
            <div class="chip secondary-chip">
              <span class="chip-icon">≡</span>
              <select class="chip-select" @change=${e=>this._secondaryChanged(e,t)}>
                ${Ke.filter(t=>t.value===e||!s.has(t.value)).map(t=>G`<option value=${t.value} ?selected=${t.value===e}>${t.label}</option>`)}
              </select>
              <button class="chip-remove" @click=${()=>this._removeSecondary(t)} aria-label="Remove">×</button>
            </div>
          `)}

          <!-- Add button -->
          ${this._addingSecondary?G`
                <div class="chip secondary-chip adding">
                  <select class="chip-select" @change=${this._pickSecondary} @blur=${this._cancelAddSecondary}>
                    <option value="">— pick a metric —</option>
                    ${n.map(e=>G`<option value=${e.value}>${e.label}</option>`)}
                  </select>
                  <button class="chip-remove" @click=${this._cancelAddSecondary} aria-label="Cancel">×</button>
                </div>
              `:n.length>0?G`<button class="add-chip" @click=${()=>this._addingSecondary=!0}>+ Add</button>`:""}
        </div>
      </div>

      <!-- Layout picker -->
      <div class="section-row">
        <label class="section-label">Content layout</label>
        <div class="layout-row">
          <button
            class="layout-option ${"vertical"===a?"selected":""}"
            @click=${()=>this._setLayout("vertical")}
          >
            <div class="layout-thumb vertical-thumb">
              <div class="lt-label"></div>
              <div class="lt-value"></div>
              <div class="lt-secondary"></div>
            </div>
            <span>Vertical</span>
          </button>
          <button
            class="layout-option ${"horizontal"===a?"selected":""}"
            @click=${()=>this._setLayout("horizontal")}
          >
            <div class="layout-thumb horizontal-thumb">
              <div class="lt-left">
                <div class="lt-label"></div>
                <div class="lt-secondary"></div>
              </div>
              <div class="lt-value-right"></div>
            </div>
            <span>Horizontal</span>
          </button>
        </div>
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Be.getConfigForm()}
        .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:""}}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_primaryChanged(e){var t;const i=e.target.value,o=Object.assign(Object.assign({},this._config),{kpi:i});o.secondary_kpis=(null!==(t=o.secondary_kpis)&&void 0!==t?t:[]).filter(e=>e!==i),this._fire(o)}_secondaryChanged(e,t){var i;const o=e.target.value,r=[...null!==(i=this._config.secondary_kpis)&&void 0!==i?i:[]];r[t]=o,this._fire(Object.assign(Object.assign({},this._config),{secondary_kpis:r}))}_removeSecondary(e){var t;const i=[...null!==(t=this._config.secondary_kpis)&&void 0!==t?t:[]];i.splice(e,1),this._fire(Object.assign(Object.assign({},this._config),{secondary_kpis:i}))}_pickSecondary(e){var t;const i=e.target.value;if(!i)return;this._addingSecondary=!1;const o=[...null!==(t=this._config.secondary_kpis)&&void 0!==t?t:[],i];this._fire(Object.assign(Object.assign({},this._config),{secondary_kpis:o}))}_cancelAddSecondary(){setTimeout(()=>{this._addingSecondary=!1},150)}_setLayout(e){this._fire(Object.assign(Object.assign({},this._config),{layout:e}))}_portfolioChanged(e){const t=e.target.value,i=Object.assign({},this._config);t?i.portfolio_id=t:delete i.portfolio_id,this._fire(i)}_valueChanged(e){this._fire(e.detail.value)}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};Ye.styles=n`
    /* ── Auth row ── */
    .auth-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-bottom: 4px;
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
    .auth-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .auth-dot.connected    { background: #4caf50; }
    .auth-dot.disconnected { background: var(--secondary-text-color, #9e9e9e); }
    .auth-btn {
      padding: 4px 12px; border-radius: 4px; cursor: pointer;
      font-size: 0.8rem; transition: background 0.15s;
    }
    .auth-btn.connect { background: var(--primary-color, #03a9f4); color: white; border: none; }
    .auth-btn.connect:hover:not(:disabled) { opacity: 0.85; }
    .auth-btn.connect:disabled { opacity: 0.5; cursor: not-allowed; }
    .auth-btn.disconnect { background: none; border: 1px solid var(--error-color, #f44336); color: var(--error-color, #f44336); }
    .auth-btn.disconnect:hover { background: rgba(244, 67, 54, 0.08); }
    .auth-error {
      margin: 4px 0 8px; padding: 6px 12px;
      background: rgba(244, 67, 54, 0.1); color: var(--error-color, #f44336);
      border-radius: 6px; font-size: 0.8rem;
    }

    /* ── Shared section layout ── */
    .section-row { padding: 10px 16px 6px; }
    .section-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    .hint-text { font-size: 0.8rem; color: var(--secondary-text-color); font-style: italic; }

    /* ── Portfolio select ── */
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
    .portfolio-select:focus { outline: 2px solid var(--primary-color); outline-offset: 1px; }

    /* ── Chip row ── */
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 0.8rem;
    }
    .chip-icon { font-size: 0.75rem; color: var(--secondary-text-color); }
    .chip-select {
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0;
      outline: none;
    }
    .chip-remove {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 1rem;
      line-height: 1;
      padding: 0 2px;
      transition: color 0.1s;
    }
    .chip-remove:hover { color: var(--error-color, #f44336); }
    .add-chip {
      padding: 4px 10px;
      border: 1px dashed var(--divider-color, #bdbdbd);
      border-radius: 16px;
      background: none;
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .add-chip:hover { border-color: var(--primary-color); color: var(--primary-color); }

    /* ── Layout picker ── */
    .layout-row { display: flex; gap: 12px; }
    .layout-option {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 8px;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 0.78rem;
      transition: border-color 0.15s, color 0.15s;
    }
    .layout-option.selected {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.06);
    }
    .layout-option:hover:not(.selected) { border-color: var(--secondary-text-color); color: var(--primary-text-color); }

    /* Thumbnail sketches */
    .layout-thumb {
      width: 64px; height: 44px;
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      padding: 6px 8px;
      box-sizing: border-box;
    }
    .vertical-thumb { display: flex; flex-direction: column; gap: 4px; justify-content: center; }
    .lt-label  { height: 5px; width: 60%; border-radius: 2px; background: var(--secondary-text-color, #9e9e9e); opacity: 0.5; }
    .lt-value  { height: 10px; width: 85%; border-radius: 2px; background: var(--primary-text-color, #333); opacity: 0.6; }
    .lt-secondary { height: 5px; width: 45%; border-radius: 2px; background: var(--secondary-text-color, #9e9e9e); opacity: 0.4; }

    .horizontal-thumb { display: flex; align-items: center; justify-content: space-between; }
    .lt-left { display: flex; flex-direction: column; gap: 4px; }
    .lt-value-right { height: 10px; width: 36%; border-radius: 2px; background: var(--primary-text-color, #333); opacity: 0.6; }
  `,t([fe({attribute:!1})],Ye.prototype,"hass",void 0),t([ge()],Ye.prototype,"_config",void 0),t([ge()],Ye.prototype,"_connected",void 0),t([ge()],Ye.prototype,"_authLoading",void 0),t([ge()],Ye.prototype,"_portfolios",void 0),t([ge()],Ye.prototype,"_loadingPortfolios",void 0),t([ge()],Ye.prototype,"_authError",void 0),t([ge()],Ye.prototype,"_addingSecondary",void 0),Ye=Be=t([he("parqet-kpi-card-editor")],Ye);const Je=window;Je.customCards=Je.customCards||[],Je.customCards.push({type:"parqet-companion-card",name:"Parqet Home Assistant Companion",description:"Display your Parqet portfolio data — performance, holdings and activities.",preview:!0,documentationURL:"https://github.com/cubinet-code/parqet-homeassistant-companion"}),Je.customCards.push({type:"parqet-kpi-card",name:"Parqet KPI Card",description:"Show a single Parqet portfolio metric — total value, XIRR, returns, dividends and more.",preview:!0,documentationURL:"https://github.com/cubinet-code/parqet-homeassistant-companion"}),e.ParqetCompanionCard=class extends de{constructor(){super(...arguments),this._authenticated=!1,this._portfolios=[],this._portfolioId=null,this._activeView="performance",this._loading=!1,this._error="",this._refreshTrigger=0,this._refreshTimer=null}connectedCallback(){var e;super.connectedCallback(),this._authenticated=Te.isTokenValid(null===(e=this._config)||void 0===e?void 0:e.client_id),this._authenticated&&this._loadPortfolios(),this._setupRefreshTimer()}disconnectedCallback(){super.disconnectedCallback(),this._clearRefreshTimer()}updated(e){var t;e.has("hass")&&!this._authenticated&&Te.isTokenValid(null===(t=this._config)||void 0===t?void 0:t.client_id)&&(this._authenticated=!0,this._loadPortfolios(),this._setupRefreshTimer())}_setupRefreshTimer(){var e;this._clearRefreshTimer();const t=null===(e=this._config)||void 0===e?void 0:e.refresh_interval;t&&t>=1&&(this._refreshTimer=setInterval(()=>{this._refreshTrigger++},6e4*t))}_clearRefreshTimer(){null!==this._refreshTimer&&(clearInterval(this._refreshTimer),this._refreshTimer=null)}setConfig(e){this._config=Object.assign({data_source:"rest",view_layout:"tabs",default_view:"performance",default_interval:"1y",show_interval_selector:!0,show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€",activities_limit:25,refresh_interval:0},e),this._activeView=this._config.default_view,Pe.configure(this._config.client_id),Ee.configure(this._config.client_id),this._setupRefreshTimer()}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:6,min_columns:6,min_rows:4}}static getConfigElement(){return document.createElement("parqet-companion-card-editor")}static getStubConfig(){return{data_source:"rest",default_view:"performance",default_interval:"1y",show_chart:!0,show_logo:!0,compact:!1,currency_symbol:"€"}}static getConfigForm(){return[{name:"data_source",label:"Data Source",selector:{select:{options:[{value:"rest",label:"Connect REST API (recommended)"},{value:"mcp",label:"MCP Server — unavailable (Parqet API limitation)",disabled:!0}]}}},{type:"expandable",title:"Layout",flatten:!0,schema:[{name:"view_layout",label:"View Layout",selector:{select:{options:[{value:"tabs",label:"Tabs (all views)"},{value:"single",label:"Single view only"}]}}},{name:"default_view",label:"Default View",selector:{select:{options:[{value:"performance",label:"Performance"},{value:"holdings",label:"Holdings"},{value:"activities",label:"Activities"}]}}},{name:"compact",label:"Compact mode",selector:{boolean:{}}},{name:"hide_header",label:"Hide portfolio header (useful when portfolio is locked)",selector:{boolean:{}}}]},{type:"expandable",title:"Performance",flatten:!0,schema:[{name:"show_chart",label:"Show charts",selector:{boolean:{}}},{name:"show_interval_selector",label:"Show interval selector on card",selector:{boolean:{}}},{name:"default_interval",label:"Default Time Interval",selector:{select:{options:[{value:"1d",label:"1 Day"},{value:"1w",label:"1 Week"},{value:"mtd",label:"Month to Date"},{value:"1m",label:"1 Month"},{value:"3m",label:"3 Months"},{value:"6m",label:"6 Months"},{value:"1y",label:"1 Year"},{value:"ytd",label:"Year to Date"},{value:"3y",label:"3 Years"},{value:"5y",label:"5 Years"},{value:"10y",label:"10 Years"},{value:"max",label:"All Time"}]}}}]},{type:"expandable",title:"Holdings",flatten:!0,schema:[{name:"show_logo",label:"Show holding logos",selector:{boolean:{}}}]},{type:"expandable",title:"Activities",flatten:!0,schema:[{name:"activities_limit",label:"Activities to show (1–25)",selector:{number:{min:1,max:25,step:1,mode:"box"}}},{name:"default_activity_type",label:"Default activity filter",selector:{select:{options:[{value:"all",label:"All"},{value:"buy",label:"Buy"},{value:"sell",label:"Sell"},{value:"dividend",label:"Dividend"},{value:"interest",label:"Interest"},{value:"transfer_in",label:"Transfer In"},{value:"transfer_out",label:"Transfer Out"},{value:"fees_taxes",label:"Fees / Taxes"},{value:"deposit",label:"Deposit"},{value:"withdrawal",label:"Withdrawal"}]}}}]},{type:"expandable",title:"Display",flatten:!0,schema:[{name:"currency_symbol",label:"Currency Symbol",selector:{text:{}}},{name:"refresh_interval",label:"Auto-refresh interval in minutes (0 = disabled)",selector:{number:{min:0,max:60,step:1,mode:"box"}}}]},{type:"expandable",title:"Advanced",flatten:!0,schema:[{name:"client_id",label:"Parqet Connect Client ID (optional — leave blank to use shared default)",selector:{text:{}}},{name:"redirect_uri",label:"OAuth Redirect URI (optional — required when using your own Client ID)",selector:{text:{}}}]}]}get _client(){var e;return"mcp"===(null===(e=this._config)||void 0===e?void 0:e.data_source)?Ee:Pe}async _loadPortfolios(){var e,t,i,o,r;this._loading=!0,this._error="";try{this._portfolios=await this._client.listPortfolios(),this._portfolioId=null!==(o=null!==(t=null===(e=this._config)||void 0===e?void 0:e.portfolio_id)&&void 0!==t?t:null===(i=this._portfolios[0])||void 0===i?void 0:i.id)&&void 0!==o?o:null}catch(e){this._error=e instanceof Error?e.message:String(e),String(e).includes("401")&&(Te.clearToken(null===(r=this._config)||void 0===r?void 0:r.client_id),this._authenticated=!1)}finally{this._loading=!1}}_handlePortfolioChange(e){this._portfolioId=e.detail.portfolioId}render(){var e,t,i,o;if(!this._authenticated)return G`
        <ha-card>
          <div class="not-connected">
            <span>Not connected to Parqet</span>
            <span class="hint">Open the card editor to connect</span>
          </div>
        </ha-card>
      `;if(this._loading&&0===this._portfolios.length)return G`
        <ha-card>
          <parqet-loading-spinner></parqet-loading-spinner>
        </ha-card>
      `;const r="single"!==(null===(e=this._config)||void 0===e?void 0:e.view_layout);return G`
      <ha-card>
        <div class="upgrade-banner">
          <strong>Upgrade available!</strong> A full Home Assistant integration with sensors, entities, and automations is now available.
          <a href="https://github.com/cubinet-code/ha-parqet-companion" target="_blank" rel="noopener">Switch to ha-parqet-companion &rarr;</a>
          <span class="upgrade-sub">This card will no longer receive updates.</span>
        </div>

        <!-- Header row -->
        ${(null===(t=this._config)||void 0===t?void 0:t.hide_header)?"":G`
              <div class="card-header">
                ${this._portfolios.length>1?G`
                      <parqet-portfolio-selector
                        .portfolios=${this._portfolios}
                        .selected=${this._portfolioId}
                        @portfolio-change=${this._handlePortfolioChange}
                      ></parqet-portfolio-selector>
                    `:G`<span class="portfolio-name">${null!==(o=null===(i=this._portfolios[0])||void 0===i?void 0:i.name)&&void 0!==o?o:""}</span>`}
              </div>
            `}

        <!-- Tabs -->
        ${r?G`
              <div class="tabs" role="tablist">
                ${["performance","holdings","activities"].map(e=>G`
                    <button
                      class="tab ${this._activeView===e?"active":""}"
                      role="tab"
                      aria-selected=${this._activeView===e}
                      @click=${()=>this._activeView=e}
                    >
                      ${e.charAt(0).toUpperCase()+e.slice(1)}
                    </button>
                  `)}
              </div>
            `:""}

        ${this._error?G`<div class="card-error">${this._error}</div>`:""}

        <!-- View content -->
        <div class="view-content" role="tabpanel">
          ${this._portfolioId?this._renderView():G`<div class="empty">No portfolio selected.</div>`}
        </div>
      </ha-card>
    `}_renderView(){const e=this._portfolioId,t=this._activeView;return"performance"===t?G`
        <parqet-performance-view
          .portfolioId=${e}
          .client=${this._client}
          .config=${this._config}
          .refreshTrigger=${this._refreshTrigger}
        ></parqet-performance-view>
      `:"holdings"===t?G`
        <parqet-holdings-view
          .portfolioId=${e}
          .client=${this._client}
          .config=${this._config}
          .refreshTrigger=${this._refreshTrigger}
        ></parqet-holdings-view>
      `:G`
      <parqet-activities-view
        .portfolioId=${e}
        .client=${this._client}
        .config=${this._config}
        .refreshTrigger=${this._refreshTrigger}
      ></parqet-activities-view>
    `}},e.ParqetCompanionCard.styles=n`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
      height: 100%;
    }
    ha-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    .upgrade-banner {
      background: var(--info-color, #039be5);
      color: #fff;
      padding: 10px 14px;
      font-size: 0.8rem;
      line-height: 1.4;
    }
    .upgrade-banner a {
      color: #fff;
      font-weight: 600;
      text-decoration: underline;
    }
    .upgrade-banner .upgrade-sub {
      display: block;
      opacity: 0.85;
      font-size: 0.7rem;
      margin-top: 2px;
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
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    .empty {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
    .not-connected {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 20px;
      font-size: 0.875rem;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 0.75rem;
      opacity: 0.7;
    }
  `,t([fe({attribute:!1})],e.ParqetCompanionCard.prototype,"hass",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_config",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_authenticated",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_portfolios",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_portfolioId",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_activeView",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_loading",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_error",void 0),t([ge()],e.ParqetCompanionCard.prototype,"_refreshTrigger",void 0),e.ParqetCompanionCard=t([he("parqet-companion-card")],e.ParqetCompanionCard);let Xe=class extends de{constructor(){super(...arguments),this._connected=!1,this._authLoading=!1,this._authError="",this._portfolios=[],this._loadingPortfolios=!1}setConfig(e){this._config=e,this._connected=Te.isTokenValid(e.client_id),this._connected&&0===this._portfolios.length&&this._fetchPortfolios()}async _fetchPortfolios(){var e;this._loadingPortfolios=!0;try{const t="mcp"===(null===(e=this._config)||void 0===e?void 0:e.data_source)?Ee:Pe;this._portfolios=await t.listPortfolios()}catch(e){}finally{this._loadingPortfolios=!1}}async _handleConnect(){var e,t;this._authLoading=!0,this._authError="";const i=window.open("","parqet-auth","width=520,height=720,scrollbars=yes,resizable=yes");try{await Te.startAuth(null===(e=this._config)||void 0===e?void 0:e.client_id,null===(t=this._config)||void 0===t?void 0:t.redirect_uri,i),this._connected=!0,this._fetchPortfolios()}catch(e){this._authError=e instanceof Error?e.message:String(e)}finally{this._authLoading=!1}}render(){return this._config&&this.hass?G`
      <div class="auth-row">
        <div class="auth-status">
          <span class="auth-dot ${this._connected?"connected":"disconnected"}"></span>
          ${this._connected?"Connected to Parqet":"Not connected to Parqet"}
        </div>
        ${this._connected?G`<button class="auth-btn disconnect" @click=${this._handleDisconnect}>Disconnect</button>`:G`<button class="auth-btn connect" @click=${this._handleConnect} ?disabled=${this._authLoading}>
              ${this._authLoading?"Connecting…":"Connect"}
            </button>`}
      </div>
      ${this._authError?G`<div class="auth-error">${this._authError}</div>`:""}

      <!-- Portfolio picker -->
      <div class="portfolio-row">
        <label class="portfolio-label">Portfolio</label>
        ${this._loadingPortfolios?G`<div class="portfolio-hint">Loading portfolios…</div>`:this._portfolios.length>0?G`
                <select class="portfolio-select" @change=${this._portfolioChanged}>
                  <option value="" ?selected=${!this._config.portfolio_id}>
                    Show portfolio picker in card
                  </option>
                  ${this._portfolios.map(e=>{var t;return G`
                      <option
                        value=${e.id}
                        ?selected=${(null===(t=this._config)||void 0===t?void 0:t.portfolio_id)===e.id}
                      >
                        ${e.name}
                      </option>
                    `})}
                </select>
              `:G`<div class="portfolio-hint">
                ${this._connected?"No portfolios found":"Connect to Parqet first, then re-open the editor"}
              </div>`}
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e.ParqetCompanionCard.getConfigForm()}
        .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:""}}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:G``}_portfolioChanged(e){const t=e.target.value,i=Object.assign({},this._config);t?i.portfolio_id=t:delete i.portfolio_id,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_handleDisconnect(){var e;Te.clearToken(null===(e=this._config)||void 0===e?void 0:e.client_id),this._connected=!1}_valueChanged(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0}))}};return Xe.styles=n`
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
    .auth-btn {
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background 0.15s;
    }
    .auth-btn.connect {
      background: var(--primary-color, #03a9f4);
      color: white;
      border: none;
    }
    .auth-btn.connect:hover:not(:disabled) { opacity: 0.85; }
    .auth-btn.connect:disabled { opacity: 0.5; cursor: not-allowed; }
    .auth-btn.disconnect {
      background: none;
      border: 1px solid var(--error-color, #f44336);
      color: var(--error-color, #f44336);
    }
    .auth-btn.disconnect:hover { background: rgba(244, 67, 54, 0.08); }
    .auth-error {
      margin: 4px 0 8px;
      padding: 6px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.8rem;
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
  `,t([fe({attribute:!1})],Xe.prototype,"hass",void 0),t([ge()],Xe.prototype,"_config",void 0),t([ge()],Xe.prototype,"_connected",void 0),t([ge()],Xe.prototype,"_authLoading",void 0),t([ge()],Xe.prototype,"_authError",void 0),t([ge()],Xe.prototype,"_portfolios",void 0),t([ge()],Xe.prototype,"_loadingPortfolios",void 0),Xe=t([he("parqet-companion-card-editor")],Xe),e}({});
