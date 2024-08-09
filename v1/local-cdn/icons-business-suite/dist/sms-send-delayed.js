import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/sms-send-delayed.js";
import { pathData as pathDatav2 } from "./v2/sms-send-delayed.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/sms-send-delayed";
export { pathData, ltr, accData };