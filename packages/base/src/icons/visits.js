import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://visits";
const transform = "translate(48.5,35)";
const d = "M192 447h320v-414h-159v31h128v352h-256v-32h-33v63zM257 257q0 -40 -28 -68t-68 -28t-68 28t-28 68t28 68t68 28t68 -28t28 -68zM161 193q26 0 45 19t19 45t-19 45t-45 19t-45 -19t-19 -45t19 -45t45 -19zM193 161q26 0 49 -10t40.5 -27.5t27.5 -41t10 -49.5v-33h-320 v33q0 26 10 49.5t27.5 41t41 27.5t50.5 10h32h32zM289 33q0 40 -28 67.5t-68 27.5h-64q-20 0 -37 -7.5t-30.5 -20t-21 -30t-7.5 -37.5h256zM439 264q9 -10 9 -23t-9 -23l-62 -58q-5 -5 -11 -5t-11 5t-5 11.5t5 11.5l45 41h-96q-16 0 -16 16t16 16h96l-46 41q-5 5 -5 11.5 t5 11.5t11 5t11 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
