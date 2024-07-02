import{x as p}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";const d={type:{control:"select",options:["None","Working","NonWorking","Type01","Type02","Type03","Type04","Type05","Type06","Type07","Type08","Type09","Type10","Type11","Type12","Type13","Type14","Type15","Type16","Type17","Type18","Type19","Type20"]}},T={package:"@ui5/webcomponents",since:"1.23.0",tagName:"ui5-calendar-legend-item",showDefaultStoryOnly:!0};var a=Object.freeze,s=Object.defineProperty,y=(e,i)=>a(s(e,"raw",{value:a(i||e.slice())})),r;const u={title:"Main/Calendar Legend/Calendar Legend Item",component:"CalendarLegendItem",argTypes:d},m=e=>p(r||(r=y([`
<ui5-calendar id="calendar1">
	<ui5-special-date slot="specialDates" value="" type="`,`"></ui5-special-date>

	<ui5-calendar-legend
		slot="calendarLegend"
		id="calendarLegend"
	>
		<ui5-calendar-legend-item type="`,'" text="',`"></ui5-calendar-legend-item>
	</ui5-calendar-legend>
</ui5-calendar>
<script>
	function updateCurrentDaySpecialType() {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();

		const formattedMonth = month < 10 ? "0" + month : month.toString();
		const formattedDay = day < 10 ? "0" + day : day.toString();
		const newValue = year + "-" + formattedMonth + "-" + formattedDay;

		const specialDates = document.querySelectorAll("ui5-special-date");
		specialDates.forEach(specialDate => {
			specialDate.setAttribute("value", newValue);
			specialDate.setAttribute("type", "`,`")
		});
	}
	updateCurrentDaySpecialType();
<\/script>
`])),n(e.type),n(e.type),n(e.text),n(e.type)),t=m.bind({});t.tags=["_hidden_"];t.args={type:"Type01",text:"Placeholder 01"};var c,o,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => html\`
<ui5-calendar id="calendar1">
    <ui5-special-date slot="specialDates" value="" type="\${ifDefined(args.type)}"></ui5-special-date>

    <ui5-calendar-legend
        slot="calendarLegend"
        id="calendarLegend"
    >
        <ui5-calendar-legend-item type="\${ifDefined(args.type)}" text="\${ifDefined(args.text)}"></ui5-calendar-legend-item>
    </ui5-calendar-legend>
</ui5-calendar>
<script>
    function updateCurrentDaySpecialType() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const formattedMonth = month < 10 ? "0" + month : month.toString();
        const formattedDay = day < 10 ? "0" + day : day.toString();
        const newValue = year + "-" + formattedMonth + "-" + formattedDay;

        const specialDates = document.querySelectorAll("ui5-special-date");
        specialDates.forEach(specialDate => {
            specialDate.setAttribute("value", newValue);
            specialDate.setAttribute("type", "\${ifDefined(args.type)}")
        });
    }
    updateCurrentDaySpecialType();
<\/script>
\``,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const g=["Basic"],h=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:g,default:u},Symbol.toStringTag,{value:"Module"}));export{h as C,T as c};
