import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://folder-blank";
const transform = "translate(48.5,35)";
const d = "M480 416q11 0 18 -5t10 -11q4 -7 4 -16v-352q0 -12 -5 -18.5t-11 -9.5q-7 -4 -16 -4h-448q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h187l29 -32h232zM480 352q-1 9 -5 16q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11 q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h384q9 0 16 4q6 3 11 9t5 19v288z";

registerIcon(name, transform, d);

export default {name, transform, d};
