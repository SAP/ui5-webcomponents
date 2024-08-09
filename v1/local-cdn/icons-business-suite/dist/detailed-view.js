import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/detailed-view.js";
import { pathData as pathDatav2 } from "./v2/detailed-view.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/detailed-view";
export { pathData, ltr, accData };