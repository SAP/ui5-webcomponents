import clsx from 'clsx';
import { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import { useContentDensity, useTextDirection, useTheme } from "@site/src/components/Settings";
import {
    isRegexpStringMatch,
    useCollapsible,
    Collapsible,
  } from '@docusaurus/theme-common';

function ThemeNavbarItemDesktop() {
    const [hidden, setHidden] = useState(false);

    const [theme, setTheme] = useTheme();
    const [textDirection, setTextDirection] = useTextDirection();
    const [contentDensity, setContentDensity] = useContentDensity();

    const sendSettingsToFrame = (settings) => {
        [...document.querySelectorAll("playground-ide")].forEach(ide => {
            ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({ settings }, "*");
        });

        [...document.querySelectorAll("playground-preview")].forEach(preview => {
            preview.iframe.contentWindow.postMessage({ settings }, "*");
        });
    }

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            localStorage.setItem('ui5-theme', theme);
            localStorage.setItem('ui5-content-density', contentDensity);
            localStorage.setItem('ui5-text-direction', textDirection);
        }
        sendSettingsToFrame({ theme, contentDensity, textDirection });
    }, [theme, contentDensity, textDirection]);

    return (
        <>
            <div className="navbar__item dropdown dropdown--hoverable dropdown--right">
                <a href="#" aria-haspopup="true" aria-expanded="false" role="button" className="navbar__link">Settings</a>
                    <ul className={clsx('dropdown__menu', {
                            'navbar-dropdown-hidden': hidden
                        })
                    }>
                    <li><b style={{marginInlineStart: "0.35rem"}}>Theme</b></li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_horizon"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon"); }}
                        >
                            Morning Horizon
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_horizon_dark"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_dark"); }}
                        >
                            Evening Horizon
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_horizon_hcb"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_hcb"); }}
                        >
                            Horizon High Contrast Black
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_horizon_hcw"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_horizon_hcw"); }}
                        >
                            Horizon High Contrast White
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_fiori_3"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3"); }}
                        >
                            Quartz Light
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_fiori_3_dark"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_dark"); }}
                        >
                            Quartz Dark
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_fiori_3_hcb"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_hcb"); }}
                        >
                            Quartz High Contrast Black
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': theme === "sap_fiori_3_hcw"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTheme("sap_fiori_3_hcw"); }}
                        >
                            Quartz High Contrast White
                        </a>
                    </li>

                    <li><hr style={{margin: "0.3rem 0.5rem 0.5rem 0.5rem"}} /></li>
                    <li><b style={{marginInlineStart: "0.35rem"}}>Direction</b></li>

                    {/* RTL */}
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': textDirection === "LTR"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTextDirection("LTR"); }}
                        >
                            LTR
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': textDirection === "RTL"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTextDirection("RTL"); }}
                        >
                        RTL
                        </a>
                    </li>

                    <li><hr style={{margin: "0.5rem 0.5rem 0.5rem 0.5rem"}} /></li>
                    <li><b style={{marginInlineStart: "0.35rem"}}>ContentDensity</b></li>

                    {/* Compact/ Cozy */}
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': contentDensity === "Cozy"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setContentDensity("Cozy"); }}
                        >
                            Cozy
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': contentDensity === "Compact"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setContentDensity("Compact"); }}
                        >
                           Compact
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

function ThemeNavbarItemMobile(
    items2,
    className,
    position, // Need to destructure position from props so that it doesn't get passed on.
    onClick,
    ...props) {
    const [items, setItems] = useState(["a", "b", "c"])
    return (
        <li
            className={clsx('menu__list-item', {
                'menu__list-item--collapsed': false,
            })}>
            <a role="button" class="dropdownNavbarItemMobile_A1en menu__link menu__link--sublist menu__link--sublist-caret">Theme</a>
            <ul class="menu__list">
                <li class="menu__list-item"><a aria-current="page" class="menu__link menu__link--active">Morning Horizon</a></li>
                <li class="menu__list-item"><a class="menu__link">Evening Horizon</a></li>
                <li class="menu__list-item"><a class="menu__link">Horizon HCB</a></li>
                <li class="menu__list-item"><a class="menu__link">Horizon HCW</a></li>
            </ul>
        </li>
    )
}

export default function ThemeNavbarItem({
    mobile = false,
    ...props
  }) {
    const Comp = mobile ? ThemeNavbarItemMobile : ThemeNavbarItemDesktop;
    return <Comp {...props} />;
  }