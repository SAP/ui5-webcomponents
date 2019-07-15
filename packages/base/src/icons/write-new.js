import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://write-new";
const viewBox = "0 0 512 512";
const d = "M431.5 192h32V64q0-14-9-23t-23-9h-384q-13 0-22.5 9t-9.5 23v384q0 13 9.5 22.5t22.5 9.5h128v-32h-128V64h384v128zm60 270q5-5 5-11.5t-5-11.5l-261-260q-1-1-17-6t-36-10q-23-7-51-15 9 27 17 49 7 18 12.5 33.5t6.5 16.5l261 260q5 5 11 5t11-5zm-98-75l-22 23-182-181q-1-2 2-6t7-8 8-6.5 7-1.5zm64 64l-23 22-41-40 23-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
