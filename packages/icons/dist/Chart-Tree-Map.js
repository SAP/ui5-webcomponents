import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/Chart-Tree-Map.js";
import {pathData as pathDataV4} from "./v4/Chart-Tree-Map.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "Chart-Tree-Map";
export { pathData, ltr, accData };