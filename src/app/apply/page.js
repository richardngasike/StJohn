import ApplyClient from './ApplyClient';

export const metadata = {
  title: "Apply to St Johns Training College Samburu | Online Application Kenya",
  description:
    "Apply online to St Johns Training College in Samburu, Kenya. Start your application for diploma, certificate, and technical courses. Quick and easy admission process.",

  keywords: [
    "apply St Johns Training College",
    "college application Kenya",
    "apply college Samburu",
    "online college application Kenya",
    "diploma application Kenya",
    "certificate courses application Kenya",
    "St Johns college admission form",
    "college admissions Samburu Kenya"
  ],

  openGraph: {
    title: "Apply to St Johns Training College Samburu",
    description:
      "Start your online application to St Johns Training College. Join diploma and certificate programs in Kenya today.",
    url: "https://stjohnscollege.ac.ke/apply",
    siteName: "St Johns Training College",
    images: [
      {
        url: "https://stjohnscollege.ac.ke/og-apply.jpg",
        width: 1200,
        height: 630,
        alt: "Apply to St Johns Training College Samburu",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://stjohnscollege.ac.ke/apply",
  },
};

export default function Page() {
  return <ApplyClient />;
}