import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://italic-text";
const transform = "translate(144.5,35)";
const d = "M128 416v32h192v-32h-64l-128 -384h64v-32h-192v32h64l128 384h-64v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
