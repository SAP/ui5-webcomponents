import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://measure";
const viewBox = "0 32 512 512";
const d = "M512 480v-32h-32v-80q0-16-16-16t-16 16v80h-32V336q0-16-16-16t-16 16v112h-32v-80q0-16-16-16t-16 16v80h-32V336q0-16-16-16t-16 16v112h-32v-80q0-16-16-16t-16 16v80h-32V336q0-16-16-16t-16 16v112H96v-80q0-16-16-16t-16 16v80H32V336q0-16-16-16T0 336v144h512zM368 224h144v-32H384l16-32h112v-32h-96l10-21q2-4 0-7.5t-7-3.5H253q-5 0-7 3.5t0 7.5l10 21H0v32h272l16 32H0v32h304l25 49q2 5 7 5t7-5zm12-96l-44 88-44-88h88z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
