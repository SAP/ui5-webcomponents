import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://org-chart";
const transform = "translate(80.5,35)";
const d = "M416 128q14 0 23 -9.5t9 -22.5v-64q0 -14 -9 -23t-23 -9h-128q-13 0 -22.5 9t-9.5 23v64q0 13 9.5 22.5t22.5 9.5h64v32q0 14 -9 23t-23 9h-192q-14 0 -23 -9t-9 -23v-32h64q14 0 23 -9.5t9 -22.5v-64q0 -14 -9 -23t-23 -9h-128q-13 0 -22.5 9t-9.5 23v64q0 13 9.5 22.5 t22.5 9.5h32v32q0 26 19 45t45 19h80v64h-80q-14 0 -23 9t-9 23v96q0 13 9 22.5t23 9.5h192q14 0 23 -9.5t9 -22.5v-96q0 -14 -9 -23t-23 -9h-80v-64h80q26 0 45 -19t19 -45v-32h32zM32 96v-64h128v64h-128zM320 320v96h-192v-96h192zM416 96h-128v-64h128v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
