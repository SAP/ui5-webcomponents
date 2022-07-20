commit 62c4c20ea7fc418c915d416af0f5cdb9c7c5f5f9
Author: Marcus Notheis <marcus.notheis@sap.com>
Date:   Wed Jul 20 05:47:20 2022 +0200

    fix(ui5-title): use correct font-family for Horizon Themes (#5457)
    
    SAPUI5 is using the bold font family for rendering Titles in the Horizon Themes. I think it would be better to use the sapFontHeaderFamily variable.
    
    Compare to: https://ui5.sap.com/#/entity/sap.m.Title/sample/sap.m.sample.TitleWrapping
