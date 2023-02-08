commit 8c84608cdf5cbc463adc0cc1670eaa337c0c49e8
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Wed Feb 8 09:34:29 2023 +0200

    fix(ui5-slider): fix runtime error on Safari (#6426)
    
    The **TouchEvent**  class is not available on Safari, and we use it in several places ("e instanceof TouchEvent"), leading to a runtime error on Safari, thrown when the handle is dragged via the mouse.
    Using  the "supportsTouch" ensures the "**instanceof** "check will be executed on devices supporting touch - Safari IOS will work fine. No errors are thrown anymore.
    
    Fixes: https://github.com/SAP/ui5-webcomponents/issues/6424
