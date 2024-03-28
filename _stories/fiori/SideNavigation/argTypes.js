export default {
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<SideNavigationItem>"
            }
        }
    },
    "header": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "fixedItems": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<SideNavigationItem>"
            }
        }
    },
    "selection-change": {
        "description": "Fired when the selection has changed via user interaction",
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
                        "text": "SideNavigationItemBase",
                        "references": [
                            {
                                "name": "SideNavigationItemBase",
                                "package": "@ui5/webcomponents-fiori",
                                "module": "dist/SideNavigationItemBase.js"
                            }
                        ]
                    },
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "the clicked item."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.8",
    "tagName": "ui5-side-navigation"
};
//# sourceMappingURL=argTypes.js.map