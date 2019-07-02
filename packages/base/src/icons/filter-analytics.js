import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://filter-analytics";
const transform = "translate(80.5,35)";
const d = "M96 224q13 0 22.5 -9.5t9.5 -22.5v-160q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v160q0 13 9 22.5t23 9.5h64zM256 352q13 0 22.5 -9.5t9.5 -22.5v-288q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v288q0 13 9 22.5t23 9.5h64zM256 320h-64v-288h64v288z M416 448q13 0 22.5 -9.5t9.5 -22.5v-384q0 -14 -9.5 -23t-22.5 -9h-64q-14 0 -23 9t-9 23v384q0 13 9 22.5t23 9.5h64z";

registerIcon(name, transform, d);

export default {name, transform, d};
