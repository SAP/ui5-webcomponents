import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ipad-2";
const transform = "translate(48.5,35)";
const d = "M32 32q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-448zM96 64h352v320h-352v-320zM56 248q-10 0 -17 -7t-7 -17t7 -17t17 -7q11 0 17.5 7t6.5 17t-6.5 17t-17.5 7z";

registerIcon(name, transform, d);

export default {name, transform, d};
