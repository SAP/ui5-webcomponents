import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://ui-notifications";
const viewBox = "0 32 512 512";
const d = "M512 480v-32H64q-14 0-23-9t-9-23V160q0-14 9-23t23-9h384V96H64q-26 0-45 19T0 160v256q0 26 19 45t45 19h448zM384 336q0-16-16-16H112q-16 0-16 16t16 16h256q16 0 16-16zm-224-96q0 16 16 16h336v-32H176q-16 0-16 16z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
