commit 572ca8d58ccb6e189d4874c0f77b8558e1987a70
Author: Nikolay Deshev <nikolay.deshev@sap.com>
Date:   Tue Jul 26 18:32:30 2022 +0300

    fix(ui5-tokenizer): adjust scrolling behavior (#5281)
    
    * fix(ui5-tokenizer): adjust scrolling behavior
    
    When expanded the tokenizer should be scrolled to the end
    
    * fix(ui5-tokenizer): adjust scrolling behavior
    
    clean up, add tests
    
    * fix(ui5-tokenizer): adjust scrolling behavior
    
    adjust test
    
    * fix(ui5-tokenizer): adjust scrolling behavior
    
    fix bugs
    
    * fix(ui5-tokenizer): adjust scrolling behavior
    
    fix scrolling on up/down navigation on tokens
    fix scrolling in the MultiInput
    fix toggling of the expanded state on openening and closing the picker from a token
    fix arrow right from the last visible token to the input when tokenizer is collapsed
    
    * feat(ui5-input): fix item selection bugs
    
    bug 1: when item is autocompleted the click on the first item (the autocompleted one)
    does not select it
    bug 2: when the user navigates to an item with keyboard navigation it can not be
    clicked and selected
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix review comments, add tests
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix test urls
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix merge conflict correctly
    
    * fix(ui5-tokenizer): adjust scrolling behavior - adjust test
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix rtl
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix merge conflict
    
    * fix(ui5-tokenizer): adjust scrolling behavior - restore json file
    
    * fix(ui5-tokenizer): adjust scrolling behavior - fix code review comments
    
    * fix(ui5-tokenizer): fix unstable test
    
    * fix(ui5-tokenizer): fix unstable test
