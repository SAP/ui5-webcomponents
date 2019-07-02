import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://outbox";
const transform = "translate(48.5,35)";
const d = "M382 369q11 -12 0 -23q-12 -11 -23 0l-87 87v-226q0 -16 -16 -16t-16 16v224l-85 -85q-5 -5 -11 -5t-11 5q-12 11 0 23l102 101q9 10 22 10t23 -10zM480 160h-96q0 -32 -31 -32h-193q-32 0 -32 32h-96q-14 0 -23 -9.5t-9 -22.5v-128q0 -14 9 -23t23 -9h448q13 0 22.5 9 t9.5 23v128q0 13 -9.5 22.5t-22.5 9.5zM480 0h-448v128h71q17 -32 57 -32h193q39 0 56 32h71v-128zM336 64h-160q-7 0 -11.5 -5t-4.5 -11q0 -16 16 -16h160q6 0 11 4.5t5 11.5q0 6 -5 11t-11 5z";

registerIcon(name, transform, d);

export default {name, transform, d};
