commit 692a645344dc0cc5e28e839eceb6a36ce468ad0d
Author: Diana <diana.petcheva@sap.com>
Date:   Fri Oct 23 17:10:31 2026 +0300

    fix(ui5-calendar): show correct year range when secondaryCalendarType… (#14191)
    
    When the secondary calendar type was set globally (rather than through the secondaryCalendarType property), the Year Picker displayed an incorrect range of years.
    
    This happened because hasSecondaryCalendarType only looked at the secondaryCalendarType property and ignored the globally configured value. As a result, the Calendar laid out a 20-year range while the Year Picker rendered an 8-year grid, so the two no longer matched.
    
    The fix makes hasSecondaryCalendarType read the resolved calendar type (property or global configuration), so the Calendar and Year Picker stay in sync in both cases.
    
    Fixes: #14185
