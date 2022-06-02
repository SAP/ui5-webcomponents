import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/sales-order-item.js";
import {pathData as pathDataV4} from "./v4/sales-order-item.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "sales-order-item";
export { pathData, ltr, accData };