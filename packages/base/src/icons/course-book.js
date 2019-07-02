import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://course-book";
const transform = "translate(80.5,35)";
const d = "M429 420q8 -2 13.5 -8.5t5.5 -15.5v-344q0 -4 -1 -8l-2 -6t-4 -5q-1 -1 -5 -1q-5 0 -13 2q-4 1 -7 3v328q0 8 -5 14.5t-13 8.5l-238 58q-2 0 -2.5 0.5t-2.5 0.5q-3 0 -9 -2l-88 -34l275 -61q19 -5 19 -24v-334q0 -11 -7 -17.5t-17 -6.5h-4l-304 77q-8 2 -14 8.5t-6 15.5 v338q0 17 15 22l130 49q6 2 9 2t5 -1zM51 380l-19 4v-309l288 -73v318z";

registerIcon(name, transform, d);

export default {name, transform, d};
