import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://account";
const transform = "translate(80.5,35)";
const d = "M256 289q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM160 225q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5q-27 0 -45.5 -18.5t-18.5 -45.5q0 -26 18.5 -45t45.5 -19zM192 192q26 0 49.5 -10t41 -27t27.5 -40t10 -50v-65h-320v65q0 27 10 50t27.5 40 t40.5 27t50 10h32h32zM288 65q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68v-32h256v32zM432 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128zM432 384q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5 t11 4.5h128zM432 448q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-128q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, transform, d);

export default {name, transform, d};
