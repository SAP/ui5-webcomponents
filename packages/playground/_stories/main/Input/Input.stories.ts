import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Input from "@ui5/webcomponents/dist/Input.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import InputType from "@ui5/webcomponents/dist/types/InputType.js";

const component = "ui5-input";
let index = 0;

export default {
    title: "Main/Input",
    component,
    subcomponents: {
		SuggestionItem: 'ui5-suggestion-item',
		SuggestionGroupItem : 'ui5-suggestion-group-item'
	},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Input>;

const Template: UI5StoryArgs<Input, StoryArgsSlots> = (args) => html`
<ui5-input
	id="input-${++index}"
	?disabled="${ifDefined(args.disabled)}"
	placeholder="${ifDefined(args.placeholder)}"
	?readonly="${ifDefined(args.readonly)}"
	?required="${ifDefined(args.required)}"
	?no-typeahead="${ifDefined(args.noTypeahead)}"
	type="${ifDefined(args.type)}"
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	name="${ifDefined(args.name)}"
	?show-suggestions="${ifDefined(args.showSuggestions)}"
	maxlength="${ifDefined(args.maxlength)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	?show-clear-icon="${ifDefined(args.showClearIcon)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.valueStateMessage)}
</ui5-input>`;


export const BasicInput = Template.bind({});
BasicInput.args = {
	showClearIcon: true,
	value: "Input"
};
BasicInput.storyName = "Basic Input";

export const InputSuggestions = Template.bind({});
InputSuggestions.decorators = [
	(story) => {
		return html`
		${story()}
		<script>
			var value,
				li,
				input = document.getElementById("input-${index}"),
				ui5_database_entries = ["Argentina", "Albania", "Algeria", "Angola",
				"Austria",  "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
				"England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
				"Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
				"Spain", "Sweden", "Sri Lanka", "Senegal", "United Kingdom", "USA" ];
			input.addEventListener("input", function(event) {
				value = input.value,
				 	suggestionItems = [];
				if (value) {
					suggestionItems = ui5_database_entries.filter(function (item) {
						return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
					});
				}
				[].slice.call(input.children).forEach(function(child) {
					input.removeChild(child);
				});
				suggestionItems.forEach(function(item) {
					li = document.createElement("ui5-suggestion-item");
					li.icon = "world";
					li.additionalText = "explore";
					li.additionalTextState = "Success";
					li.description = "travel the world";
					li.text = item;
					input.appendChild(li);
				});
			});
		</script>`;
	}
]
InputSuggestions.args = {
	placeholder: "Start typing country name",
	showSuggestions: true,
	showClearIcon: true
};
InputSuggestions.storyName = "Input With Suggestions (note: the usage depends on the framework you are using)";


export const InputValueState = Template.bind({});
InputValueState.args = {
	value: "Error",
	valueState: ValueState.Error,
};

InputValueState.storyName = "Input with Value State";

export const InputSuggestionsValueStateMessage = Template.bind({});
InputSuggestionsValueStateMessage.args = {
	default: '<ui5-li>Cozy</ui5-li><ui5-li>Compact</ui5-li><ui5-li>Condensed</ui5-li>',
	placeholder: "Choose content density",
	showSuggestions: true,
	valueState: ValueState.Error,
	valueStateMessage: '<div slot="valueStateMessage">This is an error message. Extra long text used as an error message.</div>'
};
InputSuggestionsValueStateMessage.storyName = "Input with Suggestions and Value State Message";

export const InputSearchField = Template.bind({});
InputSearchField.args = {
	placeholder: "Enter search criteria ...",
	icon:'<ui5-icon id="searchIcon" slot="icon" name="search"></ui5-icon>'
};
InputSearchField.decorators = [
	(story) => {
		return html`
		${story()}
		<script>
			var searchCriteria = document.getElementById("searchIcon"),
				searchInput = document.getElementById("input-${index}"),
				searchCriteria = "PASTA";
			searchIcon.addEventListener("click", function(){
				alert("Look for: " + searchCriteria);
			});
			searchInput.addEventListener("change", function(e){
				searchCriteria = e.target.value;
			});
		</script>`;
	}
]
InputSearchField.storyName = "Input as Search Field";

export const InputLabel = Template.bind({});
InputLabel.decorators = [
	(story) => {
		return html`
			<ui5-label class="samples-big-margin-right" for="input-${index}" required="" show-colon="">Secret Code</ui5-label>
			${story()}
		`;
	}
]
InputLabel.args = {
	type: InputType.Password,
	valueState: ValueState.Error,
	placeholder: "Enter your Secret Code",
	required: true
};
InputLabel.storyName = "Input with Label";

export const InputWithVHD: StoryFn = () => html`
	<ui5-input id="valueHelpInput" placeholder="Enter product" show-suggestions="">
		<ui5-icon id="valueHelpIcon" slot="icon" name="value-help"></ui5-icon>
	</ui5-input>
	<ui5-dialog id="dialog" accessible-name="Products Value Help">
		<div slot="header" id="dialogHeader" style="width: 100%; padding: 0 1rem 0.5rem 1rem;">
			<div id="titleBar" style="
				display: flex;
				justify-content: space-between;
				align-items: center;">
				<h2 id="headerTitle" style="
					margin-top: 1em !important;
					font-size: 1rem;
					font-weight: 500;
				">Products</h2>
				<ui5-button design="Transparent" id="clearButton">Clear</ui5-button>
			</div>
			<ui5-input id="dialogSearchInput" placeholder="Search">
				<ui5-icon id="dialogSearchIcon" slot="icon" name="search"></ui5-icon>
			</ui5-input>
		</div>
		<ui5-list id="itemsList" no-data-text="No data"></ui5-list>
		<div slot="footer" id="footer">
			<ui5-button design="Transparent" id="cancelButton">Cancel</ui5-button>
		</div>
	</ui5-dialog>
	<script>
		valueHelpInput.addEventListener("input", loadSuggestions);
		valueHelpIcon.addEventListener("click", showDialog);
		dialogSearchInput.addEventListener("change", loadList);
		dialogSearchIcon.addEventListener("click", loadList);
		clearButton.addEventListener("click", clearQuery);
		cancelButton.addEventListener("click", closeDialog);
		itemsList.addEventListener("item-click", handleItemClick);
		async function loadSuggestions() {
			var li,
				response = await fetch("../assets/data/products.json"),
				products = await response.json();
				query = valueHelpInput.value.toLowerCase();
				suggestionItems = [];
			if (query) {
				suggestionItems = products
					.filter(function (product) {
						return product.name.toLowerCase().indexOf(query) === 0;
					})
					.map(function (product) {
						return product.name;
					})
					.sort(function (a, b) {
						return a.localeCompare(b);
					})
					.slice(0, 10);
			}
			[].slice.call(valueHelpInput.children, 1).forEach(function (item) {
				valueHelpInput.removeChild(item);
			});
			suggestionItems.forEach(function (item) {
				li = document.createElement("ui5-suggestion-item");
				li.text = item;
				valueHelpInput.appendChild(li);
			});
		}
		function showDialog() {
			dialogSearchInput.value = valueHelpInput.value;
			loadList();
			if (screen.width <= 768) {
				dialog.setAttribute("stretch", "");
			}
			dialog.show();
			// Required by UX as the VH dialog's popup content has no padding in UI5.
			dialog.shadowRoot.querySelector(".ui5-popup-content").style.padding = 0;
			dialog.shadowRoot.querySelector(".ui5-popup-content").style.height = "100vw";
		}
		function closeDialog() {
			dialog.close();
		}
		async function loadList() {
			var li,
				response = await fetch("../assets/data/products.json"),
				products = await response.json(),
				query = dialogSearchInput.value.toLowerCase();
			itemsList.innerHTML = "";
			products
				.filter(function (product) {
					return product.name.toLowerCase().indexOf(query) === 0;
				})
				.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				})
				.forEach(function (item) {
					li = document.createElement("ui5-li");
					li.innerHTML = item.name;
					li.image = item.productPicUrl;
					li.description = item.productId;
					itemsList.appendChild(li);
				});
		}
		function handleItemClick(event) {
			var item = event.detail.item;
			valueHelpInput.setAttribute("value", item.innerHTML);
			dialog.close();
		}
		function clearQuery() {
			dialogSearchInput.setAttribute("value", "");
			loadList();
		}
	</script>
`;
InputWithVHD.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};
InputWithVHD.storyName = "Input With Value Help Dialog";