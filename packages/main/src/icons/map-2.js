import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "map-2";
const pathData = "M448 32q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V64q0-13 9-22.5T64 32h384zm0 32H64v384h384V64zM311 235q-4-9-4-19 0-23 16-39.5t39-16.5 38.5 16.5T416 216q0 10-4 19l-51 86zm28 119l28 14-14 28-29-14zm-72 0l14-29 29 14-14 29zm-43-57l29 14-15 29-28-14zm-57-29l28 15-14 28-29-14zm57-43l-15 29-28-14 14-29zm14-28l-110-62V96l124 72zm28-58l-29-14 15-29 28 14zM129 416H96l42-90 29 14z";


registerIcon(name, { pathData });
