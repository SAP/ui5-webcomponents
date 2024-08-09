import type { MEDIA } from "../FlexibleColumnLayout.js";
import type FCLLayout from "../types/FCLLayout.js";
type LayoutConfiguration = {
    [device in MEDIA]: {
        [layoutName in FCLLayout]: {
            layout: Array<string>;
            arrows: Array<{
                visible: boolean;
                dir: null | string;
                separator?: boolean;
            }>;
        };
    };
};
declare const getLayoutsByMedia: () => LayoutConfiguration;
declare const getNextLayoutByStartArrow: () => {
    TwoColumnsStartExpanded: string;
    TwoColumnsMidExpanded: string;
    ThreeColumnsMidExpanded: string;
    ThreeColumnsEndExpanded: string;
    ThreeColumnsStartExpandedEndHidden: string;
    ThreeColumnsMidExpandedEndHidden: string;
};
declare const getNextLayoutByEndArrow: () => {
    ThreeColumnsMidExpanded: string;
    ThreeColumnsEndExpanded: string;
    ThreeColumnsStartExpandedEndHidden: string;
    ThreeColumnsMidExpandedEndHidden: string;
};
export { getLayoutsByMedia, getNextLayoutByStartArrow, getNextLayoutByEndArrow, };
export type { LayoutConfiguration, FCLLayout, };
