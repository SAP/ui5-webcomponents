import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://chart-table-view";
const transform = "translate(64.5,35)";
const d = "M448 256q13 0 22.5 -9.5t9.5 -22.5v-224q0 -14 -9.5 -23t-22.5 -9h-352q-14 0 -23 9t-9 23v224q0 13 9 22.5t23 9.5h352zM192 96h-96v-96h96v96zM192 224h-96v-96h96v96zM320 96h-96v-96h96v96zM320 224h-96v-96h96v96zM448 96h-96v-96h96v96zM448 224h-96v-96h96v96z M80 448q-16 0 -16 16q0 6 4.5 11t11.5 5h352q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-352zM80 384q-16 0 -16 16q0 6 4.5 11t11.5 5h224q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-224zM32 144q0 -16 -16 -16q-6 0 -11 4.5t-5 11.5v64q0 7 5 11.5t11 4.5q16 0 16 -16v-64zM32 15 q0 -16 -16 -16q-6 0 -11 4.5t-5 11.5v64q0 7 5 11.5t11 4.5q16 0 16 -16v-64zM32 336q0 -16 -16 -16q-6 0 -11 4.5t-5 11.5v129q0 7 5 11.5t11 4.5q16 0 16 -16v-129zM80 320q-16 0 -16 16q0 6 4.5 11t11.5 5h96q7 0 11.5 -5t4.5 -11q0 -16 -16 -16h-96z";

registerIcon(name, transform, d);

export default {name, transform, d};
