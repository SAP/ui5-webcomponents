"use strict";const o=t=>{if(!(t instanceof HTMLElement))return"default";const e=t.getAttribute("slot");if(e){const r=e.match(/^(.+?)-\d+$/);return r?r[1]:e}return"default"},n=t=>t instanceof HTMLSlotElement?t.assignedNodes({flatten:!0}).filter(e=>e instanceof HTMLElement):[t],s=t=>t.reduce((e,r)=>e.concat(n(r)),[]);export{o as getSlotName,n as getSlottedNodes,s as getSlottedNodesList};
//# sourceMappingURL=SlotsHelper.js.map
