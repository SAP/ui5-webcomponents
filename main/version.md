commit 4b3431ef8f039a7be0ad92a6a432760fcb3032f0
Author: Tsanislav Gatev <tsanislav.gatev@sap.com>
Date:   Thu Feb 16 10:33:20 2023 +0200

    fix(ui5-date-picker): align value state (#6482)
    
    The issue was occuring only when you write wrong value in input, focus out, then select something and without focusing out write the same wrong value in the input and then focus out. This was not triggering the change event of the input, hence we were not validating the value, because the input would have same value before and after the selection.
    Now we set the value to the input when we select, so the input would react to every value change.
    
    fixes: #6303
    fixes: #5963
