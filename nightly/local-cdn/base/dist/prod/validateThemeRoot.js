"use strict";import{getLocationHref as i}from"./Location.js";const o=e=>{const t=document.querySelector(`META[name="${e}"]`);return t&&t.getAttribute("content")},s=e=>{const t=o("sap-allowedThemeOrigins");return t&&t.split(",").some(n=>n==="*"||e===n.trim())},a=(e,t)=>{const n=new URL(e).pathname;return new URL(n,t).toString()},g=e=>{let t;try{if(e.startsWith(".")||e.startsWith("/"))t=new URL(e,i()).toString();else{const n=new URL(e),r=n.origin;r&&s(r)?t=n.toString():t=a(n.toString(),i())}return t.endsWith("/")||(t=`${t}/`),`${t}UI5/`}catch{}};export default g;
//# sourceMappingURL=validateThemeRoot.js.map
