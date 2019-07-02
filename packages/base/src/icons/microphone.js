import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://microphone";
const transform = "translate(112.5,35)";
const d = "M192 128q-40 0 -68 28t-28 68v160q0 40 28 68t68 28t68 -28t28 -68v-160q0 -40 -28 -68t-68 -28zM128 224q0 -26 19 -45t45 -19q27 0 45.5 19t18.5 45v160q0 26 -18.5 45t-45.5 19q-26 0 -45 -19t-19 -45v-160zM368 288q16 0 16 -16t-16 -16h-16v-32q0 -29 -9.5 -55 t-27 -47t-41 -35t-50.5 -20v-67h112q16 0 16 -16t-16 -16h-288q-16 0 -16 16t16 16h112v67q-27 6 -50.5 20t-41 35t-27 47t-9.5 55v32h-16q-16 0 -16 16t16 16h48v-32v-32q0 -27 10 -50t27.5 -40.5t41 -27.5t49.5 -10q27 0 50 10t40.5 27.5t27.5 40.5t10 50v32v32h48z";

registerIcon(name, transform, d);

export default {name, transform, d};
