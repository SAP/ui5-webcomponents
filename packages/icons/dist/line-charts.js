import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/line-charts.js";
import {pathData as pathDataV4} from "./v4/line-charts.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "line-charts";
export { pathData, ltr, accData };