import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Item() {
    const [hidden, setHidden] = useState(false);
    const [currentTextDirection, setCurrentTextDirection] = useState("LTR");

    const setTextDirection = (textDirection) => {
        setCurrentTextDirection(textDirection);
        setHidden(true);
        setTimeout(function () {
            setHidden(false);
        }, 10);
    }

    const sendTextDirectionToFrame = (textDirection) => {
        [...document.querySelectorAll("playground-ide")].forEach(ide => {
            ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({textDirection}, "*");
        });

        [...document.querySelectorAll("playground-preview")].forEach(preview => {
            console.log("sendingtext direction to frame:", {preview, textDirection})
            preview.iframe.contentWindow.postMessage({textDirection}, "*");
        });
    }

    useEffect(() => {
        console.log("useEffect text direction")
        sendTextDirectionToFrame(currentTextDirection);
    }, [currentTextDirection]);

    return (
        <>
            <div className="navbar__item dropdown dropdown--hoverable dropdown--right">
                <a aria-haspopup="true" aria-expanded="false" role="button" className="navbar__link" style={{cursor: "pointer"}}>Direction</a>
                    <ul className={clsx('dropdown__menu', {
                            'navbar-dropdown-hidden': hidden
                        })
                    }>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTextDirection === "LTR"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTextDirection("LTR"); }}
                        >
                            LTR
                        </a>
                    </li>
                    <li>
                        <a
                            tabIndex="-1"
                            className={clsx('dropdown__link', {'dropdown__link--active': currentTextDirection === "RTL"})}
                            style={{cursor: "pointer"}}
                            onClick={function () { setTextDirection("RTL"); }}
                        >
                           RTL
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}