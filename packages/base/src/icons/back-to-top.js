import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://back-to-top";
const transform = "translate(48.5,35)";
const d = "M480 480q14 0 23 -9.5t9 -22.5q0 -14 -9 -23t-23 -9h-448q-14 0 -23 9t-9 23q0 13 9 22.5t23 9.5h448zM382 241q11 -12 0 -23q-12 -11 -23 0l-87 87v-321q0 -16 -16 -16t-16 16v319l-85 -85q-5 -5 -11 -5t-11 5q-12 11 0 23l102 101q9 10 22 10t23 -10z";

registerIcon(name, transform, d);

export default {name, transform, d};
