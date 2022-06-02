import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/message-information.js";
import {pathData as pathDataV4} from "./v4/message-information.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "message-information";
export { pathData, ltr, accData };