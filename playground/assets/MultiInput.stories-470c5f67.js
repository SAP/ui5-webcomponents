import{x as b}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o}from"./unsafe-html-0ddd83da.js";const w={type:{control:"select",options:["Text","Email","Number","Password","Tel","URL"]},valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},previewItem:{control:{type:!1}},tokens:{control:{type:"text"},table:{type:{summary:"Array<IToken>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<IInputSuggestionItem>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},openPicker:{description:"Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"token-delete":{description:"Fired when a token is about to be deleted.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"token",_ui5privacy:"public",description:"deleted token."}]}},"suggestion-item-select":{description:"Fired when a suggestion item, that is displayed in the suggestion popup, is selected.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The selected item."}]}},"suggestion-item-preview":{description:`Fired when the user navigates to a suggestion item via the ARROW keys,
as a preview, before the final selection.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"The previewed suggestion item."},{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"The DOM ref of the suggestion item."}]}}},_={package:"@ui5/webcomponents",since:"1.0.0-rc.9",tagName:"ui5-multi-input"};var l=Object.freeze,S=Object.defineProperty,M=(e,T)=>l(S(e,"raw",{value:l(T||e.slice())})),d;const I={title:"Main/Multi Input",component:"MultiInput",argTypes:w};let r=0;const u=e=>b`
<ui5-multi-input
    id="multi-input-${++r}"
    ?disabled="${t(e.disabled)}"
    placeholder="${t(e.placeholder)}"
    ?readonly="${t(e.readonly)}"
    ?required="${t(e.required)}"
    ?no-typeahead="${t(e.noTypeahead)}"
    type="${t(e.type)}"
    value="${t(e.value)}"
    value-state="${t(e.valueState)}"
    name="${t(e.name)}"
    ?show-suggestions="${t(e.showSuggestions)}"
    maxlength="${t(e.maxlength)}"
    accessible-name="${t(e.accessibleName)}"
    accessible-name-ref="${t(e.accessibleNameRef)}"
    ?show-clear-icon="${t(e.showClearIcon)}"
    ?show-value-help-icon="${t(e.showValueHelpIcon)}"
>
    ${o(e.default)}
    ${o(e.valueStateMessage)}
    ${o(e.icon)}
    ${o(e.tokens)}
</ui5-multi-input>`,i=u.bind({});i.args={value:"basic input"};const a=u.bind({});a.args={tokens:`
    <ui5-token slot="tokens" text="Argentina"></ui5-token>
    <ui5-token slot="tokens" text="Bulgaria"></ui5-token>
    <ui5-token slot="tokens" text="England"></ui5-token>
    <ui5-token slot="tokens" text="Finland"></ui5-token>
    <ui5-token slot="tokens" text="Germany"></ui5-token>
    <ui5-token slot="tokens" text="Hungary"></ui5-token>
    <ui5-token slot="tokens" text="Italy"></ui5-token>
    <ui5-token slot="tokens" text="Luxembourg"></ui5-token>
    <ui5-token slot="tokens" text="Mexico"></ui5-token>
    <ui5-token slot="tokens" text="Philippines"></ui5-token>
    <ui5-token slot="tokens" text="Sweden"></ui5-token>
    <ui5-token slot="tokens" text="USA"></ui5-token>`};const n=u.bind({});n.args={placeholder:"Start typing country name",showSuggestions:!0,default:`
    <ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
    <ui5-suggestion-item text="Bulgaria"></ui5-suggestion-item>
    <ui5-suggestion-item text="England"></ui5-suggestion-item>
    <ui5-suggestion-item text="Finland"></ui5-suggestion-item>
    <ui5-suggestion-item text="Germany"></ui5-suggestion-item>
    <ui5-suggestion-item text="Hungary"></ui5-suggestion-item>
    <ui5-suggestion-item text="Italy"></ui5-suggestion-item>
    <ui5-suggestion-item text="Luxembourg"></ui5-suggestion-item>
    <ui5-suggestion-item text="Mexico"></ui5-suggestion-item>
    <ui5-suggestion-item text="Philippines"></ui5-suggestion-item>
    <ui5-suggestion-item text="Sweden"></ui5-suggestion-item>
    <ui5-suggestion-item text="USA"></ui5-suggestion-item>`,valueStateMessage:'<div slot="valueStateMessage">Token is already in the list</div>'};n.decorators=[e=>b(d||(d=M([`
	`,`
<script>
	var createTokenFromText = function (text) {
		let token = document.createElement("ui5-token");
		token.setAttribute("text", text);
		token.setAttribute("slot", "tokens");
		return token;
	};
	document.getElementById("multi-input-`,`").addEventListener("token-delete", function (event) {
		const token = event.detail?.token;
		token && token.remove();
	});
	document.getElementById("multi-input-`,`").addEventListener("paste", function (event) {
        event.preventDefault();

        let pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');;

        if (!pastedText) {
            return;
        }

        let separatedTexts = pastedText.split(/\\r\\n|\\r|\\n|\\t/g).filter(t => !!t);

        if (separatedTexts.length === 1) {

            event.target.value += separatedTexts[0];
            return;
        }

        separatedTexts.forEach((tokenText) => {
            if (tokenText) {
                event.target.appendChild(createTokenFromText(tokenText));
            }
        })
    });
    document.getElementById("multi-input-`,`").addEventListener("change", function (event) {
		if (!event.target.value) {
			return;
		}
		let isDuplicate = event.target.tokens.some(function(token) {
			return token.text === event.target.value
		});
		if (isDuplicate) {
			event.target.valueState = "Error";
			setTimeout(function () {
				event.target.valueState = "Normal";
			}, 2000);
			return;
		}
		event.target.appendChild(createTokenFromText(event.target.value));
		event.target.value = "";
	});
<\/script>`],[`
	`,`
<script>
	var createTokenFromText = function (text) {
		let token = document.createElement("ui5-token");
		token.setAttribute("text", text);
		token.setAttribute("slot", "tokens");
		return token;
	};
	document.getElementById("multi-input-`,`").addEventListener("token-delete", function (event) {
		const token = event.detail?.token;
		token && token.remove();
	});
	document.getElementById("multi-input-`,`").addEventListener("paste", function (event) {
        event.preventDefault();

        let pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');;

        if (!pastedText) {
            return;
        }

        let separatedTexts = pastedText.split(\\/\\\\r\\\\n\\|\\\\r\\|\\\\n\\|\\\\t\\/g).filter(t => !!t);

        if (separatedTexts.length === 1) {

            event.target.value += separatedTexts[0];
            return;
        }

        separatedTexts.forEach((tokenText) => {
            if (tokenText) {
                event.target.appendChild(createTokenFromText(tokenText));
            }
        })
    });
    document.getElementById("multi-input-`,`").addEventListener("change", function (event) {
		if (!event.target.value) {
			return;
		}
		let isDuplicate = event.target.tokens.some(function(token) {
			return token.text === event.target.value
		});
		if (isDuplicate) {
			event.target.valueState = "Error";
			setTimeout(function () {
				event.target.valueState = "Normal";
			}, 2000);
			return;
		}
		event.target.appendChild(createTokenFromText(event.target.value));
		event.target.value = "";
	});
<\/script>`])),e(),r,r,r)];const s=u.bind({});s.args={placeholder:"Enter product",showSuggestions:!0,default:`
    <ui5-suggestion-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-suggestion-item>
    <ui5-suggestion-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-suggestion-item>
    <ui5-suggestion-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-suggestion-item>`,valueStateMessage:'<div slot="valueStateMessage">Token is already in the list</div>'};var g,c,m;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`args => html\`
<ui5-multi-input
    id="multi-input-\${++index}"
    ?disabled="\${ifDefined(args.disabled)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    type="\${ifDefined(args.type)}"
    value="\${ifDefined(args.value)}"
    value-state="\${ifDefined(args.valueState)}"
    name="\${ifDefined(args.name)}"
    ?show-suggestions="\${ifDefined(args.showSuggestions)}"
    maxlength="\${ifDefined(args.maxlength)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    ?show-clear-icon="\${ifDefined(args.showClearIcon)}"
    ?show-value-help-icon="\${ifDefined(args.showValueHelpIcon)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.valueStateMessage)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.tokens)}
</ui5-multi-input>\``,...(m=(c=i.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,f,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => html\`
<ui5-multi-input
    id="multi-input-\${++index}"
    ?disabled="\${ifDefined(args.disabled)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    type="\${ifDefined(args.type)}"
    value="\${ifDefined(args.value)}"
    value-state="\${ifDefined(args.valueState)}"
    name="\${ifDefined(args.name)}"
    ?show-suggestions="\${ifDefined(args.showSuggestions)}"
    maxlength="\${ifDefined(args.maxlength)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    ?show-clear-icon="\${ifDefined(args.showClearIcon)}"
    ?show-value-help-icon="\${ifDefined(args.showValueHelpIcon)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.valueStateMessage)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.tokens)}
</ui5-multi-input>\``,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var h,$,k;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => html\`
<ui5-multi-input
    id="multi-input-\${++index}"
    ?disabled="\${ifDefined(args.disabled)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    type="\${ifDefined(args.type)}"
    value="\${ifDefined(args.value)}"
    value-state="\${ifDefined(args.valueState)}"
    name="\${ifDefined(args.name)}"
    ?show-suggestions="\${ifDefined(args.showSuggestions)}"
    maxlength="\${ifDefined(args.maxlength)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    ?show-clear-icon="\${ifDefined(args.showClearIcon)}"
    ?show-value-help-icon="\${ifDefined(args.showValueHelpIcon)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.valueStateMessage)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.tokens)}
</ui5-multi-input>\``,...(k=($=n.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var x,y,D;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => html\`
<ui5-multi-input
    id="multi-input-\${++index}"
    ?disabled="\${ifDefined(args.disabled)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    type="\${ifDefined(args.type)}"
    value="\${ifDefined(args.value)}"
    value-state="\${ifDefined(args.valueState)}"
    name="\${ifDefined(args.name)}"
    ?show-suggestions="\${ifDefined(args.showSuggestions)}"
    maxlength="\${ifDefined(args.maxlength)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    ?show-clear-icon="\${ifDefined(args.showClearIcon)}"
    ?show-value-help-icon="\${ifDefined(args.showValueHelpIcon)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.valueStateMessage)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.tokens)}
</ui5-multi-input>\``,...(D=(y=s.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const L=["Basic","Tokens","TokenCreation","SuggestionsWrapping"],q=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,SuggestionsWrapping:s,TokenCreation:n,Tokens:a,__namedExportsOrder:L,default:I},Symbol.toStringTag,{value:"Module"}));export{q as C,_ as c};
