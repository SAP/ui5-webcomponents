import { Link } from "@storybook/components";
// @ts-ignore 
import classes from './Banner.module.css';
export const Banner = () => {
	return (
		<div className={classes.banner} role="alert">Discover our new home for&nbsp;
			<Link href="https://sap.github.io/ui5-webcomponents/" target="_blank">🎉&nbsp; Docs, API Reference and Samples!&nbsp;🎉</Link>
			<div>The storybook will be removed and won't be accessible.</div>
		</div>
	)
};