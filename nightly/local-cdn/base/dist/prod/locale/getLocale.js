"use strict";import a from"../util/detectNavigatorLanguage.js";import{getLanguage as i}from"../config/Language.js";import o from"./Locale.js";import{DEFAULT_LOCALE as g}from"../generated/AssetParameters.js";const r=new Map,n=t=>(r.has(t)||r.set(t,new o(t)),r.get(t)),c=t=>{try{if(t&&typeof t=="string")return n(t)}catch{}return new o(g)},s=t=>{if(t)return c(t);const e=i();return e?n(e):c(a())};export default s;
//# sourceMappingURL=getLocale.js.map
