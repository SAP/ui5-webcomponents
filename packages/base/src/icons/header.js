import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://header";
const transform = "translate(80.5,35)";
const d = "M448 32q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v384q0 13 9.5 22.5t22.5 9.5h384q14 0 23 -9.5t9 -22.5v-384zM416 320h-384v-288h384v288z";

registerIcon(name, transform, d);

export default {name, transform, d};
