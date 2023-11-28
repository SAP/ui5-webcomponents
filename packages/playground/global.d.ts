// eslint-disable-next-line
import "@ui5/webcomponents-base/global";

import type TabContainer from "@ui5/webcomponents/dist/TabContainer";
import type Tab from "@ui5/webcomponents/dist/Tab";

import { DOMAttributes, RefAttributes } from "react";

type CustomElement<T> = Partial<
    T & RefAttributes<T> & DOMAttributes<T> & { children: any }
>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["ui5-tabcontainer"]: CustomElement<TabContainer>;
            ["ui5-tab"]: CustomElement<Tab>;
        }
    }
    interface Window {
        "sap-ui-webcomponents-bundle": {
            configuration: {
                setTheme: (theme: string) => void;
                getTheme: () => string;
                getRTL: () => string
            };
        }
    }
}
