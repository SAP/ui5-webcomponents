import React from 'react';
// @ts-ignore 
import { Footer } from "@sb/components/footer/Footer.tsx";
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
    showDefaultStoryOnly?: boolean;
    component: string;
    package: string;
    since?: string;
}

export const DocsPage = (args: DocsPageArgs) => {
    return () => (
        <>
            <header>
                <span className='sb-ui5-title'>
                    <Title />
                </span>
                {args.since && (
                    <span className='sb-ui5-component-heading-since'>
                        <b>v{args.since}</b>
                    </span>
                )}
            </header>
            <div className='sb-ui5-component-package'><b>{args.package}</b></div>
            <div className='sb-ui5-control-tag'>&lt;{args.component}&gt;</div>
            <Subtitle />
            <Description />
            <br />
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            { !args.showDefaultStoryOnly && <Stories />}
			<Footer />
        </>
    )
}