import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://generate-shortcut";
const transform = "translate(64.5,35)";
const d = "M448 448q14 0 23 -9.5t9 -22.5v-384q0 -14 -9 -23t-23 -9h-256v32h256v288h-384v-32h-32v128q0 13 9.5 22.5t22.5 9.5h384zM129 224q14 -2 22.5 -11.5t8.5 -23.5l-9 -84q0 -15 -16 -15q-7 1 -11.5 6t-3.5 11l5 58q-18 -8 -35 -18t-30 -22t-20.5 -27t-7.5 -34q0 -20 6 -32 t16.5 -19t23.5 -9.5t28 -3.5h-1q16 0 16 -16t-16 -16l-14 1q-17 0 -33 5t-29 17t-21 30t-8 43t10 45.5t25 36.5t31.5 27t29.5 17q2 1 2.5 1t2.5 1l-57 1q-7 1 -11.5 5.5t-3.5 11.5q0 6 5 10.5t11 3.5h84z";

registerIcon(name, transform, d);

export default {name, transform, d};
