import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://delete";
const viewBox = "0 -32 512 512";
const d = "M480 448v-32H32v32h145q-1 0 7 16t40 16h65q31 0 39-16l8-16h144zm-46-64h46v-33h-32L416 0q0-32-32-32H128Q96-32 96 0L64 351H32v33h402zm-18-33H96L128 0h256zM201 66l-31-3-20 224 31 3zm71-2h-34v225h34V64zm70-1l-33 3 20 224 33-3z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
