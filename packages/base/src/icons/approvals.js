import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://approvals";
const viewBox = "0 -32 512 512";
const d = "M331 199l22-22L247 54l-64 63 21 22 43-43zm85 281q14 0 23-9.5t9-22.5V0q0-14-9-23t-23-9H96q-14 0-23 9T64 0v448q0 13 9 22.5t23 9.5h320zm0-32H96V0h320v448zm-80-128q16 0 16-16 0-6-4.5-11t-11.5-5H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160zm0 64q16 0 16-16 0-6-4.5-11t-11.5-5H176q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
