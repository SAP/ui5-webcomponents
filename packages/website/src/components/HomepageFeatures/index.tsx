import './styles.css';

import { useColorMode } from '@docusaurus/theme-common';

type FeatureItem = {
  title: string;
  src?: string;
  srcContrast?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    src: require('@site/static/img/features/Frame.png').default,
    srcContrast: require('@site/static/img/features-contrast/Frame_inverted.png').default,
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
    srcContrast: require('@site/static/img/features-contrast/hand_inverted.png').default,
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
    srcContrast: require('@site/static/img/features-contrast/buildings_inverted.png').default,
    description: (
      <>
       Implements latest SAP Design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({ title, src, srcContrast, description }: FeatureItem) {
  const { colorMode } = useColorMode();

  return (
    <div className="feature">
      <img className="feature__image" src={colorMode === "dark" ? srcContrast : src} alt={title} />
      <h2 className="feature__title">{title}</h2>
      <p className="feature__desc">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="features">
      <div className="features__container mainPageContainer">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
