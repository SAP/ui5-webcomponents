import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://comment";
const transform = "translate(48,35)";
const d = "M32 256q0 -14 9 -23t23 -9h64v-32h-64q-27 0 -45.5 19t-18.5 45v160q0 26 18.5 45t45.5 19h224q26 0 45 -19t19 -45v-64h-32v64q0 14 -9.5 23t-22.5 9h-224q-14 0 -23 -9t-9 -23v-160zM448 320q26 0 45 -19t19 -45v-128q0 -27 -19 -45.5t-45 -18.5v-76q0 -9 -6.5 -14.5 t-14.5 -5.5t-13 4l-78 91l-112 1q-26 0 -45 18.5t-19 45.5v128q0 26 19 45t45 19h224zM480 256q0 13 -9.5 22.5t-22.5 9.5h-224q-14 0 -23 -9.5t-9 -22.5v-128q0 -14 9 -23t23 -9l128 -1l64 -79v80h32q13 0 22.5 9t9.5 23v128z";

registerIcon(name, transform, d);

export default {name, transform, d};
