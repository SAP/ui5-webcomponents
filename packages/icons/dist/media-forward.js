import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/media-forward.js";
import {pathData as pathDataV4} from "./v4/media-forward.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "media-forward";
export { pathData, ltr, accData };