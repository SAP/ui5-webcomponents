import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://share";
const transform = "translate(47.75,35)";
const d = "M96 96q0 -40 28 -68t68 -28h256v-32h-256q-27 0 -50 10t-40.5 27.5t-27.5 41t-10 49.5l1 112l-37 -43q-5 -5 -11.5 -5t-11.5 5t-5 11t5 11l52 60q10 9 23 9t23 -9l53 -60q11 -11 0 -22q-12 -11 -23 0l-36 43zM508 284q11 -11 0 -22l-53 -61q-10 -9 -23 -9t-23 9l-52 61 q-5 5 -5 11t5 11q11 11 23 0l37 -44l-1 112q0 40 -28 68t-68 28h-256v32h256q26 0 49.5 -10t41 -27.5t27.5 -41t10 -49.5l1 -112l36 44q11 11 23 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
