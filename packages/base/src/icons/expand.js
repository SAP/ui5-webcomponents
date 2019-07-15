import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://expand";
const viewBox = "0 0 512 512";
const d = "M256 384V272H144v-32h112V128h32v112h112v32H288v112h-32zm208 96H208v-32h256V64H80v128H48V64q0-13 9-22.5T80 32h384q13 0 22.5 9.5T496 64v384q0 14-9.5 23t-22.5 9zm-441 4q-12 11 0 23 5 5 11 5t11-5l92-99q9-10 9-23t-9-22L45 262q-5-5-11.5-5T22 262t-5 11.5 5 11.5l87 95q6 5 0 11z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
