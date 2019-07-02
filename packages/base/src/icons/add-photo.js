import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-photo";
const transform = "translate(48.5,35)";
const d = "M448 272q0 -7 -5 -11.5t-11 -4.5q-16 0 -16 16t16 16q6 0 11 -4.5t5 -11.5zM416 96h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zM480 352q9 0 16 -4q6 -3 11 -8.5t5 -16.5v-99h-32v96h-1h-63h-24l-7 22q-8 25 -19.5 46t-19.5 28h-181q-7 -7 -19 -28t-20 -46l-7 -22h-23 h-64v-288h224v-32h-224q-14 0 -23 10t-9 22v291q0 12 9 20.5t23 8.5h64q4 14 11.5 31t16.5 31t18.5 24t17.5 10h192q8 0 17 -9.5t18 -24t16.5 -31.5t12.5 -31h64zM256 288q-40 0 -68 -28t-28 -68t28 -68t68 -28v-32q-27 0 -50 10t-40.5 27.5t-27.5 40.5t-10 50t10 50 t27.5 40.5t40.5 27.5t50 10q45 0 78.5 -27t44.5 -69h-33q-11 28 -35 46t-55 18z";

registerIcon(name, transform, d);

export default {name, transform, d};
