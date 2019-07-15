import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://sys-back-2";
const viewBox = "0 -32 512 512";
const d = "M0 224q0 53 20 100t55 81.5 81.5 54.5 99.5 20 100-20 81.5-54.5T492 324t20-100-20-99.5T437.5 43 356-12 256-32t-99.5 20T75 43t-55 81.5T0 224zm371 128q-17 16-33 0l-103-99q-11-13-11-28 0-18 12-28L338 96q8-8 17-8t17 8 8 17-8 17l-97 95 96 93q5 5 6.5 9.5t1.5 7.5q0 10-8 17zm-115 0q-17 17-34 0l-102-99q-11-13-11-28 0-17 11-28L222 96q8-8 17.5-8t17.5 8q7 7 7 17t-7 17l-98 95 96 93q6 5 7.5 9.5t1.5 7.5q0 9-8 17z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
