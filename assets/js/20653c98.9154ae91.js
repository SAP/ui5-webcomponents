"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[9411],{24889:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>A,contentTitle:()=>B,default:()=>_,frontMatter:()=>Y,metadata:()=>F,toc:()=>O});var d=t(31085),s=t(71184);const i='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-calendar></ui5-calendar>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',r='import "@ui5/webcomponents/dist/Calendar.js";';function l(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:i,js:r})}function a(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}const c='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-calendar format-pattern="dd/MM/yyyy" min-date="7/10/2020" max-date="20/10/2020">\n    </ui5-calendar>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',o='import "@ui5/webcomponents/dist/Calendar.js";';function h(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:c,js:o})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}const x='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-calendar primary-calendar-type="Japanese" secondary-calendar-type="Islamic">\n    </ui5-calendar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',j='import "@ui5/webcomponents/dist/Calendar.js";\n\nimport "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js"\nimport "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js"';function u(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:x,js:j})}function m(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(u,{...e})}):u(e)}const y='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-calendar>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n        <ui5-special-date slot="specialDates"></ui5-special-date>\n\n        <ui5-calendar-legend slot="calendarLegend" id="calendarLegend" hide-today hide-selected-day>\n            <ui5-calendar-legend-item type="Type05" text="Holiday"></ui5-calendar-legend-item>\n            <ui5-calendar-legend-item type="Type07" text="School Vacation"></ui5-calendar-legend-item>\n            <ui5-calendar-legend-item type="Type13" text="Wedding"></ui5-calendar-legend-item>\n        </ui5-calendar-legend>\n    </ui5-calendar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',g='import "@ui5/webcomponents/dist/Calendar.js";\nimport "@ui5/webcomponents/dist/CalendarLegend.js";\nimport "@ui5/webcomponents/dist/CalendarLegendItem.js";\nimport "@ui5/webcomponents/dist/SpecialCalendarDate.js";\n\n// Function that maps special dates to the current month\nfunction updateSpecialDates() {\n    const currentDate = new Date();\n    const year = currentDate.getFullYear();\n    const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");\n    const specialDates = document.querySelectorAll("ui5-special-date");\n    const types = ["Type05", "Type07", "Type13", "NonWorking"];\n    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();\n    let assignedDays = new Set();\n\n    function generateUniqueRandomDay() {\n        let randomDay;\n        do {\n            randomDay = Math.floor(Math.random() * daysInMonth) + 1;\n        } while (assignedDays.has(randomDay));\n        assignedDays.add(randomDay);\n        return randomDay.toString().padStart(2, "0");\n    }\n\n    specialDates.forEach((specDate, index) => {\n        specDate.setAttribute("value", year + "-" + formattedMonth + "-" + generateUniqueRandomDay());\n        specDate.setAttribute("type", types[index % types.length]);\n    });\n}\n\nupdateSpecialDates();';function f(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:y,js:g})}function b(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(f,{...e})}):f(e)}const v='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <div style="display: grid; grid-template-columns: 1fr; row-gap: 1rem;">\n        <ui5-title level="H5">Single</ui5-title>\n        <ui5-calendar selection-mode="Single"></ui5-calendar>\n        <ui5-title level="H5">Multiple</ui5-title>\n        <ui5-calendar selection-mode="Multiple"></ui5-calendar>\n        <ui5-title level="H5">Range</ui5-title>\n        <ui5-calendar selection-mode="Range"></ui5-calendar>\n    </div>\n   \n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',w='import "@ui5/webcomponents/dist/Title.js";\nimport "@ui5/webcomponents/dist/Calendar.js";';function D(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:v,js:w})}function C(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(D,{...e})}):D(e)}const k='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Calendar in Different Time Zone</title>\n\n    <script data-ui5-config type="application/json">\n        {\n            "language": "EN",\n            "timezone" : "Pacific/Apia"\n        }\n    <\/script>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: 450px;">\n    \x3c!-- playground-fold-end --\x3e\n\n    \n    <ui5-calendar></ui5-calendar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',S='import "@ui5/webcomponents/dist/Calendar.js";';function T(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:k,js:S})}function E(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(T,{...e})}):T(e)}const M='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Calendar with a selection of calendarWeekNumbering</title>\n\n    <script data-ui5-config type="application/json">\n        {\n            "language": "EN"\n        }\n    <\/script>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: 450px;">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-select id="sel" style="width: 300px">\n        <ui5-option data-calendar-week-numbering="ISO_8601" selected>ISO_8601</ui5-option>\n        <ui5-option data-calendar-week-numbering="MiddleEastern">MiddleEastern</ui5-option>\n        <ui5-option data-calendar-week-numbering="WesternTraditional">WesternTraditional</ui5-option>\n    </ui5-select>\n    <ui5-calendar id="cal"></ui5-calendar>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',N='import "@ui5/webcomponents/dist/Calendar.js";\nimport "@ui5/webcomponents/dist/Select.js";\nimport "@ui5/webcomponents/dist/Option.js";\n\nsel.addEventListener("change", async (e) => {\n   cal.calendarWeekNumbering = e.detail.selectedOption.getAttribute("data-calendar-week-numbering");\n});';function P(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,d.jsx)(n,{html:M,js:N})}function I(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(P,{...e})}):P(e)}var U=t(55215),R=t(42436);const Y={slug:"../../Calendar",ui5_tag_name:"ui5-calendar",ui5_since:"1.0.0-rc.11"},B=void 0,F={id:"components/main/Calendar/Calendar",title:"Calendar",description:"The ui5-calendar component allows users to select one or more dates.",source:"@site/docs/components/main/Calendar/Calendar.mdx",sourceDirName:"components/main/Calendar",slug:"/components/Calendar",permalink:"/ui5-webcomponents/components/Calendar",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../../Calendar",ui5_tag_name:"ui5-calendar",ui5_since:"1.0.0-rc.11"},sidebar:"componentsSidebar",previous:{title:"ButtonBadge",permalink:"/ui5-webcomponents/components/ButtonBadge"},next:{title:"CalendarDate",permalink:"/ui5-webcomponents/components/CalendarDate"}},A={},O=[{value:"Usage",id:"usage",level:3},{value:"Keyboard Handling",id:"keyboard-handling",level:3},{value:"Fast Navigation",id:"fast-navigation",level:4},{value:"Calendar types",id:"calendar-types",level:3},{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Basic Sample",id:"basic-sample",level:2},{value:"Properties",id:"properties",level:2},{value:"selectionMode",id:"selectionmode",level:3},{value:"hideWeekNumbers",id:"hideweeknumbers",level:3},{value:"primaryCalendarType",id:"primarycalendartype",level:3},{value:"secondaryCalendarType",id:"secondarycalendartype",level:3},{value:"formatPattern",id:"formatpattern",level:3},{value:"minDate",id:"mindate",level:3},{value:"maxDate",id:"maxdate",level:3},{value:"calendarWeekNumbering",id:"calendarweeknumbering",level:3},{value:"Slots",id:"slots",level:2},{value:"calendarLegend",id:"calendarlegend",level:3},{value:"default",id:"default",level:3},{value:"specialDates",id:"specialdates",level:3},{value:"Events",id:"events",level:2},{value:"selection-change",id:"selection-change",level:3},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"More Samples",id:"more-samples",level:2},{value:"Selection Modes",id:"selection-modes",level:3},{value:"Min and Max Dates",id:"min-and-max-dates",level:3},{value:"Calendar Types",id:"calendar-types-1",level:3},{value:"Calendar with Legend",id:"calendar-with-legend",level:3},{value:"Timezones",id:"timezones",level:3},{value:"CalendarWeekNumbering",id:"calendarweeknumbering-1",level:3}];function W(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"ui5-calendar"})," component allows users to select one or more dates."]}),"\n",(0,d.jsxs)(n.p,{children:["Currently selected dates are represented with instances of ",(0,d.jsx)(n.code,{children:"ui5-date"})," as\nchildren of the ",(0,d.jsx)(n.code,{children:"ui5-calendar"}),". The value property of each ",(0,d.jsx)(n.code,{children:"ui5-date"})," must be a\ndate string, correctly formatted according to the ",(0,d.jsx)(n.code,{children:"ui5-calendar"}),"'s ",(0,d.jsx)(n.code,{children:"formatPattern"})," property.\nWhenever the user changes the date selection, ",(0,d.jsx)(n.code,{children:"ui5-calendar"})," will automatically create/remove instances\nof ",(0,d.jsx)(n.code,{children:"ui5-date"})," in itself, unless you prevent this behavior by calling ",(0,d.jsx)(n.code,{children:"preventDefault()"})," for the\n",(0,d.jsx)(n.code,{children:"selection-change"})," event. This is useful if you want to control the selected dates externally."]}),"\n",(0,d.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,d.jsx)(n.p,{children:"The user can navigate to a particular date by:"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"Pressing over a month inside the months view"}),"\n",(0,d.jsx)(n.li,{children:"Pressing over an year inside the years view"}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"The user can confirm a date selection by pressing over a date inside the days view."}),"\n",(0,d.jsx)(n.h3,{id:"keyboard-handling",children:"Keyboard Handling"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"ui5-calendar"})," provides advanced keyboard handling.\nWhen a picker is showed and focused the user can use the following keyboard\nshortcuts in order to perform a navigation:"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Day picker:"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[F4] - Shows month picker"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Shift] + [F4] - Shows year picker"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Up] - Navigate to the previous month"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Down] - Navigate to the next month"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Shift] + [Page Up] - Navigate to the previous year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Shift] + [Page Down] - Navigate to the next year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [Shift] + [Page Up] - Navigate ten years backwards"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [Shift] + [Page Down] - Navigate ten years forwards"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Home] - Navigate to the first day of the week"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[End] - Navigate to the last day of the week"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [Home] - Navigate to the first day of the month"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [End] - Navigate to the last day of the month"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Month picker:"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Up] - Navigate to the previous year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Down] - Navigate to the next year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Home] - Navigate to the first month of the current row"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[End] - Navigate to the last month of the current row"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [Home] - Navigate to the first month of the current year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [End] - Navigate to the last month of the year"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Year picker:"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Up] - Navigate to the previous year range"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Page Down] - Navigate the next year range"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Home] - Navigate to the first year of the current row"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[End] - Navigate to the last year of the current row"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [Home] - Navigate to the first year of the current year range"}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"[Ctrl] + [End] - Navigate to the last year of the current year range"}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"fast-navigation",children:"Fast Navigation"}),"\n",(0,d.jsxs)(n.p,{children:["This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].\nIn order to use this functionality, you need to import the following module:\n",(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents-base/dist/features/F6Navigation.js"'})]}),"\n",(0,d.jsx)(n.h3,{id:"calendar-types",children:"Calendar types"}),"\n",(0,d.jsxs)(n.p,{children:["The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.\nBy default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,\nyou need to set the ",(0,d.jsx)(n.code,{children:"primaryCalendarType"})," property and import one or more of the following modules:"]}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";'})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";'})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";'})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";'})}),"\n",(0,d.jsxs)(n.p,{children:["Or, you can use the global configuration and set the ",(0,d.jsx)(n.code,{children:"calendarType"})," key:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-html",children:'<script data-id="sap-ui-config" type="application/json">\n\t{\n\t\t"calendarType": "Japanese"\n\t}\n<\/script>\n'})}),"\n",(0,d.jsx)(n.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.code,{children:'import "@ui5/webcomponents/dist/Calendar.js";'})}),"\n",(0,d.jsx)(n.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,d.jsx)(a,{}),"\n",(0,d.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,d.jsx)(n.h3,{id:"selectionmode",children:"selectionMode"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Defines the type of selection used in the calendar component. Accepted property values are:",(0,d.jsx)("br",{}),"- ",(0,d.jsx)(n.code,{children:"CalendarSelectionMode.Single"})," - enables a single date selection.(default value)",(0,d.jsx)("br",{}),"- ",(0,d.jsx)(n.code,{children:"CalendarSelectionMode.Range"})," - enables selection of a date range.",(0,d.jsx)("br",{}),"- ",(0,d.jsx)(n.code,{children:"CalendarSelectionMode.Multiple"})," - enables selection of multiple dates."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:'"Single" | "Multiple" | "Range"'})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:'"Single"'})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"hideweeknumbers",children:"hideWeekNumbers"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Defines the visibility of the week numbers column.",(0,d.jsx)("br",{}),(0,d.jsx)(n.strong,{children:"Note:"})," For calendars other than Gregorian, the week numbers are not displayed regardless of what is set."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"boolean"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:"false"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"primarycalendartype",children:"primaryCalendarType"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Sets a calendar type used for display. If not set, the calendar type of the global configuration is used."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:'"Gregorian" | "Islamic" | "Japanese" | "Buddhist" | "Persian" | undefined'})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:"undefined"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"secondarycalendartype",children:"secondaryCalendarType"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Defines the secondary calendar type. If not set, the calendar will only show the primary calendar type."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:'"Gregorian" | "Islamic" | "Japanese" | "Buddhist" | "Persian" | undefined'})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:"undefined"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"1.0.0-rc.16"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"formatpattern",children:"formatPattern"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Determines the format, displayed in the input field."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string | undefined"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:"undefined"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"mindate",children:"minDate"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Determines the minimum date available for selection.",(0,d.jsx)("br",{}),(0,d.jsx)(n.strong,{children:"Note:"})," If the formatPattern property is not set, the minDate value must be provided in the ISO date format (YYYY-MM-dd)."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:'""'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"1.0.0-rc.6"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"maxdate",children:"maxDate"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Determines the maximum date available for selection.",(0,d.jsx)("br",{}),(0,d.jsx)(n.strong,{children:"Note:"})," If the formatPattern property is not set, the maxDate value must be provided in the ISO date format (YYYY-MM-dd)."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"string"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:'""'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"1.0.0-rc.6"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"calendarweeknumbering",children:"calendarWeekNumbering"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Defines how to calculate calendar weeks and first day of the week. If not set, the calendar will be displayed according to the currently set global configuration."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:'"Default" | "ISO_8601" | "MiddleEastern" | "WesternTraditional"'})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Default"}),(0,d.jsx)(n.td,{children:'"Default"'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"2.2.0"})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"slots",children:"Slots"}),"\n",(0,d.jsx)(n.h3,{id:"calendarlegend",children:"calendarLegend"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Defines the calendar legend of the component."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"Array<CalendarLegend>"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"1.23.0"})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"default",children:"default"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Defines the selected date or dates (depending on the ",(0,d.jsx)(n.code,{children:"selectionMode"})," property) for this calendar as instances of ",(0,d.jsx)(n.code,{children:"ui5-date"})," or ",(0,d.jsx)(n.code,{children:"ui5-date-range"}),". Use ",(0,d.jsx)(n.code,{children:"ui5-date"})," for single or multiple selection, and ",(0,d.jsx)(n.code,{children:"ui5-date-range"})," for range selection."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"Array<ICalendarSelectedDates>"})})]})]})]}),"\n",(0,d.jsx)(n.h3,{id:"specialdates",children:"specialDates"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsx)(n.td,{children:"Defines the special dates, visually emphasized in the calendar."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"Array<SpecialCalendarDate>"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Since"}),(0,d.jsx)(n.td,{children:"1.23.0"})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,d.jsx)(n.h3,{id:"selection-change",children:"selection-change"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Description"}),(0,d.jsxs)(n.td,{children:["Fired when the selected dates change.",(0,d.jsx)("br",{}),(0,d.jsx)(n.strong,{children:"Note:"})," If you call ",(0,d.jsx)(n.code,{children:"preventDefault()"})," for this event, the component will not create instances of ",(0,d.jsx)(n.code,{children:"ui5-date"})," for the newly selected dates. In that case you should do this manually."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Type"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"CustomEvent<CalendarSelectionChangeEventDetail>"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Parameters"}),(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.strong,{children:"selectedValues"}),": ",(0,d.jsx)(n.code,{children:"Array<string>"}),(0,d.jsx)("br",{}),"The selected dates",(0,d.jsx)("br",{}),(0,d.jsx)(n.strong,{children:"selectedDates"}),": ",(0,d.jsx)(n.code,{children:"Array<number>"}),(0,d.jsx)("br",{}),"The selected dates as UTC timestamps"]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Bubbles"}),(0,d.jsx)(n.td,{children:"Yes"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Cancelable"}),(0,d.jsxs)(n.td,{children:["Yes - via ",(0,d.jsx)("code",{children:"preventDefault()"})]})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,d.jsx)(n.p,{children:"No methods available for this component."}),"\n",(0,d.jsx)(n.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Name"}),(0,d.jsx)(n.th,{children:"Description"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"day-cell"}),(0,d.jsx)(n.td,{children:"Used to style the day cells."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"day-cell-selected"}),(0,d.jsx)(n.td,{children:"Used to style the day cells when selected."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"day-cell-selected-between"}),(0,d.jsx)(n.td,{children:"Used to style the day cells in between of selected dates in range."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"month-cell"}),(0,d.jsx)(n.td,{children:"Used to style the month cells."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"month-cell-selected"}),(0,d.jsx)(n.td,{children:"Used to style the month cells when selected."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"month-cell-selected-between"}),(0,d.jsx)(n.td,{children:"Used to style the day cells in between of selected months in range."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"year-cell"}),(0,d.jsx)(n.td,{children:"Used to style the year cells."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"year-cell-selected"}),(0,d.jsx)(n.td,{children:"Used to style the year cells when selected."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"year-cell-selected-between"}),(0,d.jsx)(n.td,{children:"Used to style the day cells in between of selected years in range."})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"more-samples",children:"More Samples"}),"\n",(0,d.jsx)(n.h3,{id:"selection-modes",children:"Selection Modes"}),"\n",(0,d.jsxs)(n.p,{children:["The Calendar supports ",(0,d.jsx)("b",{children:"Single"}),", ",(0,d.jsx)("b",{children:"Multiple"})," and ",(0,d.jsx)("b",{children:"Range"})," selection."]}),"\n",(0,d.jsx)(C,{}),"\n",(0,d.jsx)(n.h3,{id:"min-and-max-dates",children:"Min and Max Dates"}),"\n",(0,d.jsx)(n.p,{children:"Define min and max date boundaries to contrain user choice."}),"\n",(0,d.jsx)(p,{}),"\n",(0,d.jsx)(n.h3,{id:"calendar-types-1",children:"Calendar Types"}),"\n",(0,d.jsx)(n.p,{children:"Several calendars are supported: Gregorian, Islamic, Persian and Japanese."}),"\n",(0,d.jsx)(m,{}),"\n",(0,d.jsx)(n.h3,{id:"calendar-with-legend",children:"Calendar with Legend"}),"\n",(0,d.jsxs)(n.p,{children:["You can use the ",(0,d.jsx)(n.a,{href:"/ui5-webcomponents/components/CalendarLegend",children:"CalendarLegend"})," component in addition to the Calendar to highlight specific days.\nDiscover all the available ",(0,d.jsx)(R.A,{to:(0,U.A)("/components/CalendarLegend#calendarlegenditem-types"),children:"CalendarLegendItem Types"}),"."]}),"\n",(0,d.jsx)(b,{}),"\n",(0,d.jsx)(n.h3,{id:"timezones",children:"Timezones"}),"\n",(0,d.jsx)(n.p,{children:"You can set to the configuration the preferred time zone, such as: Asia/Tokyo, Pacific/Apia, Asia/Kolkata, Europe/Sofia and etc."}),"\n",(0,d.jsx)(E,{}),"\n",(0,d.jsx)(n.h3,{id:"calendarweeknumbering-1",children:"CalendarWeekNumbering"}),"\n",(0,d.jsx)(n.p,{children:"You can use the component, the preferred week numbering and first day of week."}),"\n",(0,d.jsx)(I,{})]})}function _(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(W,{...e})}):W(e)}},71184:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var d=t(14041);const s={},i=d.createContext(s);function r(e){const n=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),d.createElement(i.Provider,{value:n},e.children)}}}]);