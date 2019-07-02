import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://wallet";
const transform = "translate(48.5,35)";
const d = "M448 256q26 0 45 -19t19 -45v-32q0 -26 -19 -45t-45 -19v-64q0 -14 -9.5 -23t-22.5 -9h-384q-14 0 -23 9t-9 23v288q0 13 9 22.5t23 9.5h32v64q0 13 9 22.5t23 9.5h128q13 0 22.5 -9.5t9.5 -22.5h96q13 0 22.5 -9.5t9.5 -22.5v-32h32q13 0 22.5 -9.5t9.5 -22.5v-64z M256 352h96v32h-96v-32zM96 352h128v32v32h-128v-32v-32zM416 96h-64q-27 0 -45.5 19t-18.5 45v32q0 26 18.5 45t45.5 19h64v64h-384v-288h384v64zM480 192q0 13 -9.5 22.5t-22.5 9.5h-96q-14 0 -23 -9.5t-9 -22.5v-32q0 -14 9 -23t23 -9h96q13 0 22.5 9t9.5 23v32zM368 192 q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5q-16 0 -16 16t16 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
