import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/qr-code.js";
import { pathData as pathDatav5 } from "./v5/qr-code.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "qr-code";
export { pathData, ltr, accData };