declare const _default: {
    valueState: {
        control: string;
        options: string[];
    };
    files: {
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
    valueStateMessage: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    change: {
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
    valueStateMessage: string;
};
