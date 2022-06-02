import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/close-command-field.js";
import {pathData as pathDataV4} from "./v4/close-command-field.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "close-command-field";
export { pathData, ltr, accData };