commit d6f7ad6b4a3ab25c0b01a2358d00e632cbfc8eb8
Author: Florian Vogt <florian.vogt@sap.com>
Date:   Thu Aug 4 15:39:53 2022 +0200

    refactor: use new sdk url (#5620)
    
    let's use the latest promoted the SDK url. 🎉
    
    Last month (July 2022) two new SDK deployments were rolled out. See blog post Short and Powerful: Convenient URLs for SAPUI5/OpenUI5 CDN.
    
    Former SDK deployments:
    
    sapui5.hana.ondemand.com, sapui5.netweaver.ondemand.com are substituted by ui5.sap.com
    openui5.hana.ondemand.com is substituted by sdk.openui5.org
    openui5nightly.hana.ondemand.com is substituted by sdk.openui5.org/nightly/
    The former SDK deployments will continue to work, there is no actual change implemented or planned as of now.
    
    However, only the new SDK URLs should be promoted in future.
