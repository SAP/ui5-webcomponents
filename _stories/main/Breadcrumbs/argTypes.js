export default {
    "design": {
        "control": "select",
        "options": [
            "Standard",
            "NoCurrentPage"
        ]
    },
    "separatorStyle": {
        "control": "select",
        "options": [
            "Slash",
            "BackSlash",
            "DoubleBackSlash",
            "DoubleGreaterThan",
            "DoubleSlash",
            "GreaterThan"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<BreadcrumbsItem>"
            }
        }
    },
    "item-click": {
        "description": "Fires when a `BreadcrumbsItem` is clicked.\n\n**Note:** You can prevent browser location change by calling `event.preventDefault()`.",
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
                        "text": "HTMLElement"
                    },
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "The clicked item."
                },
                {
                    "type": {
                        "text": "Boolean"
                    },
                    "name": "altKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"ALT\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "Boolean"
                    },
                    "name": "ctrlKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"CTRL\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "Boolean"
                    },
                    "name": "metaKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"META\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "Boolean"
                    },
                    "name": "shiftKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"SHIFT\" key was pressed when the event was triggered."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.15",
    "tagName": "ui5-breadcrumbs"
};
//# sourceMappingURL=argTypes.js.map