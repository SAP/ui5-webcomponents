import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://background";
const viewBox = "0 0 512 512";
const d = "M368 320q-20 0-34 14t-14 34 14 34 34 14 34-14 14-34-14-34-34-14zm80 160q14 0 23-9t9-23V64q0-14-9-23t-23-9H64q-13 0-22.5 9T32 64v384q0 14 9.5 23t22.5 9h384zm0-32H64V64h384v384zm-92-288l-58 85 22 43 96-128h-60zm-7-32H94l130 183z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
