import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://approvals";
const transform = "translate(112.5,35)";
const d = "M267 199l22 -22l-106 -123l-64 63l21 22l43 -43zM352 480q14 0 23 -9.5t9 -22.5v-448q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v448q0 13 9 22.5t23 9.5h320zM352 448h-320v-448h320v448zM272 320q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11 q0 7 5 11.5t11 4.5h160zM272 384q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
