import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs';

interface DocsPageArgs {
    component: string,
    since: string
}

export const DocsPage = (args: DocsPageArgs) => {
    return () => (
        <>
            <Title />
            <div className='component-heading-since'>
                <span>{args.since}</span>
            </div>
            <div className='control-tag'>&lt;{args.component}&gt;</div>
            <Subtitle />
            <Description />
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
        </>
    )
}