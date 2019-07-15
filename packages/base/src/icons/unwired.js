import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://unwired";
const viewBox = "0 -32 512 512";
const d = "M374 394q0 1 1 2t4 1q1-1 1-3v-3l-17-56-26-74-24-68-14-37q-16-25-39-25t-34 15.5-11 32.5q0 7 5 19 2 4 7.5 11.5T244 231l45 58 49 62zm-118 86q53 0 100-20t81.5-55 54.5-81.5 20-99.5-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224t20 99.5T75 405t81.5 55 99.5 20zm202-352q22 46 22 96 0 46-17.5 87t-48 71.5-71.5 48-87 17.5-87-17.5-71.5-48-48-71.5T32 224q0-50 22-96h110q15-23 39-36t53-13 53 13 39 36h110z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
