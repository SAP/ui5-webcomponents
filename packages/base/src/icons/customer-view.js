import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://customer-view";
const transform = "translate(83,35)";
const d = "M121 166q35 -21 44 -40.5t9 -44.5v-38l-134 66v31q0 16 4.5 28t22.5 12q5 0 11 -1t14 -1q-13 12 -21 27t-8 33q0 17 11.5 28.5t24.5 11.5q23 0 38 -20.5t15 -49.5q0 -40 -31 -42zM441 370v-292l-221 -110v293l-219 109l220 110zM221 408l110 -56l36 18l-110 55zM130 398 l146 -74l37 19l-147 73zM221 297l36 19l-73 36l-36 -18zM385 109q-2 4 -8.5 18t-7.5 31q20 20 31 44t11 44q0 39 -37 39q-21 0 -43 -13.5t-40 -33t-29.5 -42.5t-11.5 -42q0 -20 10.5 -30t27.5 -10q8 0 22.5 3.5t23.5 12.5q14 -20 26.5 -26t14.5 -6q6 0 8 3.5t2 7.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
