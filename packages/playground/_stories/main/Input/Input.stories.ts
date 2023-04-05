import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Input from "@ui5/webcomponents/dist/Input.js";

const component = "ui5-input";

export default {
    title: "Main/Input",
    component,
    subcomponents: {'SuggestionItem' : 'ui5-suggestion-item', 'SuggestionGroupItem' : 'ui5-suggestion-group-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Input>;

const Template: UI5StoryArgs<Input, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Input</h3>
	<div class="snippet">
		<ui5-input class="samples-margin samples-responsive-margin-bottom" show-clear-icon="" value="Input"></ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" readonly="" value="readonly Input"></ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" disabled="" value="Disabled Input"></ui5-input>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Input With Suggestions (note: the usage depends on the framework you are using)</h3>
	<div class="snippet">
		<ui5-input id="suggestions-input" placeholder="Start typing country name" show-suggestions="" show-clear-icon=""></ui5-input>
		<script>
			var input = document.getElementById("suggestions-input");
			var ui5_database_entries = ["Argentina", "Albania", "Algeria", "Angola", "Austria",  "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
	"England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait", "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal", "Spain", "Sweden", "Sri Lanka", "Senegal", "United Kingdom", "USA" ];
			input.addEventListener("input", function(event) {
				var value = input.value;
				var suggestionItems = [];
				if (value) {
					suggestionItems = ui5_database_entries.filter(function (item) {
						return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
					});
				}
				[].slice.call(input.children).forEach(function(child) {
					input.removeChild(child);
				});
				suggestionItems.forEach(function(item) {
					var li = document.createElement("ui5-suggestion-item");
					li.icon = "world";
					li.additionalText = "explore";
					li.additionalTextState = "Success";
					li.description = "travel the world";
					li.text = item;
					input.appendChild(li);
				});
			});
		</script>
	</div>
`;
Template1.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template2: StoryFn = () => html`
<h3>Input with Value State</h3>
	<div class="snippet">
		<ui5-input class="samples-margin samples-responsive-margin-bottom" value="Success" value-state="Success"></ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" value="Warning" value-state="Warning"></ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" value="Error" value-state="Error"></ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" value="Information" value-state="Information"></ui5-input>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Input with Suggestions and Value State message</h3>
	<div class="snippet">
		<ui5-input class="samples-margin samples-responsive-margin-bottom" id="value-state-suggestions" placeholder="Start typing country name" show-suggestions="" value-state="Warning">
		</ui5-input>
		<ui5-input class="samples-margin samples-responsive-margin-bottom" placeholder="Choose content density" show-suggestions="" value-state="Error">
			<div slot="valueStateMessage">This is an error message. Extra long text used as an error message.</div>
			<ui5-li>Cozy</ui5-li>
			<ui5-li>Compact</ui5-li>
			<ui5-li>Condensed</ui5-li>
		</ui5-input>
		<script>
			var ui5_database_entries =  ["Argentina", "Albania", "Algeria", "Angola", "Austria",  "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
"England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait", "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal", "Spain", "Sweden", "Sri Lanka", "Senegal", "United Kingdom", "USA" ];
			var oInput = document.getElementById("value-state-suggestions");
			oInput.addEventListener("input", function(event) {
				var value = event.target.value;
				var suggestionItems = [];
				if (value) {
					suggestionItems = ui5_database_entries.filter(function (item) {
						return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
					});
				}
				[].slice.call(oInput.children).forEach(function(child) {
					oInput.removeChild(child);
				});
				suggestionItems.forEach(function(item) {
					var li = document.createElement("ui5-suggestion-item");
					li.icon = "world";
					li.id = item;
					li.text = item;
					oInput.appendChild(li);
				});
			});
		</script>
	</div>
<section>
	<h3>Input as Search Field</h3>
	<div class="snippet">
		<div class="flex-column samples-margin">
			<ui5-input id="searchInput" placeholder="Enter search criteria ..." style="width: 100%">
				<ui5-icon id="searchIcon" slot="icon" name="search"></ui5-icon>
			</ui5-input>
		</div>
	</div>
</section>
<section>
	<h3>Input with Label</h3>
	<div class="snippet">
		<div class="flex-column samples-margin">
			<ui5-label class="samples-big-margin-right" for="myInput" required="" show-colon="">Name</ui5-label>
			<ui5-input id="myInput" placeholder="Enter your Name" required=""></ui5-input>
		</div>
		<div class="flex-column">
			<ui5-label class="samples-big-margin-right" for="myPassword" required="" show-colon="">Secret Code</ui5-label>
			<ui5-input id="myPassword" type="Password" value-state="Error" placeholder="Enter your Secret Code" required=""></ui5-input>
		</div>
	</div>
</section>
<script>
	var searchCriteria = "PASTA";
	searchIcon.addEventListener("click", function(){
		alert("Look for: " + searchCriteria);
	});
	searchInput.addEventListener("input", function(e){
		searchCriteria = e.target.value;
	});
</script>
<section>
	<h3>Input With Value Help Dialog</h3>
	<div class="snippet">
		<ui5-input id="valueHelpInput" placeholder="Enter product" show-suggestions="">
			<ui5-icon id="valueHelpIcon" slot="icon" name="value-help"></ui5-icon>
		</ui5-input>
		<ui5-dialog id="dialog" accessible-name="Products Value Help">
			<div slot="header" id="dialogHeader">
				<div id="titleBar">
					<h2 id="headerTitle">Products</h2>
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
				var response = await fetch("../assets/data/products.json");
				var products = await response.json();
				var query = valueHelpInput.value.toLowerCase();
				var suggestionItems = [];
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
					var li = document.createElement("ui5-suggestion-item");
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
				var response = await fetch("../assets/data/products.json");
				var products = await response.json();
				var query = dialogSearchInput.value.toLowerCase();
				itemsList.innerHTML = "";
				products
					.filter(function (product) {
						return product.name.toLowerCase().indexOf(query) === 0;
					})
					.sort(function (a, b) {
						return a.name.localeCompare(b.name);
					})
					.forEach(function (item) {
						var li = document.createElement("ui5-li");
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
	</div>
</section>
<!-- JSDoc marker -->
`;
Template3.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template4: StoryFn = () => html`
<h3>Input as Search Field</h3>
	<div class="snippet">
		<div class="flex-column samples-margin">
			<ui5-input id="searchInput" placeholder="Enter search criteria ..." style="width: 100%">
				<ui5-icon id="searchIcon" slot="icon" name="search"></ui5-icon>
			</ui5-input>
		</div>
	</div>
`;


export const Template5: StoryFn = () => html`
<h3>Input with Label</h3>
	<div class="snippet">
		<div class="flex-column samples-margin">
			<ui5-label class="samples-big-margin-right" for="myInput" required="" show-colon="">Name</ui5-label>
			<ui5-input id="myInput" placeholder="Enter your Name" required=""></ui5-input>
		</div>
		<div class="flex-column">
			<ui5-label class="samples-big-margin-right" for="myPassword" required="" show-colon="">Secret Code</ui5-label>
			<ui5-input id="myPassword" type="Password" value-state="Error" placeholder="Enter your Secret Code" required=""></ui5-input>
		</div>
	</div>
`;


export const Template6: StoryFn = () => html`
<h3>Input With Value Help Dialog</h3>
	<div class="snippet">
		<ui5-input id="valueHelpInput" placeholder="Enter product" show-suggestions="">
			<ui5-icon id="valueHelpIcon" slot="icon" name="value-help"></ui5-icon>
		</ui5-input>
		<ui5-dialog id="dialog" accessible-name="Products Value Help">
			<div slot="header" id="dialogHeader">
				<div id="titleBar">
					<h2 id="headerTitle">Products</h2>
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
				var response = await fetch("../assets/data/products.json");
				var products = await response.json();
				var query = valueHelpInput.value.toLowerCase();
				var suggestionItems = [];
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
					var li = document.createElement("ui5-suggestion-item");
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
				var response = await fetch("../assets/data/products.json");
				var products = await response.json();
				var query = dialogSearchInput.value.toLowerCase();
				itemsList.innerHTML = "";
				products
					.filter(function (product) {
						return product.name.toLowerCase().indexOf(query) === 0;
					})
					.sort(function (a, b) {
						return a.name.localeCompare(b.name);
					})
					.forEach(function (item) {
						var li = document.createElement("ui5-li");
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
	</div>
`;
Template6.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};