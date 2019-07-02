import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pharmacy";
const transform = "translate(112.5,35)";
const d = "M224 192h64v-64h-64v-64h-64v64h-64v64h64v64h64v-64zM288 352q40 0 68 -28t28 -68v-256q0 -14 -9 -23t-23 -9h-320q-14 0 -23 9t-9 23v256q0 40 28 68t68 28v32h-32q-14 0 -23 9t-9 23v32q0 14 9 23t23 9h256q14 0 23 -9t9 -23v-32q0 -14 -9 -23t-23 -9h-32v-32zM96 416 h192h32v32h-256v-32h32zM352 256q0 26 -19 45t-45 19h-32v32v32h-128v-32v-32h-32q-26 0 -45 -19t-19 -45v-256h320v256z";

registerIcon(name, transform, d);

export default {name, transform, d};
