import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://bbyd-dashboard";
const viewBox = "0 -32 512 512";
const d = "M153.5 114q4 0 4-5V31q0-5-4-5h-79q-5 0-5 5v78q0 5 5 5h79zm-10 185q6 0 10-4.5t4-10.5V166q0-6-4-10.5t-10-4.5h-118q-6 0-10.5 4.5T10.5 166v118q0 6 4.5 10.5t10.5 4.5h118zm-8-23h-102V174h102v102zm346 204q8 0 14-6.5t6-14.5V173q0-9-6-15t-14-6h-265q-9 0-15 6t-6 15v286q0 8 6 14.5t15 6.5h265zm-189-154h-47v-96h47v96zm80 79h-48V230h48v175zm77-35h-47V230h47v140zm-122-256q15 0 15-15V-17q0-15-15-15h-118q-6 0-10.5 4t-4.5 11V99q0 6 4.5 10.5t10.5 4.5h118zm-7-22h-102V-10h102V92z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
