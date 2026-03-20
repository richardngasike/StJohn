import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Programs from '../components/Programs/Programs';
import News from '../components/News/News';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import About from './about/AboutSection';

export const metadata = {
  metadataBase: new URL('https://stjohnscollege.ac.ke'),

  title: {
    default: 'St Johns Training College Maralal | Best College in Samburu County',
    template: '%s | St Johns Training College',
  },

  description:
    'St Johns Training College Maralal is a leading TVET college in Samburu County, Kenya offering diploma, certificate, and artisan courses in ICT, business, engineering, health, and more. Apply today and build your future.',

keywords: [
  // Brand keywords
  'St Johns Training College',
  'St Johns Teachers Training College',
  'St Johns College Maralal',
  'St Johns Samburu',
  'St Johns College',
  'St Johns Training College Kenya',
  'St Johns College Samburu County',
  'Saint Johns Training College',
  'Saint Johns Samburu',
  'St Johns Maralal',
  'stjohnscollege.ac.ke',

  // Location-based keywords
  'colleges in Samburu County',
  'colleges in Maralal',
  'best college in Maralal',
  'training colleges in Samburu',
  'TVET colleges in Samburu',
  'private colleges in Samburu County',
  'top colleges in Northern Kenya',
  'colleges in Kenya',
  'best colleges in Kenya',
  'training institutes in Kenya',

  // Course-related keywords
  'diploma courses Kenya',
  'certificate courses Kenya',
  'artisan courses Kenya',
  'short courses in Kenya',
  'college courses in Kenya',
  'technical courses in Kenya',
  'professional courses Kenya',

  // Department keywords
  'ICT college in Samburu',
  'computer courses in Kenya',
  'information technology diploma Kenya',
  'software development courses Kenya',
  'business courses Kenya',
  'business management diploma Kenya',
  'accounting courses Kenya',
  'human resource courses Kenya',
  'engineering courses Kenya',
  'electrical engineering courses Kenya',
  'mechanical engineering courses Kenya',
  'health courses Kenya',
  'community health courses Kenya',
  'nursing assistant courses Kenya',

  // Education system keywords
  'TVET colleges in Kenya',
  'KNEC courses Kenya',
  'CDACC courses Kenya',
  'accredited colleges in Kenya',
  'recognized colleges in Kenya',
  'government approved colleges Kenya',

  // Student intent keywords
  'apply college Kenya',
  'college admission Kenya',
  'intake September Kenya college',
  'January intake colleges Kenya',
  'college fees in Kenya',
  'affordable colleges in Kenya',
  'best courses after KCSE',
  'courses after form four Kenya',

  // Digital / search intent
  'college website Kenya',
  'online application college Kenya',
  'study in Kenya colleges',
  'education in Samburu County',
  'higher education Kenya',
  'training institutions Kenya',

  // Extra SEO variations
  'College Samburu',
  'College Kenya',
  'best TVET college in Samburu',
  'top training college Maralal',
  'learning institutions in Samburu',
  'education center Maralal',
  'career training Kenya',
  'skills training Kenya',
  'technical training institute Kenya',
  'vocational training Kenya'
],

  authors: [{ name: 'St Johns Training College' }],
  creator: 'St Johns Training College',
  publisher: 'St Johns Training College',

  alternates: {
    canonical: 'https://stjohnscollege.ac.ke',
  },

  openGraph: {
    title: 'St Johns Training College Maralal | Excellence in Education',
    description:
      'Join St Johns Training College in Maralal, Samburu County. Offering top diploma and certificate programs in Kenya.',
    url: 'https://stjohnscollege.ac.ke',
    siteName: 'St Johns Training College',
    images: [
      {
        url: '/images/bg.jpeg',
        width: 1200,
        height: 630,
        alt: 'St Johns Training College Maralal',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'St Johns Training College Maralal',
    description:
      'Top TVET college in Samburu County offering diploma and certificate courses.',
    images: ['/images/college-campus.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

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