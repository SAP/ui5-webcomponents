import{s}from"./index.5ca63ce8.js";var i="storybook/highlight",n="storybookHighlight",_=`${i}/add`,g=`${i}/reset`;const{addons:m}=__STORYBOOK_MODULE_PREVIEW_API__,{STORY_CHANGED:E}=__STORYBOOK_MODULE_CORE_EVENTS__;var{document:l}=s,H=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,I=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"});module&&module.hot&&module.hot.decline&&module.hot.decline();var h=m.getChannel(),O=e=>{let t=n;d();let r=Array.from(new Set(e.elements)),o=l.createElement("style");o.setAttribute("id",t),o.innerHTML=r.map(a=>`${a}{
          ${H(e.color,e.style)}
         }`).join(" "),l.head.appendChild(o)},d=()=>{let e=n,t=l.getElementById(e);t&&t.parentNode.removeChild(t)};h.on(E,d);h.on(g,d);h.on(_,O);export{I as highlightObject,H as highlightStyle};
//# sourceMappingURL=preview.b61b1920.js.map
