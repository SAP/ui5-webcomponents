import clsx from 'clsx';
import { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import { useContentDensity, useTextDirection, useTheme } from "@site/src/components/Settings";
import {
    Collapsible,
} from '@docusaurus/theme-common';

const sendSettingsToFrame = (settings) => {
    [...document.querySelectorAll("playground-ide")].forEach(ide => {
        ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({ settings }, "*");
    });

    [...document.querySelectorAll("playground-preview")].forEach(preview => {
        preview.iframe.contentWindow.postMessage({ settings }, "*");
    });
}

function ThemeNavbarItemDesktop() {
    const [theme, setTheme] = useTheme();
    const [textDirection, setTextDirection] = useTextDirection();
    const [contentDensity, setContentDensity] = useContentDensity();
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            localStorage.setItem('ui5-theme', theme);
            localStorage.setItem('ui5-content-density', contentDensity);
            localStorage.setItem('ui5-text-direction', textDirection);
        }
        sendSettingsToFrame({ theme, contentDensity, textDirection });
    }, [theme, contentDensity, textDirection]);

    return <div
        className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', 'dropdown--right', {
            'dropdown--show': showDropdown,
        })}>
        <NavbarNavLink
            aria-haspopup="true"
            aria-expanded={showDropdown}
            role="button"
            href="#"
            label="Settings"
            className="navbar__link"
            onClick={(e) => e.preventDefault()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    setShowDropdown(!showDropdown);
                }
            }}>
        </NavbarNavLink>
        <ul className="dropdown__menu">
            <li><b style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}>Theme</b></li>
            <NavbarItem
                label="Morning Horizon"
                isDropdownItem
                onClick={() => { setTheme("sap_horizon") }}
                className={clsx({ 'menu__link--active': theme === "sap_horizon" })}
            />
            <NavbarItem
                label="Evening Horizon"
                isDropdownItem
                onClick={() => { setTheme("sap_horizon_dark") }}
                className={clsx({ 'menu__link--active': theme === "sap_horizon_dark" })}
            />
            <NavbarItem
                label="Horizon High Contrast Black"
                isDropdownItem
                onClick={() => { setTheme("sap_horizon_hcb") }}
                className={clsx({ 'menu__link--active': theme === "sap_horizon_hcb" })}
            />
            <NavbarItem
                label="Horizon High Contrast White"
                isDropdownItem
                onClick={() => { setTheme("sap_horizon_hcw") }}
                className={clsx({ 'menu__link--active': theme === "sap_horizon_hcw" })}
            />
            <NavbarItem
                label="Quartz Light"
                isDropdownItem
                onClick={() => { setTheme("sap_fiori_3") }}
                className={clsx({ 'menu__link--active': theme === "sap_fiori_3" })}
            />
            <NavbarItem
                label="Quartz Dark"
                isDropdownItem
                onClick={() => { setTheme("sap_fiori_3_dark") }}
                className={clsx({ 'menu__link--active': theme === "sap_fiori_3_dark" })}
            />
            <NavbarItem
                label="Quartz High Contrast Black"
                isDropdownItem
                onClick={() => { setTheme("sap_fiori_3_hcb") }}
                className={clsx({ 'menu__link--active': theme === "sap_fiori_3_hcb" })}
            />
            <NavbarItem
                label="Quartz High Contrast White"
                isDropdownItem
                onClick={() => { setTheme("sap_fiori_3_hcw") }}
                className={clsx({ 'menu__link--active': theme === "sap_fiori_3_hcw" })}
            />
            <li><hr style={{ margin: "0.25rem 0.5rem" }} /></li>
            <li><b style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}>Direction</b></li>
            <NavbarItem
                label="LTR"
                isDropdownItem
                onClick={() => { setTextDirection("LTR") }}
                className={clsx({ 'menu__link--active': textDirection === "LTR" })}
            />
            <NavbarItem
                label="RTL"
                isDropdownItem
                onClick={() => { setTextDirection("RTL") }}
                className={clsx({ 'menu__link--active': textDirection === "RTL" })}
            />
            <li><hr style={{ margin: "0.25rem 0.5rem" }} /></li>
            <li><b style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}>Content density</b></li>
            <NavbarItem
                label="Cozy"
                isDropdownItem
                onClick={() => { setContentDensity("Cozy") }}
                className={clsx({ 'menu__link--active': contentDensity === "Cozy" })}
            />
            <NavbarItem
                label="Compact"
                className={clsx({ 'menu__link--active': contentDensity === "Compact" })}
                isDropdownItem
                onClick={() => { setContentDensity("Compact") }}
            />
        </ul>
    </div>;
}

function ThemeNavbarItemMobile() {
    const [theme, setTheme] = useTheme();
    const [textDirection, setTextDirection] = useTextDirection();
    const [contentDensity, setContentDensity] = useContentDensity();

    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            localStorage.setItem('ui5-theme', theme);
            localStorage.setItem('ui5-content-density', contentDensity);
            localStorage.setItem('ui5-text-direction', textDirection);
        }
        sendSettingsToFrame({ theme, contentDensity, textDirection });
    }, [theme, contentDensity, textDirection]);

    return (
        <li
            className={clsx('menu__list-item', {
                'menu__list-item--collapsed': collapsed,
            })}>
            <NavbarNavLink
                role="button"
                label="Settings"
                className={clsx(
                    'menu__link menu__link--sublist menu__link--sublist-caret',
                )}
                onClick={(e) => {
                    setCollapsed(!collapsed);
                }} />
            <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
                <li className="menu__list-item"><b style={{ padding: "var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)" }}>Theme</b></li>
                <NavbarItem
                    label="Morning Horizon"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_horizon") }}
                    className={clsx({ 'menu__link--active': theme === "sap_horizon" })}
                />
                <NavbarItem
                    label="Evening Horizon"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_horizon_dark") }}
                    className={clsx({ 'menu__link--active': theme === "sap_horizon_dark" })}
                />
                <NavbarItem
                    label="Horizon High Contrast Black"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_horizon_hcb") }}
                    className={clsx({ 'menu__link--active': theme === "sap_horizon_hcb" })}
                />
                <NavbarItem
                    label="Horizon High Contrast White"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_horizon_hcw") }}
                    className={clsx({ 'menu__link--active': theme === "sap_horizon_hcw" })}
                />
                <NavbarItem
                    label="Quartz Light"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_fiori_3") }}
                    className={clsx({ 'menu__link--active': theme === "sap_fiori_3" })}
                />
                <NavbarItem
                    label="Quartz Dark"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_fiori_3_dark") }}
                    className={clsx({ 'menu__link--active': theme === "sap_fiori_3_dark" })}
                />
                <NavbarItem
                    label="Quartz High Contrast Black"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_fiori_3_hcb") }}
                    className={clsx({ 'menu__link--active': theme === "sap_fiori_3_hcb" })}
                />
                <NavbarItem
                    label="Quartz High Contrast White"
                    mobile
                    isDropdownItem
                    onClick={() => { setTheme("sap_fiori_3_hcw") }}
                    className={clsx({ 'menu__link--active': theme === "sap_fiori_3_hcw" })}
                />
                <li><hr style={{ margin: "var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)" }} /></li>
                <li className="menu__list-item"><b style={{ padding: "var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)" }}>Direction</b></li>
                <NavbarItem
                    label="LTR"
                    mobile
                    isDropdownItem
                    onClick={() => { setTextDirection("LTR") }}
                    className={clsx({ 'menu__link--active': textDirection === "LTR" })}
                />
                <NavbarItem
                    label="RTL"
                    mobile
                    isDropdownItem
                    onClick={() => { setTextDirection("RTL") }}
                    className={clsx({ 'menu__link--active': textDirection === "RTL" })}
                />
                <li><hr style={{ margin: "var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)" }} /></li>
                <li className="menu__list-item"><b style={{ padding: "var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)" }}>Content density</b></li>
                <NavbarItem
                    label="Cozy"
                    mobile
                    isDropdownItem
                    onClick={() => { setContentDensity("Cozy") }}
                    className={clsx({ 'menu__link--active': contentDensity === "Cozy" })}
                />
                <NavbarItem
                    label="Compact"
                    mobile
                    className={clsx({ 'menu__link--active': contentDensity === "Compact" })}
                    isDropdownItem
                    onClick={() => { setContentDensity("Compact") }}
                />
            </Collapsible>
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