import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://personnel-view";
const transform = "translate(80.5,35)";
const d = "M192 160q26 0 49.5 -10t41 -27.5t27.5 -41t10 -49.5v-64h-320v64q0 26 10 49.5t27.5 41t41 27.5t49.5 10h32h32zM288 32q0 40 -28 68t-68 28h-64q-40 0 -68 -28t-28 -68v-32h256v32zM256 256q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM160 192 q26 0 45 19t19 45t-19 45t-45 19t-45 -19t-19 -45t19 -45t45 -19zM416 448q14 0 23 -9t9 -23v-352q0 -14 -9 -23t-23 -9h-64v32h64v352h-320v-32h-32v32q0 14 9 23t23 9h320z";

registerIcon(name, transform, d);

export default {name, transform, d};
