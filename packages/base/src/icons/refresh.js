import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://refresh";
const transform = "translate(80.5,35)";
const d = "M444 160q-6 -41 -25.5 -76t-48.5 -60.5t-66.5 -40.5t-80.5 -15q-46 0 -86.5 17.5t-71 48t-48 71t-17.5 87.5q0 45 16.5 85t45.5 70t68 48t84 20h61q26 0 60 1l-41 36q-5 5 -5 11.5t5 11.5t11 5t11 -5l58 -51q9 -10 9 -23t-9 -23l-57 -54q-5 -5 -11 -5t-11 5t-5 11.5 t5 11.5l40 37h-112q-40 0 -74.5 -15t-60.5 -41t-41 -61t-15 -75t15 -75t41 -61t60.5 -41t74.5 -15q36 0 68 12t56.5 33.5t41.5 50.5t23 64h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
