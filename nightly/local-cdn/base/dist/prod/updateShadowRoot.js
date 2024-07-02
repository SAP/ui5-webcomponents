"use strict";import s from"./theming/getConstructableStyle.js";const n=o=>{const e=o.constructor,t=o.shadowRoot,r=o.render();if(!t){console.warn("There is no shadow root to update");return}t.adoptedStyleSheets=s(e),e.renderer(r,t,{host:o})};export default n;
//# sourceMappingURL=updateShadowRoot.js.map
