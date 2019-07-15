import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://screen-split-three";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9t9.5-23V64q0-13-9.5-22.5T448 32H64q-14 0-23 9.5T32 64v384q0 14 9 23t23 9h384zm-288-32H64V64h96v384zm160 0H192V64h128v384zm128 0h-96V64h96v384z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
