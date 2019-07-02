import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expense-report";
const transform = "translate(56.5,35)";
const d = "M487 179q11 -14 11 -33q0 -23 -12.5 -37t-42.5 -19v-21h-18v20q-46 6 -54 53l32 4q2 -10 6 -15.5t16 -12.5v52q-29 8 -39 22.5t-10 32.5q0 20 12.5 34t36.5 16v13h18v-13q24 -2 35.5 -13.5t14.5 -29.5l-31 -4q-3 13 -19 20v-48q35 -11 44 -21zM425 248q-12 -4 -15.5 -10 t-3.5 -11q0 -7 3 -11.5t16 -10.5v43zM462 125q6 7 6 16q0 8 -4 13.5t-21 10.5v-49q15 3 19 9zM416 32h32v-32q0 -14 -9 -23t-23 -9h-288q-14 0 -23 9t-9 23v288l97 96h223q13 0 22.5 -9t9.5 -23v-32h-32v32h-191v-64q0 -14 -9.5 -23t-23.5 -9h-64v-256h288v32zM32 64h-32 v384q0 14 9.5 23t22.5 9h288v-32h-288v-384zM303 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-127q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h127zM303 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-127q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h127z";

registerIcon(name, transform, d);

export default {name, transform, d};
