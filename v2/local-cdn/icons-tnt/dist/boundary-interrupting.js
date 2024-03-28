import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/boundary-interrupting.js";
import { pathData as pathDatav3 } from "./v3/boundary-interrupting.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/boundary-interrupting";
export { pathData, ltr, accData };