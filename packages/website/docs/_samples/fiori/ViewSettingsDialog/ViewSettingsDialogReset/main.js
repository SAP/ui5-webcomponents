import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import "@ui5/webcomponents-fiori/dist/SortItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItem.js";
import "@ui5/webcomponents-fiori/dist/FilterItemOption.js";

btnOpenDialog1.addEventListener("click", function () {
    vsd1.open = true;
    vsd1.resetButtonDisabled = checkResetButton(vsd1.sortItems.find(item => item.selected), vsd1.sortDescending);
});

vsd1.addEventListener("reset", function () {
    const defaultValues = {
        sortItem: "Name",
        sortDescending: true,
    };

    if (vsd1.sortDescending !== defaultValues.sortDescending) {
        vsd1.sortDescending = defaultValues.sortDescending;
    }

    for (const item of vsd1.sortItems) {
        if (item.text === defaultValues.sortItem) {
            item.selected = true;
 
        } else {
            item.selected = false;
        }
    }

    vsd1.resetButtonDisabled = true;
});

vsd1.addEventListener("selection-change", function (event) {
    debugger;
    vsd1.resetButtonDisabled = checkResetButton(event.detail.sortByItem, event.detail.sortDescending);
});


function checkResetButton(sortItem, sortDescending) {
    const defaultValues = {
        sortItem: "Name",
        sortDescending: true,
    };


    if (sortItem.text === defaultValues.sortItem && sortDescending === defaultValues.sortDescending) {
        return true;
    } else {
        return false
    }
}