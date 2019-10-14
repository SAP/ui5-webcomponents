import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://copy";
const d = "M352 96q13 0 22.5 9t9.5 23v352q0 14-9 23t-23 9H65q-14 0-23.5-9T32 480V192l96-96h224zm0 32H160v64q0 14-9.5 23t-23.5 9H65v256h287V128zM448 0q12 0 22 9t10 23v352q0 14-9 23t-23 9h-32v-32h32V32H256v32h-97l65-64h224zM272 320q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128zm0 64q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128z";

registerIcon(name, d);
