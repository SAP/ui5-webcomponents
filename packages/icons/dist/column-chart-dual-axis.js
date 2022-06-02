import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/column-chart-dual-axis.js";
import {pathData as pathDataV4} from "./v4/column-chart-dual-axis.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "column-chart-dual-axis";
export { pathData, ltr, accData };