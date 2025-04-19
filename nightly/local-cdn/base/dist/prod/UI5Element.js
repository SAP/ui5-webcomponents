"use strict";import"@ui5/webcomponents-base/dist/ssr-dom.js";import F from"./thirdparty/merge.js";import{boot as N}from"./Boot.js";import k from"./UI5ElementMetadata.js";import S from"./EventProvider.js";import x from"./updateShadowRoot.js";import{shouldIgnoreCustomElement as V}from"./IgnoreCustomElements.js";import{renderDeferred as j,renderImmediately as H,cancelRender as $}from"./Render.js";import{registerTag as z,isTagRegistered as B,recordTagRegistrationFailure as K}from"./CustomElementsRegistry.js";import{observeDOMNode as q,unobserveDOMNode as W}from"./DOMObserver.js";import{skipOriginalEvent as X}from"./config/NoConflict.js";import Y from"./locale/getEffectiveDir.js";import{kebabToCamelCase as g,camelToKebabCase as J,kebabToPascalCase as P}from"./util/StringHelper.js";import w from"./util/isValidPropertyName.js";import{getSlotName as G,getSlottedNodesList as D}from"./util/SlotsHelper.js";import Q from"./util/arraysAreEqual.js";import{markAsRtlAware as Z}from"./locale/RTLAwareRegistry.js";import tt from"./renderer/executeTemplate.js";import{shouldScopeCustomElement as T}from"./CustomElementsScopeUtils.js";import{updateFormValue as et,setFormValue as A}from"./features/InputElementsFormSupport.js";import{getI18nBundle as nt}from"./i18nBundle.js";import{fetchCldr as st}from"./asset-registries/LocaleData.js";import M from"./locale/getLocale.js";let ot=0;const R=new Map,I=new Map,O={fromAttribute(c,f){return f===Boolean?c!==null:f===Number?c===null?void 0:parseFloat(c):c},toAttribute(c,f){return f===Boolean?c?"":null:f===Object||f===Array||c==null?null:String(c)}};function y(c){this._suppressInvalidation||(this.onInvalidation(c),this._changedState.push(c),j(this),this._invalidationEventProvider.fireEvent("invalidate",{...c,target:this}))}function it(c,f){do{const t=Object.getOwnPropertyDescriptor(c,f);if(t)return t;c=Object.getPrototypeOf(c)}while(c&&c!==HTMLElement.prototype)}class b extends HTMLElement{constructor(){super();this._rendered=!1;const t=this.constructor;this._changedState=[],this._suppressInvalidation=!0,this._inDOM=!1,this._fullyConnected=!1,this._childChangeListeners=new Map,this._slotChangeListeners=new Map,this._invalidationEventProvider=new S,this._componentStateFinalizedEventProvider=new S;let e;this._domRefReadyPromise=new Promise(n=>{e=n}),this._domRefReadyPromise._deferredResolve=e,this._doNotSyncAttributes=new Set,this._slotsAssignedNodes=new WeakMap,this._state={...t.getMetadata().getInitialState()},this.initializedProperties=new Map,this.constructor.getMetadata().getPropertiesList().forEach(n=>{if(this.hasOwnProperty(n)){const o=this[n];this.initializedProperties.set(n,o)}}),this._internals=this.attachInternals(),this._initShadowRoot()}_initShadowRoot(){const t=this.constructor;if(t._needsShadowDOM()){const e={mode:"open"};this.attachShadow({...e,...t.getMetadata().getShadowRootOptions()}),t.getMetadata().slotsAreManaged()&&this.shadowRoot.addEventListener("slotchange",this._onShadowRootSlotChange.bind(this))}}_onShadowRootSlotChange(t){t.target?.getRootNode()===this.shadowRoot&&this._processChildren()}get _id(){return this.__id||(this.__id=`ui5wc_${++ot}`),this.__id}render(){const t=this.constructor.template;return tt(t,this)}async connectedCallback(){const t=this.constructor;this.setAttribute(t.getMetadata().getPureTag(),""),t.getMetadata().supportsF6FastNavigation()&&this.setAttribute("data-sap-ui-fastnavgroup","true");const e=t.getMetadata().slotsAreManaged();this._inDOM=!0,e&&(this._startObservingDOMChildren(),await this._processChildren()),this._inDOM&&(t.asyncFinished||await t.definePromise,H(this),this._domRefReadyPromise._deferredResolve(),this._fullyConnected=!0,this.onEnterDOM())}disconnectedCallback(){const e=this.constructor.getMetadata().slotsAreManaged();this._inDOM=!1,e&&this._stopObservingDOMChildren(),this._fullyConnected&&(this.onExitDOM(),this._fullyConnected=!1),this._domRefReadyPromise._deferredResolve(),$(this)}onBeforeRendering(){}onAfterRendering(){}onEnterDOM(){}onExitDOM(){}_startObservingDOMChildren(){const e=this.constructor.getMetadata();if(!e.hasSlots())return;const n=e.canSlotText(),o={childList:!0,subtree:n,characterData:n};q(this,this._processChildren.bind(this),o)}_stopObservingDOMChildren(){W(this)}async _processChildren(){this.constructor.getMetadata().hasSlots()&&await this._updateSlots()}async _updateSlots(){const t=this.constructor,e=t.getMetadata().getSlots(),s=t.getMetadata().canSlotText(),n=Array.from(s?this.childNodes:this.children),o=new Map,a=new Map;for(const[l,u]of Object.entries(e)){const d=u.propertyName||l;a.set(d,l),o.set(d,[...this._state[d]]),this._clearSlot(l,u)}const r=new Map,i=new Map,h=n.map(async(l,u)=>{const d=G(l),m=e[d];if(m===void 0){if(d!=="default"){const p=Object.keys(e).join(", ");console.warn(`Unknown slotName: ${d}, ignoring`,l,`Valid values are: ${p}`)}return}if(m.individualSlots){const p=(r.get(d)||0)+1;r.set(d,p),l._individualSlot=`${d}-${p}`}if(l instanceof HTMLElement){const p=l.localName;if(p.includes("-")&&!V(p)){if(!customElements.get(p)){const L=customElements.whenDefined(p);let E=R.get(p);E||(E=new Promise(U=>setTimeout(U,1e3)),R.set(p,E)),await Promise.race([L,E])}customElements.upgrade(l)}}if(l=t.getMetadata().constructor.validateSlotValue(l,m),v(l)&&m.invalidateOnChildChange){const p=this._getChildChangeListener(d);l.attachInvalidate.call(l,p)}l instanceof HTMLSlotElement&&this._attachSlotChange(l,d,!!m.invalidateOnChildChange);const C=m.propertyName||d;i.has(C)?i.get(C).push({child:l,idx:u}):i.set(C,[{child:l,idx:u}])});await Promise.all(h),i.forEach((l,u)=>{this._state[u]=l.sort((d,m)=>d.idx-m.idx).map(d=>d.child),this._state[g(u)]=this._state[u]});let _=!1;for(const[l,u]of Object.entries(e)){const d=u.propertyName||l;Q(o.get(d),this._state[d])||(y.call(this,{type:"slot",name:a.get(d),reason:"children"}),_=!0,t.getMetadata().isFormAssociated()&&A(this))}_||y.call(this,{type:"slot",name:"default",reason:"textcontent"})}_clearSlot(t,e){const s=e.propertyName||t;this._state[s].forEach(o=>{if(v(o)){const a=this._getChildChangeListener(t);o.detachInvalidate.call(o,a)}o instanceof HTMLSlotElement&&this._detachSlotChange(o,t)}),this._state[s]=[],this._state[g(s)]=this._state[s]}attachInvalidate(t){this._invalidationEventProvider.attachEvent("invalidate",t)}detachInvalidate(t){this._invalidationEventProvider.detachEvent("invalidate",t)}_onChildChange(t,e){this.constructor.getMetadata().shouldInvalidateOnChildChange(t,e.type,e.name)&&y.call(this,{type:"slot",name:t,reason:"childchange",child:e.target})}attributeChangedCallback(t,e,s){let n;if(this._doNotSyncAttributes.has(t))return;const o=this.constructor.getMetadata().getProperties(),a=t.replace(/^ui5-/,""),r=g(a);if(o.hasOwnProperty(r)){const i=o[r];n=(i.converter??O).fromAttribute(s,i.type),this[r]=n}}formAssociatedCallback(){this.constructor.getMetadata().isFormAssociated()&&et(this)}static get formAssociated(){return this.getMetadata().isFormAssociated()}_updateAttribute(t,e){const s=this.constructor;if(!s.getMetadata().hasAttribute(t))return;const o=s.getMetadata().getProperties()[t],a=J(t),i=(o.converter||O).toAttribute(e,o.type);this._doNotSyncAttributes.add(a),i==null?this.removeAttribute(a):this.setAttribute(a,i),this._doNotSyncAttributes.delete(a)}_getChildChangeListener(t){return this._childChangeListeners.has(t)||this._childChangeListeners.set(t,this._onChildChange.bind(this,t)),this._childChangeListeners.get(t)}_getSlotChangeListener(t){return this._slotChangeListeners.has(t)||this._slotChangeListeners.set(t,this._onSlotChange.bind(this,t)),this._slotChangeListeners.get(t)}_attachSlotChange(t,e,s){const n=this._getSlotChangeListener(e);t.addEventListener("slotchange",o=>{if(n.call(t,o),s){const a=this._slotsAssignedNodes.get(t);a&&a.forEach(i=>{if(v(i)){const h=this._getChildChangeListener(e);i.detachInvalidate.call(i,h)}});const r=D([t]);this._slotsAssignedNodes.set(t,r),r.forEach(i=>{if(v(i)){const h=this._getChildChangeListener(e);i.attachInvalidate.call(i,h)}})}})}_detachSlotChange(t,e){t.removeEventListener("slotchange",this._getSlotChangeListener(e))}_onSlotChange(t){y.call(this,{type:"slot",name:t,reason:"slotchange"})}onInvalidation(t){}updateAttributes(){const e=this.constructor.getMetadata().getProperties();for(const[s,n]of Object.entries(e))this._updateAttribute(s,this[s])}_render(){const t=this.constructor,e=t.getMetadata().hasIndividualSlots();this.initializedProperties.size>0&&(Array.from(this.initializedProperties.entries()).forEach(([s,n])=>{delete this[s],this[s]=n}),this.initializedProperties.clear()),this._suppressInvalidation=!0;try{this.onBeforeRendering(),this._rendered||this.updateAttributes(),this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized")}finally{this._suppressInvalidation=!1}this._changedState=[],t._needsShadowDOM()&&x(this),this._rendered=!0,e&&this._assignIndividualSlotsToChildren(),this.onAfterRendering()}_assignIndividualSlotsToChildren(){Array.from(this.children).forEach(e=>{e._individualSlot&&e.setAttribute("slot",e._individualSlot)})}_waitForDomRef(){return this._domRefReadyPromise}getDomRef(){if(typeof this._getRealDomRef=="function")return this._getRealDomRef();if(!(!this.shadowRoot||this.shadowRoot.children.length===0))return this.shadowRoot.children[0]}getFocusDomRef(){const t=this.getDomRef();if(t)return t.querySelector("[data-sap-focus-ref]")||t}async getFocusDomRefAsync(){return await this._waitForDomRef(),this.getFocusDomRef()}async focus(t){await this._waitForDomRef();const e=this.getFocusDomRef();e===this?HTMLElement.prototype.focus.call(this,t):e&&typeof e.focus=="function"&&e.focus(t)}fireEvent(t,e,s=!1,n=!0){const o=this._fireEvent(t,e,s,n),a=P(t);return a!==t?o&&this._fireEvent(a,e,s,n):o}fireDecoratorEvent(t,e){const s=this.getEventData(t),n=s?s.cancelable:!1,o=s?s.bubbles:!1,a=this._fireEvent(t,e,n,o),r=P(t);return r!==t?a&&this._fireEvent(r,e,n,o):a}_fireEvent(t,e,s=!1,n=!0){const o=new CustomEvent(`ui5-${t}`,{detail:e,composed:!1,bubbles:n,cancelable:s}),a=this.dispatchEvent(o);if(X(t))return a;const r=new CustomEvent(t,{detail:e,composed:!1,bubbles:n,cancelable:s});return this.dispatchEvent(r)&&a}getEventData(t){return this.constructor.getMetadata().getEvents()[t]}getSlottedNodes(t){return D(this[t])}attachComponentStateFinalized(t){this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized",t)}detachComponentStateFinalized(t){this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized",t)}get effectiveDir(){return Z(this.constructor),Y(this)}get isUI5Element(){return!0}get isUI5AbstractElement(){return!this.constructor._needsShadowDOM()}get classes(){return{}}get accessibilityInfo(){return{}}static get observedAttributes(){return this.getMetadata().getAttributesList()}static get tagsToScope(){const t=this.getMetadata().getPureTag(),e=this.getUniqueDependencies().map(s=>s.getMetadata().getPureTag()).filter(T);return T(t)&&e.push(t),e}static _needsShadowDOM(){return!!this.template||Object.prototype.hasOwnProperty.call(this.prototype,"render")}static _generateAccessors(){const t=this.prototype,e=this.getMetadata().slotsAreManaged(),s=this.getMetadata().getProperties();for(const[n,o]of Object.entries(s)){w(n)||console.warn(`"${n}" is not a valid property name. Use a name that does not collide with DOM APIs`);const a=it(t,n);let r;a?.set&&(r=a.set);let i;a?.get&&(i=a.get),Object.defineProperty(t,n,{get(){return i?i.call(this):this._state[n]},set(h){const _=this.constructor,l=i?i.call(this):this._state[n];if(l!==h){if(r?r.call(this,h):this._state[n]=h,y.call(this,{type:"property",name:n,newValue:h,oldValue:l}),this._rendered){const d=i?i.call(this):this._state[n];this._updateAttribute(n,d)}_.getMetadata().isFormAssociated()&&A(this)}}})}if(e){const n=this.getMetadata().getSlots();for(const[o,a]of Object.entries(n)){w(o)||console.warn(`"${o}" is not a valid property name. Use a name that does not collide with DOM APIs`);const r=a.propertyName||o,i={get(){return this._state[r]!==void 0?this._state[r]:[]},set(){throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)")}};Object.defineProperty(t,r,i),r!==g(r)&&Object.defineProperty(t,g(r),i)}}}static{this.metadata={}}static{this.styles=""}static get dependencies(){return[]}static cacheUniqueDependencies(){const t=this.dependencies.filter((e,s,n)=>n.indexOf(e)===s);I.set(this,t)}static getUniqueDependencies(){return I.has(this)||this.cacheUniqueDependencies(),I.get(this)||[]}static async onDefine(){return Promise.resolve()}static fetchI18nBundles(){return Promise.all(Object.entries(this.getMetadata().getI18n()).map(t=>{const{bundleName:e}=t[1];return nt(e)}))}static fetchCLDR(){return this.getMetadata().needsCLDR()?st(M().getLanguage(),M().getRegion(),M().getScript()):Promise.resolve()}static{this.i18nBundleStorage={}}static get i18nBundles(){return this.i18nBundleStorage}static define(){const t=async()=>{await N();const o=await Promise.all([this.fetchI18nBundles(),this.fetchCLDR(),this.onDefine()]),[a]=o;Object.entries(this.getMetadata().getI18n()).forEach((r,i)=>{const h=r[1].bundleName;this.i18nBundleStorage[h]=a[i]}),this.asyncFinished=!0};this.definePromise=t();const e=this.getMetadata().getTag(),s=B(e),n=customElements.get(e);return n&&!s?K(e):n||(this._generateAccessors(),z(e),customElements.define(e,this)),this}static getMetadata(){if(this.hasOwnProperty("_metadata"))return this._metadata;const t=[this.metadata];let e=this;for(;e!==b;)e=Object.getPrototypeOf(e),t.unshift(e.metadata);const s=F({},...t);return this._metadata=new k(s),this._metadata}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}}const v=c=>"isUI5Element"in c;export default b;export{v as instanceOfUI5Element};
//# sourceMappingURL=UI5Element.js.map
