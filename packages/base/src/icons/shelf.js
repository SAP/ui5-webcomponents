import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shelf";
const transform = "translate(112.5,35)";
const d = "M352 480q13 0 22.5 -9t9.5 -23v-224v-32v-96v-32v-96h-32v96h-320v-96h-32v480q0 14 9 23t23 9h320zM32 352h320v96h-320v-96zM352 192h-320v-96h320v96zM352 224v96h-320v-96h320zM240 416q16 0 16 -16t-16 -16h-96q-16 0 -16 16t16 16h96zM144 128q-16 0 -16 16t16 16 h96q16 0 16 -16t-16 -16h-96zM240 288q16 0 16 -16t-16 -16h-96q-16 0 -16 16t16 16h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
