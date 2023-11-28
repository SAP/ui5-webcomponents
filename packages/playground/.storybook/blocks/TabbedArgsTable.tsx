import React, { useRef, useEffect } from "react";

import {
  Subtitle,
  Description,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import TabContainer, {
  type TabContainerTabSelectEventDetail,
} from "@ui5/webcomponents/dist/TabContainer";

type TabbedArgsTableProps = {
  subComponents: string[];
};

export const TabbedArgsTable = ({ subComponents }: TabbedArgsTableProps) => {
  const tabs = useRef<TabContainer>(null);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const selectedTabText = subComponents[selectedTab];

  useEffect(() => {
    if (!tabs.current) {
      return;
    }

    tabs.current.addEventListener("tab-select", (event) => {
      console.log(event);
      const customEvent =
        event as CustomEvent<TabContainerTabSelectEventDetail>;
      setSelectedTab(customEvent.detail.tabIndex);
    });
  }, []);

  return (
    <>
      <ui5-tabcontainer fixed collapsed ref={tabs}>
        {subComponents.map((subComponent, index) => (
          <ui5-tab
            key={subComponent}
            text={subComponent}
            selected={index === selectedTab || undefined}
          ></ui5-tab>
        ))}
      </ui5-tabcontainer>

      {selectedTab === 0 ? (
        <ArgsTable story={PRIMARY_STORY} />
      ) : (
        <>
          <br />
          <br />
          <Subtitle>
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {selectedTabText}
            </span>
          </Subtitle>
          <Description of={selectedTabText} />
          <ArgsTable of={selectedTabText} />
        </>
      )}
    </>
  );
};
