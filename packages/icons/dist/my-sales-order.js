import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/my-sales-order.js";
import {pathData as pathDataV4} from "./v4/my-sales-order.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "my-sales-order";
export { pathData, ltr, accData };