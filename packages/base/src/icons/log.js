import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://log";
const transform = "translate(80.5,35)";
const d = "M320 394q57 -27 92.5 -81t35.5 -121q0 -47 -17.5 -87.5t-48 -71t-71.5 -48t-87 -17.5q-47 0 -87.5 17.5t-71 48t-48 71t-17.5 87.5q0 67 35.5 121t92.5 81v-36q-43 -25 -69.5 -68.5t-26.5 -97.5q0 -40 15 -75t41 -61t61 -41t75 -15t75 15t61 41t41 61t15 75 q0 54 -26.5 97.5t-69.5 68.5v36zM224 192q-14 0 -23 9t-9 23v224q0 13 9 22.5t23 9.5q13 0 22.5 -9.5t9.5 -22.5v-224q0 -14 -9.5 -23t-22.5 -9z";

registerIcon(name, transform, d);

export default {name, transform, d};
