import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import Programs from '@/components/Programs/Programs';
import News from '@/components/News/News';
import Testimonials from '@/components/Testimonials/Testimonials';
import CTA from '@/components/CTA/CTA';
import About from '@/app/about/AboutSection';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      {/* ================= SEO STRUCTURED DATA ================= */}
      <Script
        id="college-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollegeOrUniversity',
            name: 'St Johns Training College',
            url: 'https://stjohnscollege.ac.ke',
            logo: 'https://stjohnscollege.ac.ke/images/logo.png',
            image: 'https://stjohnscollege.ac.ke/images/bg.jpeg',

            description:
              'St Johns Training College in Maralal, Samburu County offers diploma, certificate, CBET and artisan courses in ICT, business, engineering, health and vocational training.',

            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Cereal Board Road',
              addressLocality: 'Maralal',
              addressRegion: 'Samburu County',
              postalCode: '',
              addressCountry: 'KE',
            },

            telephone: '+254720215715',

            sameAs: [
              'https://facebook.com/stjohnscollege',
              'https://twitter.com/stjohnscollege',
              'https://instagram.com/stjohnscollege',
              'https://youtube.com/stjohnscollege',
            ],

            department: [
              {
                '@type': 'EducationalOrganization',
                name: 'ICT Department',
              },
              {
                '@type': 'EducationalOrganization',
                name: 'Business Department',
              },
              {
                '@type': 'EducationalOrganization',
                name: 'Engineering Department',
              },
              {
                '@type': 'EducationalOrganization',
                name: 'Health Sciences Department',
              },
            ],

            areaServed: {
              '@type': 'Place',
              name: 'Kenya',
            },

            educationalCredentialAwarded: [
              'Diploma',
              'Certificate',
              'Artisan',
              'CBET',
              'Professional Certification',
            ],

            keywords:
              'TVET college Kenya, St Johns Training College, college in Samburu, diploma courses Kenya, certificate courses Kenya',
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