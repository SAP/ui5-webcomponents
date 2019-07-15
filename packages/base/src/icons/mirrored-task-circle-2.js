import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://mirrored-task-circle-2";
const viewBox = "0 0 512 512";
const d = "M62 257q-6-1-11 3.5T45 271q-1 7 3.5 11.5T60 288h57q-1 1-2 1.5t-2 1.5q-13 6-30 17t-32 26.5-25 36T16 416t8 43.5 21.5 30 29.5 17 33 5.5h14q6 0 11-4.5t5-11.5q0-16-16-16h1q-15-1-28.5-3.5t-24-9.5T54 448t-6-32q0-19 7.5-34T76 355t30-21.5 36-18.5l-5 58q-1 6 3.5 11t11.5 6q16 0 16-15l8-84q0-14-8-23.5T146 256zm210 223q46 0 87-17.5t71.5-48 48-71.5 17.5-87-17.5-87-48-71.5-71.5-48T272 32q-40 0-76 13.5T131 83t-49.5 56.5T53 210q3-1 7-1l88-1 3 1q31 3 52.5 27t20.5 56v2l-8 85q-2 25-20 42t-44 17h-10q28 20 61 31t69 11z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
