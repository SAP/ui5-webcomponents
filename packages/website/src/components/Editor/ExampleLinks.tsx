import Link from '@docusaurus/Link';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

const HelloWorldPaths = ["hello-world", "/hello-world", "/hello-world/"];
const CounterPaths = ["counter", "/counter", "/counter/"];

export default function () {
	const paths = location.pathname.split("/play");
	const hasHash = !!location.hash;
	const initialState = paths.length ?  paths[paths.length - 1] : "";
	const [ active, setActive ] = useState(initialState);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);
  
	useEffect(() => {
	  const handleClickOutside = (
		event: MouseEvent | TouchEvent | FocusEvent,
	  ) => {
		if (
		  !dropdownRef.current ||
		  dropdownRef.current.contains(event.target as Node)
		) {
		  return;
		}
		setShowDropdown(false);
	  };
  
	  document.addEventListener('mousedown', handleClickOutside);
	  document.addEventListener('touchstart', handleClickOutside);
	  document.addEventListener('focusin', handleClickOutside);
  
	  return () => {
		document.removeEventListener('mousedown', handleClickOutside);
		document.removeEventListener('touchstart', handleClickOutside);
		document.removeEventListener('focusin', handleClickOutside);
	  };
	}, [dropdownRef]);

	return (
	<div className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
		'dropdown--show': showDropdown,
	})}>
	  
		<a href="#" aria-haspopup="true" aria-expanded="false" role="button" className="navbar__link"
		 onClick={(e) => {
			e.preventDefault();
			setShowDropdown(!showDropdown);
		  }}>Examples</a>
		<ul className='dropdown__menu '>
			<li>
				<Link 
					to="/play/hello-world"
					className={clsx('dropdown__link', {"menu__link--active": HelloWorldPaths.includes(active) && !hasHash })}
					onClick={() => { 
						setActive("hello-world");
					}}>
						Hello World
				</Link>
			</li>
			<li>
				<Link 
					to="/play/counter"
					className={clsx('dropdown__link', {"menu__link--active": CounterPaths.includes(active) && !hasHash })}
					onClick={() => { 
						setActive("counter");
					}}>
					Counter
				</Link>
			</li>
		</ul>
	</div>

	)
};
