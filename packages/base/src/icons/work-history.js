import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://work-history";
const transform = "translate(48.5,35)";
const d = "M480 416q11 0 18 -5t10 -11q4 -7 4 -16v-352q0 -12 -5 -18.5t-11 -9.5q-7 -4 -16 -4h-448q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h187l37 -32h224zM480 352q-1 9 -5 16q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11 q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h384q9 0 16 4q6 3 11 9t5 19v288zM192 193q23 0 41 -2t30 -11t18.5 -28.5t6.5 -54.5h-192q0 35 6.5 54.5t18.5 28.5t30 11t41 2zM256 257q0 -27 -19 -45.5t-45 -18.5t-45 18.5t-19 45.5q0 26 19 45t45 19t45 -19t19 -45z M400 257q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM400 321q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, transform, d);

export default {name, transform, d};
