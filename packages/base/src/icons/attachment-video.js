import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://attachment-video";
const viewBox = "0 -32 512 512";
const d = "M32-32q-14 0-23 9T0 0v352l128 128h224q13 0 22.5-9t9.5-23v-96h-32v96H160v-96q0-14-9.5-23t-23.5-9H32V0h320v32h32V0q0-14-9-23t-23-9H32zm448 320q13 0 22.5-9t9.5-23V82q0-14-9.5-23T480 50q-10 0-16 5l-81 68q-2-25-20-42t-43-17H192q-26 0-45 19t-19 45v96q0 27 19 45.5t45 18.5h128q26 0 45-18.5t19-45.5v-5l80 65q7 4 16 4zm-128-64q0 14-9 23t-23 9H192q-14 0-23-9t-9-23v-96q0-13 9-22.5t23-9.5h128q14 0 23 9.5t9 22.5v96zm128 32l-96-78v-14l96-82v174z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
