import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-enter-2";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 100-20t81.5-54.5T492 324t20-100-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 100 55 81.5 81.5 54.5 99.5 20zm141-181q4 7 2.5 15.5T393 328l-24 23q-8 6-17 6-14 0-19-11L228 208q-2-3-4-3-1 0-1.5.5t-1.5.5l-55 54q-8 8-17 8-10 0-18-8l-22-22q-7-7-7-16 0-10 6-16L213 88q6-7 17-7 14 0 21 12z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
