import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/link-not-clicked.js";
import { pathData as pathDatav2 } from "./v2/link-not-clicked.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/link-not-clicked";
export { pathData, ltr, accData };