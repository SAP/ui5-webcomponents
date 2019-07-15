import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://burglary";
const viewBox = "0 -32 512 512";
const d = "M510.5 190l-125-222-162 91H2.5v326h363V271zm-298 62l27 47 32-17 17 31 40-22v58h-253v-36h-36v-54h36v-73h-36v-54h36V95h92l15 28-32 17 26 48 33-17 36 63zm178-140q7 10 7 30 0 23-15.5 40.5T337.5 200q-22 0-40.5-16.5T278.5 139q0-23 17.5-40.5T339.5 81q18 0 29.5 9.5t21.5 21.5zm-32 65q20-14 20-35 0-18-11.5-29.5T339.5 101q-20 0-30.5 12t-10.5 29q0 19 11.5 29t27.5 10q14 0 21-4z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
