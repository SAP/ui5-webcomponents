import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://kpi-corporate-performance";
const viewBox = "0 -32 512 512";
const d = "M442 192h4q2-2 2-3V0q0-13-9-22.5T416-32H32q-13 0-22.5 9.5T0 0v320q0 14 9.5 23t22.5 9h192v-32H32V109l37 36q-5 8-5 15 0 14 9.5 23t22.5 9q14 0 23-9t9-23q0-5-4-15l53-53q10 4 15 4h1l45 103q-14 9-14 25 0 14 9.5 23t22.5 9q14 0 23-9t9-23q0-15-9-22l40-106h1q9 0 17-5l104 101h1zm-26-47l-68-66q4-5 4-15 0-13-9-22.5T320 32q-13 0-22.5 9.5T288 64q0 9 4.5 15.5T303 91l-38 103q-6-2-9-2-1 0-1.5.5t-1.5.5L208 91q16-8 16-27 0-13-9-22.5T192 32q-13 0-22.5 9.5T160 64q0 5 2 9l4 8-53 53-8-4-9-2-8.5 2-7.5 4-48-48V0h384v145zm-43 105l-83 83 27 28 56-56 109 111 30-34z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
