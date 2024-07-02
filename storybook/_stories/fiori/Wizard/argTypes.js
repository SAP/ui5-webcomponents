export default {
    "contentLayout": {
        "control": "select",
        "options": [
            "MultipleSteps",
            "SingleStep"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<WizardStep>"
            }
        }
    },
    "step-change": {
        "description": "Fired when the step is changed by user interaction - either with scrolling,\nor by clicking on the steps within the component header.",
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
                        "text": "WizardStep",
                        "references": [
                            {
                                "name": "WizardStep",
                                "package": "@ui5/webcomponents-fiori",
                                "module": "dist/WizardStep.js"
                            }
                        ]
                    },
                    "name": "step",
                    "_ui5privacy": "public",
                    "description": "The new step."
                },
                {
                    "type": {
                        "text": "WizardStep",
                        "references": [
                            {
                                "name": "WizardStep",
                                "package": "@ui5/webcomponents-fiori",
                                "module": "dist/WizardStep.js"
                            }
                        ]
                    },
                    "name": "previousStep",
                    "_ui5privacy": "public",
                    "description": "The previous step."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "withScroll",
                    "_ui5privacy": "public",
                    "description": "true when the event occurs due to user scrolling."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.10",
    "tagName": "ui5-wizard"
};
//# sourceMappingURL=argTypes.js.map