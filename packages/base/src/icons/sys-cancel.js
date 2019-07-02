import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-cancel";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -55t54.5 -81.5t20 -99.5t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 99.5t55 81.5t81.5 55t99.5 20zM256 0q46 0 87 17.5t71.5 48t48 71t17.5 87.5q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5 t-87 -17.5t-71.5 -48t-48 -71.5t-17.5 -87q0 -47 17.5 -87.5t48 -71t71.5 -48t87 -17.5zM384 323l-98 -95l98 -99l-28 -28l-101 99l-99 -99l-28 29l97 97l-93 94l27 29l96 -94l100 96z";

registerIcon(name, transform, d);

export default {name, transform, d};
