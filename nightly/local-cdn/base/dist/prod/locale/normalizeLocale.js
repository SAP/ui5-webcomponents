"use strict";import{DEFAULT_LOCALE as a}from"../generated/AssetParameters.js";const _=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i,c=/(?:^|-)(saptrc|sappsd)(?:-|$)/i,f={he:"iw",yi:"ji",nb:"no",sr:"sh"},p=i=>{let e;if(!i)return a;if(typeof i=="string"&&(e=_.exec(i.replace(/_/g,"-")))){let t=e[1].toLowerCase(),n=e[3]?e[3].toUpperCase():void 0;const s=e[2]?e[2].toLowerCase():void 0,r=e[4]?e[4].slice(1):void 0,o=e[6];return t=f[t]||t,o&&(e=c.exec(o))||r&&(e=c.exec(r))?`en_US_${e[1].toLowerCase()}`:(t==="zh"&&!n&&(s==="hans"?n="CN":s==="hant"&&(n="TW")),t+(n?"_"+n+(r?"_"+r.replace("-","_"):""):""))}return a};export default p;
//# sourceMappingURL=normalizeLocale.js.map
