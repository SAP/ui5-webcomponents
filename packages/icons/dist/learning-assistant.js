import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/learning-assistant.js";
import {pathData as pathDataV4} from "./v4/learning-assistant.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "learning-assistant";
export { pathData, ltr, accData };