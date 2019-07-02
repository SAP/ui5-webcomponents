import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-activity-2";
const transform = "translate(49,35)";
const d = "M352 384h-67q-3 -10 -10 -20q-9 -12 -26 -12h-114q-17 0 -26 12q-7 10 -10 20h-67v-384h192v-32h-192q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h67q10 26 37 31q8 14 23 23.5t33 9.5t33 -9.5t23 -23.5q27 -5 37 -31h67q14 0 23 -9.5t9 -22.5v-128h-32v128zM240 384 q16 0 16 16q0 6 -4.5 11t-11.5 5h-16q0 13 -9 22.5t-23 9.5t-23 -9.5t-9 -22.5h-16q-7 0 -11.5 -5t-4.5 -11q0 -16 16 -16h96zM512 96v-32h-96v-96h-32v96h-96v32h96v96h32v-96h96zM240 64q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128 zM240 128q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM266 314l22 -21l-109 -131l-65 65l21 23l44 -44z";

registerIcon(name, transform, d);

export default {name, transform, d};
