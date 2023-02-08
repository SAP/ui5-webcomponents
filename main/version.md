commit 18df557d80e49a85847b67a6ed5c6c6e0e96ec37
Author: Nikolay Deshev <nikolay.deshev@sap.com>
Date:   Wed Feb 8 11:10:50 2023 +0200

    fix(ui5-range-slider): fire input event with correct values after swapping (#6385)
    
    * fix(ui5-range-slider): fire input event with correct values after handle swapping
    
    resolves #6377
    
    Also fixes the visual bugs with the progress bar during value swap when dragging the handles.
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    fix the bug from the testing
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    Fix change event firing on keyboard interactions and the swapping bug on keyboard triggered swaps
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    Clean the comment
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    lint
    
    * fix(ui5-range-slider): don't fire change event if values are not changed
    
    * fix(ui5-range-slider): fire input event with correct values after swapping
    
    fix typos
