import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://paste";
const transform = "translate(80.5,35)";
const d = "M416 288q13 0 22.5 -9t9.5 -23v-256q0 -13 -9.5 -22.5t-22.5 -9.5h-224q-14 0 -23 9.5t-9 22.5v256q0 14 9 23t23 9h224zM416 256h-224v-256h224v256zM33 384v-384h95v-32h-95q-14 0 -23.5 9.5t-9.5 22.5v384q0 14 9.5 23t23.5 9h65q10 27 38 32q8 14 23 23t33 9 q17 0 32 -9t23 -23q28 -5 38 -32h67q13 0 22 -9t9 -23v-64h-31v64h-68q-2 -5 -4 -9.5t-6 -9.5q-10 -13 -25 -13h-115q-15 0 -25 13q-4 5 -6 9.5t-4 9.5h-66zM143 416q-6 0 -11 -4.5t-5 -11.5q0 -6 5 -11t11 -5h96q7 0 11.5 5t4.5 11q0 16 -16 16h-15q0 14 -9.5 23t-22.5 9 q-14 0 -23 -9t-9 -23h-17zM368 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM368 97q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
