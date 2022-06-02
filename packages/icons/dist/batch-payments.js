import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/batch-payments.js";
import {pathData as pathDataV4} from "./v4/batch-payments.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "batch-payments";
export { pathData, ltr, accData };