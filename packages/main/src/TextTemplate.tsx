import type Text from "./Text.js";
import Icon from "./Icon.js";
import { jsxDEV } from "preact/jsx-dev-runtime";
import { jsx } from "preact/jsx-runtime";
console.log({jsxDEV, jsx})
declare module "preact/jsx-runtime" {
	namespace JSX {
	  interface IntrinsicElements {
		"ui5-icon": ElementProps<Icon> & { onTabChange?: (e: any) => void };
	  }
	}
  }

type ElementProps<I> = Partial<Omit<I, keyof HTMLElement>>;

function UI5Icon(props: ElementProps<Icon>) {
	return <ui5-icon {...props}></ui5-icon>
}
function GenUI5Icon(props: ElementProps<Icon>) {
	return jsx(Icon._metadata.getTag(), props);
}

export default (props: Text) => {
	return <>
		<ui5-icon onTabChange={()=>{}} name="account" showTooltip={false}></ui5-icon>
		<Icon name="appointment" design="Critical" mode="Decorative"></Icon>
		<UI5Icon name="home" mode="Image"></UI5Icon>
		<GenUI5Icon name="home" mode="Image"></GenUI5Icon>
		<span onClick={e => console.log(e)}>
			<span> { props.emptyIndicatorMode } </span>
			{ props._renderEmptyIndicator ?
				<>
					<span className="empty-indicator" aria-hidden="true">{ props._emptyIndicatorSymbol }</span>
					<span className="empty-indicator-aria-label">{ props._emptyIndicatorAriaLabel }</span>
				</>
			:
				<slot></slot>
			}
		</span>
	</>
;
}