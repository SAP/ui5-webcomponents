import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://timesheet";
const transform = "translate(48.5,35)";
const d = "M352 127h32v-127q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23h-32h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v127zM432 256q16 0 16 16t-16 16h-33v48q0 16 -16 16t-16 -16v-48v-16v-16h65zM384 160q27 0 50 10t40.5 27.5 t27.5 41t10 49.5q0 27 -10 50t-27.5 40.5t-40.5 27.5t-50 10t-50 -10t-40.5 -27.5t-27.5 -40.5t-10 -50q0 -26 10 -49.5t27.5 -41t40.5 -27.5t50 -10zM384 384q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68t28 68t68 28z";

registerIcon(name, transform, d);

export default {name, transform, d};
