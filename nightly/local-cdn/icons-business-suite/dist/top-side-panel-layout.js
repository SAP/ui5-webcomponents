import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/top-side-panel-layout.js";
import { pathData as pathDatav2 } from "./v2/top-side-panel-layout.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/top-side-panel-layout";
export { pathData, ltr, accData };