import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/exit-full-screen.js";
import {pathData as pathDataV4} from "./v4/exit-full-screen.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "exit-full-screen";
export { pathData, ltr, accData };