import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';
function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

function filterHelper(elements, lowerText) {
  return elements.filter(element => {

    if (element.label?.toLowerCase().includes(lowerText)) {
      return true;
    }

    if (element.items) {
      element.items = filterHelper(element.items, lowerText);
    }

    const containsItems = (element.items && element.items.length > 0);

    return containsItems;
  });
}

function filter(sidebar = [], text) {
  if (!text) return sidebar;
  const lowerText = text.toLowerCase();

  return filterHelper(sidebar, lowerText);
}

export default function DocSidebarDesktopContent({ path, sidebar, className }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const [items, setItems] = useState(JSON.parse(JSON.stringify(sidebar)));
  const callback = (e) => {
    setItems(filter(JSON.parse(JSON.stringify(sidebar)), e.target.value))
  }
  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      <div style={{ paddingInlineEnd: "0.5rem", paddingBlockEnd: "0.5rem" }}>
        <input className="filter" type='search' autocomplete='off' onChange={callback} aria-label='Filter' placeholder='Filter...' style={{ width: "100%" }} />
      </div>
      {items.length ?
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={items} activePath={path} level={1} />
      </ul> : "No data"
      }
    </nav>
  );
}
