import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://add-employee";
const d = "M192 320q26 0 49.5 10t41 27.5T310 398t10 50v64H0v-64q0-27 10-50t27.5-40.5 41-27.5 49.5-10h64zm96 128q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68v32h256v-32zm-32-224q0 40-28 68t-68 28-68-28-28-68 28-68 68-28 68 28 28 68zm-96 64q26 0 45-19t19-45q0-27-19-45.5T160 160t-45 18.5T96 224q0 26 19 45t45 19zM512 96v32h-96v96h-32v-96h-96V96h96V0h32v96h96z";

registerIcon(name, d);
