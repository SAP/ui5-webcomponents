export default {
    "design": {
        "control": "select",
        "options": [
            "Default",
            "Positive",
            "Negative",
            "Critical",
            "Neutral"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<Node>"
            }
        }
    },
    "subTabs": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ITab>"
            }
        }
    },
    "getTabInStripDomRef": {
        "description": "Returns the DOM reference of the tab that is placed in the header.\n\n**Note:** Tabs, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs will return `null`.\n\n**Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "ITab | null",
                    "references": [
                        {
                            "name": "ITab",
                            "package": "@ui5/webcomponents",
                            "module": "dist/TabContainer.js"
                        }
                    ]
                }
            }
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-tab",
    "showDefaultStoryOnly": true
};
//# sourceMappingURL=argTypes.js.map