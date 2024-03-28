import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/multi-container.js";
import { pathData as pathDatav2 } from "./v2/multi-container.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/multi-container";
export { pathData, ltr, accData };