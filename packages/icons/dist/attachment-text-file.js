import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/attachment-text-file.js";
import {pathData as pathDataV4} from "./v4/attachment-text-file.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "attachment-text-file";
export { pathData, ltr, accData };