import ProgramsClient from './ProgramsClient';

export const metadata = {
  title:
    "Courses Offered at St Johns Training College Samburu | Diploma & Certificate Programs Kenya",

  description:
    "Explore diploma, certificate, artisan, and short courses at St Johns Training College in Samburu, Kenya. Study ICT, business, engineering, health, and more.",

  keywords: [
    "courses in Samburu Kenya",
    "St Johns Training College courses",
    "diploma courses Kenya",
    "certificate courses Kenya",
    "TVET courses Samburu",
    "ICT courses Kenya",
    "business courses Kenya",
    "technical courses Kenya"
  ],

  openGraph: {
    title: "Courses at St Johns Training College Samburu",

    description:
      "Browse diploma, certificate, and technical courses at St Johns Training College in Kenya.",

    url: "https://stjohnscollege.ac.ke/programs",

    siteName: "St Johns Training College",

    images: [
      {
        url: "https://stjohnscollege.ac.ke/og-courses.jpg",
        width: 1200,
        height: 630,
        alt: "Courses at St Johns Training College",
      },
    ],

    type: "website",
  },

  alternates: {
    canonical: "https://stjohnscollege.ac.ke/programs",
  },
};

export default function Page() {
  return <ProgramsClient />;
}