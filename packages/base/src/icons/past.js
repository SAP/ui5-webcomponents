import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://past";
const transform = "translate(48.5,35)";
const d = "M240 192h-16v16v16v112q0 16 16 16t16 -16v-112h144q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-144h-16zM315 473q42 -10 78.5 -33t62.5 -55.5t41 -73.5t15 -87q0 -53 -20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20q-49 0 -92.5 17.5t-77.5 47.5t-56 71t-28 88h33 q6 -41 25.5 -76t49 -60.5t67 -40.5t79.5 -15q46 0 87 17.5t71.5 48t48 71.5t17.5 87q0 39 -12.5 74t-34.5 63.5t-52 49t-66 29.5v33zM192 438q-45 -14 -80.5 -44t-55.5 -72l61 5q6 1 11 -3.5t6 -11.5q0 -16 -15 -16l-84 -8q-14 0 -23.5 8.5t-11.5 22.5l1 84q-1 6 3.5 11 t10.5 5q7 1 11.5 -3.5t5.5 -11.5v-57q26 46 67 78.5t93 46.5v-34z";

registerIcon(name, transform, d);

export default {name, transform, d};
