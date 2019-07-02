import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://fob-watch";
const transform = "translate(80.5,35)";
const d = "M398 334q23 -29 36.5 -65t13.5 -77q0 -46 -17.5 -87t-48 -71.5t-71.5 -48t-87 -17.5t-87 17.5t-71.5 48t-48 71.5t-17.5 87q0 42 15 80t40.5 67.5t60.5 49t76 25.5v34h-64v32h192v-32h-64v-34q26 -4 50 -13t44 -23l34 34l46 -46zM224 0q40 0 75 15t61 41.5t41 61.5t15 74 q0 40 -15 75t-41 61t-61 41t-75 15t-75 -15t-61 -41t-41 -61t-15 -75q0 -39 15 -74t41 -61.5t61 -41.5t75 -15zM336 192q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-113q-7 0 -11.5 5t-4.5 11v96q0 16 16 16t16 -16v-80h97z";

registerIcon(name, transform, d);

export default {name, transform, d};
