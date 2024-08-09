import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/catching-message.js";
import { pathData as pathDatav3 } from "./v3/catching-message.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/catching-message";
export { pathData, ltr, accData };