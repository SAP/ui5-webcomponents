import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/blood-pressure.js";
import { pathData as pathDatav2 } from "./v2/blood-pressure.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/blood-pressure";
export { pathData, ltr, accData };