import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://folder";
const transform = "translate(48.5,35)";
const d = "M480 416q11 0 18 -5t10 -11q4 -7 4 -16v-352q0 -12 -5 -18.5t-11 -9.5q-7 -4 -16 -4h-448q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h187l37 -32h224zM480 352q-1 9 -5 16q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11 q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h384q9 0 16 4q6 3 11 9t5 19v288zM160 320q14 0 23 -9t9 -23v-32q0 -13 -9 -22.5t-23 -9.5h-32q-14 0 -23 9.5t-9 22.5v32q0 14 9 23t23 9h32zM400 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11 q0 7 5 11.5t11 4.5h128zM400 256q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM400 191q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
