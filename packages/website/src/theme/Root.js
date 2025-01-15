import React, { createContext, useState } from 'react';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const ThemeContext = createContext(null);
const ContentDensityContext = createContext(null);
const TextDirectionContext = createContext(null);

export { ThemeContext, ContentDensityContext, TextDirectionContext };

// Default implementation, that you can customize
export default function Root({children}) {
    const [theme, setTheme] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-theme");
        }
        return initialValue || "sap_horizon";
    });

    const [contentDensity, setContentDensity] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-content-density");
        }
        return initialValue || "Compact";
    });

    const [textDirection, setTextDirection] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-text-direction");
        }
        return initialValue || "LTR";
    });

    const themeValue = { theme, setTheme };
    const contentDensityValue = { contentDensity, setContentDensity };
    const textDirectionValue = { textDirection, setTextDirection };

    return <>
        <ThemeContext.Provider value={themeValue}>
            <ContentDensityContext.Provider value={contentDensityValue}>
                <TextDirectionContext.Provider value={textDirectionValue}>
                    {children}
                </TextDirectionContext.Provider>
            </ContentDensityContext.Provider>
        </ThemeContext.Provider>
    </>;
}