import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function Item() {
    const [hidden, setHidden] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(() => {
        // getting stored value
        const initialValue = localStorage.getItem("ui5-theme");
        return initialValue || "sap_horizon";
      })
    const {colorMode, setColorMode} = useColorMode();

    useEffect(() => {
        localStorage.setItem('ui5-theme', currentTheme);
        console.log("useEffect theme")
        sendThemeToFrame(currentTheme);
    }, [currentTheme]);

    function sendThemeToFrame(theme) {
        [...document.querySelectorAll("playground-ide")].forEach(ide => {
            ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({theme}, "*");
        });

        [...document.querySelectorAll("playground-preview")].forEach(preview => {
            console.log("sending theme to frame:", {preview, theme})
            preview.iframe.contentWindow.postMessage({theme}, "*");
        });
    }

    function setTheme(theme) {
        setCurrentTheme(theme);
        // localStorage.setItem('ui5-theme', currentTheme);

        if (["sap_horizon", "sap_horizon_hcw", "sap_fiori_3", "sap_fiori_3_hcw"].includes(theme)) {
            setColorMode("light");
        } else {
            setColorMode("dark");
        }

        setHidden(true);
        setTimeout(function () {
            setHidden(false);
        }, 10);

        // sendThemeToFrame(theme);
    }

    return (
        <>
            <div className="navbar__item dropdown dropdown--hoverable dropdown--right">
                <a href="#" aria-haspopup="true" aria-expanded="false" role="button" className="navbar__link">Theme</a>
                    <ul className={clsx('dropdown__menu', {
                            'navbar-dropdown-hidden': hidden
                        })
                    }>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_horizon"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon"); }}
                        >
                            Morning Horizon
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_horizon_dark"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_dark"); }}
                        >
                            Evening Horizon
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_horizon_hcb"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_hcb"); }}
                        >
                            Horizon High Contrast Black
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_horizon_hcw"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_hcw"); }}
                        >
                            Horizon High Contrast White
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_fiori_3"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3"); }}
                        >
                            Quartz Light
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_fiori_3_dark"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_dark"); }}
                        >
                            Quartz Dark
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_fiori_3_hcb"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_hcb"); }}
                        >
                            Quartz High Contrast Black
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTheme === "sap_fiori_3_hcw"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_hcw"); }}
                        >
                            Quartz High Contrast White
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}