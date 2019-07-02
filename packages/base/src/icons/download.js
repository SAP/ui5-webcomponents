import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://download";
const transform = "translate(48.5,35)";
const d = "M480 32q13 0 22.5 -9.5t9.5 -22.5q0 -14 -9.5 -23t-22.5 -9h-448q-14 0 -23 9t-9 23q0 13 9 22.5t23 9.5h448zM280 106q-10 -10 -23 -10t-22 10l-102 101q-12 12 0 23q11 11 22 0l85 -85v319q0 16 16 16t16 -16v-321l87 87q11 11 23 0q11 -11 0 -23z";

registerIcon(name, transform, d);

export default {name, transform, d};
