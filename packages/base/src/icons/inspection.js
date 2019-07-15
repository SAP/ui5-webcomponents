import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspection";
const viewBox = "0 -33 513 513";
const d = "M224-26H33q-14 0-23.5 9T0 6v352l128 128h224q14 0 23-9.5t9-22.5V309h-32v145H160v-96q0-14-9.5-23t-22.5-9H32V6h192v-32zM507 1q12-11 0-23-5-5-11-5t-11 5l-82 82q-30-22-67-22-23 0-43.5 9T257 71t-24 35.5-9 43.5 9 43.5 24 35.5 35.5 24 43.5 9 43.5-9 35.5-24 24-35.5 9-43.5q0-19-6-36t-17-31zM336 70q33 0 56.5 23.5T416 150t-23.5 56.5T336 230t-56.5-23.5T256 150t23.5-56.5T336 70z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
