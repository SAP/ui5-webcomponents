# Custom Fonts

During boot, the UI5 Web Components framework loads the necessary fonts to achieve the desired design of its components.

**Important:** These fonts are fetched via network requests.

## Customizing Fonts

There are several reasons why you might need to customize fonts:
- To specify different paths for fonts (e.g., due to restrictions on public internet access).
- To include additional declarations within `@font-face`.
- To download additional fonts, such as `72-Light`.
- To prevent the default fonts from being fetched.

To achieve this, you can prevent the fetching of default fonts by configuring `setDefaultFontLoading (@ui5/webcomponents-base/dist/config/Fonts.js)` to `false`:

```ts
import { getDefaultFontLoading, setDefaultFontLoading } from "@ui5/webcomponents-base/dist/config/Fonts.js";

setDefaultFontLoading(false);
```

Then, specify the custom font you intend to use. When the UI5 Web Components framework initializes, it will refrain from fetching default fonts and instead use the ones you have provided.

To use the `72-Light` font in your application and specify the `font-display` setting, you should define the font in your application's styles. 

```html
<style type="text/css">
    @font-face {
        font-family: "72";
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: local("72-Light"),
        url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2");
    }
</style>
```
