commit d2e7b4fe2a3966d4eb8c97fcb141b1bed86de981
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Fri Sep 30 11:38:46 2022 +0300

    build: improve i18n texts update at dev time (#5862)
    
    Prior to this PR, changing the messagebundle.properties file does not take effect as the default i18n texts are generated based on the locale specific file (for "en" - messagebundle_en.properties).
    Now, the output is based on both the source messagebundle.properties and the locale specific files. As a result, changing the messagebundle.properties file will take immediate effect.
    
    Note: as the messagebundle.properties file is always written in English, this improvement only makes sense for the "en" locale.
