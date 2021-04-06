// ES5 bundle targets IE11 and legacy Edge
import "@ui5/webcomponents-ie11/dist/features/IE11.js";

// OpenUI5 integration
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

// Assets
import "./dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js";
import "@ui5/webcomponents-icons-tnt/dist/Assets-static.js";

import testAssets from "./bundle.common.js";

export default testAssets;
