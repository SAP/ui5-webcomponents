import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add";
const viewBox = "0 0 512 512";
const d = "M464 288q16 0 16-16v-32q0-16-16-16H288V48q0-16-16-16h-32q-6 0-11 4.5T224 48v176H48q-6 0-11 4.5T32 240v32q0 7 5 11.5t11 4.5h176v176q0 7 5 11.5t11 4.5h32q16 0 16-16V288h176z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
