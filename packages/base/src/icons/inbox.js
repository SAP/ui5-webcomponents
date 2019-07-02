import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inbox";
const transform = "translate(48.5,35)";
const d = "M280 202q-10 -10 -23 -10t-22 10l-102 101q-12 12 0 23q11 11 22 0l85 -85v223q0 16 16 16t16 -16v-225l87 87q11 11 23 0q5 -5 5 -11.5t-5 -11.5zM480 160q13 0 22.5 -9.5t9.5 -22.5v-128q0 -14 -9.5 -23t-22.5 -9h-448q-14 0 -23 9t-9 23v128q0 13 9 22.5t23 9.5h96 q0 -32 32 -32h193q31 0 31 32h96zM480 128h-71q-17 -32 -56 -32h-193q-40 0 -57 32h-71v-128h448v128zM336 64q6 0 11 -5t5 -11q0 -7 -5 -11.5t-11 -4.5h-160q-16 0 -16 16q0 6 4.5 11t11.5 5h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
