import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-next-page";
const transform = "translate(48.25,35)";
const d = "M32 0h192v-32h-191q-14 0 -23.5 9t-9.5 23v352l128 128h256q14 0 23 -9.5t9 -22.5v-64h-32v64h-224v-96q0 -14 -9.5 -23t-22.5 -9h-96v-320zM421 -22q-9 -10 -22.5 -10t-22.5 10l-84 91q-5 5 -5 11.5t5 11.5t11.5 5t11.5 -5l69 -76v288q0 16 16 16q6 0 11 -4.5t5 -11.5 v-288l68 76q5 5 11.5 5t11.5 -5q11 -12 0 -23z";

registerIcon(name, transform, d);

export default {name, transform, d};
