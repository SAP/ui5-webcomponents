import"../../bundle.esm-PHo0fXQL.js";document.getElementById("lazy").addEventListener("ui5-input",async e=>{const{value:i}=e.target;if(e.target.loading=!0,!i)return;const t=await(await fetch(`https://restcountries.com/v3.1/name/${i}`)).json();for(;document.getElementById("lazy").firstChild;)document.getElementById("lazy").removeChild(document.getElementById("lazy").firstChild);t.map(c=>{const n=document.createElement("ui5-cb-item");n.setAttribute("text",c.name.common),document.getElementById("lazy").appendChild(n)}),e.target.loading=!1},{once:!0});const m=document.getElementById("cb-filter-none");let o,a;m.addEventListener("input",e=>{a!==void 0&&clearTimeout(a),a=setTimeout(async()=>{a=void 0;const t=e.target.value;if(o!==void 0&&o.cancel(),t){o=l(t);const c=await o.items;c&&(o=void 0,u(),c.forEach(n=>{const d=document.createElement("ui5-cb-item");d.setAttribute("text",n),m.appendChild(d)}))}else u()},250)});function u(){[...m.children].forEach(e=>m.removeChild(e))}function l(e){let i;return{cancel:()=>i(),items:new Promise(t=>{const c=setTimeout(()=>{const n=[];for(let d=0;d<5;d++)n.push(`${e} #${d+1}`);t(n)},500);i=()=>{clearTimeout(c),t(void 0)}})}}
