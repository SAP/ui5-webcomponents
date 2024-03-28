import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/marked-for-deletion.js";
import { pathData as pathDatav2 } from "./v2/marked-for-deletion.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/marked-for-deletion";
export { pathData, ltr, accData };