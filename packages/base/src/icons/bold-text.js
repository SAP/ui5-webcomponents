import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bold-text";
const viewBox = "0 0 512 512";
const d = "M350 257q7-6 17-12t19-16.5 15.5-27.5 6.5-45q0-32-14.5-55t-36-38.5-46-23T267 32H123q-8 0-13.5 5.5T104 51v412q0 8 5 12.5t13 4.5h142q21 0 44.5-6.5t43-20.5 32-37.5T397 359q0-18-4.5-32.5T381 301t-15-19-15-14q-6-6-1-11zm-182 34q0-3 3-3h71q15 0 30 3t26.5 10.5 18 20T323 352q0 20-7 32.5T298.5 404t-23.5 9.5-26 2.5h-63q-8 0-13-4.5t-5-12.5V291zm89-195q12 0 24.5 3.5t23 11 17 19.5 6.5 30q0 19-6.5 31.5t-17 19.5-24 10-26.5 3h-83q-3 0-3-2V99q0-3 3-3h86z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
