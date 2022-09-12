commit 3858adb1d2e88c1bd26b09f12a25a7dffc691ba2
Author: Hristo Petrov <h.petrov@sap.com>
Date:   Mon Sep 12 10:06:09 2022 +0300

    fix(ui5-input): handle deletion in numeric input (#5676)
    
    fix(ui5-input): handle deletion in numeric input
    
    - When deleting with the fractional part of an input with either backspace or delete,
    the cursor jumps at the beginning of the input, thus introducing user experience issue.
    - Additional cases with 'e' and '-' are handled as well
    
    Fixes: #4932
