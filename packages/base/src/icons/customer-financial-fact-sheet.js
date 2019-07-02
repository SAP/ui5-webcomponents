import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://customer-financial-fact-sheet";
const transform = "translate(49.5,35)";
const d = "M319 244q5 -7 11 -9v46q-23 6 -32.5 18.5t-9.5 29.5q0 39 42 45v10h16v-10q35 -6 41 -38l-28 -4q-3 14 -13 18v-43q24 -8 35 -18t11 -30q0 -19 -13 -33.5t-33 -16.5v-21h-16v21q-38 3 -47 47l30 3q1 -11 6 -15zM346 233q18 5 18 22q0 15 -18 21v-43zM330 350 q-8 -2 -11.5 -8t-3.5 -11q0 -15 15 -19v38zM416 480q14 0 23 -9.5t9 -22.5v-448q0 -14 -9 -23t-22 -9h-384q-14 0 -23.5 9t-9.5 23v352l128 128h288zM417 0l-1 448h-256v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320h385zM367 128q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64 q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h64zM367 64q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-64q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h64zM160 128q47 0 71.5 -21t24.5 -75h-192q0 54 24.5 75t71.5 21zM224 192q0 -26 -19 -45t-45 -19t-45 19t-19 45q0 27 19 45.5t45 18.5 t45 -18.5t19 -45.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
