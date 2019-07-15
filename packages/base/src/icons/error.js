import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://error";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 99.5-20t81.5-55 55-81.5 20-99.5-20-100-55-81.5T355.5-12 256-32 156-12 74.5 42.5 20 124 0 224t20 99.5T74.5 405t81.5 55 100 20zm2-127q-13 0-23.5-8T224 320l1-5 2.5-18.5 3-37.5 3.5-61q0-11 7-16t15-5q22 0 25 21l1 37 9 85q0 17-10.5 25t-22.5 8zm0-299q20 0 31 12t11 32q0 19-11 31t-31 12-31.5-12T215 98q0-20 11.5-32T258 54z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
