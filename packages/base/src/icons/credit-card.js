import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://credit-card";
const transform = "translate(48.5,35)";
const d = "M448 416q26 0 45 -18.5t19 -45.5v-256q0 -26 -19 -45t-45 -19h-384q-26 0 -45 19t-19 45v256q0 27 19 45.5t45 18.5h384zM480 352q0 14 -9 23t-23 9h-384q-14 0 -23 -9t-9 -23v-256q0 -13 9 -22.5t23 -9.5h384q14 0 23 9.5t9 22.5v256zM394 352q16 0 27 -11t11 -28 q0 -16 -11 -27t-27 -11q-14 0 -26 10q-12 -10 -25 -10q-17 0 -28 11t-11 27q0 17 11 28t28 11q13 0 25 -10q12 10 26 10zM80 288q-7 0 -11.5 5t-4.5 11v32q0 16 16 16h64q16 0 16 -16v-32q0 -6 -4.5 -11t-11.5 -5h-64zM432 224q16 0 16 -16v-32q0 -6 -4.5 -11t-11.5 -5h-352 q-7 0 -11.5 5t-4.5 11v32q0 16 16 16h352zM240 128q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-160q-7 0 -11.5 5t-4.5 11q0 16 16 16h160z";

registerIcon(name, transform, d);

export default {name, transform, d};
