import"../../bundle.common.b7f3d0d7.js";class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const e=document.createElement("div");e.innerHTML=`
			<ui5-label for="input">Label:</ui5-label>
			<ui5-input id="input"></ui5-input>
		`,this.shadowRoot.append(e)}}customElements.define("label-page-custom-element",t);
