import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart-time-axis";
const transform = "translate(48.5,35)";
const d = "M384 50l128 110v-52l-128 -110l-132 112l-92 -71l-97 49l-63 -23v41l66 24l94 -47l97 74zM368 160q-30 0 -56.5 11.5t-46 31t-30.5 45.5t-11 56t11 56t30.5 45.5t46 31t56.5 11.5t56 -11.5t45.5 -31t31 -45.5t11.5 -56t-11.5 -56t-31 -45.5t-45.5 -31t-56 -11.5zM368 416 q-23 0 -43.5 -9t-35.5 -24t-24 -35.5t-9 -43.5t9 -43.5t24 -35.5t35.5 -24t43.5 -9t43.5 9t35.5 24t24 35.5t9 43.5t-9 43.5t-24 35.5t-35.5 24t-43.5 9zM418 308q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-51q-7 0 -11.5 5t-4.5 11v64q0 16 16 16t16 -16v-48h35z";

registerIcon(name, transform, d);

export default {name, transform, d};
