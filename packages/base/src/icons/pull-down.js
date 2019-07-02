import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pull-down";
const transform = "translate(80.5,35)";
const d = "M439 219q9 -10 9 -23t-9 -22l-192 -197l-2 -1q-1 -1 -1.5 -1t-1.5 -1q-2 -1 -3.5 -2t-3.5 -2t-6 -1q-2 0 -2.5 -0.5t-2.5 -0.5q-5 0 -11 2q-2 1 -2.5 1.5t-2.5 1.5t-2.5 1.5t-2.5 1.5l-1 1h-1l-191 197q-10 9 -10 22t10 23q9 9 22 9t23 -9l139 -141q0 2 -0.5 7.5t-1 25.5 t-0.5 61.5v115.5h64l-1 -210l139 141q9 9 22 9t23 -9zM256 448h-64v32h64v-32zM256 384h-64v32h64v-32zM256 320h-64v32h64v-32z";

registerIcon(name, transform, d);

export default {name, transform, d};
