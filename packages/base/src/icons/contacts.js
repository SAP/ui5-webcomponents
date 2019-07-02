import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://contacts";
const transform = "translate(48.5,35)";
const d = "M512 352q0 -14 -9 -23t-23 -9v-32q14 0 23 -9t9 -23v-64q0 -14 -9 -23t-23 -9v-32q14 0 23 -9t9 -23v-64q0 -14 -9 -23t-23 -9q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v64h-32v32h32v32h-32v32h32v128h-32v32h32v32h-32v32h32v64q0 14 9.5 23t22.5 9h384 q14 0 23 -9t9 -23q14 0 23 -9t9 -23v-64zM448 32v64v96v64v96v64v32h-384v-64h32v-32h-32v-32h32v-32h-32v-128h32v-32h-32v-32h32v-32h-32v-64h384v32zM160 384h224v-64h-224v64z";

registerIcon(name, transform, d);

export default {name, transform, d};
