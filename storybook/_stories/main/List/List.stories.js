import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/List",
    component: "List",
    argTypes,
};
const Template = (args) => {
    return html ` <ui5-list
    mode="${ifDefined(args.mode)}"
    ?busy="${ifDefined(args.busy)}"
    ?indent="${ifDefined(args.indent)}"
    ?growing="${ifDefined(args.growing)}"
    growing-button-text="${ifDefined(args.growingButtonText)}"
    busy-delay="${ifDefined(args.busyDelay)}"
    separators="${ifDefined(args.separators)}"
    header-text="${ifDefined(args.headerText)}"
    footer-text="${ifDefined(args.footerText)}"
    no-data-text="${ifDefined(args.noDataText)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-role="${ifDefined(args.accessibleRole)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-list>`;
};
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
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
export const Growing = () => html `<ui5-list id="infiniteScrollEx" style="height: 200px" growing="Scroll">
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
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    },
};
export const Modes = () => html `
<ui5-list mode="SingleSelect" header-text="Single Select Mode:">
<ui5-li selected icon="map" icon-end>Argentina</ui5-li>
	<ui5-li icon="map" icon-end>Bulgaria</ui5-li>
	<ui5-li icon="map" icon-end>China</ui5-li>
	<ui5-li type="Inactive" icon="map" icon-end>Denmark (ui5-li type='Inactive')</ui5-li>
</ui5-list>

</br>

<ui5-list mode="MultiSelect" header-text="Multi Select Mode:">
<ui5-li>Pineapple</ui5-li>
<ui5-li selected="">Orange</ui5-li>
<ui5-li>Banana</ui5-li>
<ui5-li>Mango</ui5-li>
</ui5-list>

</br>

<ui5-list mode="Delete" header-text="Delete Mode:">
<ui5-li>Argentina</ui5-li>
<ui5-li>Bulgaria</ui5-li>
<ui5-li>China</ui5-li>
</ui5-list>

</br>

<ui5-list mode="NoData" header-text="No Data Mode:" no-data-text="No Data Available">
</ui5-list>
`;
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
export const SeparationTypes = () => html ` <ui5-list
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
export const HighlightTypes = () => html ` <ui5-list
      header-text="Highlight Types"
      separators="Inner"
      class="full-width"
    >
      <ui5-li highlight="None">None</ui5-li>
      <ui5-li highlight="Success">Success</ui5-li>
      <ui5-li highlight="Warning">Warning</ui5-li>
      <ui5-li highlight="Error">Error</ui5-li>
      <ui5-li highlight="Information">Information</ui5-li>
    </ui5-list>`;
//# sourceMappingURL=List.stories.js.map