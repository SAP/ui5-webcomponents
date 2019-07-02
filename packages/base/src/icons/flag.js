import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://flag";
const transform = "translate(112.5,35)";
const d = "M0 480h32v-512h-32v512zM307 447q14 0 23.5 2t17 6t16 10t20.5 15v-239q-14 -14 -30 -25q-14 -9 -31 -16.5t-35 -7.5q-5 0 -23.5 5t-40 11t-40 11t-24.5 5q-29 0 -51 -7.5t-45 -24.5v225q10 17 26 31q14 12 33.5 22t47.5 10q7 0 27 -5t42.5 -11.5t41.5 -11.5t25 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
