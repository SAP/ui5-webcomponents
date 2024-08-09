import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/eam-work-order.js";
import { pathData as pathDatav5 } from "./v5/eam-work-order.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "eam-work-order";
export { pathData, ltr, accData };