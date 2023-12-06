  import React, { useRef } from 'react';
  import { createPortal } from 'react-dom';
  import BestRunLogo from '../../../assets/images/SAP_Best_R_grad_blk_scrn.png';
  import classes from './Footer.module.css';
  
  export const Footer = ({ style }) => {
	const popoverRef = useRef(null);
	const footerRef = useRef(null);
	const showPrivacyPopover = (e) => {
	  popoverRef.current.showAt(e.target);
	};
  
	return createPortal(
	  <footer className={classes.footer} style={style}>
		<div ref={footerRef} className={classes.content}>
		  <div className={classes.footerInner}>
			<div className={classes.footerGenericFlex}>
			  <img src={BestRunLogo} alt="SAP Logo with Text 'The Best Run'" style={{ height: '1.5rem' }} />
			  <ui5-label wrapping-type="Normal">
				{/*REUSE-IgnoreStart*/}&copy; Copyright {new Date().getFullYear()}, SAP SE and UI5 Web Components Contributors
				{/*  REUSE-IgnoreEnd*/}
			  </ui5-label>
			</div>
			<div className={classes.footerGenericFlex}>
			  <ui5-button design="Transparent" onClick={showPrivacyPopover}>
				Privacy
			  </ui5-button>
			  &nbsp;
			  <ui5-label>|</ui5-label>
			  &nbsp;
			  <ui5-link href="https://www.sap.com/corporate/en/legal/terms-of-use.html">Terms of Use</ui5-link>
			  &nbsp;
			  <ui5-label>|</ui5-label>
			  &nbsp;
			  <ui5-link href="https://www.sap.com/corporate/en/legal/impressum.html">Legal Disclosure</ui5-link>
			  &nbsp;
			  <ui5-label>|</ui5-label>
			  &nbsp;
			  <ui5-link href="https://www.sap.com/corporate/en/legal/trademark.html">Trademarks</ui5-link>
			</div>
		  </div>
		</div>
		{createPortal(
		  <ui5-popover
			header-text={'Privacy Statement'}
			ref={popoverRef}
			placement-type="Top"
			data-ui5-compact-size
			style={{ width: '360px', maxWidth: '100%' }}
		  >
			<ui5-label wrapping-type="Normal">
			  This site is hosted by <ui5-link href="https://pages.github.com/">GitHub Pages</ui5-link>. Please see the <ui5-link href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub Privacy Statement</ui5-link> for
			  any information how GitHub processes your personal data.
			</ui5-label>
		  </ui5-popover>,
		  document.body
		)}
	  </footer>,
	  document.getElementById('storybook-docs')
	);
  };
  