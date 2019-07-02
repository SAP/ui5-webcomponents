import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://customer-briefing";
const transform = "translate(48.5,35)";
const d = "M512 352q0 -13 -9 -22.5t-23 -9.5v-32q14 0 23 -9t9 -23v-64q0 -13 -9 -22.5t-23 -9.5v-32q14 0 23 -9t9 -23v-64q0 -13 -9 -22.5t-23 -9.5q0 -13 -9 -22.5t-23 -9.5h-384q-13 0 -22.5 9.5t-9.5 22.5v64h-32v32h32v32h-32v32h32v128h-32v32h32v32h-32v32h32v64 q0 14 9.5 23t22.5 9h384q14 0 23 -9t9 -23q14 0 23 -9t9 -23v-64zM448 448h-384v-64h32v-32h-32v-32h32v-32h-32v-128h32v-32h-32v-32h32v-32h-32v-64h384v32v64v96v64v96v64v32zM384 96h-224v32q0 54 21.5 75t74.5 21h16h16q54 0 75 -21t21 -75v-32zM352 128 q0 20 -2.5 32.5t-9.5 19.5t-19.5 9.5t-32.5 2.5h-32q-20 0 -32.5 -2.5t-19.5 -9.5t-9.5 -19.5t-2.5 -32.5h160zM352 304q0 -33 -23.5 -56.5t-56.5 -23.5t-56.5 23.5t-23.5 56.5t23.5 56.5t56.5 23.5t56.5 -23.5t23.5 -56.5zM272 256q20 0 34 14t14 34t-14 34t-34 14t-34 -14 t-14 -34t14 -34t34 -14z";

registerIcon(name, transform, d);

export default {name, transform, d};
