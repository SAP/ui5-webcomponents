import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/document-info-recording.js";
import { pathData as pathDatav3 } from "./v3/document-info-recording.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/document-info-recording";
export { pathData, ltr, accData };