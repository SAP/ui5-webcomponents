import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://connected";
const transform = "translate(80.5,35)";
const d = "M448 20l-18 -20l-127 126l2 2l-19 -18q-27 -25 -57 -25q-32 0 -56 25l-26 26l-46 44q-26 26 -26 59.5t26 58.5l12 13l-113 115l21 22l113 -115l13 13q11 13 26 19t31 6q33 0 60 -25l45 -48v-1l26 -26q25 -23 25 -56.5t-25 -56.5l-12 -12zM107 240q0 -21 16 -37l23 -23 l118 118l-24 26q-15 15 -36 15t-33 -14l-47 -50q-17 -14 -17 -35zM313 181q15 13 15 33t-14 34l-28 27l-116 -117l25 -25h1l1 -1q13 -15 32 -15q18 0 34 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
