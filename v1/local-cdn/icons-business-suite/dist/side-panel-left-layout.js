import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/side-panel-left-layout.js";
import { pathData as pathDatav2 } from "./v2/side-panel-left-layout.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/side-panel-left-layout";
export { pathData, ltr, accData };