import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ui-notifications";
const transform = "translate(48.5,35)";
const d = "M512 416v-32h-448q-14 0 -23 -9t-9 -23v-256q0 -14 9 -23t23 -9h384v-32h-384q-26 0 -45 19t-19 45v256q0 26 19 45t45 19h448zM384 272q0 -16 -16 -16h-256q-16 0 -16 16t16 16h256q16 0 16 -16zM160 176q0 16 16 16h336v-32h-336q-16 0 -16 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
