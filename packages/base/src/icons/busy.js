import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://busy";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-55 54.5-81.5 20-99.5-20-100-54.5-81.5T356-12 256-32t-99.5 20T75 42.5 20 124 0 224t20 99.5T75 405t81.5 55 99.5 20zm0-342q18 0 33.5 7t27 18.5 18.5 27 7 33.5-7 33.5-18.5 27-27 18T256 309q-35 0-60-25t-25-60q0-18 6.5-33.5t18-27 27-18.5 33.5-7z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
