import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bell";
const transform = "translate(80.5,35)";
const d = "M372 294q-12 -60 -1.5 -101t27.5 -67.5t33.5 -40.5t16.5 -21q0 -14 -9 -23t-23 -9h-128q0 -26 -19 -45t-45 -19t-45 19t-19 45h-128q-14 0 -23 9t-9 23q0 7 15 21t31 40.5t25.5 67.5t-1.5 101q-5 29 2.5 54.5t25 45t42 33t53.5 18.5q0 1 -0.5 1.5t-0.5 1.5q0 14 9 23 t23 9t23 -9t9 -23q0 -2 -1 -3q26 -5 50 -18t41 -33t24.5 -45.5t1.5 -54.5zM408 64q-10 11 -25.5 30.5t-28 48.5t-18 68t4.5 89q5 25 -2.5 44t-16.5 30q-19 23 -42 32.5t-56 9.5q-32 0 -57.5 -9.5t-44.5 -32.5q-10 -11 -18 -30t-3 -44q9 -50 4.5 -89t-16 -68t-26 -48.5 t-24.5 -30.5h369z";

registerIcon(name, transform, d);

export default {name, transform, d};
