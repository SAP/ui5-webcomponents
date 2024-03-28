import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/terminate-end-event.js";
import { pathData as pathDatav3 } from "./v3/terminate-end-event.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/terminate-end-event";
export { pathData, ltr, accData };