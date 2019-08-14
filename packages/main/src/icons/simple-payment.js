import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://simple-payment";
const d = "M416 0q14 0 23 9t9 23v448q0 13-9 22.5t-23 9.5H96q-14 0-23-9.5T64 480V32q0-14 9-23t23-9h320zm0 32H96v448h320V32zM269 241q42 9 59 31t17 43q0 31-20.5 53.5T269 393v33h-25v-32q-26-1-47-20t-25-57l41-5q3 14 12 25t19 15v-73q-32-11-51.5-32.5T173 202q0-12 5-25t14.5-24 22.5-18.5 29-8.5v-21h25v21q58 4 70 62l-36 6q-2-12-11-20t-23-9v76zm0 115q14-4 23.5-14.5T302 319q0-24-33-35v72zm-25-192q-11 4-18 13t-7 19q0 20 25 32v-64z";

registerIcon(name, d);
