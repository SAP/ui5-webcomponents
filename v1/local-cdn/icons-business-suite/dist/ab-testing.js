import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/ab-testing.js";
import { pathData as pathDatav2 } from "./v2/ab-testing.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/ab-testing";
export { pathData, ltr, accData };