import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-filter";
const viewBox = "0 -32 512.05 512.05";
const d = "M512.025 96V64h-96v-96h-32v96h-96v32h96v96h32V96h96zm-160 352q20 0 29-17t-2-33l-113-130q-10-10-10-22V128l-100-91q-7-5-12-5-6 0-11 4.5t-5 11.5v198q0 13-9 22-32 37-57 65l-38.5 44-17.5 21q-11 16-2 33t28 17h320zm-109-158l4.5 5 12 14 17.5 20.5 20 23.5q24 28 55 63h-320 1l8-9.5 20-23.5 26.5-30.5 27-30.5 20.5-23 8-9q17-19 17-44V84l64 59v103q0 25 19 44z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
