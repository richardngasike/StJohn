import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Programs from '../components/Programs/Programs';
import News from '../components/News/News';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import About from './about/AboutSection';


export default function Home() {
  return (
    <>
      {/* Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollegeOrUniversity',
            name: 'St Johns Training College',
            url: 'https://stjohnscollege.ac.ke',
            logo: 'https://stjohnscollege.ac.ke/images/logo.png',
            sameAs: [
              'https://facebook.com/',
              'https://twitter.com/',
              'https://instagram.com/',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Maralal',
              addressRegion: 'Samburu County',
              addressCountry: 'KE',
            },
            description:
              'St Johns Training College in Maralal offers diploma, certificate and artisan courses in ICT, business, engineering and health sciences.',
          }),
        }}
      />

      <main>
        <Hero />
        <Stats />
        <About />
        <Programs />
        <News />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}