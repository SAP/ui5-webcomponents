import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://mileage";
const transform = "translate(64.5,35)";
const d = "M100 160v64h128l-74 -64h-54zM458 348l22 -117l-32 -7v-147q0 -23 -13 -37t-36 -14t-35 14.5t-12 37.5v28q0 9 -7 16t-16 7h-54q-19 0 -19 15q0 16 19 16h54q31 0 43 -16t12 -39v-28q0 -19 14 -19q18 0 18 19v164l-16 6l-17 94l33 27l-32 68l22 12zM448 292l-5 29 q-3 11 -14 11q-14 0 -14 -13l5 -32q4 -13 14 -13q1 0 2.5 -0.5t2.5 0.5q7 2 8 5t1 8v5zM256 96h32v-64q0 -13 -9 -22.5t-23 -9.5h-192q-14 0 -23 9.5t-9 22.5v192q-14 0 -23 9.5t-9 22.5v160q0 14 9 23t23 9h256q14 0 23 -9t9 -23v-160q0 -13 -9 -22.5t-23 -9.5v-32h-32v32 v32h32v160h-256v-160h32v-32v-192h192v64zM256 304q0 -6 -4.5 -11t-11.5 -5h-160q-7 0 -11.5 5t-4.5 11v64q0 16 16 16h160q16 0 16 -16v-64z";

registerIcon(name, transform, d);

export default {name, transform, d};
