import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://create";
const transform = "translate(48.5,35)";
const d = "M353 192h31v-192q0 -14 -8.5 -23t-22.5 -9h-320q-14 0 -23.5 9t-9.5 23v352l128 128h192v-32h-160v-96q0 -14 -9 -23t-23 -9h-96v-320h321v192zM448 337l24 -75l-64 46l-64 -46l24 75l-64 47h80l24 75l25 -75h79zM272 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160 q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160zM272 160q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
