import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://away";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-55 54.5-81.5 20-99.5-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 99.5T75 405t81.5 55 99.5 20zm128-288q18 0 30.5 7t12.5 25q0 17-12.5 24.5T384 256h-96v96q0 18-7 30.5T256 395q-17 0-24.5-12.5T224 352V224q0-18 7.5-25t24.5-7h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
