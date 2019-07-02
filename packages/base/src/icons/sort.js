import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sort";
const transform = "translate(47.25,35)";
const d = "M407 -21q-10 -10 -23 -10t-22 10l-102 101q-12 12 0 23q5 5 11 5t11 -5l85 -85v319q0 16 16 16t16 -16v-321l87 87q11 11 23 0q11 -11 0 -23zM255 369q11 -12 0 -23q-5 -5 -11.5 -5t-11.5 5l-87 87v-321q0 -16 -16 -16t-16 16v319l-85 -85q-5 -5 -11 -5t-11 5 q-12 11 0 23l102 101q9 10 22 10t23 -10z";

registerIcon(name, transform, d);

export default {name, transform, d};
