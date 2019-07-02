import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://duplicate";
const transform = "translate(48.5,35)";
const d = "M32 96h96v-32h-96q-14 0 -23 9t-9 23v352q0 13 9 22.5t23 9.5h256q13 0 22.5 -9.5t9.5 -22.5v-32h-32v32h-256v-352zM480 384q13 0 22.5 -9.5t9.5 -22.5v-352q0 -14 -9.5 -23t-22.5 -9h-256q-14 0 -23 9t-9 23v64h32v-64h256v352h-256v-65h-32v65q0 13 9 22.5t23 9.5h256 zM375 200q9 -10 9 -23t-9 -23l-92 -86q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l75 69h-191q-16 0 -16 16t16 16h191l-75 68q-5 5 -5 11.5t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
