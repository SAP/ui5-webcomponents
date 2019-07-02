import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://incident";
const transform = "translate(48,35)";
const d = "M503 249q10 -11 10 -24.5t-10 -23.5l-222 -222q-11 -11 -24.5 -11t-23.5 11l-222 222q-11 10 -11 23.5t11 24.5l222 222q10 10 23.5 10t24.5 -10zM257 65q13 0 22.5 9t9.5 23q0 13 -9.5 22.5t-22.5 9.5q-14 0 -23 -9.5t-9 -22.5q0 -14 9 -23t23 -9zM315 235 q12 13 25 27.5t13 37.5q0 33 -25.5 54.5t-69.5 21.5q-23 0 -42 -7.5t-32.5 -19.5t-20.5 -27t-7 -29h48q5 24 20 38t38 14t37.5 -14t14.5 -29q0 -9 -7 -20.5t-15 -16.5l-20 -16q-19 -15 -27 -26t-11 -24v-38h32h15q-2 17 0.5 27.5t7 17.5t11.5 13.5t15 15.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
