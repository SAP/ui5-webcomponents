commit 7fef62f269c2e3903139aaf9dbb92519a77c6918
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Tue Jan 17 09:00:19 2023 +0200

    fix(i18n): add mapping for norwegian locale (#6284)
    
    The change adds "nb": "no" to fallback to "no" locale, when "nb" is set.
    In addition the mapping from the old ISO639 language code "in" to "id" removed to align with SAPUI5/OpenUI5 mappings, where "in" to "id" mapping has been also removed with SAP/openui5@b4efdf1
    
    Fixes: #6283
