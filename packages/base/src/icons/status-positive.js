import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://status-positive";
const transform = "translate(80.5,35)";
const d = "M367 448q35 0 58 -24t23 -56v-289q0 -33 -23 -56t-58 -23h-288q-33 0 -56 23t-23 56v289q0 16 6 30.5t17 25.5t25 17.5t31 6.5h288zM384 374q0 4 -3 7.5t-10 3.5h-296q-5 0 -8 -3.5t-3 -7.5v-299q0 -11 11 -11h296q3 0 8 1.5t5 9.5v299z";

registerIcon(name, transform, d);

export default {name, transform, d};
