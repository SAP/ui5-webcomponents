declare const _default: {
    layout: {
        control: string;
        options: string[];
    };
    menuHorizontalAlign: {
        control: string;
        options: string[];
    };
    menuVerticalAlign: {
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
    "selection-change": {
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
};
