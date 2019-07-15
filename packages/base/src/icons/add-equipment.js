import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-equipment";
const viewBox = "0 0 512 512";
const d = "M416 416h96v-32h-96v-96h-32v96h-96v32h96v96h32v-96zm23-285q9-10 9-22.5T439 87l-46-46q-9-9-21-9-14 0-23 9L186 205q-23-10-52-10-47 0-83 26.5T0 288h118q14 0 27.5 9.5T159 321v32q0 14-13.5 23t-27.5 9H0q15 42 51 68.5t83 26.5q30 0 55.5-11.5t45-31T265 392t11-55q0-20-6-39zm-23-23L248 276l-14 13 5 18q3 9 4 16t1 14q0 23-8.5 43T212 415t-35 24-43 9q-46 0-77-33h61q13 0 26-5t23.5-13 17-19.5T191 353v-32q0-13-6.5-24.5t-17-20.5-23.5-14-26-5H57q15-14 35-22t42-8q17 0 41 8l19 8 15-15L372 64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
