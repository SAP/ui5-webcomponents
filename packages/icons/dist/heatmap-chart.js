import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/heatmap-chart.js";
import {pathData as pathDataV4} from "./v4/heatmap-chart.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "heatmap-chart";
export { pathData, ltr, accData };