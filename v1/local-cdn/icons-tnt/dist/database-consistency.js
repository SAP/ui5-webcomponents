import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/database-consistency.js";
import { pathData as pathDatav3 } from "./v3/database-consistency.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/database-consistency";
export { pathData, ltr, accData };