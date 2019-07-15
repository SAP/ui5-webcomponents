import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://horizontal-combination-chart";
const viewBox = "0 0 512 512";
const d = "M128 40q0-8-8-8H40q-8 0-8 8v48q0 8 8 8h80q8 0 8-8V40zm64 128q0-8-8-8H40q-8 0-8 8v48q0 8 8 8h144q8 0 8-8v-48zm-32 128q0-8-8-8H40q-8 0-8 8v48q0 8 8 8h112q8 0 8-8v-48zm96 128q0-8-8-8H40q-8 0-8 8v48q0 8 8 8h208q8 0 8-8v-48zm185 52l10-12-106-93q7-9 7-19 0-6-3-12l78-60q8 8 21 8t22.5-9 9.5-23-9.5-23-22.5-9q-16 0-26 14l-102-45v-1q0-8-5-15l54-53q8 4 15 4 13 0 22.5-9t9.5-23-9.5-23-22.5-9q-7 0-15 4l-38-36-11 11 37 37q-5 7-5 16t5 17l-53 52q-8-5-16-5-14 0-23 9t-9 23 9 23 23 9q8 0 15-4.5t12-11.5l101 45v3q0 4 2 10l-78 62q-10-8-20-8-14 0-23 9t-9 23 9 23 23 9q4 0 12-2z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
