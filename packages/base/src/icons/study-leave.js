import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://study-leave";
const viewBox = "0 0 512 512";
const d = "M256.5 252l-254 85 254 84 254-84-43-15V201h-21v115zm157 32q12-15 12-32T412 219.5t-36.5-27-53.5-18-65.5-6.5-66 6.5-54 18-36 26.5-13 33q0 19 6 34l163-55zm43-104q14 0 23-9.5t9-22.5-9-22.5-23-9.5q-13 0-22 9.5t-9 22.5 9 22.5 22 9.5zm11-85l21-63h-63l21 63h21z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
