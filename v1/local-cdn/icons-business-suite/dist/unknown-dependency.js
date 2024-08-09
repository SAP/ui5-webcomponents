import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/unknown-dependency.js";
import { pathData as pathDatav2 } from "./v2/unknown-dependency.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/unknown-dependency";
export { pathData, ltr, accData };