import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://feed";
const viewBox = "0 0 512 512";
const d = "M144 256q23 0 43.5-9t35.5-24 24-35.5 9-43.5-9-43.5T223 65t-35.5-24-43.5-9-43.5 9T65 65t-24 35.5-9 43.5 9 43.5T65 223t35.5 24 43.5 9zm0-192q33 0 56.5 23.5T224 144q0 34-23.5 57T144 224t-56.5-23T64 144q0-33 23.5-56.5T144 64zM64 384q66 0 124-25.5t101.5-69 69-101.5T384 64V32h-32v32q0 60-22.5 112.5T268 268t-91.5 61.5T64 352H32v32h32zm1 96q90 0 166-31t131.5-86.5T449 231t31-166V32h-32v33q0 84-28.5 154T340 340t-121 79.5T65 448H32v32h33z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
