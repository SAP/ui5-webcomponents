import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://journey-depart";
const transform = "translate(48.5,35)";
const d = "M503 248q9 -10 9 -23t-9 -23l-92 -86q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l75 69h-256q-16 0 -16 16t16 16h256l-75 68q-5 5 -5 11.5t5 11.5t11 5t11 -5zM192 64q53 0 95 31h47q-26 -29 -63 -46t-79 -17q-40 0 -75 15t-61 41t-41 61t-15 75t15 75t41 61t61 41t75 15 q42 0 79 -17.5t63 -46.5h-48q-20 14 -44 23t-50 9q-33 0 -62.5 -12.5t-51 -34.5t-34 -51t-12.5 -62t12.5 -62t34 -51t51 -34.5t62.5 -12.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
