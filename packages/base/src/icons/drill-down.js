import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://drill-down";
const transform = "translate(112.5,35)";
const d = "M330 153q11 9 23 9.5t22 -9.5q9 -9 9 -22.5t-9 -22.5l-160 -129q-9 -10 -22.5 -10t-22.5 10l-160 131q-10 9 -10 22.5t10 22.5q9 10 21.5 9.5t23.5 -9.5l126 -97q5 -5 11.5 -5t11.5 5zM308 299q21 17 38 0q8 -8 8 -18.5t-8 -18.5l-135 -109q-8 -8 -19 -8t-19 8l-134 110 q-8 8 -8 19t8 19t18.5 8t19.5 -8l106 -82q4 -4 9.5 -4t9.5 4zM297 439q18 15 33 0q7 -7 7 -16.5t-7 -16.5l-120 -97q-7 -8 -16.5 -8t-17.5 8l-120 98q-7 7 -7 17t7 17t16.5 7t17.5 -7l95 -73q8 -9 17 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
