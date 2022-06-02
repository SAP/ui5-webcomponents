import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/master-task-triangle.js";
import {pathData as pathDataV4} from "./v4/master-task-triangle.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "master-task-triangle";
export { pathData, ltr, accData };