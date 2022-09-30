commit 0dca9b2c87509be9ec3725681d8aa2dd23e59219
Author: gmkv <georgi.minkov@sap.com>
Date:   Fri Sep 30 14:04:47 2022 +0300

    fix(ui5-radio-button): correct syncing radio group when exiting DOM (#5859)
    
    In frameworks like React, conditional rendering such as:
    ```js
    <div>
    { falsyValue && <RadioButton /> }
    </div>
    ```
     will remove radio buttons from the DOM completely.
    
    With this fix, buttons from the same group will have the correct tabindex set when they are placed back in the DOM.
    
    Fixes #5803
