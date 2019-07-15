import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://resize-horizontal";
const viewBox = "0 -32 512 512";
const d = "M288 464q0 6 4.5 11t11.5 5 11.5-5 4.5-11V-16q0-16-16-16t-16 16v480zm-96 0q0 6 4.5 11t11.5 5 11.5-5 4.5-11V-16q0-16-16-16t-16 16v480zm197-140q-12 11 0 23 5 5 11 5t11-5l92-99q9-10 9-23t-9-22l-92-101q-5-5-11.5-5t-11.5 5-5 11.5 5 11.5l87 95q6 5 0 11zM37 231q-6-6 0-11l87-95q5-5 5-11.5t-5-11.5-11.5-5-11.5 5L9 203q-9 9-9 22t9 23l92 99q5 5 11 5t11-5q12-12 0-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
