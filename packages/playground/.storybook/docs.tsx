import { getComponentArgTypes } from "./argTypeRegistry";
import { TabbedArgsTable } from "./blocks/TabbedArgsTable";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

interface DocsPageArgs {
  component: string;
  package: string;
  since?: string;
}

const DocsPageWrapper = (args: DocsPageArgs) => {
  const localArgTypes = getComponentArgTypes(args.component);
  const subComponents = localArgTypes?.subComponents;

  return (
    <>
      <Header {...args} />
      <Subtitle />
      <Description />
      <br />
      <Primary />
      {subComponents && subComponents.length > 0 ? (
        <TabbedArgsTable
          subComponents={[localArgTypes?.componentName, ...subComponents]}
        />
      ) : (
        <ArgsTable story={PRIMARY_STORY} />
      )}
      <Stories />
    </>
  );
};

export const DocsPage = (args: DocsPageArgs) => {
  return () => <DocsPageWrapper {...args} />;
};

const Header = (args: DocsPageArgs) => (
  <header>
    <span className="sb-ui5-title">
      <Title />
    </span>
    {args.since && (
      <span className="sb-ui5-component-heading-since">
        <b>v{args.since}</b>
      </span>
    )}

    <div className="sb-ui5-component-package">
      <b>{args.package}</b>
    </div>
    <div className="sb-ui5-control-tag">&lt;{args.component}&gt;</div>
  </header>
);
