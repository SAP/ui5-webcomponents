import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/washing-machine.js";
import {pathData as pathDataV4} from "./v4/washing-machine.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "washing-machine";
export { pathData, ltr, accData };