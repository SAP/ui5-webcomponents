import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://document";
const transform = "translate(112.5,35)";
const d = "M352 480q14 0 23 -9t9 -23v-448q0 -14 -8.5 -23t-22.5 -9h-320q-14 0 -23.5 9t-9.5 23v352l128 128h224zM353 0l-1 448h-192v-96q0 -14 -9 -23t-23 -9h-96v-320h321z";

registerIcon(name, transform, d);

export default {name, transform, d};
