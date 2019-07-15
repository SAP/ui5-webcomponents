import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://person-placeholder";
const viewBox = "0 -32 512 512";
const d = "M384 352q0-27-10-50t-27.5-40.5-41-27.5-49.5-10q-27 0-50 10t-40.5 27.5T138 302t-10 50q0 26 10 49.5t27.5 41T206 470t50 10q26 0 49.5-10t41-27.5 27.5-41 10-49.5zm-128-96q40 0 68 28t28 68-28 68-68 28-68-28-28-68 28-68 68-28zm64-32q26 0 49.5-10t41-27.5 27.5-41T448 96V-32H64V96q0 26 10 49.5t27.5 41T142 214t50 10h128zm96-128q0 40-28 68t-68 28H192q-40 0-68-28T96 96V0h320v96z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
