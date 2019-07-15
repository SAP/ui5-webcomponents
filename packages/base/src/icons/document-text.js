import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://document-text";
const viewBox = "0 -32 512 512";
const d = "M416 480q14 0 23-9.5t9-22.5V0q0-14-9-23t-22-9H97q-14 0-23.5 9T64 0v352l128 128h224zm1-480l-1 448H224v-96q0-14-9.5-23t-22.5-9H96V0h321zm-81 96q16 0 16-16 0-6-4.5-11T336 64H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm0 64q16 0 16-16 0-6-4.5-11t-11.5-5H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
