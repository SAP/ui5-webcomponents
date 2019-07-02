import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://begin";
const transform = "translate(48.5,35)";
const d = "M502 246q10 -10 10 -23t-10 -22l-224 -192q-9 -10 -22 -10t-23 10q-9 9 -9 22t9 23l190 158q11 11 0 23l-189 159q-9 9 -9 22.5t9 22.5q10 10 23 10t23 -10zM50 6h-1l-8 -4t-9 -2q-14 0 -23 9.5t-9 22.5v17v367q0 14 9.5 23t22.5 9q9 0 17 -4l259 -191q16 -10 16 -28 t-16 -27zM244 225l-180 127v-256z";

registerIcon(name, transform, d);

export default {name, transform, d};
