import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://it-host";
const transform = "translate(144.5,35)";
const d = "M288 480q14 0 23 -9t9 -23v-448q0 -14 -9 -23t-23 -9h-256q-14 0 -23 9t-9 23v448q0 14 9 23t23 9h256zM288 448h-256v-448h256v448zM80 32q-16 0 -16 16t16 16h160q16 0 16 -16t-16 -16h-160zM80 96q-16 0 -16 16t16 16h160q16 0 16 -16t-16 -16h-160zM208 320 q-20 0 -34 14t-14 34t14 34t34 14t34 -14t14 -34t-14 -34t-34 -14z";

registerIcon(name, transform, d);

export default {name, transform, d};
