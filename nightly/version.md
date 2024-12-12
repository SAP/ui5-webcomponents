commit e41370f4869fdc7e37f9dc293a2b7519c10bb6ee
Author: Duc Vo Ngoc <duc.vo.ngoc@sap.com>
Date:   Wed Dec 11 16:31:21 2024 +0100

    fix(ui5-table): check for undefined in table type guard (#10343)
    
    There are certain scenarios, where the row does not have the table as its parent (removed from the table). In these cases the type guard fails as key in object calls do not work with undefined values.
    Therefore, introducing an additional check to avoid this issue.
    
    Fixes #10340
