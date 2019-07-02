import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart";
const transform = "translate(64.5,35)";
const d = "M92 63q-7 0 -13 4.5t-6 12.5q0 12 11 18l115 34l110 -17l110 52q1 1 7 1q17 0 17 -18q0 -13 -11 -16l-120 -57l-108 18l-104 -29q-2 -3 -8 -3zM92 114q-6 0 -12.5 5t-6.5 13q0 9 9 15l116 78l109 -19l109 88q6 2 9 2q18 0 18 -17q0 -11 -9 -17l-120 -94l-109 18l-103 -69 q-5 -3 -10 -3zM92 187q-6 0 -12 4.5t-6 12.5q0 9 7 15l113 96h108l110 127q6 6 13 6q8 0 13 -6t5 -13t-4 -11l-120 -140h-111l-104 -87q-4 -4 -12 -4zM480 32v-32h-479v448h31v-416h448z";

registerIcon(name, transform, d);

export default {name, transform, d};
