import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://underline-text";
const viewBox = "0 0 512 512";
const d = "M432 64q6 0 11-5 5-4 5-11 0-8-5-12-4-4-11-4H80q-16 0-16 16t16 16h352zm-192 96q-23 0-43.5 9T161 193t-24 35.5-9 43.5v208h32V272q0-33 23.5-56.5T240 192h32q34 0 57 23.5t23 56.5v208h32V272q0-23-9-43.5T351 193t-35.5-24-43.5-9h-32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
