"use strict";import p from"./getSharedResource.js";import{getCurrentRuntimeIndex as u,compareRuntimes as f,getAllRuntimes as b}from"./Runtimes.js";const m=p("Tags",new Map),d=new Set;let s=new Map,c;const g=-1,h=e=>{d.add(e),m.set(e,u())},w=e=>d.has(e),$=()=>[...d.values()],y=e=>{let n=m.get(e);n===void 0&&(n=g),s.has(n)||s.set(n,new Set),s.get(n).add(e),c||(c=setTimeout(()=>{R(),s=new Map,c=void 0},1e3))},R=()=>{const e=b(),n=u(),l=e[n];let t="Multiple UI5 Web Components instances detected.";e.length>1&&(t=`${t}
Loading order (versions before 1.1.0 not listed): ${e.map(i=>`
${i.description}`).join("")}`),[...s.keys()].forEach(i=>{let o,r;i===g?(o=1,r={description:"Older unknown runtime"}):(o=f(n,i),r=e[i]);let a;o>0?a="an older":o<0?a="a newer":a="the same",t=`${t}

"${l.description}" failed to define ${s.get(i).size} tag(s) as they were defined by a runtime of ${a} version "${r.description}": ${[...s.get(i)].sort().join(", ")}.`,o>0?t=`${t}
WARNING! If your code uses features of the above web components, unavailable in ${r.description}, it might not work as expected!`:t=`${t}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`}),t=`${t}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`,console.warn(t)};export{h as registerTag,w as isTagRegistered,$ as getAllRegisteredTags,y as recordTagRegistrationFailure};
//# sourceMappingURL=CustomElementsRegistry.js.map
