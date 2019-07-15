import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://payment-approval";
const viewBox = "0 -33 512 512";
const d = "M512 453L380 294l-83 84 32 31 50-50 101 127zM384 229V5q0-13-9-22.5T352-27H32q-14 0-23 9.5T0 5v448q0 14 9 23.5t23 9.5h256v-33H32V5h320v224h32zM180 59v32q-26 1-47 20t-25 57l41 5q3-14 12-25t19-14v72q-32 12-51.5 33T109 284q0 12 5 24.5t14.5 23.5 22.5 18.5 29 9.5v20h25v-20q58-6 70-63l-36-6q-2 12-11 20t-23 10v-76q42-9 59-31.5t17-42.5q0-32-20.5-54T205 92V59h-25zm25 70q14 4 23.5 14.5T238 166q0 26-33 35v-72zm-50 160q0-21 25-31v64q-11-5-18-14t-7-19z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
