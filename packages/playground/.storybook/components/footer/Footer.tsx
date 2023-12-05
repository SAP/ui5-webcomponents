import {
	Button,
	ButtonDesign,
	FlexBox,
	FlexBoxAlignItems,
	FlexBoxJustifyContent,
	FlexBoxWrap,
	Label,
	Link,
	Popover,
	PopoverPlacementType,
	WrappingType
  } from '@ui5/webcomponents-react';
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
		  <FlexBox
			justifyContent={FlexBoxJustifyContent.SpaceBetween}
			alignItems={FlexBoxAlignItems.Center}
			wrap={FlexBoxWrap.Wrap}
			style={{ width: '100%' }}
		  >
			<FlexBox alignItems={FlexBoxAlignItems.Center} wrap={FlexBoxWrap.Wrap}>
			  <img src={BestRunLogo} alt="SAP Logo with Text 'The Best Run'" style={{ height: '1.5rem' }} />
			  <Label wrappingType={WrappingType.Normal}>
				{/*REUSE-IgnoreStart*/}&copy; Copyright {new Date().getFullYear()}, SAP SE and UI5 Web Components Contributors
				{/*  REUSE-IgnoreEnd*/}
			  </Label>
			</FlexBox>
			<FlexBox alignItems={FlexBoxAlignItems.Center} wrap={FlexBoxWrap.Wrap}>
			  <Button design={ButtonDesign.Transparent} onClick={showPrivacyPopover}>
				Privacy
			  </Button>
			  &nbsp;
			  <Label>|</Label>
			  &nbsp;
			  <Link href="https://www.sap.com/corporate/en/legal/terms-of-use.html">Terms of Use</Link>
			  &nbsp;
			  <Label>|</Label>
			  &nbsp;
			  <Link href="https://www.sap.com/corporate/en/legal/impressum.html">Legal Disclosure</Link>
			  &nbsp;
			  <Label>|</Label>
			  &nbsp;
			  <Link href="https://www.sap.com/corporate/en/legal/trademark.html">Trademarks</Link>
			</FlexBox>
		  </FlexBox>
		</div>
		{createPortal(
		  <Popover
			headerText={'Privacy Statement'}
			ref={popoverRef}
			placementType={PopoverPlacementType.Top}
			data-ui5-compact-size
			style={{ width: '360px', maxWidth: '100%' }}
		  >
			<Label wrappingType={WrappingType.Normal}>
			  This site is hosted by <Link href="https://pages.github.com/">GitHub Pages</Link>. Please see the <Link href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub Privacy Statement</Link> for
			  any information how GitHub processes your personal data.
			</Label>
		  </Popover>,
		  document.body
		)}
	  </footer>,
	  document.getElementById('storybook-docs')
	);
  };
  