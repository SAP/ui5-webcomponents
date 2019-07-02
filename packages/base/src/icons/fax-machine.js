import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fax-machine";
const transform = "translate(48.5,35)";
const d = "M32 32q-14 0 -23 9t-9 23v320q0 14 9 23t23 9h64q14 0 23 -9t9 -23v-320q0 -14 -9 -23t-23 -9h-64zM480 288q14 0 23 -9t9 -23v-256q0 -14 -9 -23t-23 -9h-448q-14 0 -23 9t-9 23h32h128h320v256h-320v32h320zM224 160q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23 t-23 -9zM320 160q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9zM416 160q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9zM416 64q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9zM320 64q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23 t-23 -9zM224 64q-14 0 -23 9t-9 23t9 23t23 9t23 -9t9 -23t-9 -23t-23 -9zM224 320h-32v128q0 14 9 23t23 9h160l96 -96v-64h-32v32h-63q-14 0 -23.5 9t-9.5 23v64h-128v-128z";

registerIcon(name, transform, d);

export default {name, transform, d};
