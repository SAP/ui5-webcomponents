import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand-all";
const transform = "translate(56,35)";
const d = "M248 167q11 11 23 0q10 -12 0 -24l-102 -102q-10 -10 -23 -10t-22 10l-102 102q-12 12 0 24q11 11 22 0l85 -87v260q0 16 16 16t16 -16v-262zM497 352q16 0 16 -16t-16 -16h-160q-6 0 -11 4.5t-5 11.5t5 11.5t11 4.5h160zM497 256q16 0 16 -16t-16 -16h-160q-6 0 -11 4.5 t-5 11.5t5 11.5t11 4.5h160zM497 160q16 0 16 -16t-16 -16h-160q-6 0 -11 4.5t-5 11.5t5 11.5t11 4.5h160zM497 64q16 0 16 -16t-16 -16h-160q-6 0 -11 4.5t-5 11.5t5 11.5t11 4.5h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
