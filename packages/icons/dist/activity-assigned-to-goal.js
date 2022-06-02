import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/activity-assigned-to-goal.js";
import {pathData as pathDataV4} from "./v4/activity-assigned-to-goal.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "activity-assigned-to-goal";
export { pathData, ltr, accData };