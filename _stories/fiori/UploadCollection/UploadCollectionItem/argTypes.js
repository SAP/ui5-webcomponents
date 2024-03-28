export default {
    "uploadState": {
        "control": "select",
        "options": [
            "Complete",
            "Error",
            "Ready",
            "Uploading"
        ]
    },
    "type": {
        "control": "select",
        "options": [
            "Inactive",
            "Active",
            "Detail",
            "Navigation"
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
    "thumbnail": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "deleteButton": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IButton>"
            }
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.7",
    "tagName": "ui5-upload-collection-item",
    "showDefaultStoryOnly": true
};
//# sourceMappingURL=argTypes.js.map