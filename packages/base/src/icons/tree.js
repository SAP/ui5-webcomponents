import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://tree";
const transform = "translate(80.5,35)";
const d = "M416 128q13 0 22.5 -9.5t9.5 -22.5v-64q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v64q0 13 9 22.5t23 9.5h32v32q0 13 -9 22.5t-23 9.5h-112v-64h16q13 0 22.5 -9.5t9.5 -22.5v-64q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v64q0 13 9 22.5t23 9.5h16v64 h-112q-14 0 -23 -9.5t-9 -22.5v-32h32q13 0 22.5 -9.5t9.5 -22.5v-64q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v64q0 13 9 22.5t23 9.5v32q0 26 19 45t45 19h112v64h-80q-14 0 -23 9t-9 23v96q0 13 9 22.5t23 9.5h192q13 0 22.5 -9.5t9.5 -22.5v-96q0 -14 -9.5 -23 t-22.5 -9h-80v-64h112q26 0 45 -19t19 -45v-32zM32 96v-64h64v64h-64zM192 96v-64h64v64h-64zM320 320v96h-192v-96h192zM416 96h-64v-64h64v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
