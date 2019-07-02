import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measurement-document";
const transform = "translate(49,35)";
const d = "M224 320h32v-320q0 -13 -9.5 -22.5t-22.5 -9.5h-160q-14 0 -23 9.5t-9 22.5v209q-1 22 -5 43q-3 18 -9 37t-17 31h37q5 -4 9.5 -19.5t8.5 -32.5q4 -20 8 -44h96v-32h-96v-32h96v-32h-96v-32h96v-32h-96v-64h160v320zM480 448q13 0 22.5 -9t9.5 -23v-352q0 -13 -9.5 -22.5 t-22.5 -9.5h-192v32h192v288h-320v-32h-32v96q0 14 9 23t23 9h32v32h32v-32h192v32h32v-32h32zM224 416h-32v-32h32v32zM448 416h-32v-32h32v32zM320 224v-96h32v160h32v-160h32v96h32v-96v-32h-32h-32h-32h-32h-32v128h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
