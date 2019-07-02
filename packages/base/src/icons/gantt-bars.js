import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://gantt-bars";
const transform = "translate(48.5,35)";
const d = "M448 64h32v-64q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v192h32v-192h384v64zM64 288h-32v128q0 13 9.5 22.5t22.5 9.5h64v32h32v-32h192v32h32v-32h64q14 0 23 -9.5t9 -22.5v-256h-32v192h-384v-64zM352 384h32v32h-32v-32zM128 384h32v32h-32v-32zM192 224 h-192v32h288q7 0 11.5 -5t4.5 -11q0 -4 -10 -16.5t-22 -26.5q-14 -17 -31 -36zM512 128v-32h-96l-47 -64l-49 64h-64l-47 -65q-19 20 -33 37q-12 14 -22 27t-10 17q0 6 4.5 11t11.5 5h352z";

registerIcon(name, transform, d);

export default {name, transform, d};
