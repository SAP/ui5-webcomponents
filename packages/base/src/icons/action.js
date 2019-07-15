import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://action";
const viewBox = "0 0 512 512";
const d = "M416 193h32V64q0-13-9-22.5T416 32H32q-13 0-22.5 9.5T0 64v384q0 14 9.5 23t22.5 9h128v-32H32V64h384v129zm87 229q9-10 9-23t-9-23l-92-84q-5-5-11-5t-11 5-5 11.5 5 11.5l75 69h-48q-40 0-75-15t-61-41.5-41-61.5-15-74v-16q0-16-16-16t-16 16v18.5l1 4.5q1 45 19.5 84.5T261 352t70 46 85 17h48l-75 69q-5 5-5 11.5t5 11.5 11 5 11-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
