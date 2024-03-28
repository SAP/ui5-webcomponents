export default {
    "selectionMode": {
        "control": "select",
        "options": [
            "Single",
            "Multiple",
            "Range"
        ]
    },
    "primaryCalendarType": {
        "control": "select",
        "options": [
            "Gregorian",
            "Islamic",
            "Japanese",
            "Buddhist",
            "Persian"
        ]
    },
    "secondaryCalendarType": {
        "control": "select",
        "options": [
            "Gregorian",
            "Islamic",
            "Japanese",
            "Buddhist",
            "Persian"
        ]
    },
    "calendarLegend": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<CalendarLegend>"
            }
        }
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<CalendarDate>"
            }
        }
    },
    "specialDates": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<SpecialCalendarDate>"
            }
        }
    },
    "selected-dates-change": {
        "description": "Fired when the selected dates change.\n\n**Note:** If you call `preventDefault()` for this event, the component will not\ncreate instances of `ui5-date` for the newly selected dates. In that case you should do this manually.",
        "control": {
            "type": false
        },
        "table": {
            "category": "events"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "type": {
                        "text": "Array<string>"
                    },
                    "name": "values",
                    "_ui5privacy": "public",
                    "description": "The selected dates"
                },
                {
                    "type": {
                        "text": "Array<number>"
                    },
                    "name": "dates",
                    "_ui5privacy": "public",
                    "description": "The selected dates as UTC timestamps"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.11",
    "tagName": "ui5-calendar"
};
//# sourceMappingURL=argTypes.js.map