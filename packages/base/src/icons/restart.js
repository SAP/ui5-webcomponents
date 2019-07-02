import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://restart";
const transform = "translate(64.5,35)";
const d = "M195 128q-6 0 -10.5 4t-4.5 11v161q0 7 4.5 11.5t10.5 4.5q2 0 8 -2l161 -83q8 -5 8 -13.5t-8 -13.5l-161 -78q-6 -2 -8 -2zM256 447q46 0 87 -17.5t71.5 -48t48 -71.5t17.5 -87q0 -47 -17.5 -87.5t-48 -71t-71.5 -48t-87 -17.5q-47 0 -87.5 17.5t-71 48.5t-48 71.5 t-17.5 87.5h-32l50 96l46 -96h-32q0 -40 15 -75t41 -61.5t61 -41.5t75 -15t75 15t61 41t41 61t15 75t-15 75t-41 61t-61 41t-75 15v32z";

registerIcon(name, transform, d);

export default {name, transform, d};
