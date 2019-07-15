import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://line-chart-time-axis";
const viewBox = "0 -2 512 512";
const d = "M384 80l128 110v-52L384 28 252 140l-92-71-97 49L0 95v41l66 24 94-47 97 74zm-16 110q-30 0-56.5 11.5t-46 31T235 278t-11 56 11 56 30.5 45.5 46 31T368 478t56-11.5 45.5-31 31-45.5 11.5-56-11.5-56-31-45.5-45.5-31-56-11.5zm0 256q-23 0-43.5-9T289 413t-24-35.5-9-43.5 9-43.5 24-35.5 35.5-24 43.5-9 43.5 9 35.5 24 24 35.5 9 43.5-9 43.5-24 35.5-35.5 24-43.5 9zm50-108q16 0 16-16 0-6-4.5-11t-11.5-5h-51q-7 0-11.5 5t-4.5 11v64q0 16 16 16t16-16v-48h35z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
