import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://present";
const viewBox = "0 -32 512 512";
const d = "M240 0q37 0 70 12t59.5 33.5T415 96t27 64h33q-8-41-29.5-76.5t-52.5-61-70.5-40T240-32q-50 0-93.5 19t-76 51.5-51.5 76T0 208q0 43 14.5 82T55 360t61 52.5 76 29.5v-32q-34-8-63.5-27t-51-45.5T44 278t-12-70q0-43 16.5-81t45-66 66-44.5T240 0zm-16 192v144q0 7 5 11.5t11 4.5q16 0 16-16V224h144q16 0 16-16t-16-16H224zm111 64l26 79-67 49h83l26 79 26-79h83l-68-49 26-79-67 49z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
