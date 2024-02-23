import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

// import builidings from "@site/static/img/features/builidings.png";

// @ts-ignore
// import frame from "/img/features/Frame.png";
// // @ts-ignore
// import hand from "img/features/hand.png";

type FeatureItem = {
  title: string;
  src?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    src: require('@site/static/img/features/Frame.png').default,
    description: (
      <>
       Based on web standards - just HTML!
       Future-proof.
       Easy to add to your project.
      </>
    ),
  },
  {
    title: 'Lightweight',
    src: require('@site/static/img/features/hand.png').default,
    description: (
      <>
       Tiny - come with a minimal footprint.
       Modular - take only the parts you need.
       Fast - built with performance in mind.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    src: require('@site/static/img/features/buildings.png').default,
    description: (
      <>
       Implement the SAP Fiori design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({title, src, description}: FeatureItem) {
  return (
    <div className={clsx("feature", "col col--4")}>
      <div className="text--center">
        <img className="feature__image "src={src} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
