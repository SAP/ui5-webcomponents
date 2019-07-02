import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://flight";
const transform = "translate(80.5,35)";
const d = "M438 437q9 -9 10 -24.5t-3 -32t-12.5 -32t-17.5 -24.5l-45 -45l68 -204l-68 -68l-91 181l-87 -66v-90l-32 -32l-62 98l-98 62l32 32h91l66 87l-181 90l68 68l203 -68l45 45q14 14 37 24t45 10q21 0 32 -11zM392 347q7 7 12.5 17t8.5 20.5t3.5 19t-1.5 11.5h-2 q-2 0 -3.5 0.5t-3.5 0.5q-15 0 -33 -8t-26 -16l-45 -45l-14 -14l-19 6l-185 61l-22 -22l141 -71l34 -17l-23 -31l-66 -86l-9 -13h-16h-63l55 -35l6 -4l4 -6l35 -55v62v16l13 10l87 66l31 23l17 -34l71 -142l22 23l-62 185l-6 18l14 14z";

registerIcon(name, transform, d);

export default {name, transform, d};
