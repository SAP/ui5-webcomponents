import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useState } from 'react';

const HelloWorldPaths = ["hello-world", "/hello-world", "/hello-world/"];
const CounterPaths = ["counter", "/counter", "/counter/"];

export default function () {
	const paths = location.pathname.split("/play");
	const hasHash = !!location.hash;
	const initialState = paths.length ?  paths[paths.length - 1] : "";
	const [ active, setActive ] = useState(initialState);

	return (
	<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifySelf: "start" }}>
		<Heading as="h4" style={{ margin: 0, marginInlineEnd: "1rem"}}>Examples</Heading>
		<Link 
			style={{ marginInlineEnd: "1rem", 'color': HelloWorldPaths.includes(active) && !hasHash ?  "var(--ifm-color-primary)" : "initial" }}
			to="/play/hello-world"
			onClick={() => { 
				setActive("hello-world");
			}}
		>Hello World</Link>
		<Link
			style={{ marginInlineEnd: "1rem", 'color': CounterPaths.includes(active) && !hasHash ?  "var(--ifm-color-primary)" : "initial" }}
			to="/play/counter"
			onClick={() => { 
				setActive("counter");
			}}
		>Counter</Link>
	</div>
	)
};
