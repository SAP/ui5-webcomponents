import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://share";
const viewBox = "0 -32 513.5 513.5";
const d = "M96 96q0-40 28-68t68-28h256v-32H192q-27 0-50 10T101.5 5.5 74 46.5 64 96l1 112-37-43q-5-5-11.5-5T5 165t-5 11 5 11l52 60q10 9 23 9t23-9l53-60q11-11 0-22-12-11-23 0l-36 43zm412 188q11-11 0-22l-53-61q-10-9-23-9t-23 9l-52 61q-5 5-5 11t5 11q11 11 23 0l37-44-1 112q0 40-28 68t-68 28H64v32h256q26 0 49.5-10t41-27.5 27.5-41 10-49.5l1-112 36 44q11 11 23 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
