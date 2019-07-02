import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand";
const transform = "translate(64.5,35)";
const d = "M240 352v-112h-112v-32h112v-112h32v112h112v32h-112v112h-32zM448 448h-256v-32h256v-384h-384v128h-32v-128q0 -13 9 -22.5t23 -9.5h384q13 0 22.5 9.5t9.5 22.5v384q0 14 -9.5 23t-22.5 9zM7 452q-12 11 0 23q5 5 11 5t11 -5l92 -99q9 -10 9 -23t-9 -22l-92 -101 q-5 -5 -11.5 -5t-11.5 5t-5 11.5t5 11.5l87 95q6 5 0 11z";

registerIcon(name, transform, d);

export default {name, transform, d};
