import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://message-information";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9t9.5-22V65q0-14-9.5-23.5T448 32H64q-14 0-23 9.5T32 65v384q0 13 9 22t23 9h384zm0-31H64V65h384v384zM320 96H192v33h33v128h-32v31h95V129h32V96zm-64 225q-14 0-23 9t-9 22q0 14 9 23.5t23 9.5q13 0 22.5-9.5T288 352q0-13-9.5-22t-22.5-9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
