import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/manage-charging-stations.js";
import { pathData as pathDatav2 } from "./v2/manage-charging-stations.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/manage-charging-stations";
export { pathData, ltr, accData };