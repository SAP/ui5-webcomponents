import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";

fcl.layoutsConfiguration = {
    desktop: {
        "TwoColumnsStartExpanded": {
            layout: ["80%", "20%", 0],
        },
        "TwoColumnsMidExpanded": {
            layout: ["20%", "80%", 0],
        },
        "ThreeColumnsMidExpanded": {
            layout: ["25%", "45%", "30%"],
        },
        "ThreeColumnsEndExpanded": {
            layout: ["15%", "15%", "70%"],
        },
        "ThreeColumnsStartExpandedEndHidden": {
            layout: ["70%", "30%", 0],
        },
        "ThreeColumnsMidExpandedEndHidden": {
            layout: ["20%", "80%", 0],
        },
    },
    tablet: {
        "TwoColumnsStartExpanded": {
            layout: ["60%", "40%", 0],
        },
        "TwoColumnsMidExpanded": {
            layout: ["40%", "60%", 0],
        },
        "ThreeColumnsMidExpanded": {
            layout: [0, "60%", "40%"],
        },
        "ThreeColumnsEndExpanded": {
            layout: [0, "40%", "60%"],
        },
        "ThreeColumnsStartExpandedEndHidden": {
            layout: ["60%", "40%", 0],
        },
        "ThreeColumnsMidExpandedEndHidden": {
            layout: ["40%", "60%", 0],
        },
    },
};

selectLayout.addEventListener("ui5-change", (e) => {
    fcl.layout = e.detail.selectedOption.textContent;
});

fcl.addEventListener("layout-configuration-change", (e) => {
    console.log("Layout configuration change:", e.detail);
    console.log("Layout configuration object:", fcl.layoutsConfiguration);
});