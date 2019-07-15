import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://kpi-managing-my-area";
const viewBox = "0 0 512 512";
const d = "M372.5 317l-83 83 27 27 56-55 110 111 29-35zm-180-125q27 0 50-10t40.5-27.5 27.5-40.5 10-50V32H.5v32q0 27 10 50T38 154.5 79 182t49.5 10h64zm96-128q0 40-28 68t-68 28h-64q-20 0-37-7.5T61 132t-21-30.5T32.5 64h256zm-32 224q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q27 0 45.5 19t18.5 45q0 27-18.5 45.5T160.5 352q-26 0-45-18.5t-19-45.5q0-26 19-45t45-19zm303-96q16 0 16-16 0-6-4.5-11t-11.5-5h-95q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h95zm0-64q16 0 16-16 0-6-4.5-11t-11.5-5h-95q-6 0-11 5t-5 11q0 7 5 11.5t11 4.5h95z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
