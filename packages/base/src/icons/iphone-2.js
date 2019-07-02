import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://iphone-2";
const transform = "translate(48.5,35)";
const d = "M448 384q26 0 45 -18.5t19 -45.5v-192q0 -26 -19 -45t-45 -19h-384q-26 0 -45 19t-19 45v192q0 27 19 45.5t45 18.5h384zM56 200q10 0 17 7t7 17t-7 17t-17 7t-17 -7t-7 -17t7 -17t17 -7zM448 352h-352v-256h352v256z";

registerIcon(name, transform, d);

export default {name, transform, d};
