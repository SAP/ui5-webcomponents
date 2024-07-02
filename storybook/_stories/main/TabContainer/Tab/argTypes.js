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
    "items": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ITab>"
            }
        }
    },
    "getDomRefInStrip": {
        "description": "Returns the DOM reference of the tab that is placed in the header.\n\n**Note:** Tabs, placed in the `items` slot of other tabs are not shown in the header. Calling this method on such tabs will return `undefined`.\n\n**Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "HTMLElement | undefined"
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