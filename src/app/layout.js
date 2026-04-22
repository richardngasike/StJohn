import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export const metadata = {
  metadataBase: new URL('https://stjohnscollege.ac.ke'),

  title: {
    default:
      'St Johns Training College Maralal | Leading TVET College in Samburu County, Kenya',
    template: '%s | St Johns Training College',
  },

  description:
    'St Johns Training College Maralal is a leading TVET college in Samburu County, Kenya offering diploma, certificate, artisan, CBET, professional and short courses in ICT, business, engineering, health, agriculture and more. Apply online today and join a top accredited college in Northern Kenya.',

  keywords: [
    // ================= BRAND =================
    'St Johns Training College',
    'St Johns Training College Maralal',
    'St Johns Teachers Training College',
    'St Johns College Maralal',
    'St Johns College',
    'St Johns Samburu',
    'St Johns Training College Kenya',
    'St Johns College Samburu County',
    'Saint Johns Training College',
    'Saint Johns Samburu',
    'St Johns Maralal',
    'stjohnscollege.ac.ke',

    // ================= LOCATION =================
    'colleges in Samburu County',
    'colleges in Maralal',
    'best college in Maralal',
    'training colleges in Samburu',
    'TVET colleges in Samburu',
    'TVET colleges in Kenya',
    'colleges in Kenya',
    'best colleges in Kenya',
    'private colleges in Samburu County',
    'top colleges in Northern Kenya',
    'training institutes in Kenya',
    'higher education Kenya',
    'education in Samburu County',

    // ================= COURSES =================
    'diploma courses Kenya',
    'certificate courses Kenya',
    'artisan courses Kenya',
    'short courses in Kenya',
    'college courses in Kenya',
    'technical courses in Kenya',
    'professional courses Kenya',
    'CBET courses Kenya',

    // ================= ICT / TECH =================
    'ICT college in Samburu',
    'computer courses in Kenya',
    'information technology diploma Kenya',
    'software development courses Kenya',
    'cyber security courses Kenya',
    'digital marketing courses Kenya',

    // ================= BUSINESS =================
    'business courses Kenya',
    'business management diploma Kenya',
    'accounting courses Kenya',
    'human resource courses Kenya',
    'supply chain management Kenya',

    // ================= ENGINEERING =================
    'engineering courses Kenya',
    'electrical engineering courses Kenya',
    'mechanical engineering courses Kenya',
    'civil engineering courses Kenya',
    'construction courses Kenya',

    // ================= HEALTH =================
    'health courses Kenya',
    'community health courses Kenya',
    'nursing assistant courses Kenya',
    'nutrition and dietetics Kenya',

    // ================= EDUCATION SYSTEM =================
    'KNEC courses Kenya',
    'CDACC courses Kenya',
    'TVET accredited colleges Kenya',
    'government approved colleges Kenya',
    'recognized colleges in Kenya',

    // ================= STUDENT INTENT =================
    'apply college Kenya',
    'college admission Kenya',
    'online application college Kenya',
    'college fees in Kenya',
    'affordable colleges in Kenya',
    'intake September Kenya college',
    'January intake colleges Kenya',
    'courses after KCSE Kenya',
    'form four leavers courses Kenya',

    // ================= DIGITAL SEARCH =================
    'college website Kenya',
    'study in Kenya colleges',
    'career training Kenya',
    'skills training Kenya',
    'vocational training Kenya',
    'technical training institute Kenya',

    // ================= EXTRA SEO VARIATIONS =================
    'College Samburu',
    'College Kenya',
    'best TVET college in Samburu',
    'top training college Maralal',
    'learning institutions in Samburu',
    'education center Maralal',
    'training center Kenya',
    'professional training Kenya',
    'job skills training Kenya'
  ],

  authors: [{ name: 'St Johns Training College' }],
  creator: 'St Johns Training College',
  publisher: 'St Johns Training College',

  alternates: {
    canonical: 'https://stjohnscollege.ac.ke',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title:
      'St Johns Training College Maralal | Leading TVET College in Kenya',
    description:
      'Join St Johns Training College in Samburu County, Kenya. Accredited TVET institution offering diploma, certificate, artisan and professional courses.',
    url: 'https://stjohnscollege.ac.ke',
    siteName: 'St Johns Training College',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: 'https://stjohnscollege.ac.ke/images/bg.jpeg',
        width: 1200,
        height: 630,
        alt: 'St Johns Training College Maralal Campus',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'St Johns Training College Maralal',
    description:
      'Top TVET college in Samburu County offering diploma, certificate, CBET and artisan courses in Kenya.',
    images: ['https://stjohnscollege.ac.ke/images/college-campus.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  verification: {
    google: '',
  },

  category: 'education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              borderRadius: '8px',
            },
            success: { iconTheme: { primary: '#2d7a52', secondary: '#fff' } },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
