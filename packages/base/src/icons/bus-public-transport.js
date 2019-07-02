import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bus-public-transport";
const transform = "translate(48.5,35)";
const d = "M384 416q26 0 49.5 -10t41 -27.5t27.5 -40.5t10 -50v-64v-96q0 -13 -9.5 -22.5t-22.5 -9.5h-34q-5 -27 -27 -45.5t-51 -18.5t-51 18.5t-28 45.5h-67q-5 -27 -27 -45.5t-51 -18.5t-51 18.5t-28 45.5h-65l26 263q2 25 20.5 41t42.5 16h295zM256 256h96v128h-96v-128z M128 256h96v128h-96v-128zM50 256h46v128h-7q-12 0 -21 -9.5t-10 -22.5zM144 64q20 0 34 14t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14zM368 64q20 0 34 14t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14zM480 224h-433l-11 -96h29q6 28 28 46t51 18t51 -18 t27 -46h67q6 28 28 46t51 18t51 -18t27 -46h34v96zM480 288q0 40 -28 68t-68 28v-128h96v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
