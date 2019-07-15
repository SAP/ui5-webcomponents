import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://checklist";
const viewBox = "0 2 512 512";
const d = "M256 290q16 0 24-11t8-26v-74q0-15-14-27L171 40q-4-4-12-4-7 0-11 4L45 152q-13 11-13 27v74q0 15 8.5 26T64 290h192zm0-37q0 5-6 5H69q-5 0-5-5v-74q0-1 14.5-17t32.5-36l48-52 48 52q18 20 33.5 36t15.5 17v74zM45 344q-13 11-13 27v74q0 15 8.5 26T64 482h192q16 0 24-11t8-26v-27h-32v27q0 5-6 5H69q-5 0-5-5v-74q0-1 7-8.5T86 346q10-11 23-24H66zm403 42q16 0 24-11t8-26v-74q0-15-14-27L363 136q-4-4-12-4-7 0-11 4l-20 21v49l31-35 48 52q18 20 33.5 35.5T448 275v74q0 5-6 5H261q-5 0-5-5v-27h-32v27q0 15 8.5 26t23.5 11h192z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
