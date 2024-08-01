import Link from '@docusaurus/Link';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export default function ({loadHelloWorld, loadCounter, initialActiveState }) {
	const [ active, setActive ] = useState(initialActiveState);
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
	<div ref={dropdownRef} className={clsx('navbar__item', 'dropdown', {
		'dropdown--show': showDropdown,
	})}>
	  
		<a href="#" aria-haspopup="true" aria-expanded={showDropdown} role="button" className="navbar__link"
		 onClick={(e) => {
			e.preventDefault();
			setShowDropdown(!showDropdown);
		  }}>Examples</a>
		<ul className='dropdown__menu '>
			<li>
				<Link 
					className={clsx('dropdown__link', {"menu__link--active": active === "hello-world" })}
					onClick={() => { 
						setActive("hello-world");
						loadHelloWorld();
						setShowDropdown(false);
					}}>
						Hello World
				</Link>
			</li>
			<li>
				<Link 
					className={clsx('dropdown__link', {"menu__link--active": active === "counter" })}
					onClick={() => { 
						setActive("counter");
						loadCounter();
						setShowDropdown(false);
					}}>
					Counter
				</Link>
			</li>
		</ul>
	</div>

	)
};
