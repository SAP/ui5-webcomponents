commit 2ad0c4480fbaea02ea8c5f6c25ab62490bddd641
Author: Nayden Naydenov <31909318+nnaydenow@users.noreply.github.com>
Date:   Thu Sep 1 16:49:12 2022 +0300

    fix(ui5-date-picker): remove background whitespace (#5764)
    
    DatePicker's height is calculated wrongly which leads to difference between DatePicker and Input height.
    
    Fixes: #5640
