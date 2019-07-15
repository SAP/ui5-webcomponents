import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://flag";
const viewBox = "0 -32 512 512";
const d = "M64 480h32V-32H64v512zm307-33q14 0 23.5 2t17 6 16 10 20.5 15V241q-14-14-30-25-14-9-31-16.5t-35-7.5q-5 0-23.5 5t-40 11-40 11-24.5 5q-29 0-51-7.5T128 192v225q10 17 26 31 14 12 33.5 22t47.5 10q7 0 27-5t42.5-11.5T346 452t25-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
