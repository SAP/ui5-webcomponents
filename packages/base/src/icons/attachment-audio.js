import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-audio";
const transform = "translate(48.5,35)";
const d = "M160 160q-15 0 -22 5t-9 11q-3 7 -1 16v32q-2 9 1 16q2 6 9 11t22 5h27q5 0 10 3l97 74q4 3 10 3t11 -4.5t5 -11.5v-224q0 -8 -5 -12t-11 -4t-10 3l-97 74q-5 3 -10 3h-27zM160 192h27q16 0 29 -10l72 -54v160l-72 -55q-12 -9 -29 -9h-27v-32zM352 32h32v-32 q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-32h-32v32h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v32zM378 291q17 -15 27.5 -36.5t10.5 -46.5q0 -24 -9.5 -45t-25.5 -36l-27 20q14 11 22 26.5t8 34.5q0 20 -9 36t-23 27v1z M456 350q26 -28 41 -64t15 -78q0 -40 -14 -75.5t-39 -62.5l-26 19q22 23 34.5 53.5t12.5 65.5q0 36 -13.5 67.5t-36.5 54.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
