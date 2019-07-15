import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://wounds-doc";
const viewBox = "0 -32 512 512";
const d = "M512 416v-64h-64v-64h-64v64h-64v64h64v64h64v-64h64zM224 224q26 0 49.5-10t41-27.5T342 146t10-50V-32H0V96q0 27 10 50t27.5 40.5 41 27.5 49.5 10h96zm28-36q-12 4-28 4h-96q-40 0-68-28T32 96V0h59zm68-92q0 43-32 72V0h32v96zm-32 241q0-23-9-43.5t-24-36-35.5-24.5-43.5-9-43.5 9T97 257.5t-24 36-9 43.5 9 43 24 35 35.5 24 43.5 9 43.5-9 35.5-24 24-35 9-43zm-112 79q-26 0-48-16l123-38q-8 24-28.5 39T176 416zm0-160q31 0 53.5 21t25.5 51l-80 24H98q-2-10-2-15 0-34 23.5-57.5T176 256z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
