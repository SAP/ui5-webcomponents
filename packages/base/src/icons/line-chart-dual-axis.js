import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart-dual-axis";
const transform = "translate(80.5,35)";
const d = "M448 449v-449h-448v449h32v-417h384v417h32zM350 192q1 1 7 1q7 0 12.5 -4.5t5.5 -13.5q0 -11 -11 -16l-108 -58l-87 18l-68 -51q-2 -3 -8 -3q-7 0 -13 4.5t-6 12.5q0 12 11 18l80 59l87 -19zM93 139q-6 0 -12.5 5t-6.5 13q0 9 9 15l80 78l87 -19l96 86q7 4 12 4 q6 0 11.5 -6t5.5 -13q0 -9 -8 -15l-108 -95l-89 19l-67 -69q-5 -3 -10 -3zM93 212q-6 0 -12 4.5t-6 12.5q0 9 7 15l78 96h85l97 102q6 7 15 7q8 0 13 -5.5t5 -12.5q0 -6 -4 -11l-108 -117h-89l-69 -87q-4 -4 -12 -4z";

registerIcon(name, transform, d);

export default {name, transform, d};
