import Link from 'next/link';
import {
  FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter,
  FiInstagram, FiYoutube, FiLinkedin, FiArrowRight
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'News & Events', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Apply Now', href: '/apply' },
];

const programs = [
  { label: 'Information Technology', href: '/programs#it' },
  { label: 'Business Administration', href: '/programs#business' },
  { label: 'Community Health', href: '/programs#health' },
  { label: 'Electrical Engineering', href: '/programs#electrical' },
  { label: 'Accounting & Finance', href: '/programs#accounting' },
  { label: 'Early Childhood Education', href: '/programs#ece' },
];

const socials = [
  { icon: FiFacebook,  href: '#', label: 'Facebook' },
  { icon: FiTwitter,   href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiYoutube,   href: '#', label: 'YouTube' },
  { icon: FiLinkedin,  href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>

            {/* Brand */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}><MdOutlineSchool size={26} /></div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>St Johns</span>
                  <span className={styles.logoSub}>Training College</span>
                </div>
              </Link>
              <p className={styles.brandDesc}>
                Empowering Kenya's future through quality education, practical skills, and character development since 2010.
              </p>

              <div className={styles.accreditation}>
                <span className={styles.accBadge}>KNEC Accredited</span>
                <span className={styles.accBadge}>NITA Certified</span>
                <span className={styles.accBadge}>TVETA Approved</span>
              </div>

              <div className={styles.socials}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className={styles.social} aria-label={s.label}>
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Quick Links</h4>
              <ul className={styles.colList}>
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.colLink}>
                      <FiArrowRight size={12} /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Our Programs</h4>
              <ul className={styles.colList}>
                {programs.map((p) => (
                  <li key={p.label}>
                    <Link href={p.href} className={styles.colLink}>
                      <FiArrowRight size={12} /> {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact Us</h4>
              <div className={styles.contacts}>
                <a href="tel:+254700000000" className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiPhone size={14} /></div>
                  <div>
                    <p className={styles.contactLabel}>Phone</p>
                    <p className={styles.contactValue}>+254 700 000 000</p>
                    <p className={styles.contactValue}>+254 711 000 000</p>
                  </div>
                </a>
                <a href="mailto:info@stjohnscollege.ac.ke" className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiMail size={14} /></div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactValue}>info@stjohnscollege.ac.ke</p>
                    <p className={styles.contactValue}>admissions@stjohnscollege.ac.ke</p>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><FiMapPin size={14} /></div>
                  <div>
                    <p className={styles.contactLabel}>Address</p>
                    <p className={styles.contactValue}>123 College Road</p>
                    <p className={styles.contactValue}>Samburu, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className={styles.newsletter}>
                <p className={styles.newsTitle}>Newsletter</p>
                <div className={styles.newsForm}>
                  <input type="email" placeholder="Your email address" className={styles.newsInput} />
                  <button className={styles.newsBtn}>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} St Johns Training College. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
