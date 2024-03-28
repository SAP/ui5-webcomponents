import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/email-send-delayed.js";
import { pathData as pathDatav2 } from "./v2/email-send-delayed.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/email-send-delayed";
export { pathData, ltr, accData };