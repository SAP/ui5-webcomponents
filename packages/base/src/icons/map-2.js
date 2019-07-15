import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://map-2";
const viewBox = "0 0 512 512";
const d = "M448 480q13 0 22.5-9.5T480 448V64q0-14-9.5-23T448 32H64q-14 0-23 9t-9 23v384q0 13 9 22.5t23 9.5h384zm0-32H64V64h384v384zM311 277q-4 9-4 19 0 23 16 39.5t39 16.5 38.5-16.5T416 296q0-10-4-19l-51-86zm28-119l28-14-14-28-29 14zm-72 0l14 29 29-14-14-29zm-43 57l29-14-15-29-28 14zm-57 29l28-15-14-28-29 14zm57 43l-15-29-28 14 14 29zm14 28l-110 62v39l124-72zm28 58l-29 14 15 29 28-14zM129 96H96l42 90 29-14z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
