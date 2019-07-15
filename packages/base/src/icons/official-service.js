import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://official-service";
const viewBox = "0 0 512.545 512.545";
const d = "M448 64h32V32H32v32h32v32h384V64zM64 256h32V128H64v128zm64-128v128h32V128h-32zm288 0v128h32V128h-32zm-64 0v128h32V128h-32zm-128 0v96h64v-96h-64zm284 192q5-5 4.5-11.5T507 297q-9-9-22 1L256 440 28 298q-14-11-23-1-5 5-5 11.5T5 320q66 43 119 77 22 15 43.5 28.5T206 450t27.5 18l10.5 7q7 5 12 5 7 0 12-5l10.5-7 27-18 38-24.5L388 397q53-34 120-77zm-60-32H64l192 128zm-192 32q14 0 23 9t9 23q0 13-9 22.5t-23 9.5-23-9.5-9-22.5q0-14 9-23t23-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
