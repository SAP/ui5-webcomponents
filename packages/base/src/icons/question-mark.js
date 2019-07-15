import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://question-mark";
const viewBox = "0 0 512 512";
const d = "M448 480q14 0 23-9t9-23V64q0-13-9-22.5T448 32H64q-14 0-23 9.5T32 64v384q0 14 9 23t23 9h384zm0-32H64V64h384v384zm-192-71q-23 0-38-14.5T198 325h-48q0 14 7.5 29t21 27 32.5 19.5 42 7.5q43 0 68.5-21.5T347 331q0-22-13-36.5T309 267q-8-9-15-15.5t-11.5-14T276 220t0-28h-50q0 16 1 27.5t4.5 21T243 259t23 21l20 17q8 5 15 16t7 21q0 15-14.5 29T256 377zm0-217q14 0 23-9t9-23q0-13-9-22.5T256 96t-23 9.5-9 22.5q0 14 9 23t23 9z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
