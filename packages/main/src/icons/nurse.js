import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "nurse";
const pathData = "M224 384h32v32h-32v32h-32v-32h-32v-32h32v-32h32v32zM512 64v64h-64v64h-64v-64h-64V64h64V0h64v64h64zM192 288q26 0 49.5 10t41 27.5 27.5 41 10 49.5v96H0v-96q0-26 10-49.5t27.5-41T78 298t50-10h64zm96 128q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68v64h256v-64zm-32-224q0 40-28 68t-68 28-68-28-28-68q0-21 8.5-38.5T95 122q-3-2-5-5L71 91l-2-2-1-2q-9-17 1-35 13-20 40-20h101q28 0 41 20 10 18 1 35l-1 2-2 2-19 26q-2 2-2.5 3t-2.5 2q14 14 22.5 31.5T256 192zM109 64q-6 0-10.5 2.5T96 72l21 27q2 5 13 5h60q11 0 13-5l20-27q2-3-2-5.5T210 64H109zm51 192q26 0 45-19t19-45q0-18-9.5-33T190 136h-61q-14 8-23.5 23T96 192q0 26 19 45t45 19z";


registerIcon(name, { pathData });
