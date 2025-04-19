(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const O={themes:{default:"sap_horizon",all:["sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw"]},languages:{default:"en",all:["ar","bg","ca","cnr","cs","cy","da","de","el","en","en_GB","en_US_sappsd","en_US_saprigi","en_US_saptrc","es","es_MX","et","fi","fr","fr_CA","hi","hr","hu","id","it","iw","ja","kk","ko","lt","lv","mk","ms","nl","no","pl","pt_PT","pt","ro","ru","sh","sk","sl","sr","sv","th","tr","uk","vi","zh_CN","zh_TW"]},locales:{default:"en",all:["ar","ar_EG","ar_SA","bg","ca","cnr","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","mk","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}},B=O.themes.default,mt=O.themes.all,v=O.languages.default,h=O.locales.default,pe=O.locales.all,Ut=typeof document>"u",wt=()=>{if(Ut)return v;const e=navigator.languages,t=()=>navigator.language;return e&&e[0]||t()||v};var Be={},xe=Be.hasOwnProperty,yt=Be.toString,ze=xe.toString,St=ze.call(Object),me=function(e){var t,n;return!e||yt.call(e)!=="[object Object]"?!1:(t=Object.getPrototypeOf(e),t?(n=xe.call(t,"constructor")&&t.constructor,typeof n=="function"&&ze.call(n)===St):!0)},At=Object.create(null),Ve=function(e,t,n,s){var r,o,a,c,w,y,g=arguments[2]||{},X=3,gt=arguments.length,ge=arguments[0]||!1,pt=arguments[1]?void 0:At;for(typeof g!="object"&&typeof g!="function"&&(g={});X<gt;X++)if((w=arguments[X])!=null)for(c in w)r=g[c],a=w[c],!(c==="__proto__"||g===a)&&(ge&&a&&(me(a)||(o=Array.isArray(a)))?(o?(o=!1,y=r&&Array.isArray(r)?r:[]):y=r&&me(r)?r:{},g[c]=Ve(ge,arguments[1],y,a)):a!==pt&&(g[c]=a));return g};const je=function(e,t){return Ve(!0,!1,...arguments)},We=new Map,_s=(e,t)=>{We.set(e,t)},C=e=>We.get(e),Ze=typeof document>"u",_t={search(){return Ze?"":window.location.search}},Ue=()=>Ze?"":window.location.href,Et=()=>_t.search(),Ct=e=>{const t=document.querySelector(`META[name="${e}"]`);return t&&t.getAttribute("content")},Tt=e=>{const t=Ct("sap-allowedThemeOrigins");return t&&t.split(",").some(n=>n==="*"||e===n.trim())},bt=(e,t)=>{const n=new URL(e).pathname;return new URL(n,t).toString()},He=e=>{let t;try{if(e.startsWith(".")||e.startsWith("/"))t=new URL(e,Ue()).toString();else{const n=new URL(e),s=n.origin;s&&Tt(s)?t=n.toString():t=bt(n.toString(),Ue())}return t.endsWith("/")||(t=`${t}/`),`${t}UI5/`}catch{}};var ce;(function(e){e.Full="full",e.Basic="basic",e.Minimal="minimal",e.None="none"})(ce||(ce={}));const vt=ce;class b{constructor(){this._eventRegistry=new Map}attachEvent(t,n){const s=this._eventRegistry,r=s.get(t);if(!Array.isArray(r)){s.set(t,[n]);return}r.includes(n)||r.push(n)}detachEvent(t,n){const s=this._eventRegistry,r=s.get(t);if(!r)return;const o=r.indexOf(n);o!==-1&&r.splice(o,1),r.length===0&&s.delete(t)}fireEvent(t,n){const r=this._eventRegistry.get(t);return r?r.map(o=>o.call(this,n)):[]}fireEventAsync(t,n){return Promise.all(this.fireEvent(t,n))}isHandlerAttached(t,n){const r=this._eventRegistry.get(t);return r?r.includes(n):!1}hasListeners(t){return!!this._eventRegistry.get(t)}}const Lt=new b,Pt="configurationReset",Z=e=>{Lt.attachEvent(Pt,e)};let we=!1,u={animationMode:vt.Full,theme:B,themeRoot:void 0,rtl:void 0,language:void 0,timezone:void 0,calendarType:void 0,secondaryCalendarType:void 0,noConflict:!1,formatSettings:{},fetchDefaultLanguage:!1,defaultFontLoading:!0,enableDefaultTooltips:!0};const Es=()=>(l(),u.animationMode),Ot=()=>(l(),u.theme),Rt=()=>(l(),u.themeRoot),It=()=>(l(),u.language),Dt=()=>(l(),u.fetchDefaultLanguage),Cs=()=>(l(),u.noConflict),Mt=()=>(l(),u.defaultFontLoading),Ts=()=>(l(),u.enableDefaultTooltips),bs=()=>(l(),u.calendarType),vs=()=>(l(),u.formatSettings),x=new Map;x.set("true",!0);x.set("false",!1);const $t=()=>{const e=document.querySelector("[data-ui5-config]")||document.querySelector("[data-id='sap-ui-config']");let t;if(e){try{t=JSON.parse(e.innerHTML)}catch{console.warn("Incorrect data-sap-ui-config format. Please use JSON")}t&&(u=je(u,t))}},Ft=()=>{const e=new URLSearchParams(Et());e.forEach((t,n)=>{const s=n.split("sap-").length;s===0||s===n.split("sap-ui-").length||ye(n,t,"sap")}),e.forEach((t,n)=>{n.startsWith("sap-ui")&&ye(n,t,"sap-ui")})},kt=e=>{const t=e.split("@")[1];return He(t)},Bt=(e,t)=>e==="theme"&&t.includes("@")?t.split("@")[0]:t,ye=(e,t,n)=>{const s=t.toLowerCase(),r=e.split(`${n}-`)[1];x.has(t)&&(t=x.get(s)),r==="theme"?(u.theme=Bt(r,t),t&&t.includes("@")&&(u.themeRoot=kt(t))):u[r]=t},xt=()=>{const e=C("OpenUI5Support");if(!e||!e.isOpenUI5Detected())return;const t=e.getConfigurationSettingsObject();u=je(u,t)},l=()=>{typeof document>"u"||we||(zt(),we=!0)},zt=e=>{$t(),Ft(),xt()},Ge=new b,Ne="languageChange",qe=e=>{Ge.attachEvent(Ne,e)},Vt=e=>Ge.fireEventAsync(Ne,e),Se=10;class jt{constructor(){this.list=[],this.lookup=new Set}add(t){this.lookup.has(t)||(this.list.push(t),this.lookup.add(t))}remove(t){this.lookup.has(t)&&(this.list=this.list.filter(n=>n!==t),this.lookup.delete(t))}shift(){const t=this.list.shift();if(t)return this.lookup.delete(t),t}isEmpty(){return this.list.length===0}isAdded(t){return this.lookup.has(t)}process(t){let n;const s=new Map;for(n=this.shift();n;){const r=s.get(n)||0;if(r>Se)throw new Error(`Web component processed too many times this task, max allowed is: ${Se}`);t(n),s.set(n,r+1),n=this.shift()}}}const Wt=(e,t=document.body,n)=>{let s=document.querySelector(e);return s||(s=n(),t.insertBefore(s,t.firstChild))},Zt=()=>{const e=document.createElement("meta");return e.setAttribute("name","ui5-shared-resources"),e.setAttribute("content",""),e},Ht=()=>typeof document>"u"?null:Wt('meta[name="ui5-shared-resources"]',document.head,Zt),H=(e,t)=>{const n=e.split(".");let s=Ht();if(!s)return t;for(let r=0;r<n.length;r++){const o=n[r],a=r===n.length-1;Object.prototype.hasOwnProperty.call(s,o)||(s[o]=a?t:{}),s=s[o]}return s},Gt={version:"2.10.0-rc.1",major:2,minor:10,patch:0,suffix:"-rc.1",isNext:!1,buildTime:1745021194};let Nt,qt={include:[/^ui5-/],exclude:[]};const Kt=()=>Nt,Jt=()=>qt;let D,Xt="";const Y=new Map,z=H("Runtimes",[]),Yt=()=>{if(D===void 0){D=z.length;const e=Gt;z.push({...e,get scopingSuffix(){return Kt()},get registeredTags(){return Ke()},get scopingRules(){return Jt()},alias:Xt,description:`Runtime ${D} - ver ${e.version}`})}},G=()=>D,Qt=(e,t)=>{const n=`${e},${t}`;if(Y.has(n))return Y.get(n);const s=z[e],r=z[t];if(!s||!r)throw new Error("Invalid runtime index supplied");if(s.isNext||r.isNext)return s.buildTime-r.buildTime;const o=s.major-r.major;if(o)return o;const a=s.minor-r.minor;if(a)return a;const c=s.patch-r.patch;if(c)return c;const y=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}).compare(s.suffix,r.suffix);return Y.set(n,y),y};H("Tags",new Map);const en=new Set,Ke=()=>[...en.values()],tn=new Set,nn=e=>tn.has(e),Je=new Set,sn=new b,L=new jt;let S,M,Q,R;const rn=async e=>{L.add(e),await an()},on=e=>{sn.fireEvent("beforeComponentRender",e),Je.add(e),e._render()},an=async()=>{R||(R=new Promise(e=>{window.requestAnimationFrame(()=>{L.process(on),R=null,e(),Q||(Q=setTimeout(()=>{Q=void 0,L.isEmpty()&&ln()},200))})})),await R},cn=()=>S||(S=new Promise(e=>{M=e,window.requestAnimationFrame(()=>{L.isEmpty()&&(S=void 0,e())})}),S),un=()=>{const e=Ke().map(t=>customElements.whenDefined(t));return Promise.all(e)},fn=async()=>{await un(),await cn()},ln=()=>{L.isEmpty()&&M&&(M(),M=void 0,S=void 0)},Xe=async e=>{Je.forEach(t=>{const n=t.constructor,s=n.getMetadata().getTag(),r=nn(n),o=n.getMetadata().isLanguageAware(),a=n.getMetadata().isThemeAware();(!e||e.tag===s||e.rtlAware&&r||e.languageAware&&o||e.themeAware&&a)&&rn(t)}),await fn()},dn=()=>new Promise(e=>{document.body?e():document.addEventListener("DOMContentLoaded",()=>{e()})}),hn=typeof document>"u",N=(e,t)=>t?`${e}|${t}`:e,gn=e=>e===void 0?!0:Qt(G(),parseInt(e))===1,q=(e,t,n="",s)=>{const r=G(),o=new CSSStyleSheet;o.replaceSync(e),o._ui5StyleId=N(t,n),s&&(o._ui5RuntimeIndex=r,o._ui5Theme=s),document.adoptedStyleSheets=[...document.adoptedStyleSheets,o]},pn=(e,t,n="",s)=>{const r=G(),o=document.adoptedStyleSheets.find(a=>a._ui5StyleId===N(t,n));if(o)if(!s)o.replaceSync(e||"");else{const a=o._ui5RuntimeIndex;(o._ui5Theme!==s||gn(a))&&(o.replaceSync(e||""),o._ui5RuntimeIndex=String(r),o._ui5Theme=s)}},K=(e,t="")=>hn?!0:!!document.adoptedStyleSheets.find(n=>n._ui5StyleId===N(e,t)),mn=(e,t="")=>{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(n=>n._ui5StyleId!==N(e,t))},Ye=(e,t,n="",s)=>{K(t,n)?pn(e,t,n,s):q(e,t,n,s)},Un=(e,t)=>e===void 0?t:t===void 0?e:`${e} ${t}`,wn=`@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`,yn="@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}";let $;Z(()=>{$=void 0});const Sn=()=>($===void 0&&($=Mt()),$),An=()=>{const e=C("OpenUI5Support");(!e||!e.isOpenUI5Detected())&&_n(),En()},_n=()=>{const e=document.querySelector("head>style[data-ui5-font-face]");!Sn()||e||K("data-ui5-font-face")||q(wn,"data-ui5-font-face")},En=()=>{K("data-ui5-font-face-override")||q(yn,"data-ui5-font-face-override")},Cn=":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}",Tn=()=>{K("data-ui5-system-css-vars")||q(Cn,"data-ui5-system-css-vars")},Qe=new b,et="themeRegistered",bn=e=>{Qe.attachEvent(et,e)},vn=e=>Qe.fireEvent(et,e),Ae=new Map,tt=new Map,Ln=new Map,nt=new Set,V=new Set,Ls=(e,t,n)=>{tt.set(`${e}/${t}`,n),nt.add(e),V.add(t),vn(t)},st=async(e,t,n)=>{const s=`${e}_${t}_${n||""}`,r=Ae.get(s);if(r!==void 0)return r;if(!V.has(t)){const w=[...V.values()].join(", ");return console.warn(`You have requested a non-registered theme ${t} - falling back to ${B}. Registered themes are: ${w}`),ee(e,B)}const[o,a]=await Promise.all([ee(e,t),n?ee(e,n,!0):void 0]),c=Un(o,a);return c&&Ae.set(s,c),c},ee=async(e,t,n=!1)=>{const r=(n?Ln:tt).get(`${e}/${t}`);if(!r){n||console.error(`Theme [${t}] not registered for package [${e}]`);return}let o;try{o=await r(t)}catch(a){console.error(e,a.message);return}return o},rt=()=>nt,Pn=e=>V.has(e),A=new Set,On=()=>{let e=document.querySelector(".sapThemeMetaData-Base-baseLib")||document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");if(e)return getComputedStyle(e).backgroundImage;e=document.createElement("span"),e.style.display="none",e.classList.add("sapThemeMetaData-Base-baseLib"),document.body.appendChild(e);let t=getComputedStyle(e).backgroundImage;return t==="none"&&(e.classList.add("sapThemeMetaData-UI5-sap-ui-core"),t=getComputedStyle(e).backgroundImage),document.body.removeChild(e),t},Rn=e=>{const t=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(e);if(t&&t.length>=2){let n=t[1];if(n=n.replace(/\\"/g,'"'),n.charAt(0)!=="{"&&n.charAt(n.length-1)!=="}")try{n=decodeURIComponent(n)}catch{A.has("decode")||(console.warn("Malformed theme metadata string, unable to decodeURIComponent"),A.add("decode"));return}try{return JSON.parse(n)}catch{A.has("parse")||(console.warn("Malformed theme metadata string, unable to parse JSON"),A.add("parse"))}}},In=e=>{let t,n;try{const s=e.Path.split(".");t=s.length===4?s[2]:getComputedStyle(document.body).getPropertyValue("--sapSapThemeId"),n=e.Extends[0]}catch{A.has("object")||(console.warn("Malformed theme metadata Object",e),A.add("object"));return}return{themeName:t,baseThemeName:n}},ue=()=>{const e=On();if(!e||e==="none")return;const t=Rn(e);if(t)return In(t)},Dn=new b,Mn="themeLoaded",$n=e=>Dn.fireEvent(Mn,e),Fn=(e,t)=>{const n=document.createElement("link");return n.type="text/css",n.rel="stylesheet",Object.entries(t).forEach(s=>n.setAttribute(...s)),n.href=e,document.head.appendChild(n),new Promise(s=>{n.addEventListener("load",s),n.addEventListener("error",s)})};let _;Z(()=>{_=void 0});const ot=()=>(_===void 0&&(_=Rt()),_),Ps=e=>{if(_!==e){if(_=e,!He(e)){console.warn(`The ${e} is not valid. Check the allowed origins as suggested in the "setThemeRoot" description.`);return}return at(T())}},kn=e=>`${ot()}Base/baseLib/${e}/css_variables.css`,at=async e=>{const t=document.querySelector(`[sap-ui-webcomponents-theme="${e}"]`);t&&document.head.removeChild(t),await Fn(kn(e),{"sap-ui-webcomponents-theme":e})},P="@ui5/webcomponents-theming",Bn=()=>rt().has(P),xn=async e=>{if(!Bn())return;const t=await st(P,e);t&&Ye(t,"data-ui5-theme-properties",P,e)},zn=()=>{mn("data-ui5-theme-properties",P)},Vn=async(e,t)=>{const s=[...rt()].map(async r=>{if(r===P)return;const o=await st(r,e,t);o&&Ye(o,`data-ui5-component-properties-${G()}`,r)});return Promise.all(s)},jn=async e=>{var s;const t=ue();if(t)return t;const n=C("OpenUI5Support");if(n&&n.isOpenUI5Detected()){if(n.cssVariablesLoaded())return{themeName:(s=n.getConfigurationSettingsObject())==null?void 0:s.theme,baseThemeName:""}}else if(ot())return await at(e),ue()},fe=async e=>{const t=await jn(e);!t||e!==t.themeName?await xn(e):zn();const n=Pn(e)?e:t&&t.baseThemeName;await Vn(n||B,t&&t.themeName===e?e:void 0),$n(e)};let U;Z(()=>{U=void 0});const T=()=>(U===void 0&&(U=Ot()),U),Os=async e=>{U!==e&&(U=e,ct()&&(await fe(U),await Xe({themeAware:!0})))},Wn=()=>{var t,n;const e=T();return Zn(e)?!e.startsWith("sap_horizon"):!((n=(t=ue())==null?void 0:t.baseThemeName)!=null&&n.startsWith("sap_horizon"))},Zn=e=>mt.includes(e),f=typeof document>"u",i={get userAgent(){return f?"":navigator.userAgent},get touch(){return f?!1:"ontouchstart"in window||navigator.maxTouchPoints>0},get chrome(){return f?!1:/(Chrome|CriOS)/.test(i.userAgent)},get firefox(){return f?!1:/Firefox/.test(i.userAgent)},get safari(){return f?!1:!i.chrome&&/(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(i.userAgent)},get webkit(){return f?!1:/webkit/.test(i.userAgent)},get windows(){return f?!1:navigator.platform.indexOf("Win")!==-1},get macOS(){return f?!1:!!navigator.userAgent.match(/Macintosh|Mac OS X/i)},get iOS(){return f?!1:!!navigator.platform.match(/iPhone|iPad|iPod/)||!!(i.userAgent.match(/Mac/)&&"ontouchend"in document)},get android(){return f?!1:!i.windows&&/Android/.test(i.userAgent)},get androidPhone(){return f?!1:i.android&&/(?=android)(?=.*mobile)/i.test(i.userAgent)},get ipad(){return f?!1:/ipad/i.test(i.userAgent)||/Macintosh/i.test(i.userAgent)&&"ontouchend"in document},_isPhone(){return Nn(),i.touch&&!m}};let te,ne,m;const Hn=()=>{if(f||!i.windows)return!1;if(te===void 0){const e=i.userAgent.match(/Windows NT (\d+).(\d)/);te=e?parseFloat(e[1]):0}return te>=8},Gn=()=>{if(f||!i.webkit)return!1;if(ne===void 0){const e=i.userAgent.match(/(webkit)[ /]([\w.]+)/);ne=e?parseFloat(e[1]):0}return ne>=537.1},Nn=()=>{if(f)return!1;if(m===void 0){if(i.ipad){m=!0;return}if(i.touch){if(Hn()){m=!0;return}if(i.chrome&&i.android){m=!/Mobile Safari\/[.0-9]+/.test(i.userAgent);return}let e=window.devicePixelRatio?window.devicePixelRatio:1;i.android&&Gn()&&(e=1),m=Math.min(window.screen.width/e,window.screen.height/e)>=600;return}m=i.userAgent.indexOf("Touch")!==-1||i.android&&!i.androidPhone}},qn=()=>i.safari,Kn=()=>i.iOS;let _e=!1;const Jn=()=>{qn()&&Kn()&&!_e&&(document.body.addEventListener("touchstart",()=>{}),_e=!0)};let J=!1,I;const it=new b,ct=()=>J,Rs=e=>{if(!J){it.attachEvent("boot",e);return}e()},Is=async()=>{if(I!==void 0)return I;const e=async t=>{if(Yt(),typeof document>"u"){t();return}bn(Xn);const n=C("OpenUI5Support"),s=n?n.isOpenUI5Detected():!1,r=C("F6Navigation");n&&await n.init(),r&&!s&&r.init(),await dn(),await fe(T()),n&&n.attachListeners(),An(),Tn(),Jn(),t(),J=!0,it.fireEvent("boot")};return I=new Promise(e),I},Xn=e=>{J&&e===T()&&fe(T())};let E,F;Z(()=>{E=void 0,F=void 0});const Yn=()=>(E===void 0&&(E=It()),E),Ds=async e=>{E!==e&&(E=e,await Vt(e),ct()&&await Xe({languageAware:!0}))},Qn=()=>(F===void 0&&(F=Dt()),F),es=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;class ut{constructor(t){const n=es.exec(t.replace(/_/g,"-"));if(n===null)throw new Error(`The given language ${t} does not adhere to BCP-47.`);this.sLocaleId=t,this.sLanguage=n[1]||v,this.sScript=n[2]||"",this.sRegion=n[3]||"",this.sVariant=n[4]&&n[4].slice(1)||null,this.sExtension=n[5]&&n[5].slice(1)||null,this.sPrivateUse=n[6]||null,this.sLanguage&&(this.sLanguage=this.sLanguage.toLowerCase()),this.sScript&&(this.sScript=this.sScript.toLowerCase().replace(/^[a-z]/,s=>s.toUpperCase())),this.sRegion&&(this.sRegion=this.sRegion.toUpperCase())}getLanguage(){return this.sLanguage}getScript(){return this.sScript}getRegion(){return this.sRegion}getVariant(){return this.sVariant}getVariantSubtags(){return this.sVariant?this.sVariant.split("-"):[]}getExtension(){return this.sExtension}getExtensionSubtags(){return this.sExtension?this.sExtension.slice(2).split("-"):[]}getPrivateUse(){return this.sPrivateUse}getPrivateUseSubtags(){return this.sPrivateUse?this.sPrivateUse.slice(2).split("-"):[]}hasPrivateUseSubtag(t){return this.getPrivateUseSubtags().indexOf(t)>=0}toString(){const t=[this.sLanguage];return this.sScript&&t.push(this.sScript),this.sRegion&&t.push(this.sRegion),this.sVariant&&t.push(this.sVariant),this.sExtension&&t.push(this.sExtension),this.sPrivateUse&&t.push(this.sPrivateUse),t.join("-")}}const se=new Map,ft=e=>(se.has(e)||se.set(e,new ut(e)),se.get(e)),ts=e=>{try{if(e&&typeof e=="string")return ft(e)}catch{}return new ut(h)},k=e=>{const t=Yn();return t?ft(t):ts(wt())},ns=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i,Ee=/(?:^|-)(saptrc|sappsd)(?:-|$)/i,ss={he:"iw",yi:"ji",nb:"no",sr:"sh"},rs=e=>{let t;if(!e)return h;if(typeof e=="string"&&(t=ns.exec(e.replace(/_/g,"-")))){let n=t[1].toLowerCase(),s=t[3]?t[3].toUpperCase():void 0;const r=t[2]?t[2].toLowerCase():void 0,o=t[4]?t[4].slice(1):void 0,a=t[6];return n=ss[n]||n,a&&(t=Ee.exec(a))||o&&(t=Ee.exec(o))?`en_US_${t[1].toLowerCase()}`:(n==="zh"&&!s&&(r==="hans"?s="CN":r==="hant"&&(s="TW")),n+(s?"_"+s+(o?"_"+o.replace("-","_"):""):""))}return h},Ce={zh_HK:"zh_TW",in:"id"},os=e=>{if(!e)return h;if(Ce[e])return Ce[e];const t=e.lastIndexOf("_");return t>=0?e.slice(0,t):e!==h?h:""},Te=new Set,be=new Set,le=new Map,re=new Map,de=new Map,Ms=(e,t,n)=>{const s=`${e}/${t}`;de.set(s,n)},ve=(e,t)=>{le.set(e,t)},$s=e=>le.get(e),lt=(e,t)=>{const n=`${e}/${t}`;return de.has(n)},as=(e,t)=>{const n=`${e}/${t}`,s=de.get(n);return s&&!re.get(n)&&re.set(n,s(t)),re.get(n)},is=e=>{Te.has(e)||(console.warn(`[${e}]: Message bundle assets are not configured. Falling back to English texts.`,` Add \`import "${e}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`),Te.add(e))},Le=(e,t)=>t!==v&&!lt(e,t),cs=async e=>{const t=k().getLanguage(),n=k().getRegion(),s=k().getVariant();let r=t+(n?`-${n}`:"")+(s?`-${s}`:"");if(Le(e,r))for(r=rs(r);Le(e,r);)r=os(r);const o=Qn();if(r===v&&!o){ve(e,null);return}if(!lt(e,r)){is(e);return}try{const a=await as(e,r);ve(e,a)}catch(a){const c=a;be.has(c.message)||(be.add(c.message),console.error(c.message))}};qe(e=>{const t=[...le.keys()];return Promise.all(t.map(cs))});const us=new Map,j=new Map,oe=new Map,Pe=new Set;let Oe=!1;const fs={iw:"he",ji:"yi",in:"id"},Re=e=>{Oe||(console.warn(`[LocaleData] Supported locale "${e}" not configured, import the "Assets.js" module from the webcomponents package you are using.`),Oe=!0)},ls=(e,t,n)=>{e=e&&fs[e]||e,e==="no"&&(e="nb"),e==="zh"&&!t&&(n==="Hans"?t="CN":n==="Hant"&&(t="TW")),(e==="sh"||e==="sr"&&n==="Latn")&&(e="sr",t="Latn");let s=`${e}_${t}`;return pe.includes(s)||(s=e,pe.includes(s))?j.has(s)?s:(Re(s),h):h},Ie=(e,t)=>{us.set(e,t)},ds=e=>{if(!oe.get(e)){const t=j.get(e);if(!t)throw new Error(`CLDR data for locale ${e} is not loaded!`);oe.set(e,t(e))}return oe.get(e)},hs=async(e,t,n)=>{const s=ls(e,t,n),r=C("OpenUI5Support");if(r){const o=r.getLocaleDataObject();if(o){Ie(s,o);return}}try{const o=await ds(s);Ie(s,o)}catch(o){const a=o;Pe.has(a.message)||(Pe.add(a.message),console.error(a.message))}},gs=(e,t)=>{j.set(e,t)};gs("en",async()=>(await fetch("https://sdk.openui5.org/1.120.17/resources/sap/ui/core/cldr/en.json")).json());qe(()=>{const e=k();return hs(e.getLanguage(),e.getRegion(),e.getScript())});var W;(function(e){e["SAP-icons"]="SAP-icons-v4",e.horizon="SAP-icons-v5",e["SAP-icons-TNT"]="tnt",e.BusinessSuiteInAppSymbols="business-suite"})(W||(W={}));const dt=e=>W[e]?W[e]:e;var p;(function(e){e.SAPIconsV4="SAP-icons-v4",e.SAPIconsV5="SAP-icons-v5",e.SAPIconsTNTV2="tnt-v2",e.SAPIconsTNTV3="tnt-v3",e.SAPBSIconsV1="business-suite-v1",e.SAPBSIconsV2="business-suite-v2"})(p||(p={}));const d=new Map;d.set("SAP-icons",{legacy:p.SAPIconsV4,sap_horizon:p.SAPIconsV5});d.set("tnt",{legacy:p.SAPIconsTNTV2,sap_horizon:p.SAPIconsTNTV3});d.set("business-suite",{legacy:p.SAPBSIconsV1,sap_horizon:p.SAPBSIconsV2});const ps=(e,t)=>{if(d.has(e)){d.set(e,{...t,...d.get(e)});return}d.set(e,t)},De=e=>{const t=Wn()?"legacy":"sap_horizon";return d.has(e)?d.get(e)[t]:e},ms=new Map,Us=e=>ms.get(e),ht=e=>{const t=Us(T());return!e&&t?dt(t):De(e||"SAP-icons")},ws="legacy",Me=new Map,he=H("SVGIcons.registry",new Map),ae=H("SVGIcons.promises",new Map),$e="ICON_NOT_FOUND",ys=async e=>{if(!ae.has(e)){if(!Me.has(e))throw new Error(`No loader registered for the ${e} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);const t=Me.get(e);ae.set(e,t(e))}return ae.get(e)},Fe=e=>{Object.keys(e.data).forEach(t=>{const n=e.data[t];Ss(t,{pathData:n.path||n.paths,ltr:n.ltr,accData:n.acc,collection:e.collection,packageName:e.packageName})})},Ss=(e,t)=>{const n=`${t.collection}/${e}`;he.set(n,{pathData:t.pathData,ltr:t.ltr,accData:t.accData,packageName:t.packageName,customTemplate:t.customTemplate,viewBox:t.viewBox,collection:t.collection})},As=e=>{e.startsWith("sap-icon://")&&(e=e.replace("sap-icon://",""));let t;return[e,t]=e.split("/").reverse(),e=e.replace("icon-",""),t&&(t=dt(t)),{name:e,collection:t}},ie=async e=>{const{name:t,collection:n}=As(e);let s=$e;try{s=await ys(ht(n))}catch(o){console.error(o.message)}if(s===$e)return s;const r=ke(n,t);return r||(Array.isArray(s)?s.forEach(o=>{Fe(o),ps(n,{[o.themeFamily||ws]:o.collection})}):Fe(s),ke(n,t))},ke=(e,t)=>{const n=`${ht(e)}/${t}`;return he.get(n)},Fs=async()=>(await ie("edit"),await ie("tnt/arrow"),await ie("business-suite/3d"),Array.from(he.keys()));export{b as E,Fs as _,Rs as a,Is as b,_s as c,Z as d,Es as e,cs as f,$s as g,K as h,bs as i,Ts as j,Cs as k,vs as l,C as m,Xe as n,Yn as o,Ds as p,T as q,Ls as r,Os as s,ot as t,Ps as u,Sn as v,G as w,Ms as x,fn as y};
