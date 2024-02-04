const constructableStyleMap = new Map<string, CSSStyleSheet>();

const StepColumn = {
	"S": 1,
	"M": 2,
	"L": 3,
	"XL": 6,
};

class FormUtil {
	static getStepCSSStyleSheet(step: string, colsNumber: number): CSSStyleSheet | undefined {
		if (StepColumn[step as keyof typeof StepColumn] <= colsNumber) {
			return;
		}

		const key = `${step}-${colsNumber}`;

		if (!constructableStyleMap.has(key)) {
			let containerQuery;
			let supporedColumnsNumber!: number;
			let stepSpanCSS = "";
			let cols = colsNumber;

			if (step === "S") {
				supporedColumnsNumber = StepColumn.S;
				containerQuery = `@container (max-width: 599px) {`;
			} else if (step === "M") {
				supporedColumnsNumber = StepColumn.M;
				containerQuery = `@container (width > 599px) and (width < 1024px) {`;
			} else if (step === "L") {
				supporedColumnsNumber = StepColumn.L;
				containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
			} else if (step === "XL") {
				containerQuery = `@container (min-width: 1440px) {`;
				supporedColumnsNumber = StepColumn.XL;
			}

			while (cols > supporedColumnsNumber) {
				stepSpanCSS += `
				:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				
				.ui5-form-column-span${step}-${cols} {
					grid-column: span ${cols};
				}
				.ui5-form-column-span${step}-${cols} .ui5-form-group-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				`;
				cols--;
			}

			const css = `${containerQuery}${stepSpanCSS}}`;
			const style = new CSSStyleSheet();
			style.replaceSync(css);
			constructableStyleMap.set(key, style);
		}

		return constructableStyleMap.get(key)!;
	}
}

export default FormUtil;
