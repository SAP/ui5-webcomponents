import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://course-program";
const transform = "translate(48.5,35)";
const d = "M32 0h160v-32h-159q-14 0 -23.5 9t-9.5 23v352l128 128h224q14 0 23 -9.5t9 -22.5v-64h-32v64h-192v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320zM493 272q8 -5 13.5 -10.5t5.5 -13.5v-196q0 -4 -1 -8q-1 -3 -2.5 -6t-4.5 -5q-1 -1 -5 -1q-5 0 -13 2q-4 1 -6 3v193 q0 8 -5.5 13.5t-13.5 9.5l-113 33q-2 1 -6 1t-8 -2l-53 -13l148 -50q8 -5 13.5 -10.5t5.5 -13.5v-195q0 -10 -7 -17t-17 -7h-5l-176 66q-8 2 -13.5 8.5t-5.5 15.5v199q0 15 15 22l90 27q6 2 8 2t3 -0.5t2 -0.5zM256 245v-170l160 -62v179z";

registerIcon(name, transform, d);

export default {name, transform, d};
