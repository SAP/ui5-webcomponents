import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/face-happy.js";
import { pathData as pathDatav2 } from "./v2/face-happy.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/face-happy";
export { pathData, ltr, accData };