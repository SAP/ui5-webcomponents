import { html } from "lit-html";
import { action } from "@storybook/addon-actions";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { Meta, Story } from "@storybook/web-components";

import List from "@ui5/webcomponents/dist/List.js";
import ListMode from '@ui5/webcomponents/dist/types/ListMode.js';
import ListSeparators from "@ui5/webcomponents/dist/types/ListSeparators.js";

import argTypes from "./argTypes.js";

export default {
  title: "Components/List",
  component: "ui5-list",
  argTypes,
} as Meta<List>;

const Template: Story<
  List & {
    default: string;
    "ui5-item-click": (event: CustomEvent) => void;
    "ui5-item-delete": (event: CustomEvent) => void;
    "ui5-selection-change": (event: CustomEvent) => void;
  }
> = (args) => {
  return html` <ui5-list
    mode="${ifDefined(args.mode)}"
    ?busy="${ifDefined(args.busy)}"
    ?indent="${ifDefined(args.indent)}"
    ?growing="${ifDefined(args.growing)}"
    busy-delay="${ifDefined(args.busyDelay)}"
    separators="${ifDefined(args.separators)}"
    header-text="${ifDefined(args.headerText)}"
    footer-text="${ifDefined(args.footerText)}"
    no-data-text="${ifDefined(args.noDataText)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-role="${ifDefined(args.accessibleRole)}"
    @ui5-item-click="${ifDefined(args["ui5-item-click"])}"
    @ui5-item-delete="${ifDefined(args["ui5-item-delete"])}"
    @ui5-selection-change="${ifDefined(args["ui5-selection-change"])}"
  >
    ${unsafeHTML(args.default)}
  </ui5-list>`;
};

// Basic
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
  ["ui5-item-click"]: (event: CustomEvent) =>
    action("ui5-item-click")(event.detail),
  default: `<ui5-li
		icon="nutrition-activity"
		description="Tropical plant with an edible fruit"
		additional-text="In-stock"
		additional-text-state="Success"
		>Pineapple</ui5-li>
	<ui5-li
		icon="nutrition-activity"
		description="Occurs between red and yellow"
		additional-text="Expires"
		additional-text-state="Warning"
		>Orange</ui5-li>
	<ui5-li
		icon="nutrition-activity"
		description="The yellow lengthy fruit"
		additional-text="Re-stock"
		additional-text-state="Information"
		>Blueberry</ui5-li>
	<ui5-li
		icon="nutrition-activity"
		description="The tropical stone fruit"
		additional-text="Re-stock"
		additional-text-state="Error"
		>Mango</ui5-li>`,
};

// Growing
export const Growing = () =>
  html`<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
      <ui5-li
        icon="nutrition-activity"
        description="Tropical plant with an edible fruit"
        additional-text="In-stock"
        additional-text-state="Success"
        >Pineapple</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="Occurs between red and yellow"
        additional-text="Expires"
        additional-text-state="Warning"
        >Orange</ui5-li
      >
      <ui5-li
        icon="nutrition-activity"
        description="The yellow lengthy fruit"
        additional-text="Re-stock"
        additional-text-state="Error"
        >Banana</ui5-li
      >
    </ui5-list>
    <script>
      function template(i) {
        var li = document.createElement("ui5-li");
        li.textContent = "Fruit name";
        li.description = "the description goes here " + i;
        li.additionalText = "Available";
        li.additionalTextState = "Success";
        li.icon = "nutrition-activity";
        return li;
      }
      function insertItems(el, num) {
        for (var i = 0; i < num; i++) {
          el.appendChild(template(i));
        }
      }
      infiniteScrollEx.addEventListener("load-more", (e) => {
        var el = infiniteScrollEx;
        el.busy = true;
        setTimeout(() => {
          insertItems(el, 5);
          el.busy = false;
        }, 200);
      });
    </script>`;
Growing.storyName = "Growing";
Growing.parameters = {
  docs: {
    // Opt-out of inline rendering
    inlineStories: false,
  },
};

// Single Selection
export const SingleSelection = Template.bind({});
SingleSelection.storyName = "Single Selection";
SingleSelection.args = {
  mode: ListMode.SingleSelect,
  headerText: "Select a country:",
  ["ui5-selection-change"]: (e: CustomEvent) =>
    action("ui5-selection-change")(e.detail),
  default: `
	<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
	<ui5-li icon="map" icon-end>Bulgaria</ui5-li>
	<ui5-li icon="map" icon-end>China</ui5-li>
	<ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>`,
};

// Multi Selection
export const MultiSelection = Template.bind({});
MultiSelection.storyName = "Multi Selection";
MultiSelection.args = {
  ["ui5-selection-change"]: (e: CustomEvent) =>
    action("ui5-selection-change")(e.detail),
  mode: ListMode.MultiSelect,
  headerText: "Multiple selection is possible",
  default: `
	<ui5-li>Pineapple</ui5-li>
	<ui5-li selected="">Orange</ui5-li>
	<ui5-li>Banana</ui5-li>
	<ui5-li>Mango</ui5-li>`,
};

// Group Headers
export const GroupHeaders = Template.bind({});
GroupHeaders.storyName = "Group Headers";
GroupHeaders.args = {
  mode: ListMode.MultiSelect,
  default: `<ui5-li-groupheader
	>Front End Developers</ui5-li-groupheader
	>
	<ui5-li
		image="../assets/images/avatars/woman_avatar_3.png"
		icon="navigation-right-arrow"
		icon-end=""
		>Jennifer</ui5-li
	>
	<ui5-li
		image="../assets/images/avatars/woman_avatar_4.png"
		icon="navigation-right-arrow"
		icon-end=""
		>Lora</ui5-li
	>
	<ui5-li
		image="../assets/images/avatars/woman_avatar_5.png"
		icon="navigation-right-arrow"
		icon-end=""
		>Carlotta</ui5-li
	>
	<ui5-li-groupheader>Back End Developers</ui5-li-groupheader>
	<ui5-li
		image="../assets/images/avatars/man_avatar_1.png"
		icon="navigation-right-arrow"
		icon-end=""
	>Clark</ui5-li
	>
	<ui5-li
		image="../assets/images/avatars/woman_avatar_1.png"
		icon="navigation-right-arrow"
		icon-end=""
	>Ellen</ui5-li
	>
	<ui5-li
		image="../assets/images/avatars/man_avatar_2.png"
		icon="navigation-right-arrow"
		icon-end=""
	>Adam</ui5-li
	>`,
};

// Delete
export const Delete = Template.bind({});
Delete.storyName = "Delete Mode";
Delete.args = {
  mode: ListMode.Delete,
  ["ui5-item-delete"]: (e: CustomEvent) => action("ui5-item-delete")(e.detail),
  headerText: "Note: The list items removal is up to application developers",
  default: `
	<ui5-li>Argentina</ui5-li>
	<ui5-li>Bulgaria</ui5-li>
	<ui5-li>China</ui5-li>`,
};

// No Data
export const NoData = Template.bind({});
NoData.storyName = "No Data";
NoData.args = {
  headerText: "Products",
  noDataText: "No Data Available",
  separators: ListSeparators.None,
};

// Separation Types
export const SeparationTypes = () =>
  html` <ui5-list
      header-text="No separators"
      separators="None"
      class="full-width"
    >
      <ui5-li icon="product">Item #1</ui5-li>
      <ui5-li icon="product">Item #2</ui5-li>
      <ui5-li icon="product">Item #3</ui5-li>
    </ui5-list>
    <ui5-list
      header-text="Inner separators"
      separators="Inner"
      class="full-width"
    >
      <ui5-li icon="shipping-status">Devilered</ui5-li>
      <ui5-li icon="shipping-status">Pending</ui5-li>
      <ui5-li icon="shipping-status">Declined</ui5-li>
    </ui5-list>`;
