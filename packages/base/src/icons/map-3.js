import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://map-3";
const transform = "translate(49,35)";
const d = "M510 -32h-465l-42 142l33 215l-35 154h465l34 -154l-31 -212zM462 4l-29 106l31 215l-29 118h-393l30 -118l-32 -212l32 -109h390zM397 157l-36 -36l36 -36l-36 -36l-35 36l-36 -36l-36 36l36 36l-36 36l36 35l36 -35l35 35zM326 300h-72v70l36 36l36 -36v-70zM111 121 h36v-36h-36v36zM111 192h36v-35h-36v35zM111 264h36v-36h-36v36zM182 121h36v-36h-36v36zM111 334h36v-34h-36v34zM182 334h36v-34h-36v34z";

registerIcon(name, transform, d);

export default {name, transform, d};
