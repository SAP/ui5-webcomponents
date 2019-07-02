import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://clinical-tast-tracker";
const transform = "translate(112,35)";
const d = "M352 416q14 0 23 -9t9 -23v-384q0 -13 -9 -22.5t-23 -9.5h-320q-13 0 -22.5 9.5t-9.5 22.5v384q0 14 9.5 23t22.5 9h67q5 12 14.5 21t23.5 11q8 14 23 23t32 9q18 0 33 -9t23 -23q14 -2 23.5 -11t13.5 -21h67zM144 416q-6 0 -11 -4.5t-5 -11.5t5 -11.5t11 -4.5h96 q16 0 16 16t-16 16h-16q0 14 -9 23t-23 9q-13 0 -22.5 -9t-9.5 -23h-16zM352 384h-67q-2 -5 -4 -9.5t-6 -9.5q-10 -13 -25 -13h-115q-15 0 -25 13q-4 5 -6 9.5t-4 9.5h-68v-384h320v384zM152 192q8 0 8 -8v-80q0 -8 -8 -8h-80q-8 0 -8 8v80q0 8 8 8h80zM140 171h-55v-54h55 v54zM152 320q8 0 8 -8v-80q0 -8 -8 -8h-80q-8 0 -8 8v80q0 8 8 8h80zM140 299h-55v-54h55v54zM304 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM304 288q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5 t11 4.5h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
