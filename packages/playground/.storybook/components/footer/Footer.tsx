import React from 'react';
import { Link, TooltipMessage, WithTooltip } from "@storybook/components";
// @ts-ignore 
import BestRunLogo from '../../../assets/images/SAP_Best_R_grad_blk_scrn.png';
// @ts-ignore 
import classes from './Footer.module.css';
export const Footer = ({ style }: { style : object }) => {

	return (
		<footer className={classes.footer} style={style}>
			<div className={classes.content}>
				<div className={classes.footerInner}>
					<div className={classes.footerGenericFlex}>
						<img src={BestRunLogo} alt="SAP Logo with Text 'The Best Run'" style={{ height: '1.5rem' }} />
						<p>&copy; Copyright {new Date().getFullYear()}, SAP SE and UI5 Web Components Contributors</p>
				</div>
					<div className={classes.footerGenericFlex}>
						<WithTooltip tooltip={
							<TooltipMessage
								title="Privacy Statement"
								desc={<>
								This site is hosted by <Link href="https://pages.github.com/">GitHub Pages</Link>. Please see the <Link href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub Privacy Statement</Link> for any information how GitHub processes your personal data.
								</>}
							/>}>
							<Link cancel>
								Privacy
							</Link>
						</WithTooltip>
						&nbsp;
						|
						&nbsp;
						<Link href="https://www.sap.com/corporate/en/legal/terms-of-use.html">Terms of Use</Link>
						&nbsp;
						|
						&nbsp;
						<Link href="https://www.sap.com/corporate/en/legal/impressum.html">Legal Disclosure</Link>
						&nbsp;
						|
						&nbsp;
						<Link href="https://www.sap.com/corporate/en/legal/trademark.html">Trademarks</Link>
					</div>
				</div>
			</div>
		</footer>
	)
};