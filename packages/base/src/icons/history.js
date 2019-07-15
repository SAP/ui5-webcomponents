import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://history";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 99.5-20t81.5-55 55-81.5 20-99.5-20-99.5T437 43t-81.5-55T256-32 156-12 74.5 43 20 124.5 0 224t20 99.5T74.5 405t81.5 55 100 20zm0-480q46 0 87 17.5t71.5 48 48 71T480 224q0 46-17.5 87t-48 71.5-71.5 48-87 17.5q-47 0-87.5-17.5t-71-48-48-71.5T32 224q0-47 17.5-87.5t48-71 71-48T256 0zm144 224q6 0 11-4.5t5-11.5-5-11.5-11-4.5H224v144q0 16 16 16 6 0 11-4.5t5-11.5V224h144z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
