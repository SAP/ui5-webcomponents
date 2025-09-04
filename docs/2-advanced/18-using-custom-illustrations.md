# Using Custom Illustrations

*This section explains how to register and use custom illustrations in your UI5 Web Components projects.*

The `ui5-illustrated-message` component displays illustrations to enhance user experience in empty states, error conditions, and various other scenarios.

While UI5 Web Components provides a rich collection of built-in illustrations, you can also register and use your own custom illustrations.

## Understanding Illustrations

Illustrations in UI5 Web Components are responsive SVG graphics that adapt to different container sizes through multiple breakpoint variants:

- **ExtraSmall** - Smallest variant (typically ≤ 260px container width)
- **Small** - Small variant (typically ≤ 360px container width) 
- **Medium** - Medium variant (typically ≤ 681px container width)
- **Large** - Large variant (> 681px container width)

Each custom illustration should provide all four variants to ensure optimal display across different screen sizes and container dimensions.

## Prerequisites

Before registering custom illustrations, ensure you have:

**SVG assets with proper naming** - You'll need four SVG files for each illustration using the naming pattern:<br/>`{set}-{Variant}-{IllustrationName}.js`

- `custom-ExtraSmall-MyIllustration.js`
- `custom-Small-MyIllustration.js`
- `custom-Medium-MyIllustration.js`
- `custom-Large-MyIllustration.js`

**Asset registry API** - Import the illustration registration functions from UI5 Web Components base.

## Registering a Custom Illustration

### Basic Registration

Use the `registerIllustration` function to add your custom illustration to the registry:

**JavaScript:**
```js
import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

// Import your SVG assets as strings
import extraSmallSvg from "./assets/custom-ExtraSmall-MyIllustration.js";
import smallSvg from "./assets/custom-Small-MyIllustration.js"; 
import mediumSvg from "./assets/custom-Medium-MyIllustration.js";
import largeSvg from "./assets/custom-Large-MyIllustration.js";

const name = "MyCustomIllustration";
const set = "custom";
const collection = "V4"; // Optional - can be omitted, defaults to "V4"
const title = "My Custom Title";
const subtitle = "My custom illustration subtitle";

registerIllustration(name, {
    extraSmallSvg,
    smallSvg,
    mediumSvg,
    largeSvg,
    title,
    subtitle,
    set,
    collection,
});
```

**TypeScript:**
```ts
import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Import your SVG assets as strings
import extraSmallSvg from "./assets/custom-ExtraSmall-MyIllustration.js";
import smallSvg from "./assets/custom-Small-MyIllustration.js";
import mediumSvg from "./assets/custom-Medium-MyIllustration.js";
import largeSvg from "./assets/custom-Large-MyIllustration.js";

const name = "MyCustomIllustration";
const set = "custom";
const collection = "V4"; // Optional - can be omitted, defaults to "V4"
const title = "My Custom Title" as I18nText;
const subtitle = "My custom illustration subtitle" as I18nText;

const illustrationData = {
    extraSmallSvg,
    smallSvg,
    mediumSvg,
    largeSvg,
    title,
    subtitle,
    set,
    collection,
};

registerIllustration(name, illustrationData);
```

### SVG Asset Files

Each SVG asset should be exported as a default string from a JavaScript/TypeScript module:

**custom-Large-MyIllustration.js:**
```js
export default `<svg id="custom-Large-MyIllustration" width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect fill="var(--sapContent_Illustrative_Color18)" x="13" y="206" width="94" height="14" rx="4"/>
  <rect fill="var(--sapContent_Illustrative_Color19)" x="99" y="206" width="208" height="14" rx="4"/>
  <!-- Your custom SVG content here -->
</svg>`;
```

**Important:** 
- Use CSS custom properties (like `var(--sapContent_Illustrative_Color18)`) for colors to ensure your illustrations adapt to different themes.
- Each illustration variant should have a unique `id` attribute following the pattern `{set}-{Variant}-{IllustrationName}` (e.g., `custom-ExtraSmall-MyIllustration`, `custom-Large-MyIllustration`).

**Security Note:** Ensure your SVG files are CSP (Content Security Policy) compliant:
- Avoid inline JavaScript (`<script>` tags, `onclick` attributes, etc.)
- Avoid inline styles (`style` attributes) that violate your CSP directives
- Use external stylesheets or CSS custom properties instead of inline styles when possible
- Test your illustrations in environments with strict CSP policies

## Using Custom Illustrations

### In `<ui5-illustrated-message>`

Once registered, use your custom illustration by setting the `name` property with the format `{set}/{name}`:

**Vanilla Web Components:**
```html
<ui5-illustrated-message name="custom/MyCustomIllustration">
    <ui5-button>Custom Action</ui5-button>
</ui5-illustrated-message>
```

**React:**
```jsx
import { Button, IllustratedMessage } from '@ui5/webcomponents-react';

function MyComponent() {
    return (
        <IllustratedMessage name="custom/MyCustomIllustration">
            <Button>Custom Action</Button>
        </IllustratedMessage>
    );
}
```