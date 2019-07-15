import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-minus";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-54.5T492 324t20-100-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 100 55 81.5 81.5 54.5 99.5 20zm0-480q46 0 87 17.5t71.5 48 48 71.5 17.5 87-17.5 87-48 71.5-71.5 48-87 17.5-87-17.5-71.5-48-48-71.5T32 224t17.5-87 48-71.5 71.5-48T256 0zM128 208v32h256v-32H128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
