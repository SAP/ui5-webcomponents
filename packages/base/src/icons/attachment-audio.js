import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-audio";
const viewBox = "0 -32 512 512";
const d = "M160 160q-15 0-22 5t-9 11q-3 7-1 16v32q-2 9 1 16 2 6 9 11t22 5h27q5 0 10 3l97 74q4 3 10 3t11-4.5 5-11.5V96q0-8-5-12t-11-4-10 3l-97 74q-5 3-10 3h-27zm0 32h27q16 0 29-10l72-54v160l-72-55q-12-9-29-9h-27v-32zM352 32h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-32h-32v32H160v-96q0-14-9.5-23t-23.5-9H32V0h320v32zm26 259q17-15 27.5-36.5T416 208q0-24-9.5-45T381 127l-27 20q14 11 22 26.5t8 34.5q0 20-9 36t-23 27v1zm78 59q26-28 41-64t15-78q0-40-14-75.5T459 70l-26 19q22 23 34.5 53.5T480 208q0 36-13.5 67.5T430 330z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
