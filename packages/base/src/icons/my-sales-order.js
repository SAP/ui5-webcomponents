import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://my-sales-order";
const transform = "translate(64.5,35)";
const d = "M455 211q11 -14 11 -33q0 -23 -12.5 -37t-42.5 -19v-21h-18v20q-46 6 -54 53l32 4q2 -10 6 -15.5t16 -12.5v52q-29 8 -39 22.5t-10 32.5q0 20 12.5 34t36.5 16v13h18v-13q24 -2 35.5 -13.5t14.5 -29.5l-31 -4q-3 13 -19 20v-48q35 -11 44 -21zM393 280q-12 -4 -15.5 -10 t-3.5 -11q0 -7 3 -11.5t16 -10.5v43zM430 157q6 7 6 16q0 8 -4 13.5t-21 10.5v-49q15 3 19 9zM383 64h32v-64q0 -14 -9 -23t-23 -9h-288q-14 0 -23 9t-9 23v320l96 96h224q13 0 22.5 -9t9.5 -23v-32h-32v32h-191v-64q0 -14 -9.5 -23t-23.5 -9h-64v-288h288v64zM287 448h-256 v-384h-31v384q0 14 9 23t22 9h288v-32h-32zM127 32q0 24 6.5 37t18.5 19t30 7t41 1q24 0 42 -1t30 -7t18 -19t6 -37h-192zM287 160q0 -26 -18.5 -45t-45.5 -19q-26 0 -45 19t-19 45t19 45t45 19q27 0 45.5 -19t18.5 -45z";

registerIcon(name, transform, d);

export default {name, transform, d};
