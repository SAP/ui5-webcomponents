import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-folder";
const transform = "translate(48.5,35)";
const d = "M416 96h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zM480 416q11 0 18 -5t10 -11q4 -7 4 -16v-128h-32v96q-1 9 -5 16q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h161v-32h-193q-9 0 -16 4 q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h186l30 -32h232z";

registerIcon(name, transform, d);

export default {name, transform, d};
