import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
// setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-button/, /ui5-icon/]});

import testAssets from "./bundle.esm.js";

export default testAssets;
