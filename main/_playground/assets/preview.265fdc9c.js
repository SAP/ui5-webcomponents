import{s as M}from"./index.5ca63ce8.js";import{d as h}from"./index.b38f6aa4.js";var p="backgrounds";const{logger:B}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var{document:s,window:S}=M,x=()=>S.matchMedia("(prefers-reduced-motion: reduce)").matches,O=(r,e=[],n)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r))return r;let t=e.find(a=>a.name===n);if(t)return t.value;if(n){let a=e.map(i=>i.name).join(", ");B.warn(h`
        Backgrounds Addon: could not find the default color "${n}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},_=r=>{(Array.isArray(r)?r:[r]).forEach(w)},w=r=>{let e=s.getElementById(r);e&&e.parentElement.removeChild(e)},A=(r,e)=>{let n=s.getElementById(r);if(n)n.innerHTML!==e&&(n.innerHTML=e);else{let t=s.createElement("style");t.setAttribute("id",r),t.innerHTML=e,s.head.appendChild(t)}},I=(r,e,n)=>{let t=s.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let a=s.createElement("style");a.setAttribute("id",r),a.innerHTML=e;let i=`addon-backgrounds-grid${n?`-docs-${n}`:""}`,d=s.getElementById(i);d?d.parentElement.insertBefore(a,d):s.head.appendChild(a)}};const{useMemo:b,useEffect:L}=__STORYBOOK_MODULE_PREVIEW_API__;var T=(r,e)=>{var c;let{globals:n,parameters:t}=e,a=(c=n[p])==null?void 0:c.value,i=t[p],d=b(()=>i.disable?"transparent":O(a,i.values,i.default),[i,a]),o=b(()=>d&&d!=="transparent",[d]),g=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=b(()=>{let l="transition: background-color 0.3s;";return`
      ${g} {
        background: ${d} !important;
        ${x()?"":l}
      }
    `},[d,g]);return L(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!o){_(l);return}I(l,u,e.viewMode==="docs"?e.id:null)},[o,u,e]),r()};const{useMemo:C,useEffect:R}=__STORYBOOK_MODULE_PREVIEW_API__;var H=(r,e)=>{var y,v,E;let{globals:n,parameters:t}=e,a=t[p].grid,i=((y=n[p])==null?void 0:y.grid)===!0&&a.disable!==!0,{cellAmount:d,cellSize:o,opacity:g}=a,u=e.viewMode==="docs",c=t.layout===void 0||t.layout==="padded"?16:0,l=(v=a.offsetX)!=null?v:u?20:c,m=(E=a.offsetY)!=null?E:u?20:c,$=C(()=>{let f=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",k=[`${o*d}px ${o*d}px`,`${o*d}px ${o*d}px`,`${o}px ${o}px`,`${o}px ${o}px`].join(", ");return`
      ${f} {
        background-size: ${k} !important;
        background-position: ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${g/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g/2}) 1px, transparent 1px) !important;
      }
    `},[o]);return R(()=>{let f=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!i){_(f);return}A(f,$)},[i,$,e]),r()},G=[H,T],z={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},D={[p]:null};export{G as decorators,D as globals,z as parameters};
//# sourceMappingURL=preview.265fdc9c.js.map
