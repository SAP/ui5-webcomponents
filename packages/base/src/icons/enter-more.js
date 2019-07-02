import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://enter-more";
const transform = "translate(48.5,35)";
const d = "M288 256q13 0 22.5 -9t9.5 -23v-224q0 -13 -9.5 -22.5t-22.5 -9.5h-256q-14 0 -23 9.5t-9 22.5v224q0 14 9 23t23 9h256zM288 224h-256v-224h256v224zM503 392q9 -10 9 -23t-9 -23l-92 -86q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l75 69h-191q-16 0 -16 16t16 16h191l-75 68 q-5 5 -5 11.5t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
