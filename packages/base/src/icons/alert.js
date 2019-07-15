import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://alert";
const viewBox = "0 -1 512 512";
const d = "M501 137q5-10 7.5-19.5T512 99v-5q0-31-23-47.5T439 30H74q-13 0-26 4.5T24.5 47t-17 20T1 94q-1 13 3 22.5t9 20.5l185 336q24 38 61 38t59-38zM257 384q-13 0-23.5-8T223 350q1-7 3-23 2-14 3.5-37t3.5-61q0-11 7.5-16t15.5-5q22 0 24 21l2 36 9 85q0 18-10.5 26t-23.5 8zm0-299q20 0 31.5 12t11.5 32q0 19-11.5 31T257 172t-31.5-12-11.5-31q0-20 11.5-32T257 85z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
