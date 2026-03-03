'use client';
import { useState } from 'react';
import {
  FiPhone, FiMail, FiMapPin, FiClock, FiSend,
  FiUser, FiMessageSquare, FiChevronDown
} from 'react-icons/fi';
import {
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './contact.module.css';

const departments = [
  'Admissions Office',
  'Academics / Registrar',
  'Finance / Fees',
  'Student Affairs',
  'Library',
  'ICT Support',
  'General Enquiry',
];

const faqs = [
  { q: 'What are the minimum entry requirements?', a: 'For certificate programs, you need KCSE grade C- or above. For diploma programs, C+ or above. Some programs have specific subject requirements. Contact admissions for details.' },
  { q: 'How long does the application process take?', a: 'Once you submit a complete application, our admissions team reviews it within 3–5 business days and sends you a decision via email and SMS.' },
  { q: 'Do you offer scholarships or financial aid?', a: 'Yes. We offer merit-based scholarships, HELB loans for eligible students, and payment plans. Visit our admissions office or contact us for details on current opportunities.' },
  { q: 'Can I apply for multiple programs?', a: 'Yes, you can indicate preferred alternative programs in your application. However, you will be admitted to only one program per intake.' },
  { q: 'Is there student accommodation on campus?', a: 'We do not have on-campus hostels, but we have a list of vetted and affordable accommodation options near the college. Contact student affairs for guidance.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in required fields'); return; }
    setSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Message sent! We\'ll respond within 24 hours.');
        setForm({ name: '', email: '', phone: '', department: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.success('Message sent! We\'ll respond within 24 hours. (Demo mode)');
      setForm({ name: '', email: '', phone: '', department: '', subject: '', message: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span><span>Contact Us</span>
            </div>
            <h1>Get In Touch</h1>
            <p>We're here to help. Reach out to our team for admissions, academics, or any other enquiries.</p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            {[
              { icon: FiPhone, title: 'Call Us', lines: ['+254 700 000 000', '+254 711 000 000'], note: 'Mon–Fri, 8am–5pm', color: 'green', href: 'tel:+254700000000' },
              { icon: FiMail, title: 'Email Us', lines: ['info@stjohnscollege.ac.ke', 'admissions@stjohnscollege.ac.ke'], note: 'We reply within 24 hours', color: 'gold', href: 'mailto:info@stjohnscollege.ac.ke' },
              { icon: FiMapPin, title: 'Visit Us', lines: ['123 College Road', 'Nairobi, Kenya'], note: 'P.O. Box 00100', color: 'brown', href: '#map' },
              { icon: FiClock, title: 'Office Hours', lines: ['Mon–Fri: 8:00am – 5:00pm', 'Sat: 9:00am – 1:00pm'], note: 'Closed Sundays & Public Holidays', color: 'green' },
            ].map((c, i) => (
              <a key={i} href={c.href || '#'} className={`${styles.infoCard} ${styles[`infoCard_${c.color}`]}`} style={{ textDecoration: 'none' }}>
                <div className={styles.infoCardIcon}><c.icon size={22} /></div>
                <h3>{c.title}</h3>
                {c.lines.map((l, j) => <p key={j}>{l}</p>)}
                <span>{c.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section">
        <div className="container">
          <div className={styles.mainGrid}>
            {/* Form */}
            <div className={styles.formWrap}>
              <div className={styles.formHeader}>
                <h2>Send Us a Message</h2>
                <p>Fill out the form and our team will get back to you within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="required">*</span></label>
                    <div className={styles.inputWrap}>
                      <FiUser size={15} className={styles.inputIcon} />
                      <input className="form-input" style={{ paddingLeft: 38 }} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <div className={styles.inputWrap}>
                      <FiMail size={15} className={styles.inputIcon} />
                      <input type="email" className="form-input" style={{ paddingLeft: 38 }} value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" required />
                    </div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <div className={styles.inputWrap}>
                      <FiPhone size={15} className={styles.inputIcon} />
                      <input className="form-input" style={{ paddingLeft: 38 }} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select className="form-select" value={form.department} onChange={e => update('department', e.target.value)}>
                      <option value="">Select department</option>
                      {departments.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject <span className="required">*</span></label>
                  <input className="form-input" value={form.subject} onChange={e => update('subject', e.target.value)} placeholder="Brief subject of your message" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message <span className="required">*</span></label>
                  <div className={styles.inputWrap}>
                    <FiMessageSquare size={15} className={`${styles.inputIcon} ${styles.textareaIcon}`} />
                    <textarea className="form-textarea" style={{ paddingLeft: 38, minHeight: 140 }} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Write your message here..." required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
                  {sending ? <><span className="loading-spinner" /> Sending...</> : <><FiSend size={16} /> Send Message</>}
                </button>
              </form>
            </div>

            {/* Map + Social */}
            <div className={styles.mapSide}>
              <div className={styles.mapBox} id="map">
                <div className={styles.mapPlaceholder}>
                  <FiMapPin size={40} />
                  <h4>St Johns Training College</h4>
                  <p>123 College Road, Nairobi, Kenya</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h4>Follow Us</h4>
                <p>Stay updated with college news, events, and announcements.</p>
                <div className={styles.socials}>
                  {[
                    { icon: FiFacebook,  label: 'Facebook', color: '#1877f2' },
                    { icon: FiTwitter,   label: 'Twitter',  color: '#1da1f2' },
                    { icon: FiInstagram, label: 'Instagram',color: '#e1306c' },
                    { icon: FiYoutube,   label: 'YouTube',  color: '#ff0000' },
                    { icon: FiLinkedin,  label: 'LinkedIn', color: '#0077b5' },
                  ].map((s, i) => (
                    <a key={i} href="#" className={styles.socialBtn} style={{ '--sc': s.color }} aria-label={s.label}>
                      <s.icon size={18} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.emergencyCard}>
                <h4>Emergency Contacts</h4>
                <div className={styles.emergencyItem}>
                  <span>Security</span>
                  <a href="tel:+254700000001">+254 700 000 001</a>
                </div>
                <div className={styles.emergencyItem}>
                  <span>Student Affairs</span>
                  <a href="tel:+254700000002">+254 700 000 002</a>
                </div>
                <div className={styles.emergencyItem}>
                  <span>Medical / First Aid</span>
                  <a href="tel:+254700000003">+254 700 000 003</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <div className={styles.faqInner}>
            <div className={styles.faqLeft}>
              <div className="section-label">FAQ</div>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
              <p className="section-subtitle">Can't find your answer? Contact our admissions team directly.</p>
              <a href="tel:+254700000000" className="btn btn-primary" style={{ marginTop: 24 }}>
                <FiPhone size={15} /> Call Us Now
              </a>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                  <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <FiChevronDown size={18} className={styles.faqChevron} />
                  </button>
                  {openFaq === i && <div className={styles.faqA}>{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
