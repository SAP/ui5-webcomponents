import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/cart-5.js";
import {pathData as pathDataV4} from "./v4/cart-5.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "cart-5";
export { pathData, ltr, accData };