import Link from 'next/link';
import Image from 'next/image';
import {
  FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter,
  FiInstagram, FiYoutube, FiLinkedin, FiArrowRight,
  FiClock, FiAward, FiBook, FiUsers, FiExternalLink,
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home',           href: '/' },
  { label: 'About Us',       href: '/about' },
  { label: 'Programs',       href: '/programs' },
  { label: 'Admissions',     href: '/admissions' },
  { label: 'News & Events',  href: '/news' },
  { label: 'Gallery',        href: '/gallery' },
  { label: 'Student Portal', href: '/portal' },
  { label: 'Contact Us',     href: '/contact' },
  { label: 'Apply Now',      href: '/apply' },
];

const programs = [
  { label: 'Information Technology',    href: '/programs#it' },
  { label: 'Business Administration',   href: '/programs#business' },
  { label: 'Community Health',          href: '/programs#health' },
  { label: 'Electrical Engineering',    href: '/programs#electrical' },
  { label: 'Accounting & Finance',      href: '/programs#accounting' },
  { label: 'Human Resource Management', href: '/programs#hrm' },
  { label: 'Early Childhood Education', href: '/programs#ece' },
  { label: 'Entrepreneurship',          href: '/programs#entrepreneurship' },
];

const resources = [
  { label: 'Exam Timetables',    href: '/resources/timetables',    icon: FiClock },
  { label: 'Academic Calendar',  href: '/resources/calendar',      icon: FiBook },
  { label: 'Scholarships',       href: '/admissions#scholarships', icon: FiAward },
  { label: 'Student Life',       href: '/student-life',            icon: FiUsers },
  { label: 'KNEC Portal',        href: 'https://knec.ac.ke',       icon: FiExternalLink, external: true },
  { label: 'TVETA Portal',       href: 'https://tveta.go.ke',      icon: FiExternalLink, external: true },
];

const socials = [
  { icon: FiFacebook,  href: 'https://www.facebook.com/p/St-Johns-Training-College-Maralal-100054581164840/', label: 'Facebook' },
  { icon: FiTwitter,   href: '#',  label: 'Twitter' },
  { icon: FiInstagram, href: '#',  label: 'Instagram' },
  { icon: FiYoutube,   href: '#',  label: 'YouTube' },
  { icon: FiLinkedin,  href: '#',  label: 'LinkedIn' },
];

const stats = [
  { value: '11+',  label: 'Years of Excellence' },
  { value: '1,000+', label: 'Graduates' },
  { value: '40+',  label: 'Programmes' },
  { value: '98%',  label: 'Employment Rate' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Background image layer */}
      <div className={styles.bgImage}>
        <Image
          src="/images/hero6.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          quality={60}
          priority={false}
        />
      </div>
      <div className={styles.bgOverlay} />

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer top */}
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>

            {/* ── Brand column ── */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}><MdOutlineSchool size={28} /></div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>St Johns</span>
                  <span className={styles.logoSub}>Training College · Maralal</span>
                </div>
              </Link>

              <p className={styles.brandDesc}>
                Empowering Kenya's future through quality technical and vocational education,
                practical skills, and character development since 2015. Located in the heart
                of Samburu County, Maralal.
              </p>

              <div className={styles.accreditation}>
                <span className={styles.accBadge}>KNEC</span>
                <span className={styles.accBadge}>NITA</span>
                <span className={styles.accBadge}>TVETA</span>
                <span className={styles.accBadge}>CDACC</span>
              </div>

              <div className={styles.officeHours}>
                <FiClock size={13} />
                <span>Mon – Fri: 8:00 AM – 5:00 PM &nbsp;|&nbsp; Sat: 9:00 AM – 1:00 PM</span>
              </div>

              <div className={styles.socials}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className={styles.social}
                    aria-label={s.label}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Quick Links</h4>
              <ul className={styles.colList}>
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.colLink}>
                      <FiArrowRight size={11} />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Programs ── */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Our Programmes</h4>
              <ul className={styles.colList}>
                {programs.map((p) => (
                  <li key={p.label}>
                    <Link href={p.href} className={styles.colLink}>
                      <FiArrowRight size={11} />
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Resources ── */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Resources</h4>
              <ul className={styles.colList}>
                {resources.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      className={styles.colLink}
                      target={r.external ? '_blank' : undefined}
                      rel={r.external ? 'noopener noreferrer' : undefined}
                    >
                      <r.icon size={11} />
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact & Newsletter ── */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Get in Touch</h4>
              <div className={styles.contacts}>
                <a href="tel:+254720215715" className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiPhone size={13} /></div>
                  <div>
                    <p className={styles.contactLabel}>Phone</p>
                    <p className={styles.contactValue}>+2547 20 215 715</p>
                    <p className={styles.contactValue}>+2547 20 215 715</p>
                  </div>
                </a>
                <a href="mailto:stjohnstrainingcolle@gmail.com" className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiMail size={13} /></div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactValue}>stjohnstrainingcollege@gmail.com</p>
                    <p className={styles.contactValue}>stjohnstrainingcollege@gmail.com</p>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiMapPin size={13} /></div>
                  <div>
                    <p className={styles.contactLabel}>Location</p>
                    <p className={styles.contactValue}>Cereal Board Road, Maralal</p>
                    <p className={styles.contactValue}>Samburu County, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className={styles.newsletter}>
                <p className={styles.newsTitle}>Stay Updated</p>
                <p className={styles.newsSubtitle}>Get news, events, and admission alerts directly to your inbox.</p>
                <div className={styles.newsForm}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={styles.newsInput}
                  />
                  <button className={styles.newsBtn}>Subscribe</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Divider with map hint */}
      <div className={styles.midBar}>
        <div className="container">
          <div className={styles.midBarInner}>
            <div className={styles.midBarLeft}>
              <FiMapPin size={13} />
              <span>St Johns Training College, Cereal Board Road, Maralal, Samburu County, Kenya</span>
            </div>
            <a
              href="https://maps.google.com/?q=Maralal+Samburu+Kenya"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              View on Google Maps <FiExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} St Johns Training College, Maralal. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/accessibility">Accessibility</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px", position: "relative", zIndex: 10 }}>
  <Link href="https://richardngasike.co.ke" target="_blank">
  Developed by
    <span style={{ cursor: "pointer", color: "#ff0000" }}>
      Richard Ngasike
    </span>
  </Link>
</div>
    </footer>
  );
}