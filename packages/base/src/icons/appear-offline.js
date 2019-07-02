import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://appear-offline";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM256 54q36 0 67 13.5t54 36.5t36.5 54t13.5 66q0 36 -13.5 67t-36.5 54t-54 36.5t-67 13.5 q-35 0 -66 -13.5t-54 -36.5t-36.5 -54t-13.5 -67q0 -35 13.5 -66t36.5 -54t54 -36.5t66 -13.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
