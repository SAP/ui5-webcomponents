import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pdf-reader";
const transform = "translate(48.5,35)";
const d = "M269 164q13 20 22.5 39.5t15.5 39.5q-6 6 -8 20t-2 22q0 20 6 34t19 14q21 0 21 -43q0 -18 -6 -43q22 -42 45 -56l27 6q5 1 8.5 1.5t6.5 0.5q20 0 38 -10t18 -23q0 -21 -31 -21q-16 0 -37 5t-35 13q-29 -6 -51.5 -11t-37.5 -10q-30 -46 -48 -46l-7 1q-18 6 -18 23 q0 16 26 33zM416 64q0 -14 -9 -23t-23 -9h-256q-14 0 -23 9t-9 23v256l96 96h192q13 0 22.5 -9t9.5 -23v-32h-32v32h-160v-64q0 -14 -9.5 -23t-23.5 -9h-63v-224h256v32h32v-32zM32 352h-32v32q0 40 28 68t68 28h32v-32h-32q-27 0 -45.5 -19t-18.5 -45v-32zM32 64 q0 -26 18.5 -45t45.5 -19h32v-32h-32q-40 0 -68 28t-28 68v32h32v-32zM416 480q19 0 36.5 -7.5t31 -20.5t21 -30.5t7.5 -37.5v-32h-32v32q0 26 -19 45t-45 19h-32v32h32zM480 96h32v-32q0 -20 -7.5 -37.5t-21 -30.5t-31 -20.5t-36.5 -7.5h-32v32h32q26 0 45 19t19 45v32z ";

registerIcon(name, transform, d);

export default {name, transform, d};
