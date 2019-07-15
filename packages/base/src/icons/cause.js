import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cause";
const viewBox = "0 0 512 512";
const d = "M416 192h32V64q0-13-9-22.5T416 32H32q-13 0-22.5 9.5T0 64v384q0 14 9.5 23t22.5 9h128v-32H32V64h384v128zm80 320q16 0 16-16t-16-16h-16q-40 0-75-15t-61-41-41-61-15-75v-48l69 76q5 5 11.5 5t11.5-5 5-11-5-11l-84-93q-10-9-23-9t-23 9l-85 93q-5 5-5 11t5 11q12 11 23 0l68-76v48q0 45 17 85.5t46.5 70.5 69 48 84.5 20h23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
