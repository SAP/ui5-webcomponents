import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heading3";
const transform = "translate(48.5,35)";
const d = "M240 416q16 0 16 -16v-320q0 -16 -16 -16h-8q-16 0 -16 16v144h-176v-144q0 -16 -16 -16h-8q-16 0 -16 16v144v32v144q0 16 16 16h8q16 0 16 -16v-144h176v144q0 16 16 16h8zM489 119q11 -8 17 -21q6 -12 6 -27q0 -23 -10 -37q-8 -16 -29 -25q-21 -8 -46 -8q-32 0 -51 12 q-19 11 -34 33l27 19q5 -6 8.5 -11t7.5 -8q6 -6 16 -11q9 -4 26 -4q26 0 38 11q14 10 14 30q0 16 -9 25q-4 5 -9.5 8.5t-11.5 5.5q-12 4 -27 4h-21v31h21q11 0 24 5q11 3 19 14q8 10 8 24q0 18 -12 27q-11 10 -33 10q-13 0 -23 -3q-10 -5 -16 -11q-7 -5 -15 -17l-27 17 q12 22 33 32q21 12 48 12q26 0 43 -9q16 -7 26 -23q8 -14 8 -32q0 -21 -11 -38q-11 -16 -32 -22v-1q15 -3 27 -12z";

registerIcon(name, transform, d);

export default {name, transform, d};
