import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://visits";
const viewBox = "0 0 512 512";
const d = "M192 479h320V65H353v31h128v352H225v-32h-33v63zm65-190q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm-96-64q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm32-32q26 0 49-10t40.5-27.5 27.5-41T320 65V32H0v33q0 26 10 49.5t27.5 41 41 27.5 50.5 10h64zm96-128q0 40-28 67.5T193 160h-64q-20 0-37-7.5t-30.5-20-21-30T33 65h256zm150 231q9-10 9-23t-9-23l-62-58q-5-5-11-5t-11 5-5 11.5 5 11.5l45 41h-96q-16 0-16 16t16 16h96l-46 41q-5 5-5 11.5t5 11.5 11 5 11-5z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
