import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/journey-depart.js";
import { pathData as pathDatav5 } from "./v5/journey-depart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "journey-depart";
export { pathData, ltr, accData };