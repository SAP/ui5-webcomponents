export default {
    "pageIndicatorStyle": {
        "control": "select",
        "options": [
            "Default",
            "Numeric"
        ]
    },
    "backgroundDesign": {
        "control": "select",
        "options": [
            "Solid",
            "Transparent",
            "Translucent"
        ]
    },
    "pageIndicatorBackgroundDesign": {
        "control": "select",
        "options": [
            "Solid",
            "Transparent",
            "Translucent"
        ]
    },
    "pageIndicatorBorderDesign": {
        "control": "select",
        "options": [
            "Solid",
            "None"
        ]
    },
    "arrowsPlacement": {
        "control": "select",
        "options": [
            "Content",
            "Navigation"
        ]
    },
    "visibleItemsIndices": {
        "control": {
            "type": false
        }
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
    "navigateTo": {
        "description": "Changes the currently displayed page.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "itemIndex",
                    "type": {
                        "text": "number"
                    },
                    "description": "The index of the target page",
                    "_ui5privacy": "public"
                }
            ],
            "returnValue": {
                "type": {
                    "text": "void"
                }
            }
        }
    },
    "navigate": {
        "description": "Fired whenever the page changes due to user interaction,\nwhen the user clicks on the navigation arrows or while resizing,\nbased on the `items-per-page-l`, `items-per-page-m` and `items-per-page-s` properties.",
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
                        "text": "Integer",
                        "references": [
                            {
                                "name": "Integer",
                                "package": "@ui5/webcomponents-base",
                                "module": "dist/types/Integer.js"
                            }
                        ]
                    },
                    "name": "selectedIndex",
                    "_ui5privacy": "public",
                    "description": "the current selected index"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.6",
    "tagName": "ui5-carousel"
};
//# sourceMappingURL=argTypes.js.map