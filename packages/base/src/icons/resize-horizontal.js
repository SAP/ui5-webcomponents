import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize-horizontal";
const transform = "translate(48.5,35)";
const d = "M288 464q0 6 4.5 11t11.5 5t11.5 -5t4.5 -11v-480q0 -16 -16 -16t-16 16v480zM192 464q0 6 4.5 11t11.5 5t11.5 -5t4.5 -11v-480q0 -16 -16 -16t-16 16v480zM389 324q-12 11 0 23q5 5 11 5t11 -5l92 -99q9 -10 9 -23t-9 -22l-92 -101q-5 -5 -11.5 -5t-11.5 5t-5 11.5 t5 11.5l87 95q6 5 0 11zM37 231q-6 -6 0 -11l87 -95q5 -5 5 -11.5t-5 -11.5t-11.5 -5t-11.5 5l-92 101q-9 9 -9 22t9 23l92 99q5 5 11 5t11 -5q12 -12 0 -23z";

registerIcon(name, transform, d);

export default {name, transform, d};
