import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://laptop";
const viewBox = "0 0 512 512";
const d = "M96 192q-14 0-23 9.5T64 224v224q0 14 9 23t23 9h320q13 0 22.5-9t9.5-23V224q0-13-9.5-22.5T416 192H96zm0 32h320v224H96V224zM512 69q0-15-11-26t-26-11H37q-15 0-26 11T0 69l73 91h366zm-192-5l-32 32h-64l-32-32h128z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
