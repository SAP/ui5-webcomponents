// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";

setCustomElementsScopingSuffix("demo");
// setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-button/, /ui5-icon/]});

// eslint-disable-next-line import/first
import testAssets from "./bundle.esm.js";

export default testAssets;
