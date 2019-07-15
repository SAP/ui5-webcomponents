import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-help-2";
const viewBox = "0 -32 512 512";
const d = "M256 480q53 0 99.5-20t81.5-54.5 55-81.5 20-100-20-99.5T437 43t-81.5-55T256-32 156-12 74.5 43 20 124.5 0 224t20 100 54.5 81.5T156 460t100 20zm-5-425q15 0 26 11t11 26-11 25.5-26 10.5-25.5-10.5T215 92t10.5-26T251 55zm101 239q0 32-27 57t-77 25q-46 0-72.5-24T146 293h52q5 24 17.5 32.5T251 334t35-12.5 12-27.5q0-10-2.5-14T282 265l-20-17q-15-12-23-21t-11.5-18.5-4.5-21-1-27.5h50q0 12 .5 19t3 12.5T283 202t15 13l27 25 16 18 9 16z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
