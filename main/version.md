commit 68ad562e15cf678af675c855b33af21ed56faad7
Author: Martin <martin.r.hristov@gmail.com>
Date:   Thu Feb 2 15:52:12 2023 +0200

    fix(ui5-input): fire change event on enter (#6390)
    
    when the user types something then hits enter the value is
    set to the input field value. If the user change the value
    in the change handler, internals used to be not updated
    correctly and prevented correct future firing of the change
    event.
    
    FIXES: #6262
