import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://reset";
const transform = "translate(80.5,35)";
const d = "M128 128l65 65l-65 63l32 32l65 -64l63 64l32 -32l-65 -63l65 -65l-32 -32l-63 65l-65 -65zM32 160q6 -35 23 -64t41.5 -50.5t56.5 -33.5t68 -12q40 0 74.5 15t60.5 41t41 61t15 75t-15 75t-41 61t-60.5 41t-74.5 15h-142l40 -37q5 -5 5 -11.5t-5 -11.5t-11 -5t-11 5 l-57 54q-9 10 -9 23t9 23l58 51q11 11 22 0q5 -5 5 -11.5t-5 -11.5l-41 -36q42 -1 75 -1h76q45 -2 84 -20t68 -48t45.5 -70t16.5 -85q0 -47 -17.5 -87.5t-48 -71t-71 -48t-86.5 -17.5q-43 0 -80.5 15t-67 40.5t-48.5 60.5t-25 76h32z";

registerIcon(name, transform, d);

export default {name, transform, d};
