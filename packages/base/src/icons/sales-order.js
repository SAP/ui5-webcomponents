import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sales-order";
const viewBox = "0 -32 512 512";
const d = "M300 203q4-5 6-6.5t7-3.5v55q-27 8-38 21.5T264 305q0 21 14.5 35t34.5 16v15h18v-15q42-5 48-45l-30-4q-2 11-7 15.5t-11 6.5v-51q31-8 42-21t11-35q0-25-15-39t-38-19v-24h-18v23q-23 3-36 16t-18 40l33 3q2-11 8-19zm31-10q10 0 16 8t6 17q0 7-4.5 14T331 242v-49zm-31 100q2-2 5-4.5t8-4.5v45q-17-9-17-23 0-6 4-13zm116 187q14 0 23-9.5t9-22.5V0q0-14-9-23t-22-9H97q-14 0-23.5 9T64 0v352l128 128h224zm1-480l-1 448H224v-96q0-14-9.5-23t-22.5-9H96V0h321z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
