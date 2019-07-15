import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://multiselect-all";
const viewBox = "0 -32 512 512";
const d = "M92 8l80 97 20-19L92-32 32 27l20 20zm80 285l20-19L92 157l-60 59 20 19 40-38zm0 187l20-19L92 343l-60 59 20 21 40-40zm292-65q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-191q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-192q16 0 16-16 0-6-4.5-11T464 0H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
