import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pushpin-off";
const viewBox = "0 31 512 512";
const d = "M454 388q10-9 10-22t-10-23q-9-9-23.5-17t-32-15.5-35-14T331 285q12-37 3.5-76.5T296 140l-90 90L75 100q-11-12-23 0-5 5-5 11t5 11l131 131-91 90q30 30 69 38.5t77-3.5q4 15 10.5 32.5t14 35 16 32.5 17.5 24q10 9 23 9t22-9zm-135 91q-11-11-24-40t-26-71l-10-30-31 9q-22 8-44.5 6T141 340l152-152q11 20 13 42.5t-6 45.5l-10 30 31 10q31 10 51.5 18t33 14.5 18.5 11 8 6.5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
