import { create } from "@storybook/theming";

export default create({
    base: "light",
    brandTitle: "UI5 Web Components",
    brandImage: `${process.env.STORYBOOK_ASSETS_BASE}/assets/images/sb-logo-9.png`,
    brandUrl: "/",
    brandTarget: "_self",
});
