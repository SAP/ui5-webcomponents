import{x as l}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as c}from"./unsafe-html-0ddd83da.js";const p={default:{control:{type:"text"},table:{type:{summary:"Array<CalendarLegendItem>"}}}},S={package:"@ui5/webcomponents",since:"1.23.0",tagName:"ui5-calendar-legend"};var n=Object.freeze,u=Object.defineProperty,y=(e,o)=>n(u(e,"raw",{value:n(o||e.slice())})),i;const g={title:"Main/Calendar Legend",component:"CalendarLegend",argTypes:p},m=e=>l`
        <ui5-calendar-legend
            ?hide-today="${t(e.hideToday)}"
            ?hide-selected-day="${t(e.hideSelectedDay)}"
            ?hide-non-working-day="${t(e.hideNonWorkingDay)}"
            ?hide-working-day="${t(e.hideWorkingDay)}"
            slot="calendarLegend"
        >
            ${c(e.default)}
        </ui5-calendar-legend>
`,a=m.bind({});a.decorators=[e=>l(i||(i=y([`
<ui5-calendar>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	`,`
</ui5-calendar>

<script>
	// Function that maps special dates to the current month
	function updateSpecialDates() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const specialDates = document.querySelectorAll("ui5-special-date");
		const types = ["Type05", "Type07", "Type13"];
		const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
		let assignedDays = new Set();

		function generateUniqueRandomDay() {
			let randomDay;
			do {
				randomDay = Math.floor(Math.random() * daysInMonth) + 1;
			} while (assignedDays.has(randomDay));
			assignedDays.add(randomDay);
			return randomDay.toString().padStart(2, "0");
		}

		specialDates.forEach((specDate, index) => {
			specDate.setAttribute("value", year + "-" + formattedMonth + "-" + generateUniqueRandomDay());
			specDate.setAttribute("type", types[index % types.length]);
		});
	}

	updateSpecialDates();
<\/script>
		`])),e())];a.args={default:`
            <ui5-calendar-legend-item type="Type05" text="Holiday"></ui5-calendar-legend-item>
            <ui5-calendar-legend-item type="Type07" text="School Vacation"></ui5-calendar-legend-item>
            <ui5-calendar-legend-item type="Type13" text="Wedding"></ui5-calendar-legend-item>
    `};var d,r,s;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`args => html\`
        <ui5-calendar-legend
            ?hide-today="\${ifDefined(args.hideToday)}"
            ?hide-selected-day="\${ifDefined(args.hideSelectedDay)}"
            ?hide-non-working-day="\${ifDefined(args.hideNonWorkingDay)}"
            ?hide-working-day="\${ifDefined(args.hideWorkingDay)}"
            slot="calendarLegend"
        >
            \${unsafeHTML(args.default)}
        </ui5-calendar-legend>
\``,...(s=(r=a.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const D=["Basic"],_=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,__namedExportsOrder:D,default:g},Symbol.toStringTag,{value:"Module"}));export{_ as C,S as c};
