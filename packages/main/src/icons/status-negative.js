import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://status-negative";
const d = "M256 64q40 0 75 15t61 41 41 61 15 75-15 75-41 61-61 41-75 15-75-15-61-41-41-61-15-75 15-75 41-61 61-41 75-15zm0 320q26 0 49.5-10t41-27.5 27.5-41 10-49.5q0-27-10-50t-27.5-40.5-41-27.5-49.5-10q-27 0-50 10t-40.5 27.5T138 206t-10 50q0 26 10 49.5t27.5 41T206 374t50 10zM64 96L0 32 32 0l64 64zm384 320l64 64-32 32-64-64zm0-320l-32-32 64-64 32 32zM64 416l32 32-64 64-32-32z";

registerIcon(name, d);
