import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/cart-4.js";
import {pathData as pathDataV4} from "./v4/cart-4.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "cart-4";
export { pathData, ltr, accData };