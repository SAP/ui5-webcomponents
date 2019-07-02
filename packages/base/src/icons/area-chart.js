import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://area-chart";
const transform = "translate(64.5,35)";
const d = "M480 33v-33h-479v449h33v-416h446zM221 265l-146 -65v11l146 129l110 -19l149 159v-110l-149 -142zM221 191l-146 -28v11l146 64l110 -37l149 139v-122l-149 -64zM480 65h-405v72l146 28l110 -37l149 65v-128z";

registerIcon(name, transform, d);

export default {name, transform, d};
