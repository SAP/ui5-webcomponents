declare const _default: {
    layout: {
        control: string;
        options: string[];
    };
    columnLayout: {
        control: {
            type: boolean;
        };
    };
    startColumnVisible: {
        control: {
            type: boolean;
        };
    };
    midColumnVisible: {
        control: {
            type: boolean;
        };
    };
    endColumnVisible: {
        control: {
            type: boolean;
        };
    };
    visibleColumns: {
        control: {
            type: boolean;
        };
    };
    startColumn: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    midColumn: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    endColumn: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
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
            parameters: ({
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
            } | {
                type: {
                    text: string;
                    references?: undefined;
                };
                name: string;
                _ui5privacy: string;
                description: string;
            })[];
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
    startColumn: string;
    midColumn: string;
    endColumn: string;
};
