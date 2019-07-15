import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://filter-analytics";
const viewBox = "0 0 512 512";
const d = "M128 256q13 0 22.5-9.5T160 224V64q0-14-9.5-23T128 32H64q-14 0-23 9t-9 23v160q0 13 9 22.5t23 9.5h64zm160 128q13 0 22.5-9.5T320 352V64q0-14-9.5-23T288 32h-64q-14 0-23 9t-9 23v288q0 13 9 22.5t23 9.5h64zm0-32h-64V64h64v288zm160 128q13 0 22.5-9.5T480 448V64q0-14-9.5-23T448 32h-64q-14 0-23 9t-9 23v384q0 13 9 22.5t23 9.5h64z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
