import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://functional-location";
const transform = "translate(116,35)";
const d = "M375 155v-38h-373v38h186l-104 183q-5 10 -6.5 20t-1.5 20q0 23 9 43.5t24 35.5t35.5 24t44.5 9q23 0 43.5 -9t35.5 -24t24 -35.5t9 -43.5q0 -19 -8 -41l-104 -182h186zM114 378q0 -14 4 -26l71 -123l69 123q5 11 5 26q0 31 -21.5 52.5t-52.5 21.5q-32 0 -53.5 -21.5 t-21.5 -52.5zM2 80h373v-112h-373v112zM114 6h149v36h-149v-36zM46 191h-44l46 74h34l32 -36h-46zM295 265h34l46 -74h-45l-21 38h-35zM225 378q0 -15 -10.5 -26t-25.5 -11q-17 0 -27.5 11t-10.5 26q0 16 10.5 27t27.5 11q15 0 25.5 -11t10.5 -27z";

registerIcon(name, transform, d);

export default {name, transform, d};
