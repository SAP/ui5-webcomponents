import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as o}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function m(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.exports.jsx(n,Object.assign({},t,{children:e.exports.jsx(r,{})})):r();function r(){const s=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",code:"code",h3:"h3",ul:"ul",li:"li",pre:"pre",strong:"strong"},o(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/Configuration"}),`
`,e.exports.jsx(s.h1,{children:"Configuration"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.em,{children:"This section explains how you can configure UI5 Web Components globally, and what configuration settings are available."})}),`
`,e.exports.jsx(s.h2,{children:"Configuration Settings"}),`
`,e.exports.jsx(s.p,{children:"There are several configuration settings that affect all UI5 Web Components globally."}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Setting"}),e.exports.jsx(s.th,{children:"Values"}),e.exports.jsx(s.th,{children:"Default Value"}),e.exports.jsx(s.th,{children:"Description"}),e.exports.jsx(s.th,{children:"Applies To"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#theme",children:"theme"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"sap_fiori_3"}),", ",e.exports.jsx(s.code,{children:"sap_fiori_3_dark"}),", ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcb"}),", ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcw"}),", ",e.exports.jsx(s.code,{children:"sap_belize"}),", ",e.exports.jsx(s.code,{children:"sap_belize_hcb"}),", ",e.exports.jsx(s.code,{children:"sap_belize_hcw"}),", ",e.exports.jsx(s.code,{children:"sap_horizon"}),", ",e.exports.jsx(s.code,{children:"sap_horizon_dark"}),", ",e.exports.jsx(s.code,{children:"sap_horizon_hcb"}),", ",e.exports.jsx(s.code,{children:"sap_horizon_hcw"})]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"sap_fiori_3"})}),e.exports.jsx(s.td,{children:"Visual theme to be applied"}),e.exports.jsx(s.td,{children:"All components"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#language",children:"language"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"ar"}),", ",e.exports.jsx(s.code,{children:"bg"}),", ",e.exports.jsx(s.code,{children:"ca"}),", ",e.exports.jsx(s.code,{children:"cs"}),", ",e.exports.jsx(s.code,{children:"cy"}),", ",e.exports.jsx(s.code,{children:"da"}),", ",e.exports.jsx(s.code,{children:"de"}),", ",e.exports.jsx(s.code,{children:"el"}),", ",e.exports.jsx(s.code,{children:"en"}),", ",e.exports.jsx(s.code,{children:"en_GB"}),", ",e.exports.jsx(s.code,{children:"es"}),", ",e.exports.jsx(s.code,{children:"es_MX"}),", ",e.exports.jsx(s.code,{children:"et"}),", ",e.exports.jsx(s.code,{children:"fi"}),", ",e.exports.jsx(s.code,{children:"fr"}),", ",e.exports.jsx(s.code,{children:"fr_CA"}),", ",e.exports.jsx(s.code,{children:"hi"}),", ",e.exports.jsx(s.code,{children:"hr"}),", ",e.exports.jsx(s.code,{children:"hu"}),", ",e.exports.jsx(s.code,{children:"in"}),", ",e.exports.jsx(s.code,{children:"it"}),", ",e.exports.jsx(s.code,{children:"iw"}),", ",e.exports.jsx(s.code,{children:"ja"}),", ",e.exports.jsx(s.code,{children:"kk"}),", ",e.exports.jsx(s.code,{children:"ko"}),", ",e.exports.jsx(s.code,{children:"lt"}),", ",e.exports.jsx(s.code,{children:"lv"}),", ",e.exports.jsx(s.code,{children:"ms"}),", ",e.exports.jsx(s.code,{children:"nl"}),", ",e.exports.jsx(s.code,{children:"no"}),", ",e.exports.jsx(s.code,{children:"pl"}),", ",e.exports.jsx(s.code,{children:"pt_PT"}),", ",e.exports.jsx(s.code,{children:"pt"}),", ",e.exports.jsx(s.code,{children:"ro"}),", ",e.exports.jsx(s.code,{children:"ru"}),", ",e.exports.jsx(s.code,{children:"sh"}),", ",e.exports.jsx(s.code,{children:"sk"}),", ",e.exports.jsx(s.code,{children:"sl"}),", ",e.exports.jsx(s.code,{children:"sv"}),", ",e.exports.jsx(s.code,{children:"th"}),", ",e.exports.jsx(s.code,{children:"tr"}),", ",e.exports.jsx(s.code,{children:"uk"}),", ",e.exports.jsx(s.code,{children:"vi"}),", ",e.exports.jsx(s.code,{children:"zh_CN"}),", ",e.exports.jsx(s.code,{children:"zh_TW"})]}),e.exports.jsxs(s.td,{children:["N/A (",e.exports.jsx(s.code,{children:"null"}),")"]}),e.exports.jsx(s.td,{children:"Language to be used for translatable texts"}),e.exports.jsx(s.td,{children:"Components and icons with translatable texts"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#animationMode",children:"animationMode"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"full"}),", ",e.exports.jsx(s.code,{children:"basic"}),", ",e.exports.jsx(s.code,{children:"minimal"}),", ",e.exports.jsx(s.code,{children:"none"})]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"full"})}),e.exports.jsx(s.td,{children:"Amount/intensity of animations to be played for some components"}),e.exports.jsxs(s.td,{children:["Components with animations (",e.exports.jsx(s.code,{children:"ui5-panel"}),", ",e.exports.jsx(s.code,{children:"ui5-carousel"}),", etc.)"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#calendarType",children:"calendarType"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"Gregorian"}),", ",e.exports.jsx(s.code,{children:"Islamic"}),", ",e.exports.jsx(s.code,{children:"Buddhist"}),", ",e.exports.jsx(s.code,{children:"Japanese"}),", ",e.exports.jsx(s.code,{children:"Persian"})]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"Gregorian"})}),e.exports.jsx(s.td,{children:"Default calendar type to be used for date-related components"}),e.exports.jsxs(s.td,{children:["Date/time components (",e.exports.jsx(s.code,{children:"ui5-date-picker"}),", etc.)"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#noConflict",children:"noConflict"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"true"}),", ",e.exports.jsx(s.code,{children:"false"})]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"false"})}),e.exports.jsxs(s.td,{children:["When set to true, all events will be fired with a ",e.exports.jsx(s.code,{children:"ui5-"})," prefix only"]}),e.exports.jsx(s.td,{children:"Components that fire events (most do)"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#formatSettings",children:"formatSettings"})}),e.exports.jsxs(s.td,{children:["See the ",e.exports.jsx(s.a,{href:"#formatSettings",children:"Format settings"})," section below"]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"{}"})}),e.exports.jsx(s.td,{children:"Allows to override locale-specific configuration"}),e.exports.jsxs(s.td,{children:["Date/time components (",e.exports.jsx(s.code,{children:"ui5-date-picker"}),", etc.)"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"#fetchDefaultLanguage",children:"fetchDefaultLanguage"})}),e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"true"}),", ",e.exports.jsx(s.code,{children:"false"})]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"false"})}),e.exports.jsx(s.td,{children:"Whether to fetch assets even for the default language"}),e.exports.jsx(s.td,{children:"Framework"})]})]})]}),`
`,e.exports.jsx(s.h3,{children:"theme"}),`
`,e.exports.jsx("a",{name:"theme"}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"theme"})," setting values above are the technical names of the supported themes:"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_horizon"})," is known as ",e.exports.jsx(s.code,{children:"Morning Horizon"})," and it's the latest theme currently available as a preview version."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_horizon_dark"})," is known as ",e.exports.jsx(s.code,{children:"Evening Horizon"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_horizon_hcb"})," is known as ",e.exports.jsx(s.code,{children:"High Contrast Black"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_horizon_hcw"})," is known as ",e.exports.jsx(s.code,{children:"High Contrast White"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_fiori_3"})," is known as ",e.exports.jsx(s.code,{children:"Quartz Light"})," and it`s the default theme."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_fiori_3_dark"})," is known as ",e.exports.jsx(s.code,{children:"Quartz Dark"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcb"})," is known as ",e.exports.jsx(s.code,{children:"Quartz High Contrast Black"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcw"})," is known as ",e.exports.jsx(s.code,{children:"Quartz High Contrast White"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_belize"})," is known as ",e.exports.jsx(s.code,{children:"Belize"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_belize_hcb"})," is known as ",e.exports.jsx(s.code,{children:"High Contrast Black"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"sap_belize_hcw"})," is known as ",e.exports.jsx(s.code,{children:"High Contrast White"}),"."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["The default theme (",e.exports.jsx(s.code,{children:"sap_fiori_3"}),`) is built in all UI5 Web Components. Thus, components are always themed.
Configuring another theme will additionally fetch and use that theme. Any theme is fetched just once.`]}),`
`,e.exports.jsxs(s.p,{children:["To use additional themes (other than ",e.exports.jsx(s.code,{children:"sap_fiori_3"}),"):"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["Import the ",e.exports.jsx(s.code,{children:"Assets.js"})," module of each component library you're using, for example:"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["For more about assets, see the dedicated ",e.exports.jsx(s.a,{href:"../../getting-started/using-assets",children:"Assets"})," section."]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["Configure the additional theme either via the ",e.exports.jsx(s.a,{href:"#script",children:"configuration script"})," or ",e.exports.jsx(s.a,{href:"#imports",children:"module imports"}),"."]}),`
`]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_belize_hcb");
`})}),`
`,e.exports.jsx(s.h3,{children:"language"}),`
`,e.exports.jsx("a",{name:"language"}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"language"})," configuration setting does not have a default value (the default value is technically ",e.exports.jsx(s.code,{children:"null"}),")."]}),`
`,e.exports.jsx(s.p,{children:"This is how the language to use is determined:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["If a language is ",e.exports.jsx(s.em,{children:"configured"}),", it will be used."]}),`
`,e.exports.jsxs(s.li,{children:["If no language is configured (the setting is ",e.exports.jsx(s.code,{children:"null"}),"), the user's ",e.exports.jsx(s.em,{children:"browser language"})," is checked, and if in the supported list, used."]}),`
`,e.exports.jsxs(s.li,{children:["If the user's browser language is not in the supported list, but is a variation of a supported language, this language will be used (e.g. ",e.exports.jsx(s.code,{children:"fr_**"})," -> ",e.exports.jsx(s.code,{children:"fr"})," )"]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.code,{children:"en"})," language will be used."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"en"}),` language is built in all UI5 Web Components that have translatable texts. Thus, components are always translated.
Configuring another language will additionally fetch and use that language. Any language is fetched once.`]}),`
`,e.exports.jsxs(s.p,{children:["To use additional languages (other than ",e.exports.jsx(s.code,{children:"en"}),"):"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["Import the ",e.exports.jsx(s.code,{children:"Assets.js"}),` module of each component/icon library you're using (in general, each library that provides languages assets),
for example:`]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["For more about assets, see the dedicated ",e.exports.jsx(s.a,{href:"../../getting-started/using-assets",children:"Assets"})," section."]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["Configure the additional language either via the ",e.exports.jsx(s.a,{href:"#script",children:"configuration script"})," or ",e.exports.jsx(s.a,{href:"#imports",children:"module imports"}),"."]}),`
`]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
setLanguage("fr");
`})}),`
`,e.exports.jsx(s.h3,{children:"animationMode"}),`
`,e.exports.jsx("a",{name:"animationMode"}),`
`,e.exports.jsx(s.p,{children:"This setting only applies to components that run animations."}),`
`,e.exports.jsx(s.p,{children:"Animation modes allow to specify different animation scenarios or levels."}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"full"}),", all animations run unrestricted."]}),`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"basic"}),", more light-weight set of animations would run."]}),`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"minimal"}),", animations of fundamental functionalities are included."]}),`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"none"}),", all animations are completely suspended."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," Please, note that each component determines which animations would run for a specific mode."]}),`
`,e.exports.jsx(s.h3,{children:"calendarType"}),`
`,e.exports.jsx("a",{name:"calendarType"}),`
`,e.exports.jsxs(s.p,{children:["This setting determines the default calendar type for all date-related components such as ",e.exports.jsx(s.code,{children:"ui5-date-picker"}),", ",e.exports.jsx(s.code,{children:"ui5-datetime-picker"}),", etc."]}),`
`,e.exports.jsx(s.p,{children:"You can always override the calendar type for each instance via component-specific properties. See the documentation of each component for details."}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"Gregorian"})," calendar type is built in all date-related UI5 Web Components."]}),`
`,e.exports.jsxs(s.p,{children:["Calendar types are opt-in features, see ",e.exports.jsx(s.a,{href:"../../getting-started/using-features",children:"Using Features"}),` for details.
Setting another calendar type via configuration or component properties requires that the respective calendar type be explicitly imported.`]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"Make sure you've bundled the required calendar type:"}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js"; 
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"Configure this calendar:"}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
    "calendarType": "Islamic"
}
<\/script>
`})}),`
`,e.exports.jsxs(s.p,{children:["Now all date-related components will use the ",e.exports.jsx(s.code,{children:"Islamic"})," calendar type by default."]}),`
`,e.exports.jsx("a",{name:"noConflict"}),`
`,e.exports.jsxs(s.h3,{children:["noConflict ",e.exports.jsx("a",{name:"no_conflict"})]}),`
`,e.exports.jsxs(s.p,{children:["By default, UI5 Web Components fire all custom events twice - once with the documented name (e.g. ",e.exports.jsx(s.code,{children:"change"}),"), and once more with a ",e.exports.jsx(s.code,{children:"ui5-"})," prefix (e.g. ",e.exports.jsx(s.code,{children:"ui5-change"}),`).
For example, when the `,e.exports.jsx(s.code,{children:"ui5-switch"})," is toggled, it fires a ",e.exports.jsx(s.code,{children:"change"})," event, but also a ",e.exports.jsx(s.code,{children:"ui5-change"})," event."]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"noConflict"})," configuration setting allows certain control over this behavior:"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"false"})," (default value), all custom events are fired with and without the ",e.exports.jsx(s.code,{children:"ui5-"})," prefix."]}),`
`,e.exports.jsxs(s.li,{children:["When ",e.exports.jsx(s.code,{children:"true"}),", all custom events are fired with the ",e.exports.jsx(s.code,{children:"ui5-"})," prefix ",e.exports.jsx(s.strong,{children:"only"}),". Hence the ",e.exports.jsx(s.code,{children:"noConflict"}),` semantic in the name of the setting.
This is handy, for example, if the name of an event, fired by a component, happens to collide with the name of an event provided by a third-party library.`]}),`
`,e.exports.jsxs(s.li,{children:["When an object is supplied, just the specified events will be fired with the ",e.exports.jsx(s.code,{children:"ui5-"})," prefix ",e.exports.jsx(s.strong,{children:"only"}),`.
All other events will be fired normally - once with the prefix, and once without it.
The format of this object is as follows:`]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-json",children:`{
    "events": ["selection-change", "header-click"]
}
`})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," Please, note that other keys may be added to this object in the future for the purpose of name conflict resolution."]}),`
`,e.exports.jsxs(s.p,{children:["In the above example, only the ",e.exports.jsx(s.code,{children:"selection-change"})," and ",e.exports.jsx(s.code,{children:"header-click"}),` events will be fired with a prefix.
You can still use them by listening to `,e.exports.jsx(s.code,{children:"ui5-selection-change"})," and ",e.exports.jsx(s.code,{children:"ui5-header-click"}),", but the names ",e.exports.jsx(s.code,{children:"selection-change"})," and ",e.exports.jsx(s.code,{children:"header-click"}),` will be
free for use by other UI components and libraries without name collision.`]}),`
`,e.exports.jsx(s.h3,{children:"formatSettings"}),`
`,e.exports.jsx("a",{name:"formatSettings"}),`
`,e.exports.jsx(s.p,{children:"This setting allows to override locale-specific settings for date-related controls."}),`
`,e.exports.jsx(s.p,{children:"For example, to force the first day of week to Sunday, no matter the locale:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-json",children:`{
	"formatSettings": {
		"firstDayOfWeek": 0
	}
}
`})}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Setting"}),e.exports.jsx(s.th,{children:"Values"}),e.exports.jsx(s.th,{children:"Default Value"}),e.exports.jsx(s.th,{children:"Description"})]})}),e.exports.jsx(s.tbody,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"firstDayOfWeek"}),e.exports.jsx(s.td,{children:"0 (Sunday) through 6 (Saturday)"}),e.exports.jsx(s.td,{children:e.exports.jsx(s.em,{children:"Depends on locale"})}),e.exports.jsx(s.td,{children:"When set, overrides the locale's default value"})]})})]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," Currently, only ",e.exports.jsx(s.code,{children:"firstDayOfWeek"})," is supported. More settings may be added in the future."]}),`
`,e.exports.jsx(s.h3,{children:"fetchDefaultLanguage"}),`
`,e.exports.jsx("a",{name:"fetchDefaultLanguage"}),`
`,e.exports.jsxs(s.p,{children:["As described in the ",e.exports.jsx(s.code,{children:"language"})," configuration option section, the ",e.exports.jsx(s.code,{children:"en"}),` language is built in all components that have translatable texts.
All other languages are fetched as additional assets.`]}),`
`,e.exports.jsxs(s.p,{children:[`Normally, you would never want to change that setting, but if for technical reasons you prefer even the default language to be fetched
over the network, although it's built-in, then set `,e.exports.jsx(s.code,{children:"fetchDefaultLanguage"})," this to ",e.exports.jsx(s.code,{children:"true"})]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
	"fetchDefaultLanguage": true
}
<\/script>
`})}),`
`,e.exports.jsx(s.h2,{children:"Configuration Script"}),`
`,e.exports.jsx("a",{name:"script"}),`
`,e.exports.jsxs(s.p,{children:["In order to provide configuration settings, include a ",e.exports.jsx(s.code,{children:"<script>"})," element in your HTML page with:"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"data-ui5-config"})," attribute"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:'type="application/json"'})," attribute"]}),`
`]}),`
`,e.exports.jsx(s.p,{children:"Provide the desired configuration settings in a JSON object, as shown in the example below."}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
	"theme": "sap_belize_hcb",
	"language": "ja",
	"animationMode": "none",
	"calendarType": "Japanese",
	"formatSettings": {
		"firstDayOfWeek": 0
	},
	"noConflict": {
		"events": ["selection-change", "header-click"]
	},
	"fetchDefaultLanguage": true
}
<\/script>
`})}),`
`,e.exports.jsx(s.h2,{children:"Configuration Module Imports"}),`
`,e.exports.jsx("a",{name:"imports"}),`
`,e.exports.jsx(s.p,{children:`The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.`}),`
`,e.exports.jsxs(s.p,{children:["To do so, please import the desired functionality from the respective ",e.exports.jsx(s.code,{children:'"@ui5/webcomponents-base/dist/config/"'})," module."]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"theme"})}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"language"})}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"animationMode"})}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"calendarType"})," - can only be set initially in the configuration script."]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"noConflict"})}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"formatSettings"})," - can only be set initially in the configuration script."]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"fetchDefaultLanguage"})}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { getFetchDefaultLanguage, setFetchDefaultLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["Next: ",e.exports.jsx(s.a,{href:"../rtl-and-compact-mode",children:"Right-To-Left (RTL) And Compact Mode"})]})]})}}export{m as default};
//# sourceMappingURL=01-configuration.bf4785d6.js.map
