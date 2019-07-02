import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://upload";
const transform = "translate(48.5,35)";
const d = "M480 32q13 0 22.5 -9.5t9.5 -22.5q0 -14 -9.5 -23t-22.5 -9h-448q-14 0 -23 9t-9 23q0 13 9 22.5t23 9.5h448zM382 369q11 -12 0 -23q-5 -5 -11.5 -5t-11.5 5l-87 87v-321q0 -16 -16 -16t-16 16v319l-85 -85q-5 -5 -11 -5t-11 5q-12 11 0 23l102 101q9 10 22 10t23 -10z ";

registerIcon(name, transform, d);

export default {name, transform, d};
