import type { ComponentStylesData } from "../types.js";

/**
 * Class decorator to define component styles.
 * @param { ComponentStylesData } componentStyles
 * @returns { ClassDecorator }
 */
const styles = (componentStyles: ComponentStylesData): ClassDecorator => {
	return (target: any) => {
		Object.defineProperty(target, "styles", {
			get: () => componentStyles,
		});
	};
};

export default styles;
