import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://future";
const transform = "translate(52.5,35)";
const d = "M416 208q0 -7 -5 -11.5t-11 -4.5h-144h-16h-16v16v16v112q0 16 16 16q6 0 11 -4.5t5 -11.5v-112h144q6 0 11 -4.5t5 -11.5zM32 224q0 -42 14.5 -80t40.5 -67.5t61 -49t76 -25.5v-32q-48 6 -89 28t-71 56t-47 77.5t-17 92.5q0 53 20 99.5t54.5 81.5t81.5 55t100 20 q45 0 85 -14.5t72.5 -40t55.5 -61t34 -76.5h-33q-10 34 -30.5 63.5t-48.5 51t-62.5 33.5t-72.5 12q-47 0 -87.5 -17.5t-71 -48t-48 -71.5t-17.5 -87zM504 161q-14 -52 -46.5 -93t-78.5 -67h57q7 -1 11.5 -5.5t3.5 -11.5q0 -6 -5 -10.5t-11 -3.5l-84 -1q-14 2 -22.5 11.5 t-8.5 23.5l8 84q0 15 16 15q7 -1 11.5 -6t3.5 -11l-5 -61q42 20 72 55.5t44 80.5h34z";

registerIcon(name, transform, d);

export default {name, transform, d};
