import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://task";
const viewBox = "0 -32 512 512";
const d = "M416 416q13 0 22.5-9t9.5-23V0q0-14-9.5-23T416-32H96q-14 0-23 9T64 0v384q0 14 9 23t23 9h67q4 12 14 20.5t23 10.5q8 15 23 24t33 9 32.5-9 22.5-24q14-2 23.5-10.5T349 416h67zm-208 0q-16 0-16-16t16-16h96q16 0 16 16t-16 16h-16q0 14-9.5 23t-22.5 9q-14 0-23-9t-9-23h-16zm208-32h-67q-3-10-11-20-11-12-25-12H199q-16 0-26 12-7 10-10 20H96V0h320v384zm-88-105l24-24-121-145-72 72 23 26 49-49z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
