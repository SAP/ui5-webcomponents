declare const _default: {
    selectionMode: {
        control: string;
        options: string[];
    };
    primaryCalendarType: {
        control: string;
        options: string[];
    };
    secondaryCalendarType: {
        control: string;
        options: string[];
    };
    calendarLegend: {
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
    specialDates: {
        control: {
            type: string;
        };
        table: {
            type: {
                summary: string;
            };
        };
    };
    "selected-dates-change": {
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
    calendarLegend: string;
    default: string;
    specialDates: string;
};
