import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

type Parameter = {
	name: string;
	type: string;
	description: string;
}

type ReturnValue = {
	type: string;
	description: string;
}

type Props = {
	description?: string;
	parameters?: Parameter[],
	returnValue?: ReturnValue,
}

export function Description({ parameters, returnValue }: Props): JSX.Element {
	if (!parameters?.length && !returnValue?.type) {
		return <></>;
	}

	const parameterList = parameters?.map((p: Parameter) => (
		<React.Fragment key={p.name}>
			<b>{p.name}</b>
			<ul>
				<li><b>type:</b> {p.type}</li>
				<li><b>description:</b> {p.description}</li>
			</ul>
		</React.Fragment>
	));

	const Parameters = () => <>
		<p>Parameters:</p>
		{parameters?.length && parameterList}
	</>;

	const ReturnValue = () => <>
		<p><b>Return Value:</b></p>
		<ul>
			<li><b>type:</b> {returnValue?.type}</li>
			<li><b>description:</b> {returnValue?.description}</li>
		</ul>
	</>;

	return (
		<>
			<br />
			<br />
			{parameters?.length && <Parameters />}
			{returnValue?.type && <ReturnValue />}
		</>
	);
}

const customDescription = document.createElement('div');
const root = createRoot(customDescription);

export const JSXToHtmlString = (component: JSX.Element): string => {
	flushSync(() => {
		root.render(component);
	});
	return customDescription.innerHTML;
};

/**
 * Render the description to HTML string with the parameters and return value if they exist.
 * Uses flushSync to render the component synchronously. This is necessary because the description
 * should be passed as string to the storybook args table. The args table will then render the
 * description as HTML.
 */
export function descriptionToHtml(props: Props): string {
	// we don't parse the props.description as it already contains HTML
	return props.description + JSXToHtmlString(<Description {...props} />)
}