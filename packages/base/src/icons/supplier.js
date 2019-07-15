import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://supplier";
const viewBox = "0 -32 512 512";
const d = "M352 384q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q27 0 45.5 19t18.5 45-18.5 45-45.5 19q-26 0-45-19t-19-45 19-45 45-19zM128 128h256V-32H128v160zM32 80q0 20 14 34t34 14h16V32H80q-20 0-34 14T32 80zm400 48q20 0 34-14t14-34-14-34-34-14h-16v96h16zm-48 32v32q0 11-7.5 22.5T356 235t-30.5 15-37.5 6h-64q-20 0-37.5-6T156 235t-20.5-20.5T128 192v-32H96q1 35 11.5 59.5T135 259t40 22 49 7h64q27 0 50-6.5t40.5-21.5 27.5-39.5 10-60.5h-32zm-32 32v-32h-96v32h96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
