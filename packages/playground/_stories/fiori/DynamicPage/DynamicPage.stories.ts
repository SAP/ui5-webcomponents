import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import type DynamicPage from "@ui5/webcomponents-fiori/dist/DynamicPage.js";

import DynamicPageTitleTemplate from "./DynamicPageTitleTemplate.js"
import DynamicPageHeaderTemplate from "./DynamicPageHeaderTemplate.js"

const stylesDecorator = (storyFn: PartialStoryFn) => html`
    <style>
        #root-inner,
        #storybook-root,
        html, body {
            height: 100%;
            padding: 0;
            margin: 0;
        }
    </style>
    ${storyFn()}
`;

export default {
  title: "Fiori/Dynamic page",
  component: "DynamicPage",
  decorators: [stylesDecorator],
  argTypes,
} as Meta<DynamicPage>;


const Template: UI5StoryArgs<DynamicPage, StoryArgsSlots> = (args) => {
  return html`
    <ui5-dynamic-page id="page"
    ?header-snapped = ${ifDefined(args.headerSnapped)}
    ?header-pinned = ${ifDefined(args.headerPinned)}
    ?show-footer = ${ifDefined(args.showFooter)}
    >
      ${unsafeHTML(args.headerArea)}
      ${unsafeHTML(args.titleArea)}
      ${unsafeHTML(args.default)}
      ${unsafeHTML(args.footer)}
    </ui5-dynamic-page>
`;
};

export const Basic = Template.bind({});
Basic.args = {
    showFooter: true,
    titleArea: DynamicPageTitleTemplate,
    headerArea: DynamicPageHeaderTemplate,
    default: `
    <ui5-list
    id="col1list"
    header-text="Products (13)"
    mode="SingleSelect"
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="47.00 EUR"
        >10 inch Portable DVD</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="249.00 EUR"
        >7 inch WidescreenPortable DVD Player w MP3</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="947.00 EUR"
        >Astro Laptop 1516</ui5-li
    >
    <ui5-li
        description="HT-1251"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.00 EUR"
        >Astro Phone 6</ui5-li
    >
    <ui5-li
        description="HT-1252"
        icon="slim-arrow-right"
        icon-end
        additional-text="27.99 EUR"
        >Audio/Video Cable Kit - 4m</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="447.90 EUR"
        >Beam Breaker B-1</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="647.50 EUR"
        >Beam Breaker B-2</ui5-li
    >
    <ui5-li
        description="HT-6001"
        icon="slim-arrow-right"
        icon-end
        additional-text="847.80 EUR"
        >Beam Breaker B-3</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,250.00 EUR"
        >Beam Breaker B-4</ui5-li
    >
    <ui5-li
        description="HT-8001"
        icon="slim-arrow-right"
        icon-end
        additional-text="1,288.00 EUR"
        >Camcorder View</ui5-li
    >
    <ui5-li
        description="HT-2001"
        icon="slim-arrow-right"
        icon-end
        additional-text="996.00 EUR"
        >Benda Laptop 1408</ui5-li
    >
    <ui5-li
        description="HT-0003"
        icon="slim-arrow-right"
        icon-end
        additional-text="147.00 EUR"
        >Cepat Tablet 10.5</ui5-li
    >
    <ui5-li
        description="HT-1001"
        icon="slim-arrow-right"
        icon-end
        additional-text="87.90 EUR"
        >Gladiator MX</ui5-li
    >
    </ui5-list>`,
    footer: `<ui5-bar id="footer" slot="footer" design="FloatingFooter">
    <ui5-button slot="endContent">Edit</ui5-button>
    <ui5-button slot="endContent">Close</ui5-button>
    </ui5-bar>`,

};

Basic.decorators = [
    (story) => html`
    ${story()}`,
];

Basic.parameters = {
  docs: {
    story: {
      // Opt-out of inline rendering
      inline: false,
      iframeHeight: 600,
    }
  },
};