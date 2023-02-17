import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-date-picker";
export default {
    title: "Main/DatePicker",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic DatePicker</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker id="myDatepicker1"></ui5-date-picker>
		</div>
	</div>
`;
export const Template1 = () => html `
<h3>DatePicker with Placeholder, Tooltip, Events, ValueState and valueStateMessage</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker id="myDatepicker2" placeholder="Delivery Date...">
				<div slot="valueStateMessage">The value is not valid. Please provide valid value</div>
			</ui5-date-picker>
		</div>
	</div>
`;
export const Template2 = () => html `
<h3>DatePicker with Minimum and Maximum Date - 1/1/2020 - 4/5/2020 format-pattern="dd/MM/yyyy"</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker id="myDatepicker12" min-date="1/1/2020" max-date="4/5/2020" format-pattern="dd/MM/yyyy"></ui5-date-picker>
		</div>
	</div>
`;
export const Template3 = () => html `
<h3>DatePicker with shortcuts: type "today" or "yesterday" and press "Enter"</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker></ui5-date-picker>
		</div>
	</div>
`;
export const Template4 = () => html `
<h3>DatePicker with format-pattern='short'</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker format-pattern="short"></ui5-date-picker>
			</div>
		</div>
`;
export const Template5 = () => html `
<h3>DatePicker with format-pattern='long'</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker format-pattern="long"></ui5-date-picker>
			</div>
		</div>
`;
export const Template6 = () => html `
<h3>DatePicker with format-pattern='QQQ yyyy, MMM dd', value='Q4 2018, Feb 14'</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker format-pattern="QQQ yyyy, MMM dd" value="Q4 2018, Feb 14"></ui5-date-picker>
		</div>
	</div>
`;
export const Template7 = () => html `
<h3>DatePicker with format-pattern='EEE, M/d/yyyy'</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker format-pattern="EEE, M/d/yyyy"></ui5-date-picker>
			</div>
		</div>
`;
export const Template8 = () => html `
<h3>Disabled DatePicker</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker disabled="" value="8 September 2021"></ui5-date-picker>
			</div>
		</div>
`;
export const Template9 = () => html `
<h3>readonly DatePicker</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker readonly="" value="8 September 2021"></ui5-date-picker>
			</div>
		</div>
`;
export const Template10 = () => html `
<h3>DatePicker with Japanese Calendar Type</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker primary-calendar-type="Japanese"></ui5-date-picker>
			</div>
		</div>
`;
export const Template11 = () => html `
<h3>DatePicker with Islamic Calendar Type</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker primary-calendar-type="Islamic"></ui5-date-picker>
			</div>
		</div>
`;
export const Template12 = () => html `
<h3>DatePicker with Buddhist Calendar Type</h3>
		<div class="snippet">
			<div class="datepicker-width">
				<ui5-date-picker primary-calendar-type="Buddhist"></ui5-date-picker>
			</div>
		</div>
`;
export const Template13 = () => html `
<h3>DatePicker with Persian Calendar Type</h3>
    <div class="snippet">
        <div class="datepicker-width">
            <ui5-date-picker primary-calendar-type="Persian"></ui5-date-picker>
        </div>
    </div>
`;
export const Template14 = () => html `
<h3>DatePicker with primary and secondary calendar type</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-date-picker primary-calendar-type="Islamic" secondary-calendar-type="Gregorian"></ui5-date-picker>
		</div>
	</div>
`;
//# sourceMappingURL=DatePicker.stories.js.map