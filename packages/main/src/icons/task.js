import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://task";
const d = "M416 64q13 0 22.5 9t9.5 23v384q0 14-9.5 23t-22.5 9H96q-14 0-23-9t-9-23V96q0-14 9-23t23-9h67q4-12 14-20.5T200 33q8-15 23-24t33-9 32.5 9T311 33q14 2 23.5 10.5T349 64h67zm-208 0q-16 0-16 16t16 16h96q16 0 16-16t-16-16h-16q0-14-9.5-23T256 32q-14 0-23 9t-9 23h-16zm208 32h-67q-3 10-11 20-11 12-25 12H199q-16 0-26-12-7-10-10-20H96v384h320V96zm-88 105l24 24-121 145-72-72 23-26 49 49z";

registerIcon(name, d);
