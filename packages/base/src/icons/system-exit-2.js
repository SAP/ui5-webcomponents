import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://system-exit-2";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -100t-54.5 -81.5t-81.5 -54.5t-100 -20t-99.5 20t-81.5 54.5t-55 81.5t-20 100t20 99.5t55 81.5t81.5 55t99.5 20zM384 109q16 16 0 33l-99 103q-13 11 -28 11q-18 0 -28 -12l-101 -102q-8 -8 -8 -17t8 -17 t17 -8t17 8l95 97l93 -96q5 -5 9.5 -6.5t7.5 -1.5q10 0 17 8zM384 224q17 17 0 34l-99 102q-13 11 -28 11q-17 0 -28 -11l-101 -102q-8 -8 -8 -17.5t8 -17.5q7 -7 17 -7t17 7l95 98l93 -96q5 -6 9.5 -7.5t7.5 -1.5q9 0 17 8z";

registerIcon(name, transform, d);

export default {name, transform, d};
