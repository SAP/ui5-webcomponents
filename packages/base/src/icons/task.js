import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://task";
const transform = "translate(112.5,35)";
const d = "M352 416q13 0 22.5 -9t9.5 -23v-384q0 -14 -9.5 -23t-22.5 -9h-320q-14 0 -23 9t-9 23v384q0 14 9 23t23 9h67q4 12 14 20.5t23 10.5q8 15 23 24t33 9t32.5 -9t22.5 -24q14 -2 23.5 -10.5t14.5 -20.5h67zM144 416q-16 0 -16 -16t16 -16h96q16 0 16 16t-16 16h-16 q0 14 -9.5 23t-22.5 9q-14 0 -23 -9t-9 -23h-16zM352 384h-67q-3 -10 -11 -20q-11 -12 -25 -12h-114q-16 0 -26 12q-7 10 -10 20h-67v-384h320v384zM264 279l24 -24l-121 -145l-72 72l23 26l49 -49z";

registerIcon(name, transform, d);

export default {name, transform, d};
