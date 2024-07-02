import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export class MethodDescriptionRenderer {
    constructor() {
        this.renderArguments = (parameters) => {
            const parameterList = parameters?.map((p) => (_jsxs(React.Fragment, { children: [_jsx("b", { children: _jsxs("code", { children: [p.name, " ", p.optional && _jsx(_Fragment, { children: "(optional)" })] }) }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("b", { children: "type:" }), " ", p.type.text] }), p.description && _jsxs("li", { children: [_jsx("b", { children: "description:" }), " ", p.description] }), p.optional && p.default && _jsxs("li", { children: [_jsx("b", { children: "default:" }), " ", p.default] })] })] }, p.name)));
            const Arguments = () => _jsxs(_Fragment, { children: [_jsx("p", { children: _jsx("b", { children: "Arguments:" }) }), parameterList] });
            return (_jsx(_Fragment, { children: parameters?.length && _jsx(Arguments, {}) }));
        };
        this.renderReturnValue = (returnValue) => {
            return (_jsxs(_Fragment, { children: [_jsx("p", { children: _jsx("b", { children: "Return Value:" }) }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("b", { children: "type:" }), " ", returnValue?.type?.text] }), returnValue?.description && _jsxs("li", { children: [_jsx("b", { children: "description:" }), " ", returnValue?.description] })] })] }));
        };
        this.render = (props) => {
            const { parameters, returnValue } = props;
            if (!parameters && !returnValue) {
                return _jsx(_Fragment, {});
            }
            return (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsx("br", {}), parameters && this.renderArguments(parameters), returnValue && this.renderReturnValue(returnValue)] }));
        };
    }
}
//# sourceMappingURL=MethodDescriptionRenderer.js.map