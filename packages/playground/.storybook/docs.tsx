import React from 'react';
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
    component: string;
    package: string;
    since?: string;
}

export const DocsPage = (args: DocsPageArgs) => {
    return () => (
        <>
            <Title />
            {args.since && (
                <div className='component-heading-since'>
                    <span>v{args.since}</span>
                </div>
            )}
            <div className='component-package'>{args.package}</div>
            <div className='control-tag'>&lt;{args.component}&gt;</div>
            <Subtitle />
            <Description />
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
        </>
    )
}