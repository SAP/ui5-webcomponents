commit c2341e8523a379811028d29ee3ae0509beea781a
Author: gmkv <georgi.minkov@sap.com>
Date:   Tue Jun 7 15:04:01 2022 +0300

    fix(ui5-dialog): reposition on screen resize (#5283)
    
    A recent change in scroll blocking for the block layer added
    `overflow: hidden` on the body element,
    and resizing the browser window in height would not trigger a resize
    event on the body, and the dialog will not be repositioned.
    
    To solve this case, the dialog has been changed to listen to the resize
    event on the window.
