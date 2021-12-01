import testAssets from "@ui5/webcomponents/bundle.esm.js";
import * as defaultFioriTexts from "./dist/generated/i18n/i18n-defaults.js";

// FIORI assets
import "./dist/Assets.js";

import "./bundle.common.js";
import BarcodeScannerDialog from "./dist/BarcodeScannerDialog.js";

testAssets.defaultTexts = {...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
