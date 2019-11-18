import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "pixelate";
const pathData = "M288 352v64h-64v-64h64zM448 32q14 0 23 9.5t9 22.5v160h-64v-64h-64v64h-64v-64h-64v64h-64v-64H96v64H32V64q0-13 9-22.5T64 32h384zM160 288H96v-64h64v64zm-64 0v64H32v-64h64zm64 64v64H96v-64h64zm64-64v64h-64v-64h64zm0 0v-64h64v64h-64zm128-64h64v64h-64v-64zm64 128v-64h64v64h-64zm-128-64h64v64h-64v-64zM32 416h64v64H64q-14 0-23-9t-9-23v-32zm128 0h64v64h-64v-64zm128 0h64v64h-64v-64zm128 64v-64h64v32q0 14-9 23t-23 9h-32zm-64-128h64v64h-64v-64z";


registerIcon(name, { pathData });
