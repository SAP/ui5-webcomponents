import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://share-2";
const transform = "translate(48.5,35)";
const d = "M416 160q40 0 68 -28t28 -68t-28 -68t-68 -28t-68 28t-28 68q0 5 0.5 9.5t1.5 9.5l-150 82q-14 -17 -33.5 -27t-42.5 -10q-40 0 -68 28t-28 68t28 68t68 28q28 0 50.5 -15t34.5 -38l146 82q-3 8 -5 16.5t-2 18.5q0 40 28 68t68 28t68 -28t28 -68t-28 -68t-68 -28 q-22 0 -40.5 9t-31.5 24l-153 -85q0 -3 0.5 -6t0.5 -6q0 -14 -5 -31l147 -80q13 21 34.5 34t47.5 13zM416 448q-26 0 -45 -19t-19 -45q0 -27 19 -45.5t45 -18.5t45 18.5t19 45.5q0 26 -19 45t-45 19zM96 160q26 0 45 18.5t19 45.5q0 26 -19 45t-45 19t-45 -19t-19 -45 q0 -27 19 -45.5t45 -18.5zM416 0q26 0 45 18.5t19 45.5q0 26 -19 45t-45 19t-45 -19t-19 -45q0 -27 19 -45.5t45 -18.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
