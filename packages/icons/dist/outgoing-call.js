import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/outgoing-call.js";
import {pathData as pathDataV4} from "./v4/outgoing-call.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "outgoing-call";
export { pathData, ltr, accData };