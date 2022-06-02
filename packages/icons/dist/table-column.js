import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/table-column.js";
import {pathData as pathDataV4} from "./v4/table-column.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "table-column";
export { pathData, ltr, accData };