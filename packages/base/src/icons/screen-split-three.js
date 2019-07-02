import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://screen-split-three";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9t9.5 -23v-384q0 -13 -9.5 -22.5t-22.5 -9.5h-384q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h384zM128 416h-96v-384h96v384zM288 416h-128v-384h128v384zM416 416h-96v-384h96v384z";

registerIcon(name, transform, d);

export default {name, transform, d};
