import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://outdent";
const transform = "translate(80.5,35)";
const d = "M293 226q-7 -7 0 -10l53 -60q11 -12 0 -23q-12 -10 -23 0l-58 65q-9 9 -9 22t9 23l61 65q11 11 22 0q13 -13 0 -22zM432 416q16 0 16 -16t-16 -16h-416q-16 0 -16 16t16 16h416zM16 288q-16 0 -16 16t16 16h160q16 0 16 -16t-16 -16h-160zM16 192q-16 0 -16 16t16 16h160 q16 0 16 -16t-16 -16h-160zM16 96q-16 0 -16 16t16 16h160q16 0 16 -16t-16 -16h-160zM432 32q16 0 16 -16t-16 -16h-416q-16 0 -16 16t16 16h416z";

registerIcon(name, transform, d);

export default {name, transform, d};
