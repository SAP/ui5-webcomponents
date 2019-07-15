import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://status-negative";
const viewBox = "0 -32 512 512";
const d = "M256 416q40 0 75-15t61-41 41-61 15-75-15-75-41-61-61-41-75-15-75 15-61 41-41 61-15 75 15 75 41 61 61 41 75 15zm0-320q26 0 49.5 10t41 27.5 27.5 41 10 49.5q0 27-10 50t-27.5 40.5-41 27.5-49.5 10q-27 0-50-10t-40.5-27.5T138 274t-10-50q0-26 10-49.5t27.5-41T206 106t50-10zM64 384L0 448l32 32 64-64zM448 64l64-64-32-32-64 64zm0 320l-32 32 64 64 32-32zM64 64l32-32-64-64L0 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
