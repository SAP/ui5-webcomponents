import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://message-popup";
const d = "M256 242q-6 0-10-2.5t-6-14.5l-15-113q0-16 9.5-23.5T256 81t21.5 7.5T287 112l-15 113q-2 11-5.5 14t-10.5 3zm0 30q15 0 23.5 9.5T288 303q0 16-10 24t-21.5 8-21.5-8-10-24q0-12 8.5-21.5T256 272zM448 0q27 0 45.5 19T512 64v288q0 26-18.5 45T448 416h-32v75q0 10-6.5 15.5T395 512q-7 0-12-4l-79-92H64q-26 0-45-19T0 352V64q0-26 19-45T64 0h384zm32 64q0-13-9-22.5T448 32H64q-13 0-22.5 9.5T32 64v288q0 14 9.5 23t22.5 9h256l64 80v-80h64q14 0 23-9t9-23V64z";

registerIcon(name, d);
