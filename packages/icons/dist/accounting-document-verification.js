import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/accounting-document-verification.js";
import {pathData as pathDataV4} from "./v4/accounting-document-verification.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "accounting-document-verification";
export { pathData, ltr, accData };