import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const useTheme = () => {
    const { colorMode, setColorMode } = useColorMode();

    const [currentTheme, setCurrentTheme] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-theme");
        }
        return initialValue || "sap_horizon";
    });

    useEffect(() => {
        if (["sap_horizon", "sap_horizon_hcw", "sap_fiori_3", "sap_fiori_3_hcw"].includes(currentTheme)) {
            setColorMode("light");
        } else {
            setColorMode("dark");
        }
    }, [currentTheme]);

    return [currentTheme, setCurrentTheme];
}

const useContentDensity = () => {
    return useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-content-density");
        }
        return initialValue || "Compact";
    });
}

const useTextDirection = () => {
    return useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-text-direction");
        }
        return initialValue || "LTR";
    });
}

export { useTheme, useContentDensity, useTextDirection };