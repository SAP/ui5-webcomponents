import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type Form from "@ui5/webcomponents/dist/Form.js";
import type { UI5StoryArgs } from "../../../types.js";
import type { StoryArgsSlots } from "./argTypes.js";


const FormMultipleGroupsTemplate: UI5StoryArgs<Form, StoryArgsSlots> = (args) => html`
<div id="container" style="width: 1250px"; max-width: 100%>

	<ui5-form header-text="Address" layout="${ifDefined(args.layout)}" label-span="${ifDefined(args.labelSpan)}">
		${unsafeHTML(args.default)}
	</ui5-form>

</div>
`;

const FormMultipleGroups = FormMultipleGroupsTemplate.bind({});
FormMultipleGroups.args = {
	labelSpan: "S12 M12 L12 XL12",
	layout: "S1 M2 L3 XL3",
	default: `
	<ui5-form-group header-text="Group1 (Text Fields)" column-span="2">

		<ui5-form-item>
			<ui5-label required for="nameInp1" slot="labelContent">Label:</ui5-label>
			<ui5-input id="nameInp1" value="Typed text"></ui5-input>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label required for="cityInp1" slot="labelContent">Label:</ui5-label>
			<div class="row-align-center">
				<ui5-input id="cityInp1" placeholder="Placeholder" style="flex-grow: 1; margin-inline-end: 0.25rem;"></ui5-input>
				<span class="text">UNIT</span>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="streetInp1" slot="labelContent">Label:</ui5-label>
			<ui5-textarea id="streetInp1" placeholder="Write your message here" show-exceeded-text  maxlength="10"></ui5-textarea>
		</ui5-form-item>
		
		<ui5-form-item>
			<ui5-label required for="cityInp2" slot="labelContent">Label:</ui5-label>
			<div class="row-align-center">
				<ui5-input id="cityInp2"  placeholder="Placeholder" style="flex-grow: 1; margin-inline-end: 0.25rem;"></ui5-input>
				<ui5-icon name="decline"></ui5-icon>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required slot="labelContent">Label:</ui5-label>
			<ui5-file-uploader placeholder="Choose a file">
				<ui5-button>Browse...</ui5-button>
			</ui5-file-uploader>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="durationInp" slot="labelContent">Duration:</ui5-label>
			<ui5-time-picker id="durationInp" format-pattern="hh:mm:ss" value="12:00:01"></ui5-time-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="cityInp3" slot="labelContent">Label:</ui5-label>
			<ui5-input id="cityInp3" placeholder="Placeholder"></ui5-input>
			<ui5-input placeholder="Placeholder"></ui5-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="mcb-grouping" slot="labelContent">Label:</ui5-label>
			<ui5-multi-input id="mcb-grouping" show-value-help-icon>
				<ui5-token slot="tokens" text="Amet"></ui5-token>
				<ui5-token slot="tokens" text="Incididunt"></ui5-token>
				<ui5-token slot="tokens" text="laboris"></ui5-token>
				<ui5-token slot="tokens" text="ea"></ui5-token>
				<ui5-token slot="tokens" text="eu"></ui5-token>
				<ui5-token slot="tokens" text="ipsum"></ui5-token>
				<ui5-token slot="tokens" text="do"></ui5-token>
				<ui5-token slot="tokens" text="esse"></ui5-token>
				<ui5-token slot="tokens" text="eu"></ui5-token>
				<ui5-token slot="tokens" text="amet"></ui5-token>
				<ui5-token slot="tokens" text="do"></ui5-token>
			</ui5-multi-input>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="stepInput1" slot="labelContent">Label:</ui5-label>
			<ui5-step-input id="stepInput1" value="50" style="width: 50%"></ui5-step-input>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group2 (Cb, Rb, Switch)">
		<ui5-form-item>
			<ui5-checkbox text="Here comes your checkbox text"></ui5-checkbox>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label for="rd1" required slot="labelContent">Label:</ui5-label>

			<div role="radiogroup" class="radioGroup">
				<ui5-radio-button id="rd1" text="With Text" name="test"></ui5-radio-button>
				<ui5-radio-button id="rd2" text="With Tex" name="test"></ui5-radio-button>
			</div>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required slot="labelContent">Label:</ui5-label>
			<ui5-switch checked></ui5-switch>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group3 (Select Fields)">
		<ui5-form-item>
			<ui5-label required for="countrySel1" slot="labelContent">Label:</ui5-label>
			<ui5-select id="countrySel1" accessible-name-ref="countryLbl">
				<ui5-option>Australia</ui5-option>
				<ui5-option selected>Germany</ui5-option>
				<ui5-option>England</ui5-option>
			</ui5-select>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="countrySel2" slot="labelContent">Label:</ui5-label>
			<ui5-select id="countrySel2" accessible-name-ref="countryLbl">
				<ui5-option>Australia</ui5-option>
				<ui5-option>Germany</ui5-option>
				<ui5-option selected>England</ui5-option>
			</ui5-select>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="mcb-grouping1" slot="labelContent">Label:</ui5-label>
			<ui5-multi-input id="mcb-grouping1" show-value-help-icon>
				<ui5-token slot="tokens" text="laboris"></ui5-token>
				<ui5-token slot="tokens" text="ipsum"></ui5-token>
				<ui5-token slot="tokens" text="esse"></ui5-token>
				<ui5-token slot="tokens" text="amet"></ui5-token>
			</ui5-multi-input>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group4 (Date & Time Fields)">
		<ui5-form-item>
			<ui5-label required for="dp1" slot="labelContent">Label:</ui5-label>
			<ui5-date-picker id="dp1"></ui5-date-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp1" slot="labelContent">Label:</ui5-label>
			<ui5-daterange-picker id="dtp1"></ui5-daterange-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp2" slot="labelContent">Label:</ui5-label>
			<ui5-datetime-picker id="dtp2"></ui5-datetime-picker>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label required for="dtp3" slot="labelContent">Label:</ui5-label>
			<ui5-time-picker id="dtp3"></ui5-time-picker>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group header-text="Group 5 (Example with Slider)">
		<ui5-form-item>
			<ui5-label for="rs" required slot="labelContent">Label:</ui5-label>
			<ui5-range-slider id="rs" start-value="40" end-value="60"></ui5-range-slider>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label  for="rs2" required slot="labelContent">Label:</ui5-label>
			<ui5-slider id="rs2" value="20"></ui5-slider>
		</ui5-form-item>
	</ui5-form-group>`
};

export { FormMultipleGroups };
