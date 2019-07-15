import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://wrench";
const viewBox = "0 0 512 512";
const d = "M471 131q9-10 9-22.5T471 87l-46-46q-9-9-21-9-14 0-23 9L218 205q-23-10-52-10-47 0-83 26.5T32 288h118q14 0 27.5 9.5T191 321v32q0 14-13.5 23t-27.5 9H32q15 42 51 68.5t83 26.5q30 0 55.5-11.5t45-31T297 392t11-55q0-20-6-39zm-23-23L280 276l-14 13 5 18q3 9 4 16t1 14q0 23-8.5 43T244 415t-35 24-43 9q-46 0-77-33h61q13 0 26-5t23.5-13 17-19.5T223 353v-32q0-13-6.5-24.5t-17-20.5-23.5-14-26-5H89q15-14 35-22t42-8q17 0 41 8l19 8 15-15L404 64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
