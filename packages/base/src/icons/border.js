import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://border";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9t9.5 -23v-384q0 -14 -9.5 -23t-22.5 -9h-384q-14 0 -23 9t-9 23v384q0 14 9 23t23 9h384zM416 416h-384v-384h384v384z";

registerIcon(name, transform, d);

export default {name, transform, d};
