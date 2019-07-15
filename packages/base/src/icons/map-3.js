import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://map-3";
const viewBox = "0 -32 512 512";
const d = "M511-32H46L4 110l33 215L2 479h465l34-154-31-212zM463 4l-29 106 31 215-29 118H43l30-118-32-212L73 4h390zm-65 153l-36-36 36-36-36-36-35 36-36-36-36 36 36 36-36 36 36 35 36-35 35 35zm-71 143h-72v70l36 36 36-36v-70zM112 121h36V85h-36v36zm0 71h36v-35h-36v35zm0 72h36v-36h-36v36zm71-143h36V85h-36v36zm-71 213h36v-34h-36v34zm71 0h36v-34h-36v34z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
