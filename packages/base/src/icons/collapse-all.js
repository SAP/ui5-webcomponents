import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://collapse-all";
const viewBox = "0 63 512 512";
const d = "M267 371q12-12 0-23-11-11-22 0l-85 86V175q0-17-16-17t-16 17v261l-87-88q-11-11-23 0-11 11 0 23l102 103q10 10 23 10t22-10zm229 108q16 0 16-16 0-6-4.5-11t-11.5-5H336q-7 0-11.5 5t-4.5 11q0 16 16 16h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
