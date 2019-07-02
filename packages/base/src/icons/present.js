import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://present";
const transform = "translate(48.5,35)";
const d = "M240 0q37 0 70 12t59.5 33.5t45.5 50.5t27 64h33q-8 -41 -29.5 -76.5t-52.5 -61t-70.5 -40t-82.5 -14.5q-50 0 -93.5 19t-76 51.5t-51.5 76t-19 93.5q0 43 14.5 82t40.5 70t61 52.5t76 29.5v-32q-34 -8 -63.5 -27t-51 -45.5t-33.5 -59.5t-12 -70q0 -43 16.5 -81t45 -66 t66 -44.5t80.5 -16.5zM224 192v144q0 7 5 11.5t11 4.5q16 0 16 -16v-112h144q16 0 16 -16t-16 -16h-176zM335 256l26 79l-67 49h83l26 79l26 -79h83l-68 -49l26 -79l-67 49z";

registerIcon(name, transform, d);

export default {name, transform, d};
