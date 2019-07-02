import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://circle-task";
const transform = "translate(80.5,35)";
const d = "M224 448q46 0 87 -17.5t71.5 -48t48 -71.5t17.5 -87t-17.5 -87t-48 -71.5t-71.5 -48t-87 -17.5q-47 0 -87.5 17.5t-71 48t-48 71.5t-17.5 87t17.5 87t48 71.5t71 48t87.5 17.5zM224 32q40 0 75 15t61 41.5t41 61.5t15 74q0 40 -15 75t-41 61t-61 41t-75 15t-75 -15 t-61 -41t-41 -61t-15 -75q0 -39 15 -74t41 -61.5t61 -41.5t75 -15z";

registerIcon(name, transform, d);

export default {name, transform, d};
