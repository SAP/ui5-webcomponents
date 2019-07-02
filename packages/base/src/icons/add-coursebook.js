import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-coursebook";
const transform = "translate(48.5,35)";
const d = "M128 96h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zM493 420q8 -2 13.5 -8.5t5.5 -15.5v-344q0 -4 -1 -8l-2 -6t-4 -5q-1 -1 -5 -1q-5 0 -13 2q-4 1 -7 3v333q0 8 -5 14.5t-13 8.5l-206 53q-1 0 -2 0.5t-3 0.5q-3 0 -9 -2l-88 -34l244 -61q18 -5 18 -24v-334 q0 -11 -7 -17.5t-17 -6.5h-4l-132 38v33l128 -37v318l-256 64v-128h-32v151q0 17 16 22l129 49q6 2 9 2t5 -1z";

registerIcon(name, transform, d);

export default {name, transform, d};
