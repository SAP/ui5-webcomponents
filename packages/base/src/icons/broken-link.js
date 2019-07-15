import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://broken-link";
const viewBox = "0 -32 512 512";
const d = "M235 112h45l-86-87q-13-13-29.5-19T131 0 98 6 69 25L58 37Q32 63 32 99t26 62l70 71v-46l-47-47q-17-17-17-40t17-40l11-11q16-16 39-16 24 0 40 16zm207 299q13-13 19.5-29t6.5-33-6.5-33.5T442 286l-74-74q-25-25-62-25t-62 25l-12 12q-2 2-4 5l-4 6 21 21 21-21q16-16 40-16t40 16l74 74q16 17 16 39.5T420 388l-12 12q-16 16-39 16-22 0-40-16l-41-41v45l18 18q28 26 63 26 17 0 33-6.5t29-19.5zm-258-59h-16v128h16V352zm-56-56H0v16h128v-16zM328 96h16V-32h-16V96zm184 56v-16H384v16h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
