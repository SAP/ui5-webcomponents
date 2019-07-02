import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://screen-split-one";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9t9 -23v-384q0 -13 -9 -22.5t-23 -9.5h-384q-14 0 -23 9.5t-9 22.5v384q0 14 9 23t23 9h384zM128 32v384h-96v-384h96zM416 416h-256v-384h256v384z";

registerIcon(name, transform, d);

export default {name, transform, d};
