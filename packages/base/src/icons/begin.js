import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://begin";
const viewBox = "0 -1 512 512";
const d = "M502 277q10-10 10-23t-10-22L278 40q-9-10-22-10t-23 10q-9 9-9 22t9 23l190 158q11 11 0 23L234 425q-9 9-9 22.5t9 22.5q10 10 23 10t23-10zM50 37h-1l-8-4-9-2q-14 0-23 9.5T0 63v384q0 14 9.5 23t22.5 9q9 0 17-4l259-191q16-10 16-28t-16-27zm194 219L64 383V127z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
