import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://course-book";
const viewBox = "0 -32 512 512";
const d = "M461 420q8-2 13.5-8.5T480 396V52q0-4-1-8l-2-6-4-5q-1-1-5-1-5 0-13 2-4 1-7 3v328q0 8-5 14.5t-13 8.5l-238 58q-2 0-2.5.5t-2.5.5q-3 0-9-2l-88-34 275-61q19-5 19-24V-8q0-11-7-17.5T360-32h-4L52 45q-8 2-14 8.5T32 69v338q0 17 15 22l130 49q6 2 9 2t5-1zM83 380l-19 4V75L352 2v318z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
