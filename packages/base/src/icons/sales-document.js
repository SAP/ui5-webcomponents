import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sales-document";
const transform = "translate(83,35)";
const d = "M422 219q11 -14 11 -33q0 -23 -12.5 -37t-42.5 -19v-21h-18v20q-46 6 -54 53l32 4q2 -10 6 -15.5t16 -12.5v52q-29 8 -39 22.5t-10 32.5q0 20 12.5 34t36.5 16v13h18v-13q24 -2 35.5 -13.5t14.5 -29.5l-31 -4q-3 13 -19 20v-48q35 -11 44 -21zM360 288q-12 -4 -15.5 -10 t-3.5 -11q0 -7 3 -11.5t16 -10.5v43zM397 165q6 7 6 16q0 8 -4 13.5t-21 10.5v-49q14 3 19 9zM384 64v-64q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v352l128 128h224q13 0 22.5 -9t9.5 -23v-64h-32v64h-192v-96q0 -14 -9.5 -23t-23.5 -9h-95v-320h320v64h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
