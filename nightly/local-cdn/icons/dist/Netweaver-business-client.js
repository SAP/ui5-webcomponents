import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/Netweaver-business-client.js";
import { pathData as pathDatav5 } from "./v5/Netweaver-business-client.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "Netweaver-business-client";
export { pathData, ltr, accData };