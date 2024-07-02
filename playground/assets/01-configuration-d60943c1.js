import{j as e}from"./jsx-runtime-670e1be8.js";import{M as c}from"./index-6087c063.js";import{B as d,F as r}from"./Banner-a1178143.js";import{u as t}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function i(s){const n=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",code:"code",h3:"h3",ul:"ul",li:"li",pre:"pre",strong:"strong"},t(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Advanced/Configuration"}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h1,{id:"configuration",children:"Configuration"}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"This section explains how you can configure UI5 Web Components globally, and what configuration settings are available."})}),`
`,e.jsx(n.h2,{id:"configuration-settings",children:"Configuration Settings"}),`
`,e.jsx(n.p,{children:"There are several configuration settings that affect all UI5 Web Components globally."}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Setting"}),e.jsx(n.th,{children:"Values"}),e.jsx(n.th,{children:"Default Value"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Applies To"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#theme",children:"theme"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"sap_fiori_3"}),", ",e.jsx(n.code,{children:"sap_fiori_3_dark"}),", ",e.jsx(n.code,{children:"sap_fiori_3_hcb"}),", ",e.jsx(n.code,{children:"sap_fiori_3_hcw"}),", ",e.jsx(n.code,{children:"sap_horizon"}),", ",e.jsx(n.code,{children:"sap_horizon_dark"}),", ",e.jsx(n.code,{children:"sap_horizon_hcb"}),", ",e.jsx(n.code,{children:"sap_horizon_hcw"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"sap_horizon"})}),e.jsx(n.td,{children:"Visual theme to be applied"}),e.jsx(n.td,{children:"All components"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#language",children:"language"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"ar"}),", ",e.jsx(n.code,{children:"bg"}),", ",e.jsx(n.code,{children:"ca"}),", ",e.jsx(n.code,{children:"cs"}),", ",e.jsx(n.code,{children:"cy"}),", ",e.jsx(n.code,{children:"da"}),", ",e.jsx(n.code,{children:"de"}),", ",e.jsx(n.code,{children:"el"}),", ",e.jsx(n.code,{children:"en"}),", ",e.jsx(n.code,{children:"en_GB"}),", ",e.jsx(n.code,{children:"es"}),", ",e.jsx(n.code,{children:"es_MX"}),", ",e.jsx(n.code,{children:"et"}),", ",e.jsx(n.code,{children:"fi"}),", ",e.jsx(n.code,{children:"fr"}),", ",e.jsx(n.code,{children:"fr_CA"}),", ",e.jsx(n.code,{children:"hi"}),", ",e.jsx(n.code,{children:"hr"}),", ",e.jsx(n.code,{children:"hu"}),", ",e.jsx(n.code,{children:"in"}),", ",e.jsx(n.code,{children:"it"}),", ",e.jsx(n.code,{children:"iw"}),", ",e.jsx(n.code,{children:"ja"}),", ",e.jsx(n.code,{children:"kk"}),", ",e.jsx(n.code,{children:"ko"}),", ",e.jsx(n.code,{children:"lt"}),", ",e.jsx(n.code,{children:"lv"}),", ",e.jsx(n.code,{children:"ms"}),", ",e.jsx(n.code,{children:"nl"}),", ",e.jsx(n.code,{children:"no"}),", ",e.jsx(n.code,{children:"pl"}),", ",e.jsx(n.code,{children:"pt_PT"}),", ",e.jsx(n.code,{children:"pt"}),", ",e.jsx(n.code,{children:"ro"}),", ",e.jsx(n.code,{children:"ru"}),", ",e.jsx(n.code,{children:"sh"}),", ",e.jsx(n.code,{children:"sk"}),", ",e.jsx(n.code,{children:"sl"}),", ",e.jsx(n.code,{children:"sv"}),", ",e.jsx(n.code,{children:"th"}),", ",e.jsx(n.code,{children:"tr"}),", ",e.jsx(n.code,{children:"uk"}),", ",e.jsx(n.code,{children:"vi"}),", ",e.jsx(n.code,{children:"zh_CN"}),", ",e.jsx(n.code,{children:"zh_TW"})]}),e.jsxs(n.td,{children:["N/A (",e.jsx(n.code,{children:"null"}),")"]}),e.jsx(n.td,{children:"Language to be used for translatable texts"}),e.jsx(n.td,{children:"Components and icons with translatable texts"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#animationMode",children:"animationMode"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"full"}),", ",e.jsx(n.code,{children:"basic"}),", ",e.jsx(n.code,{children:"minimal"}),", ",e.jsx(n.code,{children:"none"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"full"})}),e.jsx(n.td,{children:"Amount/intensity of animations to be played for some components"}),e.jsxs(n.td,{children:["Components with animations (",e.jsx(n.code,{children:"ui5-panel"}),", ",e.jsx(n.code,{children:"ui5-carousel"}),", etc.)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#calendarType",children:"calendarType"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"Gregorian"}),", ",e.jsx(n.code,{children:"Islamic"}),", ",e.jsx(n.code,{children:"Buddhist"}),", ",e.jsx(n.code,{children:"Japanese"}),", ",e.jsx(n.code,{children:"Persian"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Gregorian"})}),e.jsx(n.td,{children:"Default calendar type to be used for date-related components"}),e.jsxs(n.td,{children:["Date/time components (",e.jsx(n.code,{children:"ui5-date-picker"}),", etc.)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#calendarType",children:"secondaryCalendarType"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"Gregorian"}),", ",e.jsx(n.code,{children:"Islamic"}),", ",e.jsx(n.code,{children:"Buddhist"}),", ",e.jsx(n.code,{children:"Japanese"}),", ",e.jsx(n.code,{children:"Persian"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"undefined"})}),e.jsx(n.td,{children:"Default secondary calendar type to be used for date-related components"}),e.jsxs(n.td,{children:["Date/time components (",e.jsx(n.code,{children:"ui5-date-picker"}),", etc.)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#noConflict",children:"noConflict"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"true"}),", ",e.jsx(n.code,{children:"false"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsxs(n.td,{children:["When set to true, all events will be fired with a ",e.jsx(n.code,{children:"ui5-"})," prefix only"]}),e.jsx(n.td,{children:"Components that fire events (most do)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#formatSettings",children:"formatSettings"})}),e.jsxs(n.td,{children:["See the ",e.jsx(n.a,{href:"#formatSettings",children:"Format settings"})," section below"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{}"})}),e.jsx(n.td,{children:"Allows to override locale-specific configuration"}),e.jsxs(n.td,{children:["Date/time components (",e.jsx(n.code,{children:"ui5-date-picker"}),", etc.)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#fetchDefaultLanguage",children:"fetchDefaultLanguage"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"true"}),", ",e.jsx(n.code,{children:"false"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether to fetch assets even for the default language"}),e.jsx(n.td,{children:"Framework"})]})]})]}),`
`,e.jsx(n.h3,{id:"theme",children:"theme"}),`
`,e.jsx("a",{name:"theme"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"theme"})," setting values above are the technical names of the supported themes:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_horizon"})," is known as ",e.jsx(n.code,{children:"Morning Horizon"})," and it's the latest theme and default theme."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_horizon_dark"})," is known as ",e.jsx(n.code,{children:"Evening Horizon"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_horizon_hcb"})," is known as ",e.jsx(n.code,{children:"High Contrast Black"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_horizon_hcw"})," is known as ",e.jsx(n.code,{children:"High Contrast White"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_fiori_3"})," is known as ",e.jsx(n.code,{children:"Quartz Light"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_fiori_3_dark"})," is known as ",e.jsx(n.code,{children:"Quartz Dark"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_fiori_3_hcb"})," is known as ",e.jsx(n.code,{children:"Quartz High Contrast Black"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_fiori_3_hcw"})," is known as ",e.jsx(n.code,{children:"Quartz High Contrast White"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The default theme (",e.jsx(n.code,{children:"sap_horizon"}),`) is built in all UI5 Web Components. Thus, components are always themed.
Configuring another theme will additionally fetch and use that theme. Any theme is fetched just once.`]}),`
`,e.jsxs(n.p,{children:["To use additional themes (other than ",e.jsx(n.code,{children:"sap_horizon"}),"):"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Import the ",e.jsx(n.code,{children:"Assets.js"})," module of each component library you're using, for example:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
`})}),`
`,e.jsxs(n.p,{children:["For more about assets, see the dedicated ",e.jsx(n.a,{href:"./?path=/docs/docs-getting-started-using-assets--docs",children:"Assets"})," section."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Configure the additional theme either via the ",e.jsx(n.a,{href:"#script",children:"configuration script"})," or ",e.jsx(n.a,{href:"#imports",children:"module imports"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_horizon_hcb");
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"To reset the theme to the default one:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setTheme, getDefaultTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme(getDefaultTheme());
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Note: Deprecated themes"})}),`
`,e.jsxs(n.p,{children:[`The following themes are deprecated and no longer maintained - out of maintenance and left for compatibility only. The themes will be removed in the next major version.
We recommend using `,e.jsx(n.code,{children:"Horizon"})," (sap_horizon) and ",e.jsx(n.code,{children:"Quartz"})," (sap_fiori_3) theme families."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_belize"})," is known as ",e.jsx(n.code,{children:"Belize"})," [deprecated since 1.22]."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_belize_hcb"})," is known as ",e.jsx(n.code,{children:"High Contrast Black"})," [deprecated since 1.22]."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"sap_belize_hcw"})," is known as ",e.jsx(n.code,{children:"High Contrast White"})," [deprecated since 1.22]."]}),`
`]}),`
`,e.jsx(n.h3,{id:"language",children:"language"}),`
`,e.jsx("a",{name:"language"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"language"})," configuration setting does not have a default value (the default value is technically ",e.jsx(n.code,{children:"null"}),")."]}),`
`,e.jsx(n.p,{children:"This is how the language to use is determined:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If a language is ",e.jsx(n.em,{children:"configured"}),", it will be used."]}),`
`,e.jsxs(n.li,{children:["If no language is configured (the setting is ",e.jsx(n.code,{children:"null"}),"), the user's ",e.jsx(n.em,{children:"browser language"})," is checked, and if in the supported list, used."]}),`
`,e.jsxs(n.li,{children:["If the user's browser language is not in the supported list, but is a variation of a supported language, this language will be used (e.g. ",e.jsx(n.code,{children:"fr_**"})," -> ",e.jsx(n.code,{children:"fr"})," )"]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"en"})," language will be used."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"en"}),` language is built in all UI5 Web Components that have translatable texts. Thus, components are always translated.
Configuring another language will additionally fetch and use that language. Any language is fetched once.`]}),`
`,e.jsxs(n.p,{children:["To use additional languages (other than ",e.jsx(n.code,{children:"en"}),"):"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Import the ",e.jsx(n.code,{children:"Assets.js"}),` module of each component/icon library you're using (in general, each library that provides languages assets),
for example:`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js";
`})}),`
`,e.jsxs(n.p,{children:["For more about assets, see the dedicated ",e.jsx(n.a,{href:"./?path=/docs/docs-getting-started-using-assets--docs",children:"Assets"})," section."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Configure the additional language either via the ",e.jsx(n.a,{href:"#script",children:"configuration script"})," or ",e.jsx(n.a,{href:"#imports",children:"module imports"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
setLanguage("fr");
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"To reset the langauge to the default one:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setLanguage, getDefaultLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
setLanguage(getDefaultLanguage());
`})}),`
`,e.jsx(n.h3,{id:"animationmode",children:"animationMode"}),`
`,e.jsx("a",{name:"animationMode"}),`
`,e.jsx(n.p,{children:"This setting only applies to components that run animations."}),`
`,e.jsx(n.p,{children:"Animation modes allow to specify different animation scenarios or levels."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"full"}),", all animations run unrestricted."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"basic"}),", more light-weight set of animations would run."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"minimal"}),", animations of fundamental functionalities are included."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"none"}),", all animations are completely suspended."]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Please, note that each component determines which animations would run for a specific mode."]}),`
`,e.jsx(n.h3,{id:"calendartype",children:"calendarType"}),`
`,e.jsx("a",{name:"calendarType"}),`
`,e.jsxs(n.p,{children:["This setting determines the default calendar type for all date-related components such as ",e.jsx(n.code,{children:"ui5-date-picker"}),", ",e.jsx(n.code,{children:"ui5-datetime-picker"}),", etc."]}),`
`,e.jsx(n.p,{children:"You can always override the calendar type for each instance via component-specific properties. See the documentation of each component for details."}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Gregorian"})," calendar type is built in all date-related UI5 Web Components."]}),`
`,e.jsxs(n.p,{children:["Calendar types are opt-in features, see ",e.jsx(n.a,{href:"./?path=/docs/docs-getting-started-using-features--docs",children:"Using Features"}),` for details.
Setting another calendar type via configuration or component properties requires that the respective calendar type be explicitly imported.`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure you've bundled the required calendar type:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js"; 
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Configure this calendar:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
    "calendarType": "Islamic"
}
<\/script>
`})}),`
`,e.jsxs(n.p,{children:["Now all date-related components will use the ",e.jsx(n.code,{children:"Islamic"})," calendar type by default."]}),`
`,e.jsx("a",{name:"noConflict"}),`
`,e.jsxs(n.h3,{id:"noconflict-",children:["noConflict ",e.jsx("a",{name:"no_conflict"})]}),`
`,e.jsxs(n.p,{children:["By default, UI5 Web Components fire all custom events twice - once with the documented name (e.g. ",e.jsx(n.code,{children:"change"}),"), and once more with a ",e.jsx(n.code,{children:"ui5-"})," prefix (e.g. ",e.jsx(n.code,{children:"ui5-change"}),`).
For example, when the `,e.jsx(n.code,{children:"ui5-switch"})," is toggled, it fires a ",e.jsx(n.code,{children:"change"})," event, but also a ",e.jsx(n.code,{children:"ui5-change"})," event."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"noConflict"})," configuration setting allows certain control over this behavior:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"false"})," (default value), all custom events are fired with and without the ",e.jsx(n.code,{children:"ui5-"})," prefix."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"true"}),", all custom events are fired with the ",e.jsx(n.code,{children:"ui5-"})," prefix ",e.jsx(n.strong,{children:"only"}),". Hence the ",e.jsx(n.code,{children:"noConflict"}),` semantic in the name of the setting.
This is handy, for example, if the name of an event, fired by a component, happens to collide with the name of an event provided by a third-party library.`]}),`
`,e.jsxs(n.li,{children:["When an object is supplied, just the specified events will be fired with the ",e.jsx(n.code,{children:"ui5-"})," prefix ",e.jsx(n.strong,{children:"only"}),`.
All other events will be fired normally - once with the prefix, and once without it.
The format of this object is as follows:`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
    "events": ["selection-change", "header-click"]
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Please, note that other keys may be added to this object in the future for the purpose of name conflict resolution."]}),`
`,e.jsxs(n.p,{children:["In the above example, only the ",e.jsx(n.code,{children:"selection-change"})," and ",e.jsx(n.code,{children:"header-click"}),` events will be fired with a prefix.
You can still use them by listening to `,e.jsx(n.code,{children:"ui5-selection-change"})," and ",e.jsx(n.code,{children:"ui5-header-click"}),", but the names ",e.jsx(n.code,{children:"selection-change"})," and ",e.jsx(n.code,{children:"header-click"}),` will be
free for use by other UI components and libraries without name collision.`]}),`
`,e.jsx(n.h3,{id:"formatsettings",children:"formatSettings"}),`
`,e.jsx("a",{name:"formatSettings"}),`
`,e.jsx(n.p,{children:"This setting allows to override locale-specific settings for date-related controls."}),`
`,e.jsx(n.p,{children:"For example, to force the first day of week to Sunday, no matter the locale:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
	"formatSettings": {
		"firstDayOfWeek": 0
	}
}
`})}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Setting"}),e.jsx(n.th,{children:"Values"}),e.jsx(n.th,{children:"Default Value"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"firstDayOfWeek"}),e.jsx(n.td,{children:"0 (Sunday) through 6 (Saturday)"}),e.jsx(n.td,{children:e.jsx(n.em,{children:"Depends on locale"})}),e.jsx(n.td,{children:"When set, overrides the locale's default value"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"legacyDateCalendarCustomizing"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{dateFormat: string, islamicMonthStart: string, gregDate: string }"})}),e.jsx(n.td,{children:"[]"}),e.jsx(n.td,{children:"When set, adds customizing data for Islamic calendar support"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," legacyDateCalendarCustomizing takes affect only if following features are imported:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`@ui5/webcomponents-base/dist/features/LegacyDateFormats.js
`})}),`
`,e.jsx(n.h3,{id:"fetchdefaultlanguage",children:"fetchDefaultLanguage"}),`
`,e.jsx("a",{name:"fetchDefaultLanguage"}),`
`,e.jsxs(n.p,{children:["As described in the ",e.jsx(n.code,{children:"language"})," configuration option section, the ",e.jsx(n.code,{children:"en"}),` language is built in all components that have translatable texts.
All other languages are fetched as additional assets.`]}),`
`,e.jsxs(n.p,{children:[`Normally, you would never want to change that setting, but if for technical reasons you prefer even the default language to be fetched
over the network, although it's built-in, then set `,e.jsx(n.code,{children:"fetchDefaultLanguage"})," this to ",e.jsx(n.code,{children:"true"})]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
	"fetchDefaultLanguage": true
}
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"configuration-script",children:"Configuration Script"}),`
`,e.jsx("a",{name:"script"}),`
`,e.jsxs(n.p,{children:["In order to provide configuration settings, include a ",e.jsx(n.code,{children:"<script>"})," element in your HTML page with:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-ui5-config"})," attribute"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="application/json"'})," attribute"]}),`
`]}),`
`,e.jsx(n.p,{children:"Provide the desired configuration settings in a JSON object, as shown in the example below."}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
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
`,e.jsx(n.h2,{id:"configuration-module-imports",children:"Configuration Module Imports"}),`
`,e.jsx("a",{name:"imports"}),`
`,e.jsx(n.p,{children:`The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.`}),`
`,e.jsxs(n.p,{children:["To do so, please import the desired functionality from the respective ",e.jsx(n.code,{children:'"@ui5/webcomponents-base/dist/config/"'})," module."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"theme"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"language"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"animationMode"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"calendarType"})," - can only be set initially in the configuration script."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"noConflict"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"formatSettings"})," - can only be set initially in the configuration script."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"fetchDefaultLanguage"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getFetchDefaultLanguage, setFetchDefaultLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
`})}),`
`,e.jsx(r,{})]})}function b(s={}){const{wrapper:n}=Object.assign({},t(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(i,s)})):i(s)}export{b as default};
