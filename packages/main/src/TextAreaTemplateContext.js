class TextAreaTemplateContext {
	static calculate(state) {
		// line-height of the textaarea
		const lineHeight = 1.4 * 16;

		const mainClasses = {
			sapWCTextArea: true,
			sapWCTextAreaWarning: (state._exceededTextProps.leftCharactersCount < 0),
			sapWCTextAreaGrowing: state.growing,
			sapWCTextAreaNoMaxLines: !state.growingMaxLines,
			sapWCTextAreaWithCounter: state.showExceededText,
			sapWCTextAreaDisabled: state.disabled,
			sapWCTextAreaReadonly: state.readonly,
		};

		const innerClasses = {
			sapWCTextAreaInner: true,
			sapWCTextAreaStateInner: (state._exceededTextProps.leftCharactersCount < 0),
			sapWCTextAreaWarningInner: (state._exceededTextProps.leftCharactersCount < 0),
		};

		const context = {
			ctr: state,
			cols: state.cols || undefined,
			maxLength: state._exceededTextProps.calcedMaxLength,
			exceededText: state._exceededTextProps.exceededText,
			textTokens: state._mirrorText,
			tabIndex: state.disabled ? undefined : "0",
			classes: {
				main: mainClasses,
				inner: innerClasses,
				exceededText: {
					sapWCTextAreaExceededText: true,
				},
				mirror: {
					sapWCTextAreaMirror: true,
				},
				focusDiv: {
					sapWCTextAreaFocusDiv: true,
					sapWCTextAreaHasFocus: state._focussed,
				},
			},
			styles: {
				mirror: {
					"max-height": (state._maxHeight),
				},
				main: {
					width: "100%",
					height: (state.rows && !state.growing) ? `${state.rows * lineHeight}px` : "100%",
				},
				focusDiv: {
					"height": (state.showExceededText ? "calc(100% - 26px)" : "100%"),
					"max-height": (state._maxHeight),
				},
			},
			ariaInvalid: state.valueState === "Error" ? "true" : undefined,
		};

		return context;
	}
}

export default TextAreaTemplateContext;
