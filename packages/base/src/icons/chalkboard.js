import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://chalkboard";
const viewBox = "0 0 561 561";
const d = "M521 445q16 0 28-11.5t12-27.5V77q0-17-12-31t-28-14H41q-17 0-29 14T0 77v329q0 16 12 27.5T41 445h480zm-41-84h-32q-6-19-24-32-17-14-32-18v-35q29 9 50 29V160h38v201zM72 276q30 9 50 29V160h38v201h-31q-6-19-23.5-32T72 311v-35zm189-116l26 41 26-41h43l-48 68 44 62h-41l-24-35-23 35h-42l45-63-47-67h41zm180-85v41H281V75h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
