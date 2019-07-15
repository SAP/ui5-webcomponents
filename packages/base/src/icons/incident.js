import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://incident";
const viewBox = "0 -32 513 513";
const d = "M503 249q10-11 10-24.5T503 201L281-21q-11-11-24.5-11T233-21L11 201Q0 211 0 224.5T11 249l222 222q10 10 23.5 10t24.5-10zM257 65q13 0 22.5 9t9.5 23q0 13-9.5 22.5T257 129q-14 0-23-9.5T225 97q0-14 9-23t23-9zm58 170q12 13 25 27.5t13 37.5q0 33-25.5 54.5T258 376q-23 0-42-7.5T183.5 349 163 322t-7-29h48q5 24 20 38t38 14 37.5-14 14.5-29q0-9-7-20.5T292 265l-20-16q-19-15-27-26t-11-24v-38h47q-2 17 .5 27.5t7 17.5 11.5 13.5 15 15.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
