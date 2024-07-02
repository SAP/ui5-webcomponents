declare const _default: {
    sideContentPosition: {
        control: string;
        options: string[];
    };
    sideContentVisibility: {
        control: string;
        options: string[];
    };
    sideContentFallDown: {
        control: string;
        options: string[];
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
    sideContent: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    toggleContents: {
        description: string;
        table: {
            category: string;
        };
        UI5CustomData: {
            returnValue: {
                type: {
                    text: string;
                };
            };
        };
    };
    "layout-change": {
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
    sideContent: string;
};
