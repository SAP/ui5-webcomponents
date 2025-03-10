"use strict";import p from"./getSharedResource.js";import{getCurrentRuntimeIndex as u,compareRuntimes as f,getAllRuntimes as b}from"./Runtimes.js";const g=p("Tags",new Map),d=new Set;let s=new Map,c;const m=-1,h=e=>{d.add(e),g.set(e,u())},w=e=>d.has(e),R=()=>d.size>0,T=()=>[...d.values()],$=e=>{let n=g.get(e);n===void 0&&(n=m),s.has(n)||s.set(n,new Set),s.get(n).add(e),c||(c=setTimeout(()=>{y(),s=new Map,c=void 0},1e3))},y=()=>{const e=b(),n=u(),l=e[n];let t="Multiple UI5 Web Components instances detected.";e.length>1&&(t=`${t}
Loading order (versions before 1.1.0 not listed): ${e.map(i=>`
${i.description}`).join("")}`),[...s.keys()].forEach(i=>{let o,r;i===m?(o=1,r={description:"Older unknown runtime"}):(o=f(n,i),r=e[i]);let a;o>0?a="an older":o<0?a="a newer":a="the same",t=`${t}

"${l.description}" failed to define ${s.get(i).size} tag(s) as they were defined by a runtime of ${a} version "${r.description}": ${[...s.get(i)].sort().join(", ")}.`,o>0?t=`${t}
WARNING! If your code uses features of the above web components, unavailable in ${r.description}, it might not work as expected!`:t=`${t}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`}),t=`${t}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/06-scoping.md.`,console.warn(t)};export{h as registerTag,w as isTagRegistered,R as hasRegisteredTags,T as getAllRegisteredTags,$ as recordTagRegistrationFailure};
//# sourceMappingURL=CustomElementsRegistry.js.map
