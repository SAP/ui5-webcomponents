import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY, } from '@storybook/addon-docs';
export const DocsPage = (args) => {
    return () => (_jsxs(_Fragment, { children: [_jsx("span", { className: 'sb-ui5-title', children: _jsx(Title, {}) }), args.since && (_jsx("span", { className: 'sb-ui5-component-heading-since', children: _jsxs("b", { children: ["v", args.since] }) })), _jsx("div", { className: 'sb-ui5-component-package', children: _jsx("b", { children: args.package }) }), _jsxs("div", { className: 'sb-ui5-control-tag', children: ["<", args.component, ">"] }), _jsx(Subtitle, {}), _jsx(Description, {}), _jsx("br", {}), _jsx(Primary, {}), _jsx(ArgsTable, { story: PRIMARY_STORY }), _jsx(Stories, {})] }));
};
//# sourceMappingURL=docs.js.map