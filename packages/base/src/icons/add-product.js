import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://add-product";
const viewBox = "0 -32 512 512";
const d = "M73 170l109-53V70L73 124v46zM252-14l-34-16L0 80v290l109 55 218-109v-62q-8-2-14.5-5t-11.5-5q-6-4-11-6v55l-181 92-73-37V102l182-91 4 2 4 2q3 1 6 1l8-14zm-62 439l-40 20 68 35 218-110V251q-18 6-36 8v89l-182 91zm226-233h-32V96h-96V64h96v-96h32v96h96v32h-96v96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
