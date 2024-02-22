import clsx from 'clsx';
import Heading from '@theme/Heading';
import './styles.css';

type Item = {
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  link1: string,
  link2: string,
  alt: string,
}

const FramaworksList: Array<Item> = [
  {
    Svg: require('@site/static/img/demo-apps/Angular-1920-2560.svg').default,
    link1: "https://github.com/SAP-samples/ui5-webcomponents-sample-angular",
    link2: "https://sap-samples.github.io/ui5-webcomponents-sample-angular/",
    alt: "Angular",
  },
  {
    Svg: require('@site/static/img/demo-apps/React-1920-2560.svg').default,
    link1: "https://github.com/SAP-samples/ui5-webcomponents-sample-react",
    link2: "https://sap-samples.github.io/ui5-webcomponents-sample-react/",
    alt: "ReactJS",
  },
  {
   Svg: require('@site/static/img/demo-apps/Vue-1920-2560.svg').default,
    link1: "https://github.com/SAP-samples/ui5-webcomponents-sample-vue",
    link2: "https://sap-samples.github.io/ui5-webcomponents-sample-vue/",
    alt: "VueJS",
  },
  {
   Svg: require('@site/static/img/demo-apps/Svelte-1920-2560.svg').default,
    link1: "https://github.com/SAP-samples/ui5-webcomponents-sample-svelte",
    link2: "https://sap-samples.github.io/ui5-webcomponents-sample-svelte/",
    alt: "Svelte",
  },
];


const Framework = ({ Svg, alt, link1, link2 }: Item) => {
  return (
    <div className="framework">
        <Svg className="logo" />
        <a href={link1} className="link">Explore the Code</a>
        <a href={link2} className="link">Run the Demo App</a>
    </div>
  );
}

export default function HomepageDemoApps(): JSX.Element {
  return (
    <article className="demo-apps">
        <h2 className="title">Try Out the Demo Apps</h2>
        <div className="frameworks">
            {FramaworksList.map((props, idx) => (
              <Framework key={idx} {...props} />
            ))}
        </div>
    </article>
  );
}