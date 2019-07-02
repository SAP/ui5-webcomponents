import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-down";
const transform = "translate(48.5,35)";
const d = "M496 448q16 0 16 -16t-16 -16h-16v-224q0 -26 -19 -45t-45 -19v32q14 0 23 9t9 23v224h-384v-224q0 -14 9 -23t23 -9v-32q-26 0 -45 19t-19 45v224h-16q-16 0 -16 16t16 16h16h448h16zM381 80q11 12 0 23q-12 11 -23 0l-87 -87v225q0 16 -16 16t-16 -16v-223l-85 85 q-5 5 -11 5t-11 -5q-12 -11 0 -23l102 -101q9 -10 22 -10t23 10zM208 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM400 384q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-288q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h288z";

registerIcon(name, transform, d);

export default {name, transform, d};
