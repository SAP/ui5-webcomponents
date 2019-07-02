import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://move";
const transform = "translate(80.5,35)";
const d = "M440 248q9 -10 9 -23t-9 -23l-60 -53q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l43 36h-160v-160l37 44q5 5 11.5 5t11.5 -5q11 -11 0 -22l-52 -61q-10 -9 -23 -9t-23 9l-53 61q-5 5 -5 11t5 11t11.5 5t11.5 -5l36 -44v160h-160l44 -36q5 -5 5 -11.5t-5 -11.5t-11 -5t-11 5 l-61 53q-9 10 -9 23t9 23l61 52q11 11 22 0q5 -5 5 -11.5t-5 -11.5l-44 -37h160v160l-36 -43q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l53 60q10 9 23 9t23 -9l52 -60q5 -5 5 -11t-5 -11t-11.5 -5t-11.5 5l-37 43v-160h160l-43 37q-5 5 -5 11.5t5 11.5t11 5t11 -5l60 -52v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
