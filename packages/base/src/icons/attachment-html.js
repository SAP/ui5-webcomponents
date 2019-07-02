import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-html";
const transform = "translate(48,35)";
const d = "M241 297q7 -6 7 -15q0 -6 -3 -10l-64 -80l64 -81q2 -6 2 -11q0 -6 -3.5 -12t-13.5 -6q-7 0 -14 7l-82 103l82 102q4 7 14 7q6 0 11 -4zM341 306q5 14 18 14q8 0 12.5 -6t4.5 -12t-1 -7l-72 -219q-4 -13 -18 -13q-8 0 -13 6t-5 13q0 5 1 6zM402 86q-7 4 -7 14q0 7 4 11 l64 81l-64 80q-4 4 -4 11q0 8 5 13t13 5t15 -7l82 -102l-82 -103q-7 -7 -15 -7q-7 0 -11 4zM352 32h32v-32q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-32h-32v32h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
