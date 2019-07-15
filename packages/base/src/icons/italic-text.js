import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://italic-text";
const viewBox = "0 0 512 512";
const d = "M224 448v32h192v-32h-64L224 64h64V32H96v32h64l128 384h-64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
