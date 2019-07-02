import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://document-text";
const transform = "translate(112.5,35)";
const d = "M352 480q14 0 23 -9.5t9 -22.5v-448q0 -14 -9 -23t-22 -9h-320q-14 0 -23.5 9t-9.5 23v352l128 128h224zM353 0l-1 448h-192v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320h321zM272 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160z M272 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
