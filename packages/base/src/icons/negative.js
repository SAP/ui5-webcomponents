import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://negative";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9.5t9.5 -22.5v-384q0 -14 -9.5 -23t-22.5 -9h-384q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h384zM416 416h-384v-384h384v384zM96 208v32h256v-32h-256z";

registerIcon(name, transform, d);

export default {name, transform, d};
