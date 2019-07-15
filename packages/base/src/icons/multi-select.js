import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://multi-select";
const viewBox = "0 -32 512 512";
const d = "M32-32V96h128V-32H32zm32 96V0h64v64H64zm28 133l80 96 20-19L92 157l-60 59 20 19zm0 186l80 97 20-19L92 343l-60 59 20 21zm372 32q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-191q16 0 16-16 0-6-4.5-11t-11.5-5H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191zm0-192q16 0 16-16 0-6-4.5-11T464 0H273q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h191z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
