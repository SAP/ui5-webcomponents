import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://project-definition-triangle";
const viewBox = "0 0 512 512";
const d = "M471.95 141q9-19 8-38.5t-11-35-26.5-25.5-37.5-10h-297q-21 0-37.5 10t-26.5 25.5-11.5 35 7.5 38.5l149 298q11 20 29 30.5t38 10.5 38.5-10.5 29.5-30.5zm-30-57q13 21 2 42l-149 298q-11 24-39 24-12 0-22.5-6.5t-15.5-17.5l-149-298q-11-21 2-42 12-20 37-20h297q25 0 37 20z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
