import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/Chart-Tree-Map.js";
import { pathData as pathDatav5 } from "./v5/Chart-Tree-Map.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "Chart-Tree-Map";
export { pathData, ltr, accData };