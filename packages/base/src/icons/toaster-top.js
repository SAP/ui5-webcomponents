import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://toaster-top";
const transform = "translate(48.5,35)";
const d = "M192 256q23 0 41 -2t30 -11t18.5 -28.5t6.5 -54.5h-192q0 35 6.5 54.5t18.5 28.5t30 11t41 2zM256 320q0 -27 -19 -45.5t-45 -18.5t-45 18.5t-19 45.5q0 26 19 45t45 19t45 -19t19 -45zM496 448q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-16v-256q0 -27 -19 -45.5t-45 -18.5 h-320q-26 0 -45 18.5t-19 45.5v256h-16q-16 0 -16 16q0 6 4.5 11t11.5 5h16h448h16zM448 416h-384v-256q0 -14 9 -23t23 -9h320q14 0 23 9t9 23v256zM400 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM400 384q16 0 16 -16 q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
