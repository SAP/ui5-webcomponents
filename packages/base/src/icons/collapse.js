import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://collapse";
const viewBox = "0 0 512 512";
const d = "M144 240h256v32H144v-32zm320 240H336v-32h128V64H80v256H48V64q0-14 9-23t23-9h384q13 0 22.5 9t9.5 23v384q0 13-9.5 22.5T464 480zm-221-6q11 12 23 0 5-5 5-11t-5-11l-99-92q-10-9-23-9t-22 9L21 452q-5 5-5 11.5t5 11.5 11.5 5 11.5-5l95-87q5-6 11 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
