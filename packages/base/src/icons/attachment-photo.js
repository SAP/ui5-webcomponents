import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-photo";
const viewBox = "0 -32 512 512";
const d = "M512 381V68H225v313h287zm-32-29H257V128h223v224zm-69-84q0-15-11-25.5T374 232t-26 10.5-11 25.5q0 18 11.5 27t25.5 9 25.5-9 11.5-27zm-96-108v53q0 19 18 19h86q17 0 17-19v-53H315zm37-128h32V0q0-14-9-23t-23-9H32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-32h-32v32H160v-96q0-14-9.5-23t-23.5-9H32V0h320v32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
