import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://drop-down-list";
const transform = "translate(112.5,35)";
const d = "M257 125q11 12 23 0q11 -11 0 -22l-65 -61q-10 -9 -23 -9t-22 9l-65 58q-12 11 0 23q11 11 23 0l59 -53q5 -6 11 0zM368 320q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-352q-16 0 -16 16t16 16h352zM368 224q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-352q-16 0 -16 16 t16 16h352zM368 416q6 0 11 -4.5t5 -11.5t-5 -11.5t-11 -4.5h-352q-16 0 -16 16t16 16h352z";

registerIcon(name, transform, d);

export default {name, transform, d};
