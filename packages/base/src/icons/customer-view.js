import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://customer-view";
const viewBox = "0 -32 512 512";
const d = "M156.5 166q35-21 44-40.5t9-44.5V43l-134 66v31q0 16 4.5 28t22.5 12q5 0 11-1t14-1q-13 12-21 27t-8 33q0 17 11.5 28.5t24.5 11.5q23 0 38-20.5t15-49.5q0-40-31-42zm320 204V78l-221-110v293l-219 109 220 110zm-220 38l110-56 36 18-110 55zm-91-10l146-74 37 19-147 73zm91-101l36 19-73 36-36-18zm164-188q-2 4-8.5 18t-7.5 31q20 20 31 44t11 44q0 39-37 39-21 0-43-13.5t-40-33T297 196t-11.5-42q0-20 10.5-30t27.5-10q8 0 22.5 3.5t23.5 12.5q14-20 26.5-26t14.5-6q6 0 8 3.5t2 7.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
