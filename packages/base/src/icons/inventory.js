import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inventory";
const transform = "translate(48.5,35)";
const d = "M480 224q13 0 22.5 -9t9.5 -23v-96q0 -13 -9.5 -22.5t-22.5 -9.5h-34q-5 -27 -27 -45.5t-51 -18.5t-51 18.5t-28 45.5h-67q-5 -27 -27 -45.5t-51 -18.5t-51 18.5t-28 45.5h-33q-14 0 -23 9.5t-9 22.5v96q0 14 9 23t23 9h152l-102 103q-12 -5 -23 -5q-17 0 -31 8t-22 22 h51q10 0 17 7t7 17v16q0 10 -7 17t-17 7h-52q8 14 22.5 23t31.5 9q26 0 44.5 -18.5t18.5 -44.5q0 -8 -3 -17l144 -144h25v128q0 14 9 23t23 9h19q24 0 45 -8t38 -22.5t28.5 -34t15.5 -42.5l8 -53h6zM320 224h122l-8 48q-6 35 -33 57.5t-62 22.5h-19v-128zM144 32q20 0 34 14 t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14zM368 32q20 0 34 14t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14zM480 192h-192h-256v-96h33q6 28 28 46t51 18t51 -18t27 -46h67q6 28 28 46t51 18t51 -18t27 -46h34v96z";

registerIcon(name, transform, d);

export default {name, transform, d};
