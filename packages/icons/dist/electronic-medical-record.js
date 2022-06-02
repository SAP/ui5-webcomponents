import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/electronic-medical-record.js";
import {pathData as pathDataV4} from "./v4/electronic-medical-record.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "electronic-medical-record";
export { pathData, ltr, accData };