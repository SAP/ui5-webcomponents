import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://status-negative";
const transform = "translate(48.5,35)";
const d = "M256 416q40 0 75 -15t61 -41t41 -61t15 -75t-15 -75t-41 -61t-61 -41t-75 -15t-75 15t-61 41t-41 61t-15 75t15 75t41 61t61 41t75 15zM256 96q26 0 49.5 10t41 27.5t27.5 41t10 49.5q0 27 -10 50t-27.5 40.5t-41 27.5t-49.5 10q-27 0 -50 -10t-40.5 -27.5t-27.5 -40.5 t-10 -50q0 -26 10 -49.5t27.5 -41t40.5 -27.5t50 -10zM64 384l-64 64l32 32l64 -64zM448 64l64 -64l-32 -32l-64 64zM448 384l-32 32l64 64l32 -32zM64 64l32 -32l-64 -64l-32 32z";

registerIcon(name, transform, d);

export default {name, transform, d};
