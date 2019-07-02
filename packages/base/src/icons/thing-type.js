import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://thing-type";
const transform = "translate(48.5,35)";
const d = "M448 288q26 0 45 -19t19 -45v-96q0 -27 -19 -45.5t-45 -18.5l-48 -1l-78 -91q-5 -4 -13 -4t-14.5 5.5t-6.5 14.5v76q-26 0 -45 18.5t-19 45.5v96q0 26 19 45t45 19h160zM256 128q0 -14 9.5 -23t22.5 -9h32v-80l64 79l64 1q14 0 23 9t9 23v96q0 13 -9 22.5t-23 9.5h-160 q-13 0 -22.5 -9.5t-9.5 -22.5v-96zM160 287l57 1q-13 -14 -19 -33h-22l-78 -91q-5 -4 -13 -4t-14.5 5.5t-6.5 14.5v76q-26 0 -45 18.5t-19 45.5v96q0 26 19 45t45 19h160q26 0 45 -19t19 -45v-96q-9 0 -17.5 -2t-16.5 -5q2 4 2 7v96q0 13 -9.5 22.5t-22.5 9.5h-160 q-14 0 -23 -9.5t-9 -22.5v-96q0 -14 9 -23t23 -9h32v-80z";

registerIcon(name, transform, d);

export default {name, transform, d};
