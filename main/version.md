commit c8f417819a8628afeff2ca496a4d72335190463e
Author: Hristo Petrov <h.petrov@sap.com>
Date:   Wed Aug 3 13:17:06 2022 +0300

    fix(ui5-multiinput): prevented token-delete event firing when readonly (#5613)
    
    The token-delete event is not fired when the ui5-multiinput component has readonly attribute added.
    
    Fixes: #5448
