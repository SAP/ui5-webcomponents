import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-last-page";
const viewBox = "0 -32 513.5 513.5";
const d = "M32 0h192v-32H33q-14 0-23.5 9T0 0v352l128 128h256q14 0 23-9.5t9-22.5v-32h-32v32H160v-96q0-14-9.5-23t-22.5-9H32V0zm389 74q-9-10-22.5-10T376 74l-84 91q-5 5-5 11.5t5 11.5 11.5 5 11.5-5l69-76v224q0 16 16 16 6 0 11-4.5t5-11.5V112l68 76q5 5 11.5 5t11.5-5q11-12 0-23zm1-96q-9-10-22.5-10T377-22l-84 85q-5 5-5 11.5t5 11.5 11.5 5 11.5-5l61-63q9-10 22.5-10T422 23l63 65q5 5 11.5 5t11.5-5q11-11 0-23z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
