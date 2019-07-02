import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspect";
const transform = "translate(48.5,35)";
const d = "M480 480q14 0 23 -9.5t9 -22.5v-320q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v320q0 13 9 22.5t23 9.5h320zM480 448h-320v-320h320v320zM352 32h32v-32q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v320q0 13 9 22.5t23 9.5h32v-32h-32v-320h320v32zM384 384h-144 q-16 -2 -16 -18q1 -6 5.5 -10.5t10.5 -4.5h123l-133 -132q-10 -10 0 -24q12 -9 24 1l131 132v-120q0 -7 4.5 -11.5t10.5 -5.5q16 2 16 18v143q0 14 -9 23t-23 9z";

registerIcon(name, transform, d);

export default {name, transform, d};
