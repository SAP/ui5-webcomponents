export default {
    "layout": {
        "control": "select",
        "options": [
            "Auto",
            "Vertical",
            "Horizontal"
        ]
    },
    "menuHorizontalAlign": {
        "control": "select",
        "options": [
            "Left",
            "Right"
        ]
    },
    "menuVerticalAlign": {
        "control": "select",
        "options": [
            "Top",
            "Bottom"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IMediaGalleryItem>"
            }
        }
    },
    "selection-change": {
        "description": "Fired when selection is changed by user interaction.",
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
                    "description": "the selected item."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.1.0",
    "tagName": "ui5-media-gallery"
};
//# sourceMappingURL=argTypes.js.map