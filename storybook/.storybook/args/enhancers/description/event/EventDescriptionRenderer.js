import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
export class EventDescriptionRenderer {
    constructor() {
        this.renderEventDetails = (parameters) => {
            const parameterList = parameters?.map((p) => (_jsxs(React.Fragment, { children: [_jsx("b", { children: _jsx("code", { children: p.name }) }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("b", { children: "type:" }), " ", p.type.text] }), p.description && _jsxs("li", { children: [_jsx("b", { children: "description:" }), " ", p.description] }), p.deprecated && (typeof p.deprecated === "string" ? _jsxs("li", { children: [_jsx("b", { children: "deprecated:" }), " ", p.deprecated, " "] }) : _jsx("li", { children: _jsx("b", { children: "deprecated" }) })), p._ui5since && _jsxs("li", { children: [_jsx("b", { children: "since:" }), " ", p._ui5since] })] })] }, p.name)));
            const EventDetail = () => _jsxs(_Fragment, { children: [_jsx("p", { children: _jsx("b", { children: "Event Detail Properties:" }) }), parameterList] });
            return (_jsx(_Fragment, { children: parameters?.length && _jsx(EventDetail, {}) }));
        };
        this.render = (props) => {
            const { parameters } = props;
            if (!parameters?.length) {
                return _jsx(_Fragment, {});
            }
            return (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsx("br", {}), parameters?.length && this.renderEventDetails(parameters)] }));
        };
    }
}
//# sourceMappingURL=EventDescriptionRenderer.js.map