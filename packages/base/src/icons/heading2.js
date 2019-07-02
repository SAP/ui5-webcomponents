import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heading2";
const transform = "translate(48.5,35)";
const d = "M240 416q6 0 11 -4.5t5 -11.5v-320q0 -7 -5 -11.5t-11 -4.5h-8q-16 0 -16 16v144h-176v-144q0 -16 -16 -16h-8q-16 0 -16 16v144v32v144q0 16 16 16h8q16 0 16 -16v-144h176v144q0 16 16 16h8zM492 131q-5 -5 -11.5 -13t-16.5 -17l-63 -69l111 -1v-31h-160v32l90 90 q14 14 20 23q8 8 11 18q4 8 4 20t-6 21t-16 15q-9 5 -25 5q-20 0 -34 -8q-13 -9 -27 -29l-28 19q9 14 19 25q13 11 28 18q9 3 19 5t22 2q26 0 44 -9q18 -8 29 -26q10 -17 10 -38q0 -14 -5 -27q-5 -12 -15 -25z";

registerIcon(name, transform, d);

export default {name, transform, d};
