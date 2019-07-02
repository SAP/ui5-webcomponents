import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://cargo-train";
const transform = "translate(80.5,35)";
const d = "M224 320q20 0 34 -14t14 -34t-14 -34t-34 -14t-34 14t-14 34t14 34t34 14zM224 248q10 0 17 7t7 17q0 11 -7 17.5t-17 6.5t-17 -6.5t-7 -17.5q0 -10 7 -17t17 -7zM72 136q-8 5 -8 13v7v20v144q0 18 9 32.5t23 22.5v41q0 26 19 45t45 19h56h16h56q26 0 45 -19t19 -45v-41 q14 -8 23 -22.5t9 -32.5v-144v-20v-7q0 -7 -8 -13q-1 -1 -2 -1l-10 -4l-36 -15l-6 -2l-47 -19l-11 -4l-33 -14h-1q-2 -1 -6 -1t-6 1l-34 14l-11 4l-48 19l-5 2l-46 19q-2 0 -2 1zM168 176h-32v-32l32 -13v45zM216 176h-32v-51l32 -13v64zM264 176h-32v-64l32 13v51zM312 176 h-32v-45l32 13v32zM352 176h-24v-25l24 9v16zM232 384h88v32q0 14 -9.5 23t-22.5 9h-56v-64zM128 384h88v64h-56q-14 0 -23 -9t-9 -23v-32zM96 192h256v128q0 14 -9.5 23t-22.5 9h-96h-96q-14 0 -23 -9t-9 -23v-128zM96 160l24 -9v25h-24v-16zM308 64l21 -32h-212l21 32h170 zM351 0l21 -32h-297l21 32h255zM448 -32h-37l-76 117l28 11zM114 84l-77 -116h-37l86 127z";

registerIcon(name, transform, d);

export default {name, transform, d};
