import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shipping-status";
const transform = "translate(48.5,35)";
const d = "M480 224q13 0 22.5 -9t9.5 -23v-96q0 -14 -9.5 -23t-22.5 -9h-34q-5 -28 -27 -46t-51 -18t-51 18t-28 46h-67q-5 -28 -27 -46t-51 -18t-51 18t-28 46h-33q-14 0 -23 9t-9 23v96q0 8 5 16q-5 8 -5 16v160q0 14 9 23t23 9h256q13 0 22.5 -9t9.5 -23h19q24 0 45 -8t38 -22.5 t28.5 -34t15.5 -42.5l8 -53h6zM320 352v-128h122l-8 48q-6 35 -33 57.5t-62 22.5h-19zM32 224h256v128v32h-256v-160zM144 32q20 0 34 14t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14zM368 32q20 0 34 14t14 34t-14 34t-34 14t-34 -14t-14 -34t14 -34t34 -14z M480 192h-192h-256v-96h33q6 27 28 45.5t51 18.5t51 -18.5t27 -45.5h67q6 27 28 45.5t51 18.5t51 -18.5t27 -45.5h34v96z";

registerIcon(name, transform, d);

export default {name, transform, d};
