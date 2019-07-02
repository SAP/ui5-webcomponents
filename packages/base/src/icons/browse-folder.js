import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://browse-folder";
const transform = "translate(48.5,35)";
const d = "M480 416q11 0 18 -5t10 -11q4 -7 4 -16v-128h-32v96q-1 9 -5 16q-3 6 -9.5 11t-17.5 5h-224l-32 32h-128q-12 0 -18.5 -5t-9.5 -11q-4 -7 -4 -16v-320q0 -13 5 -19t11 -9q7 -4 16 -4h160v-32h-192q-9 0 -16 4q-6 3 -11 9.5t-5 18.5v384q0 9 4 16q3 6 9.5 11t18.5 5h186 l30 -32h232zM512 -9l-22 -23l-82 82q-26 -18 -56 -18q-40 0 -68 28t-28 68t28 68t68 28t68 -28t28 -68q0 -29 -18 -55zM352 64q26 0 45 19t19 45q0 27 -19 45.5t-45 18.5t-45 -18.5t-19 -45.5q0 -26 19 -45t45 -19z";

registerIcon(name, transform, d);

export default {name, transform, d};
