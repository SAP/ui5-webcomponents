import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/blood-test.js";
import { pathData as pathDatav2 } from "./v2/blood-test.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/blood-test";
export { pathData, ltr, accData };