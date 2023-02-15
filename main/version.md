commit 8498384430c662833500a6b19ee8c8f4a496f9dc
Author: ilhan orhan <ilhan.myumyun@sap.com>
Date:   Wed Feb 15 15:13:33 2023 +0200

    build: output generated files as js|ts selectively (#6409)
    
    Keep generating build files (i18n, styles) in src/generated, either as pure .js or in .ts files, based on env variable: UI5_TS.
    When set to "true", typescript mode is enabled and TS compiler runs
    When set to false - typescript mode is disabled and TS compiler does not run.
    While for some packages, such as "base", "localization", "theming" the env variable is pre-set to "true", for component packages (such as "main" and "fiori") it can be configured via the "typescript" option in the package-script.js.
    Exactly the package-script.js is the entry point for custom component packages to configure the ui5webc build and the "typescript" option is already available and will switch on off the TS compiler and force the build to generate .ts ot .js files accordingly.
    
    Fixes: #6412
