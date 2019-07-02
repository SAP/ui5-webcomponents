import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize-vertical";
const transform = "translate(48.5,35)";
const d = "M496 192h-480q-16 0 -16 -16t16 -16h480q6 0 11 4.5t5 11.5t-5 11.5t-11 4.5zM496 288h-480q-16 0 -16 -16t16 -16h480q6 0 11 4.5t5 11.5t-5 11.5t-11 4.5zM356 91q11 12 23 0q5 -5 5 -11t-5 -11l-99 -92q-10 -9 -23 -9t-22 9l-101 92q-5 5 -5 11.5t5 11.5t11.5 5 t11.5 -5l95 -87q5 -6 11 0zM263 443q-6 6 -11 0l-95 -87q-5 -5 -11.5 -5t-11.5 5t-5 11.5t5 11.5l101 92q9 9 22 9t23 -9l99 -92q5 -5 5 -11t-5 -11q-12 -12 -23 0z";

registerIcon(name, transform, d);

export default {name, transform, d};
