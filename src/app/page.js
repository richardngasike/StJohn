import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Programs from '../components/Programs/Programs';
import News from '../components/News/News';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import About from './about/AboutSection';

export const metadata = {
  title: 'St Johns Training College | Excellence in Education Since 2010',
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Programs />
      <News />
      <Testimonials />
      <CTA />
    </>
  );
}
