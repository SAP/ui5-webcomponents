import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-prev-page";
const viewBox = "0 -32 512.5 512.5";
const d = "M384 64h32V0q0-14-8.5-23T385-32H33q-14 0-23.5 9T0 0v352l128 128h128v-32h-96v-96q0-14-9-23t-23-9H32V0h352v64zm123 315q11-11 0-23-5-5-11.5-5t-11.5 5l-68 76V144q0-7-5-11.5t-11-4.5q-16 0-16 16v288l-69-76q-5-5-11.5-5t-11.5 5-5 11.5 5 11.5l84 91q9 10 22.5 10t22.5-10z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
