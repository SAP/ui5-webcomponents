import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize-corner";
const viewBox = "0 0 512 512";
const d = "M224 32l160 160v-32q0-12-10-22l-96-96q-10-10-22-10h-32zm96 0l64 64V64q0-12-10-22t-22-10h-32zm64 256v-32q0-12-10-22L182 42q-10-10-22-10h-32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
