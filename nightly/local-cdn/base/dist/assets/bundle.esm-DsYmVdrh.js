import{f as k,g as z,c as A,s as T,d as y,e as P,i as b,j as S,k as M,l as E,m as B,E as F,n as $,r as N,o as V,p as W,q as x,t as G,u as _,v as H,w as U,_ as J,x as K,y as O}from"./Icons-j_uiQSMT.js";const X=/('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g,Q=(e,t)=>(t=t||[],e.replace(X,(n,i,o,a,s)=>{if(i)return"'";if(o)return o.replace(/''/g,"'");if(a){const u=typeof a=="string"?parseInt(a):a;return String(t[u])}throw new Error(`[i18n]: pattern syntax error at pos ${s}`)})),C=new Map;class Y{constructor(t){this.packageName=t}getText(t,...n){if(typeof t=="string"&&(t={key:t,defaultText:t}),!t||!t.key)return"";const i=z(this.packageName);i&&!i[t.key]&&console.warn(`Key ${t.key} not found in the i18n bundle, the default text will be used`);const o=i&&i[t.key]?i[t.key]:t.defaultText||t.key;return Q(o,n)}}const Z=e=>{if(C.has(e))return C.get(e);const t=new Y(e);return C.set(e,t),t},j=async e=>(await k(e),Z(e)),ee=e=>{const t=e.prototype.openEnd;e.prototype.openEnd=function(){return this._mAttributes.popover&&delete this._mAttributes.popover,t.apply(this)}},te=e=>{e.setAttribute("popover","manual"),e.showPopover()},ne=e=>{e.hasAttribute("popover")&&(e.hidePopover(),e.removeAttribute("popover"))},q=(e=document)=>e.querySelector(":popover-open")?!0:Array.from(e.querySelectorAll("*")).some(t=>{const n=t.shadowRoot;return n&&q(n)}),ie=e=>{const t=e.prototype.open;e.prototype.open=function(...i){t.apply(this,i);const o=q();if(["OPENING","OPEN"].includes(this.getOpenState())&&o){const s=this.getContent();if(s){const u=s instanceof HTMLElement?s:s==null?void 0:s.getDomRef();u&&te(u)}}}},oe=e=>{const t=e.prototype._closed;e.prototype._closed=function(...i){const o=this.getContent(),a=o instanceof HTMLElement?o:o==null?void 0:o.getDomRef();t.apply(this,i),a&&ne(a)}},se=e=>{const t=e.prototype.onFocusEvent;e.prototype.onFocusEvent=function(i){const o=i.type==="focus"||i.type==="activate",a=i.target;(!o||!a.closest("[ui5-popover],[ui5-responsive-popover],[ui5-dialog]"))&&t.call(this,i)}},ae=()=>{const e=new CSSStyleSheet;e.replaceSync(".sapMPopup-CTX:popover-open { inset: unset; }"),document.adoptedStyleSheets=[...document.adoptedStyleSheets,e]},re=e=>{ie(e),oe(e),ae(),se(e)};class l{static isAtLeastVersion116(){if(!window.sap.ui.version)return!0;const n=window.sap.ui.version.split(".");return!n||n.length<2?!1:parseInt(n[0])>1||parseInt(n[1])>=116}static isOpenUI5Detected(){var t,n;return typeof((n=(t=window.sap)==null?void 0:t.ui)==null?void 0:n.require)=="function"}static init(){return l.isOpenUI5Detected()?new Promise(t=>{window.sap.ui.require(["sap/ui/core/Core"],async n=>{const i=()=>{let o=["sap/ui/core/Popup","sap/ui/core/Patcher","sap/ui/core/LocaleData"];l.isAtLeastVersion116()&&(o=[...o,"sap/base/i18n/Formatting","sap/base/i18n/Localization","sap/ui/core/ControlBehavior","sap/ui/core/Theming","sap/ui/core/date/CalendarUtils"]),window.sap.ui.require(o,(a,s)=>{ee(s),re(a),t()})};l.isAtLeastVersion116()?(await n.ready(),i()):n.attachInit(i)})}):Promise.resolve()}static getConfigurationSettingsObject(){var o,a;if(!l.isOpenUI5Detected())return{};if(l.isAtLeastVersion116()){const s=window.sap.ui.require("sap/ui/core/ControlBehavior"),u=window.sap.ui.require("sap/base/i18n/Localization"),c=window.sap.ui.require("sap/ui/core/Theming"),r=window.sap.ui.require("sap/base/i18n/Formatting"),d=window.sap.ui.require("sap/ui/core/date/CalendarUtils");return{animationMode:s.getAnimationMode(),language:u.getLanguage(),theme:c.getTheme(),themeRoot:c.getThemeRoot(),rtl:u.getRTL(),timezone:u.getTimezone(),calendarType:r.getCalendarType(),formatSettings:{firstDayOfWeek:d.getWeekConfigurationValues().firstDayOfWeek,legacyDateCalendarCustomizing:((o=r.getCustomIslamicCalendarData)==null?void 0:o.call(r))??((a=r.getLegacyDateCalendarCustomizing)==null?void 0:a.call(r))}}}const n=window.sap.ui.require("sap/ui/core/Core").getConfiguration(),i=window.sap.ui.require("sap/ui/core/LocaleData");return{animationMode:n.getAnimationMode(),language:n.getLanguage(),theme:n.getTheme(),themeRoot:n.getThemeRoot(),rtl:n.getRTL(),timezone:n.getTimezone(),calendarType:n.getCalendarType(),formatSettings:{firstDayOfWeek:i?i.getInstance(n.getLocale()).getFirstDayOfWeek():void 0,legacyDateCalendarCustomizing:n.getFormatSettings().getLegacyDateCalendarCustomizing()}}}static getLocaleDataObject(){if(!l.isOpenUI5Detected())return;const t=window.sap.ui.require("sap/ui/core/LocaleData");if(l.isAtLeastVersion116()){const o=window.sap.ui.require("sap/base/i18n/Localization");return t.getInstance(o.getLanguageTag())._get()}const i=window.sap.ui.require("sap/ui/core/Core").getConfiguration();return t.getInstance(i.getLocale())._get()}static _listenForThemeChange(){if(l.isAtLeastVersion116()){const t=window.sap.ui.require("sap/ui/core/Theming");t.attachApplied(()=>{T(t.getTheme())})}else{const t=window.sap.ui.require("sap/ui/core/Core"),n=t.getConfiguration();t.attachThemeChanged(()=>{T(n.getTheme())})}}static attachListeners(){l.isOpenUI5Detected()&&l._listenForThemeChange()}static cssVariablesLoaded(){if(!l.isOpenUI5Detected())return;const t=[...document.head.children].find(n=>n.id==="sap-ui-theme-sap.ui.core");return t?!!t.href.match(/\/css(-|_)variables\.css/):!1}}A("OpenUI5Support",l);const ce=typeof window.chrome=="object"||typeof window.v8=="object"?(e,t)=>(t>2&&40*t>e.length,e):e=>e,ue=/(?:\r\n|\r|\n|^)[ \t\f]*/,le=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g,ge=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)/g,de={"\\f":"\f","\\n":`
`,"\\r":"\r","\\t":"	"},pe=e=>{const t={},n=e.split(ue);let i,o,a,s,u,c,r,d;const f=w=>{s?(s=`${s}${w}`,d++):(s=w,d=0)};for(u=0;u<n.length;u++)if(i=n[u],!(i===""||i.charAt(0)==="#"||i.charAt(0)==="!")){for(o=le,r=0,o.lastIndex=r,a=null,s="",c=o.exec(i);c!==null;){if(r<c.index&&f(i.slice(r,c.index)),r=o.lastIndex,c[1]){if(c[1].length!==6)throw new Error(`Incomplete Unicode Escape '${c[1]}'`);f(String.fromCharCode(parseInt(c[1].slice(2),16)))}else c[2]?f(de[c[2]]||c[2].slice(1)):c[3]?(i=n[++u],r=0,o.lastIndex=r):c[4]&&(a=s,s="",o=ge,o.lastIndex=r);c=o.exec(i)}r<i.length&&f(i.slice(r)),a==null&&(a=s,s=""),t[a]=ce(s,s?d:0)}return t};let h;y(()=>{h=void 0});const fe=()=>(h===void 0&&(h=P()),h);var v;(function(e){e.Gregorian="Gregorian",e.Islamic="Islamic",e.Japanese="Japanese",e.Buddhist="Buddhist",e.Persian="Persian"})(v||(v={}));const I=v;let g;y(()=>{g=void 0});const he=()=>(g===void 0&&(g=b()),g&&g in I?g:I.Gregorian);let L;const me=()=>(L===void 0&&(L=S()),L);let p;y(()=>{p=void 0});const ye=()=>(p===void 0&&(p=M()),p),we=e=>{p=e};let D;class R{static getLegacyDateCalendarCustomizing(){return D===void 0&&(D=E()),D.legacyDateCalendarCustomizing||[]}}A("LegacyDateFormats",R);let m;y(()=>{m=void 0});const Ce=()=>(m===void 0&&(m=E()),m.firstDayOfWeek),Le=B("LegacyDateFormats"),De=Le?R.getLegacyDateCalendarCustomizing:()=>[],Te=new F,ve="directionChange",Ie=()=>Te.fireEvent(ve,void 0),Ae=async()=>{const e=Ie();await Promise.all(e),await $({rtlAware:!0})};window.registerThemePropertiesLoader=N;window["sap-ui-webcomponents-bundle"]={configuration:{getAnimationMode:fe,getLanguage:V,setLanguage:W,getTheme:x,getThemeRoot:G,setThemeRoot:_,setTheme:T,getNoConflict:ye,setNoConflict:we,getCalendarType:he,getFirstDayOfWeek:Ce,getLegacyDateCalendarCustomizing:De,getDefaultFontLoading:H,getEnableDefaultTooltips:me},getCurrentRuntimeIndex:U,getIconNames:J,parseProperties:pe,registerI18nLoader:K,getI18nBundle:j,renderFinished:O,applyDirection:Ae,EventProvider:F};
