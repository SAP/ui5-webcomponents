import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cancel";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 99.5-20t81.5-54.5 55-81.5 20-100-20-99.5T437 43t-81.5-55T256-32t-99.5 20T75 43t-55 81.5T0 224t20 100 55 81.5 81.5 54.5 99.5 20zm0-480q38 0 72.5 12.5T392 46L78 360q-22-29-34-63.5T32 224q0-46 17.5-87t48-71.5 71.5-48T256 0zm180 92q21 28 32.5 61.5T480 224q0 46-17.5 87t-48 71.5-71.5 48-87 17.5q-37 0-70.5-11.5T124 405z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
