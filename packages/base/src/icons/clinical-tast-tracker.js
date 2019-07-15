import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://clinical-tast-tracker";
const viewBox = "0 -32 512 512";
const d = "M416 416q14 0 23-9t9-23V0q0-13-9-22.5T416-32H96q-13 0-22.5 9.5T64 0v384q0 14 9.5 23t22.5 9h67q5 12 14.5 21t23.5 11q8 14 23 23t32 9q18 0 33-9t23-23q14-2 23.5-11t13.5-21h67zm-208 0q-6 0-11-4.5t-5-11.5 5-11.5 11-4.5h96q16 0 16 16t-16 16h-16q0 14-9 23t-23 9q-13 0-22.5-9t-9.5-23h-16zm208-32h-67q-2-5-4-9.5t-6-9.5q-10-13-25-13H199q-15 0-25 13-4 5-6 9.5t-4 9.5H96V0h320v384zM216 192q8 0 8-8v-80q0-8-8-8h-80q-8 0-8 8v80q0 8 8 8h80zm-12-21h-55v-54h55v54zm12 149q8 0 8-8v-80q0-8-8-8h-80q-8 0-8 8v80q0 8 8 8h80zm-12-21h-55v-54h55v54zm164-139q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm0 128q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
