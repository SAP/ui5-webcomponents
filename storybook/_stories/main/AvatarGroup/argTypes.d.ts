declare const _default: {
    type: {
        control: string;
        options: string[];
    };
    hiddenItems: {
        control: {
            type: boolean;
        };
    };
    colorScheme: {
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
    overflowButton: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    click: {
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
    overflowButton: string;
};
