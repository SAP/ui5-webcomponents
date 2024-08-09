import MovePlacement from "../../types/MovePlacement.js";
import Orientation from "../../types/Orientation.js";
declare const findClosestPosition: (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation) => {
    element: HTMLElement;
    placements: MovePlacement[];
} | null;
export default findClosestPosition;
