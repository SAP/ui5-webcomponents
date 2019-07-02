import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cancel-share";
const transform = "translate(48.5,35)";
const d = "M192 288l-65 -63l65 -65l-32 -32l-63 65l-65 -65l-32 32l65 65l-65 63l32 32l65 -64l63 64zM416 160q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68q0 5 0.5 9.5t1.5 9.5l-94 51q9 14 15 28l91 -49q13 21 34.5 34t47.5 13zM416 0q26 0 45 18.5t19 45.5q0 26 -19 45 t-45 19t-45 -19t-19 -45q0 -27 19 -45.5t45 -18.5zM249 268q-5 16 -12 30l90 51q-3 8 -5 16.5t-2 18.5q0 40 28 68t68 28t68 -28t28 -68t-28 -68t-68 -28q-22 0 -40.5 9t-31.5 24zM416 448q-26 0 -45 -19t-19 -45q0 -27 19 -45.5t45 -18.5t45 18.5t19 45.5q0 26 -19 45 t-45 19z";

registerIcon(name, transform, d);

export default {name, transform, d};
