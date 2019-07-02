import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://filter-fields";
const transform = "translate(80.5,35)";
const d = "M16 416q-6 0 -11 4.5t-5 11.5q0 6 5 11t11 5h160q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-160zM16 160q-6 0 -11 4.5t-5 11.5q0 6 5 11t11 5h160q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-160zM416 384q14 0 23 -9.5t9 -22.5v-64q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9 t-9.5 23v64q0 13 9.5 22.5t22.5 9.5h384zM416 352h-384v-64h384v64zM416 128q14 0 23 -9.5t9 -22.5v-64q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v64q0 13 9.5 22.5t22.5 9.5h384zM416 96h-384v-64h384v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
