import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://excel-attachment";
const transform = "translate(48.5,35)";
const d = "M512 320v-224h-320v224h320zM480 288h-64v-63h64v63zM384 225v63h-63v-63h63zM321 193v-65h63v65h-63zM224 288v-63h65v63h-65zM224 128h65v65h-65v-65zM480 128v65h-64v-65h64zM384 64v-64q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9 t9.5 -23v-96h-32v96h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v64h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
