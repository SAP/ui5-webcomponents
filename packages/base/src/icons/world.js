import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://world";
const transform = "translate(48.5,35)";
const d = "M256 480q53 0 100 -20t81.5 -54.5t54.5 -81.5t20 -100t-20 -99.5t-54.5 -81.5t-81.5 -55t-100 -20t-99.5 20t-81.5 55t-55 81.5t-20 99.5t20 100t55 81.5t81.5 54.5t99.5 20zM458 320q-23 48 -65 81t-96 43q51 -43 74 -124h87zM352 224q0 34 -6 64h-179q-3 -15 -5 -31 t-2 -33t2 -32.5t5 -31.5h179q6 31 6 64zM256 14q27 15 48 45t34 69h-163q12 -39 33.5 -69t47.5 -45zM338 320q-13 40 -34 69.5t-48 44.5q-26 -15 -47.5 -44.5t-33.5 -69.5h163zM215 444q-54 -10 -96 -43t-65 -81h88q22 80 73 124zM42 288q-5 -15 -7.5 -31t-2.5 -33t2.5 -33 t7.5 -31h92q-6 31 -6 64q0 17 2 33t4 31h-92zM54 128q23 -48 65 -80.5t96 -43.5q-51 45 -74 124h-87zM298 4q54 11 95.5 43.5t64.5 80.5h-87q-23 -80 -73 -124zM471 160q9 30 9 64t-9 64h-93q6 -30 6 -64q0 -33 -6 -64h93z";

registerIcon(name, transform, d);

export default {name, transform, d};
