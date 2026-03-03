export const metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb"><a href="/">Home</a><span className="sep">/</span><span>Terms of Use</span></div>
            <h1>Terms of Use</h1>
            <p>Terms and conditions governing the use of our website and services.</p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto', background: 'white', borderRadius: 20, padding: '48px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            {[
              { title: '1. Acceptance of Terms', body: 'By accessing and using the St Johns Training College website and student portal, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use immediately.' },
              { title: '2. Use of Services', body: 'Our online services are intended for prospective students, enrolled students, staff, and authorized personnel. Unauthorized use, including attempting to access restricted areas, is strictly prohibited.' },
              { title: '3. Application Accuracy', body: 'All information provided during the application process must be accurate and truthful. Submission of false information is grounds for immediate rejection of application or expulsion if discovered after enrollment.' },
              { title: '4. Intellectual Property', body: 'All content on this website including text, images, logos, and course materials is the property of St Johns Training College. Reproduction without written permission is prohibited.' },
              { title: '5. Limitation of Liability', body: 'St Johns Training College is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services. We do not guarantee uninterrupted access to online services.' },
              { title: '6. Changes to Terms', body: 'We reserve the right to modify these terms at any time. Continued use of our services following notification of changes constitutes acceptance of the updated terms. Last updated: July 2024.' },
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
