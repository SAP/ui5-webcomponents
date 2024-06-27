import './styles.css';

import Buildings from "@site/static/img/features/light/Buildings.svg";
import Frame from "@site/static/img/features/light/Frame.svg";
import Hand from "@site/static/img/features/light/Hand.svg";
import BuildingsDark from "@site/static/img/features/dark/Buildings.svg";
import FrameDark from "@site/static/img/features/dark/Frame.svg";
import HandDark from "@site/static/img/features/dark/Hand.svg";


import { useColorMode } from '@docusaurus/theme-common';

type FeatureItem = {
  title: string;
  SVG?: React.ComponentType<React.SVGProps<SVGSVGElement> & {
    title?: string;
  }>;
  SVGDark?: React.ComponentType<React.SVGProps<SVGSVGElement> & {
    title?: string;
  }>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    SVG: Frame,
    SVGDark: FrameDark,
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
    SVG: Hand,
    SVGDark:  HandDark,
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
    SVG: Buildings,
    SVGDark: BuildingsDark,
    description: (
      <>
       Implements latest SAP Design language.
       Feature-rich.
       Secure, accessible, themeable, i18n-ready.
      </>
    ),
  },
];

function Feature({ title, SVG, SVGDark, description }: FeatureItem) {
  const { colorMode } = useColorMode();

  return (
    <div className="feature">
      {colorMode === "light" ? <SVG className='feature__image'/> : <SVGDark className='feature__image'/>}
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
