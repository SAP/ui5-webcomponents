import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://combine";
const viewBox = "0 42 512 512";
const d = "M475 310q5-8 5-12t-5-12l-73-72q-6-6-12.5-5.5t-10.5 5-5 11 5 12.5l46 45h-66q-43 0-80.5-19.5T216 208q-28-42-71-66.5T48 116q-10 0-13 4.5T32 132t3 11.5 13 4.5q49 2 82.5 22t59.5 56q35 50 89 72-54 22-89 72-25 36-60.5 57T49 448q-11 0-14 4.5T32 464q0 6 3 11t13 5q51 0 95.5-25t72.5-67q25-35 62.5-54t80.5-20h66l-46 45q-5 6-4.5 12.5t4.5 11 10.5 5T402 382z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
