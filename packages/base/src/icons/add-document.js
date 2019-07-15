import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-document";
const viewBox = "0 -32 512 512";
const d = "M496 96V64h-96v-96h-32v96h-96v32h96v96h32V96h96zM48 0h192v-32H49q-14 0-23.5 9.5T16 0v352l128 128h224q14 0 23-9t9-23V256h-32v192H176v-96q0-13-9.5-22.5T144 320H48V0z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
