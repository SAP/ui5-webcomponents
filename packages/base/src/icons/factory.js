import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://factory";
const viewBox = "0 0 512 512";
const d = "M496 256q6 0 11-4.5t5-11.5V32h-96v120q0 8-8 8h-48q-8 0-8-8V32H0v368q0 16 16 16h96q6 0 11-4.5t5-11.5V256h368zm-16-32H96v160H32V64h288v88q0 17 11.5 28.5T360 192h48q17 0 28.5-11.5T448 152V64h32v160zm-120 64q-8 0-8 8v74q0 8 8 8 2 0 4-1l123-74q5-3 3.5-9t-7.5-6H360zm-160 0q-8 0-8 8v74q0 8 8 8 2 0 4-1l123-74q5-3 3.5-9t-7.5-6H200zM8 448q-8 0-8 4v24q0 4 8 4h112q8 0 8-4v-24q0-4-8-4H8zm88-264q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48q-8 0-8 8v48zm104-56q-8 0-8 8v48q0 8 8 8h48q8 0 8-8v-48q0-8-8-8h-48z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
