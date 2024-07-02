import{x as b}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as M}from"./unsafe-html-0ddd83da.js";import{C as d}from"./CalendarType-4d682252.js";const v={selectionMode:{control:"select",options:["Single","Multiple","Range"]},primaryCalendarType:{control:"select",options:["Gregorian","Islamic","Japanese","Buddhist","Persian"]},secondaryCalendarType:{control:"select",options:["Gregorian","Islamic","Japanese","Buddhist","Persian"]},calendarLegend:{control:{type:"text"},table:{type:{summary:"Array<CalendarLegend>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<CalendarDate>"}}},specialDates:{control:{type:"text"},table:{type:{summary:"Array<SpecialCalendarDate>"}}},"selected-dates-change":{description:"Fired when the selected dates change.\n\n**Note:** If you call `preventDefault()` for this event, the component will not\ncreate instances of `ui5-date` for the newly selected dates. In that case you should do this manually.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array<string>"},name:"values",_ui5privacy:"public",description:"The selected dates"},{type:{text:"Array<number>"},name:"dates",_ui5privacy:"public",description:"The selected dates as UTC timestamps"}]}}},A={package:"@ui5/webcomponents",since:"1.0.0-rc.11",tagName:"ui5-calendar"};var l=Object.freeze,S=Object.defineProperty,_=(e,x)=>l(S(e,"raw",{value:l(x||e.slice())})),o;const w={title:"Main/Calendar",component:"Calendar",argTypes:v},i=e=>b`<ui5-calendar
    selection-mode="${t(e.selectionMode)}"
    ?hide-week-numbers="${t(e.hideWeekNumbers)}"
    primary-calendar-type="${t(e.primaryCalendarType)}"
    secondary-calendar-type="${t(e.secondaryCalendarType)}"
    format-pattern="${t(e.formatPattern)}"
    min-date="${t(e.minDate)}"
    max-date="${t(e.maxDate)}"
>
    ${M(e.default)}
</ui5-calendar>`,s=i.bind({}),n=i.bind({});n.storyName="Formatted Date Range";n.args={minDate:"7/10/2020",maxDate:"20/10/2020",formatPattern:"dd/MM/yyyy"};const r=i.bind({});r.storyName="Primary and Secondary Calendar Types";r.args={primaryCalendarType:d.Japanese,secondaryCalendarType:d.Islamic};const a=i.bind({});a.storyName="Calendar with Calendar Legend";a.args={default:`
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>

<ui5-calendar-legend
    slot="calendarLegend"
    id="calendarLegend"
    hide-today
    hide-selected-day
>
    <ui5-calendar-legend-item type="Type05" text="Holiday"></ui5-calendar-legend-item>
    <ui5-calendar-legend-item type="Type07" text="School Vacation"></ui5-calendar-legend-item>
    <ui5-calendar-legend-item type="Type13" text="Wedding"></ui5-calendar-legend-item>
</ui5-calendar-legend>
    `};a.decorators=[e=>b(o||(o=_([`
	`,`
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
`])),e())];var c,p,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:'args => html`<ui5-calendar\n    selection-mode="${ifDefined(args.selectionMode)}"\n    ?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"\n    primary-calendar-type="${ifDefined(args.primaryCalendarType)}"\n    secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"\n    format-pattern="${ifDefined(args.formatPattern)}"\n    min-date="${ifDefined(args.minDate)}"\n    max-date="${ifDefined(args.maxDate)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-calendar>`',...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var y,u,f;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:'args => html`<ui5-calendar\n    selection-mode="${ifDefined(args.selectionMode)}"\n    ?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"\n    primary-calendar-type="${ifDefined(args.primaryCalendarType)}"\n    secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"\n    format-pattern="${ifDefined(args.formatPattern)}"\n    min-date="${ifDefined(args.minDate)}"\n    max-date="${ifDefined(args.maxDate)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-calendar>`',...(f=(u=n.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,D,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:'args => html`<ui5-calendar\n    selection-mode="${ifDefined(args.selectionMode)}"\n    ?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"\n    primary-calendar-type="${ifDefined(args.primaryCalendarType)}"\n    secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"\n    format-pattern="${ifDefined(args.formatPattern)}"\n    min-date="${ifDefined(args.minDate)}"\n    max-date="${ifDefined(args.maxDate)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-calendar>`',...(h=(D=r.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var $,T,C;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:'args => html`<ui5-calendar\n    selection-mode="${ifDefined(args.selectionMode)}"\n    ?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"\n    primary-calendar-type="${ifDefined(args.primaryCalendarType)}"\n    secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"\n    format-pattern="${ifDefined(args.formatPattern)}"\n    min-date="${ifDefined(args.minDate)}"\n    max-date="${ifDefined(args.maxDate)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-calendar>`',...(C=(T=a.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};const P=["Basic","Bounds","CalendarTypes","CalendarWithLegend"],W=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,Bounds:n,CalendarTypes:r,CalendarWithLegend:a,__namedExportsOrder:P,default:w},Symbol.toStringTag,{value:"Module"}));export{W as C,A as c};
