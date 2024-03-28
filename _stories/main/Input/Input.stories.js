import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import InputType from "@ui5/webcomponents/dist/types/InputType.js";
let index = 0;
export default {
    title: "Main/Input",
    component: "Input",
    argTypes,
};
const Template = (args) => html `
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
	${unsafeHTML(args.valueStateMessage)}
	${unsafeHTML(args.default)}
	${unsafeHTML(args.icon)}
</ui5-input>`;
export const Basic = Template.bind({});
Basic.args = {
    value: "Input"
};
export const Suggestions = Template.bind({});
Suggestions.decorators = [
    (story) => {
        return html `
		${story()}
<script>
	const input${index} = document.getElementById("input-${index}");
	input${index}.addEventListener("input", () => {
		const value = input${index}.value;
		let suggestionItems = [];
		const ui5_database_entries = ["Argentina", "Albania", "Algeria", "Angola",
		"Austria",  "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
		"England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
		"Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
		"Spain", "Sweden", "Sri Lanka", "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", "USA" ];

		if (value) {
			suggestionItems = ui5_database_entries.filter((item) => {
				return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
			});
		}
		Array.from(input${index}.children).forEach((child) => {
			input${index}.removeChild(child);
		});
		suggestionItems.forEach((item) => {
			const li = document.createElement("ui5-suggestion-item");
			li.text = item;
			input${index}.appendChild(li);
		});
	});
</script>`;
    }
];
Suggestions.args = {
    placeholder: "Start typing country name",
    showSuggestions: true,
    showClearIcon: true
};
export const SuggestionsWrapping = Template.bind({});
SuggestionsWrapping.args = {
    default: `<ui5-suggestion-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-suggestion-item>
	<ui5-suggestion-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-suggestion-item>
	<ui5-suggestion-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-suggestion-item>`,
    placeholder: "Enter product",
    showSuggestions: true,
};
export const ValueStateMessage = Template.bind({});
ValueStateMessage.args = {
    default: `
	<ui5-li>Cozy</ui5-li>
	<ui5-li>Compact</ui5-li>
	<ui5-li>Condensed</ui5-li>`,
    placeholder: "Choose content density",
    showSuggestions: true,
    valueState: ValueState.Error,
    valueStateMessage: '<div slot="valueStateMessage">This is an error message. Extra long text used as an error message.</div>'
};
export const Label = Template.bind({});
Label.decorators = [
    (story) => {
        return html `
			<ui5-label class="samples-big-margin-right" for="input-${index + 1}" required="" show-colon="">Secret Code</ui5-label>
			${story()}
		`;
    }
];
Label.args = {
    type: InputType.Password,
    placeholder: "Enter your Secret Code",
    required: true
};
export const ValueHelpDialog = () => html `
<ui5-input id="valueHelpInput" placeholder="Enter product" show-suggestions="">
	<ui5-icon id="valueHelpIcon" slot="icon" name="value-help"></ui5-icon>
</ui5-input>
<ui5-dialog id="dialog" accessible-name="Products Value Help">
	<div slot="header" id="dialogHeader" style="width: 100%; padding: 0 1rem 0.5rem 1rem;">
		<div id="titleBar" style="display: flex; justify-content: space-between; align-items: center;">
			<h2 id="headerTitle" style="
				margin-top: 1em !important; font-size: 1rem; font-weight: 500;">
				Products
			</h2>
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
	const valueHelpInput${index} = document.getElementById("valueHelpInput");
	const valueHelpIcon${index} = document.getElementById("valueHelpIcon");
	const dialog${index} = document.getElementById("dialog");
	const dialogSearchInput${index} = document.getElementById("dialogSearchInput");
	const dialogSearchIcon${index} = document.getElementById("dialogSearchIcon");
	const clearButton${index} = document.getElementById("clearButton");
	const cancelButton${index} = document.getElementById("cancelButton");
	const itemsList${index} = document.getElementById("itemsList");

	const loadSuggestions = async () => {
		const response = await fetch("../assets/data/products.json");
		const products = await response.json();
		const query = valueHelpInput${index}.value.toLowerCase();

		if (query) {
			suggestionItems = products
				.filter((product) => {
					return product.name.toLowerCase().indexOf(query) === 0;
				})
				.map((product) => {
					return product.name;
				})
				.sort((a, b) => {
					return a.localeCompare(b);
				})
				.slice(0, 10);
		}
		[].slice.call(valueHelpInput${index}.children, 1).forEach((item) => {
			valueHelpInput${index}.removeChild(item);
		});
		suggestionItems.forEach((item) => {
			const li = document.createElement("ui5-suggestion-item");
			li.text = item;
			valueHelpInput${index}.appendChild(li);
		});
	}
	const showDialog = () => {
		dialogSearchInput${index}.value = valueHelpInput${index}.value;
		loadList();
		if (screen.width <= 768) {
			dialog${index}.setAttribute("stretch", "");
		}
		dialog${index}.show();
		// Required by UX as the VH dialog's popup content has no padding in UI5.
		dialog${index}.shadowRoot.querySelector(".ui5-popup-content").style.padding = 0;
		dialog${index}.shadowRoot.querySelector(".ui5-popup-content").style.height = "100vw";
	}
	const closeDialog = () => {
		dialog${index}.close();
	}
	const loadList = async () => {
		const response = await fetch("../assets/data/products.json");
		const products = await response.json();
		const query = dialogSearchInput${index}.value.toLowerCase();

		itemsList${index}.innerHTML = "";
		products
			.filter((product) => {
				return product.name.toLowerCase().indexOf(query) === 0;
			})
			.sort((a, b) => {
				return a.name.localeCompare(b.name);
			})
			.forEach((item) => {
				const li = document.createElement("ui5-li");
				li.innerHTML = item.name;
				li.image = item.productPicUrl;
				li.description = item.productId;
				itemsList${index}.appendChild(li);
			});
	}
	const handleItemClick = event => {
		const item = event.detail.item;
		valueHelpInput${index}.setAttribute("value", item.innerHTML);
		dialog${index}.close();
	}
	const clearQuery = () => {
		dialogSearchInput${index}.setAttribute("value", "");
		loadList();
	}

	valueHelpInput${index}.addEventListener("input", loadSuggestions);
	valueHelpIcon${index}.addEventListener("click", showDialog);
	dialogSearchInput${index}.addEventListener("change", loadList);
	dialogSearchIcon${index}.addEventListener("click", loadList);
	clearButton${index}.addEventListener("click", clearQuery);
	cancelButton${index}.addEventListener("click", closeDialog);
	itemsList${index}.addEventListener("item-click", handleItemClick);
</script>
`;
ValueHelpDialog.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
            iframeHeight: "500px",
        },
    }
};
//# sourceMappingURL=Input.stories.js.map