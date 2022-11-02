// Universal
type ObjectWithDynamicKeys = {[key: string]: any};

declare global {
    interface Window {
        sap: any;
    }
    interface Navigator {
        userLanguage: any,
        browserLanguage: any,
    }
}


export {
    ObjectWithDynamicKeys,
}
