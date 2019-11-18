import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "activity-individual";
const pathData = "M384 320q27 0 50 10t40.5 27.5T502 398t10 50v64H192v-64q0-27 10-50t27.5-40.5 41-27.5 49.5-10h64zm96 128q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68v32h256v-32zm-32-224q0 40-28 68t-68 28-68-28-28-68 28-68 68-28 68 28 28 68zm-96 64q26 0 45-19t19-45q0-27-19-45.5T352 160t-45 18.5-19 45.5q0 26 19 45t45 19zM32 480h128v32H32q-13 0-22.5-9.5T0 480V96q0-14 9.5-23T32 64h67q10-27 37-32 8-14 23-23t33-9 33 9 23 23q13 2 23 10.5T285 64h67q14 0 23 9t9 23h-99q-2 5-4 9.5t-6 9.5q-10 13-26 13H135q-15 0-26-13-4-5-6-9.5T99 96H32v384zM144 64q-16 0-16 16 0 6 4.5 11t11.5 5h96q7 0 11.5-5t4.5-11q0-16-16-16h-16q0-14-9-23t-23-9q-13 0-22.5 9T160 64h-16zm32 192q16 0 16 16 0 6-4.5 11t-11.5 5H80q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h96zm0-64q16 0 16 16 0 6-4.5 11t-11.5 5H80q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h96z";


registerIcon(name, { pathData });
