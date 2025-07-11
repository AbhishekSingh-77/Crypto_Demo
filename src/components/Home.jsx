import { Element } from 'react-scroll';
import Hero from '../pages/Hero'
import About from '../pages/About';
import Service from '../pages/Service';
import Contact from '../pages/Contact';

const Home = () => {
  return (
    <>
      <Element name="hero" id="hero">
        <Hero />
      </Element>

      <Element name="about" id="about">
        <About/>
      </Element>

      <Element name="service" id="service">
        <Service/>
      </Element>

      <Element name="contact" id="contact">
        <Contact/>
      </Element>

    </>
  )
}

export default Home