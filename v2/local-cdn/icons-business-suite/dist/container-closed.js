import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/container-closed.js";
import { pathData as pathDatav2 } from "./v2/container-closed.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/container-closed";
export { pathData, ltr, accData };