import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ppt-attachment";
const transform = "translate(48.5,35)";
const d = "M352 48h32v-48q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-64h-32v64h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v48zM480 288q13 0 22.5 -9.5t9.5 -22.5v-128q0 -14 -9.5 -23t-22.5 -9h-160q-14 0 -23 9t-9 23v32h-32 q-14 0 -23 9t-9 23v128q0 13 9 22.5t23 9.5h160q13 0 22.5 -9.5t9.5 -22.5v-32h32zM288 256q0 13 9 22.5t23 9.5h96v32h-160v-128h32v64zM480 256h-32h-32h-96v-64v-32v-32h160v128z";

registerIcon(name, transform, d);

export default {name, transform, d};
