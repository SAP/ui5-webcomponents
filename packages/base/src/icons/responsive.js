import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://responsive";
const transform = "translate(48.5,35)";
const d = "M480 256q13 0 22.5 -9t9.5 -23v-192q0 -14 -9.5 -23t-22.5 -9h-96q-14 0 -23 9t-9 23v192q0 14 9 23t23 9h96zM480 32v192h-96v-192h96zM240 32q6 0 11 -4.5t5 -11.5q0 -6 -5 -11t-11 -5h-96q-7 0 -11.5 5t-4.5 11q0 16 16 16h96zM160 416v-192h128v-32h-128q-14 0 -23 9 t-9 23v192q0 14 9 23t23 9h256q13 0 22.5 -9t9.5 -23v-128h-32v128h-256zM96 352v-32h-64v-224h288v-32h-288q-14 0 -23 9.5t-9 22.5v224q0 14 9 23t23 9h64z";

registerIcon(name, transform, d);

export default {name, transform, d};
