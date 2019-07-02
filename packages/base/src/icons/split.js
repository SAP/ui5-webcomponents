import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://split";
const transform = "translate(80.5,35)";
const d = "M443 69q5 -5 5 -12q0 -6 -5 -11l-73 -73q-6 -6 -12.5 -5.5t-10.5 5t-5 11t5 12.5l46 46h-41q-51 0 -95.5 25t-72.5 67q-25 35 -62.5 54.5t-80.5 19.5h-25q-11 0 -13.5 5.5t-2.5 10.5t2.5 10.5t13.5 5.5h25q43 0 80.5 19.5t62.5 54.5q28 42 72.5 67t95.5 25h41l-46 46 q-6 6 -5 12.5t5 11t10.5 5t12.5 -5.5l73 -73q5 -5 5 -11q0 -7 -5 -12l-73 -73q-6 -6 -12.5 -5t-10.5 5.5t-4.5 11t4.5 11.5l46 45h-41q-45 0 -81 -21t-61 -57q-35 -50 -89 -72q54 -22 89 -72q25 -36 61 -57t81 -21h41l-46 45q-5 5 -4.5 11.5t4.5 11t10.5 5.5t12.5 -5z";

registerIcon(name, transform, d);

export default {name, transform, d};
