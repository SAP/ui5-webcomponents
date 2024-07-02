import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/face-very-bad.js";
import { pathData as pathDatav2 } from "./v2/face-very-bad.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/face-very-bad";
export { pathData, ltr, accData };