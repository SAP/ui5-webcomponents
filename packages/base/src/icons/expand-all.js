import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand-all";
const viewBox = "0 31 512 512";
const d = "M247.5 230q11 11 23 0 10-12 0-24l-102-102q-10-10-23-10t-22 10l-102 102q-12 12 0 24 11 11 22 0l85-87v260q0 16 16 16t16-16V141zm249 185q16 0 16-16t-16-16h-160q-6 0-11 4.5t-5 11.5 5 11.5 11 4.5h160zm0-96q16 0 16-16t-16-16h-160q-6 0-11 4.5t-5 11.5 5 11.5 11 4.5h160zm0-96q16 0 16-16t-16-16h-160q-6 0-11 4.5t-5 11.5 5 11.5 11 4.5h160zm0-96q16 0 16-16t-16-16h-160q-6 0-11 4.5t-5 11.5 5 11.5 11 4.5h160z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
