commit e4175cdf000ace65758e75fb70545edd872197b8
Author: Florian Vogt <florian.vogt@sap.com>
Date:   Thu Aug 4 14:33:37 2022 +0200

    fix: remove woff files and woff/ttf usage (#5629)
    
    Because IE11 is not supported anymore, woff files can be removed.
    
    In OpenUI5 this was achieved with SAP/openui5@e843fb8
