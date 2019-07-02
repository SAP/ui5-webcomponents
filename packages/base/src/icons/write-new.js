import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://write-new";
const transform = "translate(64.5,35)";
const d = "M416 160h32v-128q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v384q0 13 9.5 22.5t22.5 9.5h128v-32h-128v-384h384v128zM476 430q5 -5 5 -11.5t-5 -11.5l-261 -260q-1 -1 -17 -6t-36 -10q-23 -7 -51 -15q9 27 17 49q7 18 12.5 33.5t6.5 16.5l261 260q5 5 11 5t11 -5 zM378 355l-22 23l-182 -181q-1 -2 2 -6t7 -8t8 -6.5t7 -1.5zM442 419l-23 22l-41 -40l23 -23z";

registerIcon(name, transform, d);

export default {name, transform, d};
