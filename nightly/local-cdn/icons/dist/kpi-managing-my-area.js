import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/kpi-managing-my-area.js";
import { pathData as pathDatav5 } from "./v5/kpi-managing-my-area.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "kpi-managing-my-area";
export { pathData, ltr, accData };