import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://paging";
const transform = "translate(48.5,35)";
const d = "M480 32q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5q0 14 9.5 23t22.5 9h448zM480 256q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5h-448q-13 0 -22.5 9.5t-9.5 22.5q0 14 9.5 23t22.5 9h448zM32 416q-13 0 -22.5 9.5t-9.5 22.5 q0 14 9.5 23t22.5 9h448q14 0 23 -9t9 -23q0 -13 -9 -22.5t-23 -9.5h-448z";

registerIcon(name, transform, d);

export default {name, transform, d};
