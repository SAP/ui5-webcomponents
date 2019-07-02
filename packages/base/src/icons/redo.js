import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://redo";
const transform = "translate(80.5,35)";
const d = "M266 137q-9 9 -9 22.5t9 22.5l75 74h-180q-23 0 -42 -9.5t-32.5 -25t-19.5 -36.5t-1 -44q7 -35 35 -56t63 -21h253q13 0 22.5 -9.5t9.5 -22.5q0 -14 -9.5 -23t-22.5 -9h-256q-35 0 -66 14t-53 38t-33 56t-8 68q3 31 18 57.5t37.5 45.5t51.5 30t60 11h172l-74 73 q-10 10 -10 23t10 22q9 10 22 10t23 -10l129 -128q8 -9 8 -22.5t-8 -22.5l-128 -128q-10 -10 -23 -10t-23 10z";

registerIcon(name, transform, d);

export default {name, transform, d};
