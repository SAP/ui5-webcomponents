import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-prev-page";
const transform = "translate(48.25,35)";
const d = "M384 64h32v-64q0 -14 -8.5 -23t-22.5 -9h-352q-14 0 -23.5 9t-9.5 23v352l128 128h128v-32h-96v-96q0 -14 -9 -23t-23 -9h-96v-320h352v64zM507 379q11 -11 0 -23q-5 -5 -11.5 -5t-11.5 5l-68 76v-288q0 -7 -5 -11.5t-11 -4.5q-16 0 -16 16v288l-69 -76q-5 -5 -11.5 -5 t-11.5 5t-5 11.5t5 11.5l84 91q9 10 22.5 10t22.5 -10z";

registerIcon(name, transform, d);

export default {name, transform, d};
