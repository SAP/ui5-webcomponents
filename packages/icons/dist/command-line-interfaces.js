import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/command-line-interfaces.js";
import {pathData as pathDataV4} from "./v4/command-line-interfaces.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "command-line-interfaces";
export { pathData, ltr, accData };