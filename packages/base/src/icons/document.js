import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://document";
const viewBox = "0 -32 512 512";
const d = "M416 480q14 0 23-9t9-23V0q0-14-8.5-23T417-32H97q-14 0-23.5 9T64 0v352l128 128h224zm1-480l-1 448H224v-96q0-14-9-23t-23-9H96V0h321z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
