import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/s4hana.js";
import {pathData as pathDataV4} from "./v4/s4hana.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "s4hana";
export { pathData, ltr, accData };