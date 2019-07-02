import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://camera";
const transform = "translate(48.5,35)";
const d = "M480 352q9 0 16 -4q6 -3 11 -9t5 -17v-290q0 -12 -9 -22t-23 -10h-448q-13 0 -22.5 10t-9.5 22v290q0 13 9.5 21.5t22.5 8.5h64q4 14 12 30.5t17 31t18 24.5t17 10h192q8 0 17.5 -9.5t18.5 -24t16 -31.5t12 -31h64zM480 320h-1h-63h-23l-7 22q-8 25 -20 46t-19 28h-181 q-8 -7 -19.5 -28t-19.5 -46l-7 -22h-24h-64v-288h448v288zM256 320q27 0 50 -10t40.5 -27.5t27.5 -41t10 -49.5q0 -27 -10 -50t-27.5 -40.5t-40.5 -27.5t-50 -10t-50 10t-40.5 27.5t-27.5 40.5t-10 50q0 26 10 49.5t27.5 41t40.5 27.5t50 10zM256 96q40 0 68 28t28 68 t-28 68t-68 28t-68 -28t-28 -68t28 -68t68 -28zM432 288q16 0 16 -16t-16 -16t-16 16t16 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
