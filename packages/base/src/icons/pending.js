import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pending";
const transform = "translate(52.5,35)";
const d = "M224 192v144q0 7 5 11.5t11 4.5q16 0 16 -16v-112h144q16 0 16 -16t-16 -16h-176zM320 472q68 -17 117.5 -66.5t66.5 -117.5h-33q-17 54 -57 93.5t-94 56.5v34zM256 0q38 0 72.5 12t62.5 33.5t48.5 50.5t31.5 64h33q-11 -41 -34 -76.5t-55.5 -61t-73 -40t-85.5 -14.5 q-53 0 -99.5 20t-81.5 55t-55 81.5t-20 99.5q0 45 14.5 85t40 72.5t61 56t76.5 34.5v-33q-35 -11 -64 -31.5t-50.5 -48.5t-33.5 -62.5t-12 -72.5q0 -47 17.5 -87.5t48 -71t71.5 -48t87 -17.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
