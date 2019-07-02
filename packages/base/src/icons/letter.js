import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://letter";
const transform = "translate(48.5,35)";
const d = "M480 416q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5v320q0 14 9.5 23t22.5 9h448zM480 384h-448v-320h448v320zM448 304v32q0 16 -16 16h-32q-16 0 -16 -16v-32q0 -6 4.5 -11t11.5 -5h32q7 0 11.5 5t4.5 11zM272 256q16 0 16 -16 q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160zM176 192q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h64z";

registerIcon(name, transform, d);

export default {name, transform, d};
