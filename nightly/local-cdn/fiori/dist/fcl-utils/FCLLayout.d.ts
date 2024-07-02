import type { MEDIA } from "../FlexibleColumnLayout.js";
import type FCLLayout from "../types/FCLLayout.js";
type LayoutConfiguration = {
    [device in MEDIA]: {
        [layoutName in FCLLayout]: {
            layout: Array<string>;
            separators: Array<{
                visible: boolean;
                gripVisible?: boolean;
            }>;
        };
    };
};
declare const getLayoutsByMedia: () => LayoutConfiguration;
export { getLayoutsByMedia, };
export type { LayoutConfiguration, FCLLayout, };
