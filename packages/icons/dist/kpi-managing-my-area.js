import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/kpi-managing-my-area.js";
import {pathData as pathDataV4} from "./v4/kpi-managing-my-area.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "kpi-managing-my-area";
export { pathData, ltr, accData };