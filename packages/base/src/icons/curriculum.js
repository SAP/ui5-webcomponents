import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://curriculum";
const transform = "translate(48.5,35)";
const d = "M365 322q8 -4 13.5 -9.5t5.5 -13.5v-164q0 -4 -1 -8q-2 -8 -6 -11q-2 -1 -6 -1q-5 0 -13 2q-4 1 -6 3v160q0 8 -2 11.5t-10 8.5l-88 20h-5q-6 0 -9 -1l-53 -14l116 -33q8 -4 13.5 -9.5t5.5 -13.5v-163q0 -11 -7 -17.5t-17 -6.5h-5l-144 49q-8 2 -13.5 8.5t-5.5 14.5v167 q0 17 15 22l90 27q6 2 9 2t5 -1zM160 278v-137l128 -45v146zM480 416q11 0 18 -5t10 -11q4 -7 4 -16v-352q0 -12 -5 -18.5t-11 -9.5q-7 -4 -16 -4h-448q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h187l37 -32h224zM480 352q-1 9 -5 16q-3 6 -9.5 11 t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h384q9 0 16 4q6 3 11 9t5 19v288z";

registerIcon(name, transform, d);

export default {name, transform, d};
