declare const _default: {
    pageIndicatorStyle: {
        control: string;
        options: string[];
    };
    backgroundDesign: {
        control: string;
        options: string[];
    };
    pageIndicatorBackgroundDesign: {
        control: string;
        options: string[];
    };
    pageIndicatorBorderDesign: {
        control: string;
        options: string[];
    };
    arrowsPlacement: {
        control: string;
        options: string[];
    };
    visibleItemsIndices: {
        control: {
            type: boolean;
        };
    };
    default: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    navigateTo: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                name: string;
                type: {
                    text: string;
                };
                description: string;
                _ui5privacy: string;
            }[];
            returnValue: {
                type: {
                    text: string;
                };
            };
        };
    };
    navigate: {
        description: string;
        control: {
            type: boolean;
        };
        table: {
            category: string;
        };
        UI5CustomData: {
            parameters: {
                type: {
                    text: string;
                    references: {
                        name: string;
                        package: string;
                        module: string;
                    }[];
                };
                name: string;
                _ui5privacy: string;
                description: string;
            }[];
        };
    };
};
export default _default;
export declare const componentInfo: {
    package: string;
    since: string;
    tagName: string;
};
export type StoryArgsSlots = {
    default: string;
};
