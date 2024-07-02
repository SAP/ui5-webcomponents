export default {
    "sideContentPosition": {
        "control": "select",
        "options": [
            "End",
            "Start"
        ]
    },
    "sideContentVisibility": {
        "control": "select",
        "options": [
            "AlwaysShow",
            "ShowAboveL",
            "ShowAboveM",
            "ShowAboveS",
            "NeverShow"
        ]
    },
    "sideContentFallDown": {
        "control": "select",
        "options": [
            "BelowXL",
            "BelowL",
            "BelowM",
            "OnMinimumWidth"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "sideContent": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "toggleContents": {
        "description": "Toggles visibility of main and side contents on S screen size (mobile device).",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "void"
                }
            }
        }
    },
    "layout-change": {
        "description": "Fires when the current breakpoint has been changed.",
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
                        "text": "string"
                    },
                    "name": "currentBreakpoint",
                    "_ui5privacy": "public",
                    "description": "the current breakpoint."
                },
                {
                    "type": {
                        "text": "string"
                    },
                    "name": "previousBreakpoint",
                    "_ui5privacy": "public",
                    "description": "the breakpoint that was active before change to current breakpoint."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "mainContentVisible",
                    "_ui5privacy": "public",
                    "description": "visibility of the main content."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "sideContentVisible",
                    "_ui5privacy": "public",
                    "description": "visibility of the side content."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.1.0",
    "tagName": "ui5-dynamic-side-content"
};
//# sourceMappingURL=argTypes.js.map