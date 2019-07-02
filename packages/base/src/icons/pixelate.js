import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pixelate";
const transform = "translate(80.5,35)";
const d = "M256 128v-64h-64v64h64zM416 448q14 0 23 -9.5t9 -22.5v-32v-64v-64h-64v64h-64v-64h-64v64h-64v-64h-64v64h-64v-64h-64v64v64v32q0 13 9 22.5t23 9.5h32h64h64h64h64h64h32zM128 192h-64v64h64v-64zM64 192v-64h-64v64h64zM128 128v-64h-64v64h64zM192 192v-64h-64v64 h64zM192 192v64h64v-64h-64zM320 256h64v-64h-64v64zM384 128v64h64v-64h-64zM256 192h64v-64h-64v64zM0 64h64v-64h-32q-14 0 -23 9t-9 23v32zM128 64h64v-64h-64v64zM256 64h64v-64h-64v64zM384 0v64h64v-32q0 -14 -9 -23t-23 -9h-32zM320 128h64v-64h-64v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
