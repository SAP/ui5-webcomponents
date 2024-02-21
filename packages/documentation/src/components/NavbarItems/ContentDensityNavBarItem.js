import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Item() {
    const [hidden, setHidden] = useState(false);
    const [currentContentDensity, setCurrentContentDensity] = useState("Cozy");

    const setContentDensity = (contentDensity) => {
        setCurrentContentDensity(contentDensity);
        setHidden(true);
        setTimeout(function () {
            setHidden(false);
        }, 10);
    }

    const sendContentDensityToFrame = (contentDensity) => {
        [...document.querySelectorAll("playground-ide")].forEach(ide => {
            ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({contentDensity}, "*");
        });

        [...document.querySelectorAll("playground-preview")].forEach(preview => {
            console.log("sending content density to frame:", {preview, contentDensity})
            preview.iframe.contentWindow.postMessage({contentDensity}, "*");
        });
    }

    useEffect(() => {
        console.log("useEffect content density")
        sendContentDensityToFrame(currentContentDensity);
    }, [currentContentDensity]);

    return (
        <>
            <div className="navbar__item dropdown dropdown--hoverable dropdown--right">
                <a href="#" aria-haspopup="true" aria-expanded="false" role="button" className="navbar__link">Content Density</a>
                    <ul className={clsx('dropdown__menu', {
                            'navbar-dropdown-hidden': hidden
                        })
                    }>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentContentDensity === "Cozy"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setContentDensity("Cozy"); }}
                        >
                            Cozy
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentContentDensity === "Compact"})}
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