declare const _default: {
    wrappingType: {
        control: string;
        options: string[];
    };
    priority: {
        control: string;
        options: string[];
    };
    avatar: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    footnotes: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
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
    actions: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    close: {
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
    avatar: string;
    footnotes: string;
    default: string;
    actions: string;
};
