import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://feed";
const transform = "translate(80.5,35)";
const d = "M112 224q23 0 43.5 -9t35.5 -24t24 -35.5t9 -43.5t-9 -43.5t-24 -35.5t-35.5 -24t-43.5 -9t-43.5 9t-35.5 24t-24 35.5t-9 43.5t9 43.5t24 35.5t35.5 24t43.5 9zM112 32q33 0 56.5 23.5t23.5 56.5q0 34 -23.5 57t-56.5 23t-56.5 -23t-23.5 -57q0 -33 23.5 -56.5 t56.5 -23.5zM32 352q66 0 124 -25.5t101.5 -69t69 -101.5t25.5 -124v-32h-32v32q0 60 -22.5 112.5t-61.5 91.5t-91.5 61.5t-112.5 22.5h-32v32h32zM33 448q90 0 166 -31t131.5 -86.5t86.5 -131.5t31 -166v-33h-32v33q0 84 -28.5 154t-79.5 121t-121 79.5t-154 28.5h-33v32 h33z";

registerIcon(name, transform, d);

export default {name, transform, d};
