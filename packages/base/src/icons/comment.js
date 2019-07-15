import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://comment";
const viewBox = "0 -32 512 512";
const d = "M32 256q0-14 9-23t23-9h64v-32H64q-27 0-45.5 19T0 256v160q0 26 18.5 45T64 480h224q26 0 45-19t19-45v-64h-32v64q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V256zm416 64q26 0 45-19t19-45V128q0-27-19-45.5T448 64v-76q0-9-6.5-14.5T427-32t-13 4l-78 91-112 1q-26 0-45 18.5T160 128v128q0 26 19 45t45 19h224zm32-64q0 13-9.5 22.5T448 288H224q-14 0-23-9.5t-9-22.5V128q0-14 9-23t23-9l128-1 64-79v80h32q13 0 22.5 9t9.5 23v128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
