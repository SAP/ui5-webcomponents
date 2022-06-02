import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/my-view.js";
import {pathData as pathDataV4} from "./v4/my-view.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "my-view";
export { pathData, ltr, accData };