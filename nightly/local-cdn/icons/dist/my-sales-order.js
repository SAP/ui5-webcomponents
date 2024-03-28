import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/my-sales-order.js";
import { pathData as pathDatav5 } from "./v5/my-sales-order.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "my-sales-order";
export { pathData, ltr, accData };