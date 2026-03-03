'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FiMenu, FiX, FiChevronDown, FiPhone, FiMail,
  FiUser, FiLogOut, FiSettings, FiFileText
} from 'react-icons/fi';
import {
  MdOutlineSchool, MdOutlineLocationOn
} from 'react-icons/md';
import styles from './Navbar.module.css';
import Cookies from 'js-cookie';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/about',
    children: [
      { label: 'Our History', href: '/about#history' },
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Accreditation', href: '/about#accreditation' },
    ]
  },
  {
    label: 'Academics', href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Certificate Courses', href: '/programs#certificate' },
      { label: 'Diploma Courses', href: '/programs#diploma' },
      { label: 'Short Courses', href: '/programs#short' },
    ]
  },
  { label: 'News & Events', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const userData = Cookies.get('user');
      if (userData) setUser(JSON.parse(userData));
    } catch {}
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };

  const transparent = isHome && !scrolled;

  return (
    <>
      {/* Top Bar */}
      <div className={`${styles.topBar} ${transparent ? styles.topBarTransparent : styles.topBarSolid}`}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topContact}>
            <a href="tel:+254700000000" className={styles.topContactItem}>
              <FiPhone size={12} /> +254 700 000 000
            </a>
            <a href="mailto:info@stjohnscollege.ac.ke" className={styles.topContactItem}>
              <FiMail size={12} /> info@stjohnscollege.ac.ke
            </a>
            <span className={styles.topContactItem}>
              <MdOutlineLocationOn size={12} /> Nairobi, Kenya
            </span>
          </div>
          <div className={styles.topActions}>
            <Link href="/apply" className={styles.topApply}>Apply Now</Link>
            <Link href="/portal" className={styles.topPortal}>Student Portal</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ''} ${transparent ? styles.navTransparent : styles.navSolid}`}>
        <div className={`container ${styles.navInner}`}>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <MdOutlineSchool size={28} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>St Johns</span>
              <span className={styles.logoSub}>Training College</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                  {link.children && <FiChevronDown size={14} className={styles.chevron} />}
                </Link>
                {link.children && openDropdown === link.label && (
                  <div className={styles.dropdown}>
                    {link.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.dropdownItem}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Actions — desktop only */}
          <div className={styles.navRight}>
            {user ? (
              <div className={styles.userMenu} ref={dropdownRef}>
                <button
                  className={styles.userBtn}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className={styles.userAvatar}>
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span className={styles.userName}>{user.first_name}</span>
                  <FiChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userDropdownHeader}>
                      <p className={styles.userDropdownName}>{user.first_name} {user.last_name}</p>
                      <p className={styles.userDropdownEmail}>{user.email}</p>
                    </div>
                    <div className={styles.userDropdownDivider} />
                    {user.role === 'admin' && (
                      <Link href="/admin" className={styles.userDropdownItem}>
                        <FiSettings size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <Link href="/portal" className={styles.userDropdownItem}>
                      <FiUser size={14} /> Student Portal
                    </Link>
                    <Link href="/portal/applications" className={styles.userDropdownItem}>
                      <FiFileText size={14} /> My Applications
                    </Link>
                    <div className={styles.userDropdownDivider} />
                    <button onClick={handleLogout} className={styles.userDropdownLogout}>
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/portal" className={`${styles.navBtn} ${styles.navBtnOutline}`}>
                  <FiUser size={14} /> Login
                </Link>
                <Link href="/apply" className={`${styles.navBtn} ${styles.navBtnFilled}`}>
                  Apply Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle — always last, always far right */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuInner}>
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link href={link.href} className={styles.mobileLink}>
                  {link.label}
                </Link>
                {link.children && (
                  <div className={styles.mobileSub}>
                    {link.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.mobileSubLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={styles.mobileCTA}>
              <Link href="/portal" className={`btn btn-secondary`}>Login</Link>
              <Link href="/apply" className={`btn btn-primary`}>Apply Now</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}