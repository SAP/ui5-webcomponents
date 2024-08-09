import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/simple-payment.js";
import { pathData as pathDatav5 } from "./v5/simple-payment.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "simple-payment";
export { pathData, ltr, accData };