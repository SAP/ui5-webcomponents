import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://copy";
const viewBox = "0 -32 512 512";
const d = "M352 384q13 0 22.5-9t9.5-23V0q0-14-9-23t-23-9H65q-14 0-23.5 9T32 0v288l96 96h224zm0-32H160v-64q0-14-9.5-23t-23.5-9H65V0h287v352zm96 128q12 0 22-9t10-23V96q0-14-9-23t-23-9h-32v32h32v352H256v-32h-97l65 64h224zM272 160q16 0 16-16 0-6-4.5-11t-11.5-5H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128zm0-64q16 0 16-16 0-6-4.5-11T272 64H144q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
