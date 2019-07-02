import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-up";
const transform = "translate(48.5,35)";
const d = "M496 448q16 0 16 -16t-16 -16h-16v-224q0 -26 -18.5 -45t-45.5 -19v32q14 0 23 9t9 23v224h-384v-224q0 -14 9.5 -23t22.5 -9v-32q-26 0 -45 19t-19 45v224h-16q-6 0 -11 4.5t-5 11.5t5 11.5t11 4.5h16h448h16zM382 145q11 -12 0 -23q-12 -11 -23 0l-87 87v-225 q0 -16 -16 -16t-16 16v223l-85 -85q-5 -5 -11 -5t-11 5q-12 11 0 23l102 101q9 10 22 10t23 -10zM208 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM400 384q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-288q-6 0 -11 5t-5 11q0 7 5 11.5 t11 4.5h288z";

registerIcon(name, transform, d);

export default {name, transform, d};
