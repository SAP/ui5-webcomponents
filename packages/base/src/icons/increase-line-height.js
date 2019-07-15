import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://increase-line-height";
const viewBox = "0 -33 512 512";
const d = "M60 363q-5-5-11.5-5T37 363t-5 11.5 5 11.5l84 90q9 10 22.5 10t22.5-10l85-90q5-5 5-11.5t-5-11.5-11.5-5-11.5 5l-68 75V278q0-9-4-12.5t-12-3.5q-16 0-16 16v160zM38 73q-11 11 0 23 12 12 23 0l67-75v161q0 16 16 16 9 0 12.5-4.5T160 182V21l68 75q12 12 23 0t0-23l-85-90q-9-10-22.5-10T121-17zm267 125q-16 0-16 16t16 16h159q16 0 16-16t-16-16H305zm0-192q-16 0-16 16t16 16h159q16 0 16-16T464 6H305zm0 384q-16 0-16 16t16 16h159q16 0 16-16t-16-16H305z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
