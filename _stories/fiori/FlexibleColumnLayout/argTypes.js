export default {
    "layout": {
        "control": "select",
        "options": [
            "OneColumn",
            "TwoColumnsStartExpanded",
            "TwoColumnsMidExpanded",
            "ThreeColumnsMidExpanded",
            "ThreeColumnsEndExpanded",
            "ThreeColumnsStartExpandedEndHidden",
            "ThreeColumnsMidExpandedEndHidden",
            "MidColumnFullScreen",
            "EndColumnFullScreen"
        ]
    },
    "columnLayout": {
        "control": {
            "type": false
        }
    },
    "startColumnVisible": {
        "control": {
            "type": false
        }
    },
    "midColumnVisible": {
        "control": {
            "type": false
        }
    },
    "endColumnVisible": {
        "control": {
            "type": false
        }
    },
    "visibleColumns": {
        "control": {
            "type": false
        }
    },
    "startColumn": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "midColumn": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "endColumn": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "layout-change": {
        "description": "Fired when the layout changes via user interaction by clicking the arrows\nor by changing the component size due to resizing.",
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
                        "text": "FCLLayout",
                        "references": [
                            {
                                "name": "FCLLayout",
                                "package": "@ui5/webcomponents-fiori",
                                "module": "dist/types/FCLLayout.js"
                            }
                        ]
                    },
                    "name": "layout",
                    "_ui5privacy": "public",
                    "description": "The current layout"
                },
                {
                    "type": {
                        "text": "array"
                    },
                    "name": "columnLayout",
                    "_ui5privacy": "public",
                    "description": "The effective column layout, f.e [67%, 33%, 0]"
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "startColumnVisible",
                    "_ui5privacy": "public",
                    "description": "Indicates if the start column is currently visible"
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "midColumnVisible",
                    "_ui5privacy": "public",
                    "description": "Indicates if the middle column is currently visible"
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "endColumnVisible",
                    "_ui5privacy": "public",
                    "description": "Indicates if the end column is currently visible"
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "arrowsUsed",
                    "_ui5privacy": "public",
                    "description": "Indicates if the layout is changed via the arrows"
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "resize",
                    "_ui5privacy": "public",
                    "description": "Indicates if the layout is changed via resizing"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.8",
    "tagName": "ui5-flexible-column-layout"
};
//# sourceMappingURL=argTypes.js.map