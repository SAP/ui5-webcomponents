import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://step";
const viewBox = "0 32 512 512";
const d = "M423 277q12 11 0 23l-70 94q-9 11-9.5 23.5T353 439q9 10 22.5 10t22.5-10l104-128q10-9 10-22.5T502 266L399 138q-10-10-23-10t-22 10q-10 9-9.5 22t9.5 23zm-160 0q12 11 0 23l-97 126q-8 10-9 23t9 22q9 10 22 10t23-10l131-160q10-9 10-22.5T342 266L213 106q-9-10-22.5-10T168 106q-10 9-10 21.5t10 23.5zM33 394q-10 9-9 23t9 22q10 10 22.5 10T78 439l104-128q10-9 10-22.5T182 266L79 138q-9-10-22.5-10T34 138q-10 9-9.5 21.5T34 183l69 94q11 11 0 23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
