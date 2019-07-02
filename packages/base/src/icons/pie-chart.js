import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pie-chart";
const transform = "translate(39.5,35)";
const d = "M515 308q15 -45 15 -93q0 -101 -66 -178l-16 14l-157 158zM477 338l-201 -89v241q71 -5 129.5 -43.5t91.5 -99.5zM276 165l143 -143q-63 -53 -143 -60q-12 -1 -22 -1t-21 1q-64 5 -117.5 40.5t-84.5 91.5q-10 18 -17 38q-14 40 -14 83q0 94 60 166q15 16 30 29 q62 52 143 60v-263z";

registerIcon(name, transform, d);

export default {name, transform, d};
