import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://switch-classes";
const transform = "translate(48.5,35)";
const d = "M192 160q27 0 50 -10t40.5 -27.5t27.5 -40.5t10 -50v-64h-320v64q0 27 10 50t27.5 40.5t41 27.5t49.5 10h32h32zM288 32q0 40 -28 68t-68 28h-64q-20 0 -37 -7.5t-30.5 -20.5t-21 -30.5t-7.5 -37.5v-32h256v32zM256 256q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28 t68 -28t28 -68zM160 192q27 0 45.5 19t18.5 45q0 27 -18.5 45.5t-45.5 18.5q-26 0 -45 -18.5t-19 -45.5q0 -26 19 -45t45 -19zM416 416q14 0 23 -9t9 -23v-320q0 -13 -9 -22.5t-23 -9.5h-64v32h64v320h-224v32h224zM480 480q14 0 23 -9t9 -23v-352h-32v320v32h-224v32h224z ";

registerIcon(name, transform, d);

export default {name, transform, d};
