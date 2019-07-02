import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://chart-axis";
const transform = "translate(64.5,35)";
const d = "M472 72q9 -10 9 -23t-9 -23l-61 -53q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l44 36h-336q-14 0 -23 9.5t-9 22.5v336l-37 -43q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l52 60q10 9 23 9t23 -9l53 -60q5 -5 5 -11t-5 -11t-11.5 -5t-11.5 5l-36 43v-313l187 187l38 38l-57 -5 q-16 2 -16 16q0 7 4.5 11.5t10.5 4.5l80 6q13 -1 22.5 -10t9.5 -22l-5 -81q0 -6 -4.5 -10.5t-10.5 -4.5q-17 0 -17 16l5 56l-224 -225h313l-44 37q-5 5 -5 11.5t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
