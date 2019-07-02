import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cause";
const transform = "translate(48.5,35)";
const d = "M416 160h32v-128q0 -13 -9 -22.5t-23 -9.5h-384q-13 0 -22.5 9.5t-9.5 22.5v384q0 14 9.5 23t22.5 9h128v-32h-128v-384h384v128zM496 480q16 0 16 -16t-16 -16h-16q-40 0 -75 -15t-61 -41t-41 -61t-15 -75v-48l69 76q5 5 11.5 5t11.5 -5t5 -11t-5 -11l-84 -93 q-10 -9 -23 -9t-23 9l-85 93q-5 5 -5 11t5 11q12 11 23 0l68 -76v48q0 45 17 85.5t46.5 70.5t69 48t84.5 20h23z";

registerIcon(name, transform, d);

export default {name, transform, d};
