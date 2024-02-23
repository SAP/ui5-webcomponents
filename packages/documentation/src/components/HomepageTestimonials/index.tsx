import clsx from 'clsx';
import Heading from '@theme/Heading';
import './styles.css';
type Item = {
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  title: string;
  text: string;
}

const Testimonials: Array<Item> = [
  {
    Svg: require('@site/static/img/testimonials/sap-sf.svg').default,
    title: "SAP SuccessFactors",
    text: `"The UI5 Web Components are well documented and easy to re-use, making for quick and consistent development. The team provided exceptional service."`,
  },

  {
    Svg: require('@site/static/img/testimonials/sap-mdk.svg').default,
    title: "SAP Mobile Development Kit",
    text: `"We absolutely loved working with the UI5 web components since they are very easy to plug into any application. It made our MDK Web runtime development much easier and more productive."`,
  },

  {
    Svg: require('@site/static/img/testimonials/sap-fieldglass.svg').default,
    title: "SAP Fieldglass",
    text: `"UI5 Web Components keep our focus on delivering product features instead of re-implementing UI primitives while staying consistent with Fiori design. Great job!"`,
  },

  {
    Svg: require('@site/static/img/testimonials/sap-rbsc.svg').default,
    title: "SAP Repository-based shipment channel",
    text: `"UI5 Web Components are a great set of UI elements that allow you to use the framework to easily build SAP Fiori compliant apps and deliver the best UX for your customers."`,
  },
];


const Testimonial = ({ Svg, title, text }: Item) => {
  return (
    <div className="card testimonial">
        {/* <Svg className="testimonial__logo" /> */}
        <h4>{title}</h4>
        <p className="testimonial__text">{text}</p>
    </div>
  );
}

export default function HomepageTestimonials(): JSX.Element {
  return (
    <article className="testimonials">
        <div className="testimonials__heading">
          <h2 className="testimonials__title">Testimonials</h2>
          <p className="testimonials__desc">Discover what some of our consumers have to say about their experiences with UI5 Web Components.</p>
        </div>
        <div className="testimonials__content">
            {Testimonials.map((props, idx) => (
              <Testimonial key={idx} {...props} />
            ))}
        </div>
    </article>
  );
}