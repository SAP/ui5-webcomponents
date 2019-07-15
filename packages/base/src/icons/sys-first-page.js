import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-first-page";
const viewBox = "0 -32 513.5 513.5";
const d = "M385 33h31V0q0-14-8.5-23T385-32H33q-14 0-23.5 9T0 0v352l128 128h128v-32h-96v-96q0-14-9-23t-23-9H32V0h353v33zm122 251q11-11 0-23-5-5-11.5-5t-11.5 5l-68 76V113q0-7-5-11.5T400 97q-16 0-16 16v224l-69-76q-5-5-11.5-5t-11.5 5-5 11.5 5 11.5l84 91q9 10 22.5 10t22.5-10zm1 100q11-12 0-23-5-5-11.5-5t-11.5 5l-63 65q-9 10-22.5 10T377 426l-61-63q-5-5-11.5-5t-11.5 5-5 11.5 5 11.5l84 85q9 10 22.5 10t22.5-10z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
