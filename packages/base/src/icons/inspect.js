import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://inspect";
const viewBox = "0 -32 512 512";
const d = "M480 480q14 0 23-9.5t9-22.5V128q0-14-9-23t-23-9H160q-14 0-23 9t-9 23v320q0 13 9 22.5t23 9.5h320zm0-32H160V128h320v320zM352 32h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v320q0 13 9 22.5t23 9.5h32v-32H32V0h320v32zm32 352H240q-16-2-16-18 1-6 5.5-10.5T240 351h123L230 219q-10-10 0-24 12-9 24 1l131 132V208q0-7 4.5-11.5T400 191q16 2 16 18v143q0 14-9 23t-23 9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
