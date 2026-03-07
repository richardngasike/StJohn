export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb"><a href="/">Home</a><span className="sep">/</span><span>Privacy Policy</span></div>
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your personal information.</p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto', background: 'white', borderRadius: 20, padding: '48px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            {[
              { title: '1. Information We Collect', body: 'We collect personal information you provide during application, registration, and use of our services, including name, email, phone number, educational background, and payment details.' },
              { title: '2. How We Use Your Information', body: 'We use collected information to process applications, communicate about your enrollment status, improve our services, send academic updates, and comply with legal obligations.' },
              { title: '3. Data Security', body: 'We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information from unauthorized access.' },
              { title: '4. Sharing of Information', body: 'We do not sell your personal information. We may share information with accreditation bodies, government agencies for compliance, and trusted service providers who assist our operations.' },
              { title: '5. Your Rights', body: 'You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by contacting us at privacy@stjohnscollege.ac.ke.' },
              { title: '6. Contact Us', body: 'For privacy-related enquiries, contact our Data Protection Officer at privacy@stjohnscollege.ac.ke or call +254 700 000 000. Last updated: July 2026.' },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--green-900)', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
