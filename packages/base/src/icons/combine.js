import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://combine";
const transform = "translate(80.5,35)";
const d = "M443 236q5 -8 5 -12t-5 -12l-73 -72q-6 -6 -12.5 -5.5t-10.5 5t-5 11t5 12.5l46 45h-66q-43 0 -80.5 -19.5t-62.5 -54.5q-28 -42 -71 -66.5t-97 -25.5q-10 0 -13 4.5t-3 11.5t3 11.5t13 4.5q49 2 82.5 22t59.5 56q35 50 89 72q-54 22 -89 72q-25 36 -60.5 57t-80.5 21 q-11 0 -14 4.5t-3 11.5q0 6 3 11t13 5q51 0 95.5 -25t72.5 -67q25 -35 62.5 -54t80.5 -20h66l-46 45q-5 6 -4.5 12.5t4.5 11t10.5 5t12.5 -5.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
