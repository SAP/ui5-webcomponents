import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/fax-machine.js";
import {pathData as pathDataV4} from "./v4/fax-machine.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "fax-machine";
export { pathData, ltr, accData };