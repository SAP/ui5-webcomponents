import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://order-status";
const viewBox = "0 -32 512 512";
const d = "M159 179l-30 33 16 15 14-14 46 47 15-16zm61-43l-31-30 31-31-16-15-30 30-31-30-15 15 30 31-30 30 15 15 31-30 30 30zm148 88q16 0 16-16 0-6-4.5-11t-11.5-5h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm0-96q16 0 16-16 0-6-4.5-11T368 96h-96q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h96zm48 352q14 0 23-9.5t9-22.5V0q0-14-9-23t-22-9H97q-14 0-23.5 9T64 0v352l128 128h224zm1-480l-1 448H224v-96q0-14-9.5-23t-22.5-9H96V0h321z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
