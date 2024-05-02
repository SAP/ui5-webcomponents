/* eslint-disable @typescript-eslint/no-unused-vars */
import testAssets from "@ui5/webcomponents/dist/bundle.esm.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";

// Compat assets
import "./Assets.js";

import Table from "./Table.js";
import TableColumn from "./TableColumn.js";
import TableRow from "./TableRow.js";
import TableGroupRow from "./TableGroupRow.js";
import TableCell from "./TableCell.js";

testAssets.defaultTexts = { ...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
