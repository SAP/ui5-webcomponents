import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://complete";
const viewBox = "0 0 512 512";
const d = "M431.958 192h32V64q0-14-9.5-23t-22.5-9h-384q-14 0-23 9t-9 23v384q0 13 9 22.5t23 9.5h128v-32h-128V64h384v128zm60 295q7-7 2-16l-185-272q-3-6-10-7t-12 4l-125 139q-9 9 0 18l21 21q10 10 19 0l80-80q5-5 11.5-4t9.5 8l146 207q3 6 9.5 7t11.5-4z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
