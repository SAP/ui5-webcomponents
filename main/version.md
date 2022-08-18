commit 274efaaa212e3152d27665f1809e649a75f67001
Author: Nikolay Deshev <nikolay.deshev@sap.com>
Date:   Thu Aug 18 08:18:51 2022 +0300

    fix(ui5-input): fix item selection bugs (#5372)
    
    * feat(ui5-input): fix item selection bugs
    
    bug 1: when item is autocompleted the click on the first item (the autocompleted one)
    does not select it
    bug 2: when the user navigates to an item with keyboard navigation it can not be
    clicked and selected
    
    * fix(ui5-input): fix item selection bugs - add tests
    
    * fix(ui5-input): fix item selection bugs - adapt tests
