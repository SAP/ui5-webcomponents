import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://value-help";
const transform = "translate(80.5,35)";
const d = "M416 448q13 0 22.5 -9t9.5 -23v-224q0 -13 -9.5 -22.5t-22.5 -9.5h-96v32h96v224h-224v-96h-32v96q0 14 9 23t23 9h224zM256 288q13 0 22.5 -9t9.5 -23v-224q0 -13 -9.5 -22.5t-22.5 -9.5h-224q-14 0 -23 9.5t-9 22.5v224q0 14 9 23t23 9h224zM256 256h-224v-224h224v224 z";

registerIcon(name, transform, d);

export default {name, transform, d};
