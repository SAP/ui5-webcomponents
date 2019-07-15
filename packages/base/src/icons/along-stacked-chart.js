import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://along-stacked-chart";
const viewBox = "0 0 512 512";
const d = "M184 287q8 0 8-8v-79q0-8-8-8H40q-8 0-8 8v79q0 8 8 8h144zm-32-159q8 0 8-8V40q0-8-8-8H40q-8 0-8 8v80q0 8 8 8h112zM40 352q-8 0-8 8v80q0 8 8 8h80q8 0 8-8v-80q0-8-8-8H40zm224 0q-8 0-8 8v80q0 8 8 8h80q8 0 8-8v-80q0-8-8-8h-80zm-40-72q0 8 8 8h144q8 0 8-8v-80q0-8-8-8H232q-8 0-8 8v80zm248-152q8 0 8-8V41q0-8-8-8H360q-8 0-8 8v79q0 8 8 8h112zM224 360q0-8-8-8h-48q-8 0-8 8v80q0 8 8 8h48q8 0 8-8v-80zm248-72q8 0 8-8v-80q0-8-8-8h-48q-8 0-8 8v80q0 8 8 8h48zM312 128q8 0 8-8V41q0-8-8-8h-80q-8 0-8 8v79q0 8 8 8h80z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
