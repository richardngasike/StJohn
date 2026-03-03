import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: {
    default: 'St Johns Training College | Excellence in Education',
    template: '%s | St Johns Training College',
  },
  description: 'St Johns Training College is a premier institution offering quality education and training programs in Kenya. Apply now for the 2024/2025 academic year.',
  keywords: ['St Johns Training College', 'Kenya college', 'higher education Kenya', 'training college Samburu'],
  authors: [{ name: 'St Johns Training College' }],
  themeColor: '#1f4d35',
  openGraph: {
    type: 'website',
    siteName: 'St Johns Training College',
    title: 'St Johns Training College | Excellence in Education',
    description: 'Premier training college offering quality education in Kenya.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
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
