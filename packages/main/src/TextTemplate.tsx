import type Text from "./Text.js";

export default (props: Text) => {
	return <>
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