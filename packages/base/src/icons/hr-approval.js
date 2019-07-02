import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://hr-approval";
const transform = "translate(48.5,35)";
const d = "M512 448l-132 -159l-83 83l32 32l50 -51l101 127zM192 160q26 0 49.5 -10t41 -27.5t27.5 -40.5t10 -50v-64h-320v64q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h32zM288 32q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68v-32h256v32zM256 256q0 -40 -28 -68t-68 -28 t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM160 192q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19z";

registerIcon(name, transform, d);

export default {name, transform, d};
