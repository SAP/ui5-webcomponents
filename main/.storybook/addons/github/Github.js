import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addons, types } from '@storybook/manager-api';
import { GithubSvg } from './GithubSvg';
import packageJson from "../../../package.json";
const ADDON_ID = 'github-button';
const GithubLink = () => (_jsxs("div", { style: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        gap: "5px",
    }, children: [_jsx("a", { style: {
                width: "20px",
                height: "20px",
            }, href: "https://github.com/SAP/ui5-webcomponents", target: "_blank", rel: "noreferrer", children: _jsx(GithubSvg, {}) }), _jsxs("a", { style: {
                textDecoration: "none",
                color: "inherit"
            }, href: `https://github.com/SAP/ui5-webcomponents/tree/v${packageJson.version}`, target: "_blank", rel: "noreferrer", children: ["v", packageJson.version] })] }));
addons.register(ADDON_ID, (api) => {
    addons.add(ADDON_ID, {
        title: "Github",
        type: types.TOOLEXTRA,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: GithubLink
    });
});
//# sourceMappingURL=Github.js.map