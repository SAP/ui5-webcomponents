import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pending";
const viewBox = "0 -32 512 512";
const d = "M228 192v144q0 7 5 11.5t11 4.5q16 0 16-16V224h144q16 0 16-16t-16-16H228zm96 280q68-17 117.5-66.5T508 288h-33q-17 54-57 93.5T324 438v34zM260 0q38 0 72.5 12T395 45.5 443.5 96t31.5 64h33q-11-41-34-76.5t-55.5-61-73-40T260-32q-53 0-99.5 20T79 43t-55 81.5T4 224q0 45 14.5 85t40 72.5 61 56T196 472v-33q-35-11-64-31.5T81.5 359 48 296.5 36 224q0-47 17.5-87.5t48-71 71.5-48T260 0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
