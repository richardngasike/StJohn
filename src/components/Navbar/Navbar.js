'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiMenu, FiX, FiChevronDown, FiPhone, FiMail,
  FiUser, FiLogOut, FiSettings, FiFileText, FiArrowRight,
} from 'react-icons/fi';
import { MdOutlineLocationOn } from 'react-icons/md';
import styles from './Navbar.module.css';
import Cookies from 'js-cookie';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/about',
    children: [
      { label: 'Our History',    href: '/about#history' },
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: 'Leadership',     href: '/about#leadership' },
      { label: 'Accreditation',  href: '/about#accreditation' },
    ],
  },
  {
    label: 'Academics', href: '/programs',
    children: [
      { label: 'All Programs',       href: '/programs' },
      { label: 'Certificate Courses', href: '/programs#certificate' },
      { label: 'Diploma Courses',    href: '/programs#diploma' },
      { label: 'Short Courses',      href: '/programs#short' },
    ],
  },
  { label: 'News & Events', href: '/news' },
  { label: 'Contact',       href: '/contact' },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [user,          setUser]          = useState(null);
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);

  const pathname     = usePathname();
  const leaveTimers  = useRef({});   // per-item leave timers
  const userMenuRef  = useRef(null);
  const isHome       = pathname === '/';

  /* ── scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── user cookie ── */
  useEffect(() => {
    try {
      const u = Cookies.get('user');
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  /* ── close everything on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setUserMenuOpen(false);
  }, [pathname]);

  /* ── close user menu on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── lock body scroll when mobile open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── hover helpers with generous leave delay ── */
  const handleEnter = useCallback((label) => {
    clearTimeout(leaveTimers.current[label]);
    setOpenDropdown(label);
  }, []);

  const handleLeave = useCallback((label) => {
    leaveTimers.current[label] = setTimeout(() => {
      setOpenDropdown((cur) => (cur === label ? null : cur));
    }, 220);           // 220 ms grace — plenty of time to reach the dropdown
  }, []);

  const handleDropdownEnter = useCallback((label) => {
    clearTimeout(leaveTimers.current[label]);
  }, []);

  const handleDropdownLeave = useCallback((label) => {
    leaveTimers.current[label] = setTimeout(() => {
      setOpenDropdown((cur) => (cur === label ? null : cur));
    }, 120);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };

  const toggleMobileSection = (label) =>
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  const transparent = isHome && !scrolled;

  return (
    <>
      {/* ═══════════════ TOP BAR ═══════════════ */}
      <div className={`${styles.topBar} ${transparent ? styles.topBarTransparent : styles.topBarSolid}`}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topContact}>
            <a href="tel:+254720215715" className={styles.topContactItem}>
              <FiPhone size={11} /> +254 720 215 715
            </a>
            <a href="mailto:info@stjohnscollege.ac.ke" className={styles.topContactItem}>
              <FiMail size={11} /> info@stjohnscollege.ac.ke
            </a>
            <span className={styles.topContactItem}>
              <MdOutlineLocationOn size={12} /> Maralal, Samburu County
            </span>
          </div>
          <div className={styles.topActions}>
            <Link href="/apply"  className={styles.topApply}>Apply Now</Link>
            <Link href="/portal" className={styles.topPortal}>Student Portal</Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN NAV ═══════════════ */}
      <nav className={[
        styles.navbar,
        scrolled    ? styles.navScrolled    : '',
        transparent ? styles.navTransparent : styles.navSolid,
      ].join(' ')}>
        <div className={`container ${styles.navInner}`}>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img
              src="/images/logo.png"
              alt="St Johns Logo"
              className={styles.logoImg}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className={styles.logoText}>
              <span className={styles.logoName}>St Johns</span>
              <span className={styles.logoSub}>Training College</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.children && handleEnter(link.label)}
                onMouseLeave={() => link.children && handleLeave(link.label)}
              >
                <Link
                  href={link.href}
                  className={[
                    styles.navLink,
                    pathname === link.href || pathname.startsWith(link.href + '/') ? styles.navLinkActive : '',
                    openDropdown === link.label ? styles.navLinkOpen : '',
                  ].join(' ')}
                >
                  {link.label}
                  {link.children && (
                    <FiChevronDown
                      size={13}
                      className={[styles.chevron, openDropdown === link.label ? styles.chevronOpen : ''].join(' ')}
                    />
                  )}
                </Link>

                {/* Dropdown — bridge div prevents gap-triggered close */}
                {link.children && (
                  <div
                    className={[styles.dropdownWrap, openDropdown === link.label ? styles.dropdownVisible : ''].join(' ')}
                    onMouseEnter={() => handleDropdownEnter(link.label)}
                    onMouseLeave={() => handleDropdownLeave(link.label)}
                  >
                    {/* invisible bridge so mouse can travel from link to panel */}
                    <div className={styles.dropdownBridge} />
                    <div className={styles.dropdown}>
                      {link.children.map((child) => (
                        <Link key={child.label} href={child.href} className={styles.dropdownItem}>
                          <FiArrowRight size={11} className={styles.dropdownArrow} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className={styles.navRight}>
            {user ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userBtn}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                >
                  <div className={styles.userAvatar}>
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span className={styles.userName}>{user.first_name}</span>
                  <FiChevronDown size={13} className={userMenuOpen ? styles.chevronOpen : ''} style={{ transition: 'transform .2s' }} />
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
                  <FiUser size={13} /> Login
                </Link>
                <Link href="/apply" className={`${styles.navBtn} ${styles.navBtnFilled}`}>
                  Apply Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* ═══════════════ MOBILE SIDEBAR ═══════════════ */}
      {/* Backdrop */}
      <div
        className={[styles.sidebarBackdrop, mobileOpen ? styles.sidebarBackdropVisible : ''].join(' ')}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={[styles.sidebar, mobileOpen ? styles.sidebarOpen : ''].join(' ')} aria-hidden={!mobileOpen}>

        {/* Background image layer */}
        <div className={styles.sidebarBg} />
        <div className={styles.sidebarOverlay} />

        {/* Content */}
        <div className={styles.sidebarContent}>

          {/* Header */}
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.sidebarLogo} onClick={() => setMobileOpen(false)}>
              <img
                src="/images/logo.png"
                alt="St Johns"
                className={styles.sidebarLogoImg}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <span className={styles.sidebarLogoName}>St Johns</span>
                <span className={styles.sidebarLogoSub}>Training College</span>
              </div>
            </Link>
            <button
              className={styles.sidebarClose}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Nav items */}
          <nav className={styles.sidebarNav}>
            {navLinks.map((link) => (
              <div key={link.label} className={styles.sidebarGroup}>
                {link.children ? (
                  <>
                    <button
                      className={[styles.sidebarLink, styles.sidebarLinkParent].join(' ')}
                      onClick={() => toggleMobileSection(link.label)}
                      aria-expanded={!!mobileExpanded[link.label]}
                    >
                      {link.label}
                      <FiChevronDown
                        size={15}
                        className={[styles.sidebarChevron, mobileExpanded[link.label] ? styles.sidebarChevronOpen : ''].join(' ')}
                      />
                    </button>
                    <div className={[styles.sidebarSub, mobileExpanded[link.label] ? styles.sidebarSubOpen : ''].join(' ')}>
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={styles.sidebarSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          <FiArrowRight size={11} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={[styles.sidebarLink, pathname === link.href ? styles.sidebarLinkActive : ''].join(' ')}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact strip */}
          <div className={styles.sidebarContact}>
            <a href="tel:+254720215715" className={styles.sidebarContactItem}>
              <FiPhone size={13} /> +254 720 215 715
            </a>
            <a href="mailto:info@stjohnscollege.ac.ke" className={styles.sidebarContactItem}>
              <FiMail size={13} /> stjohnstrainingcollege@gmail.com
            </a>
          </div>

          {/* CTA buttons */}
          <div className={styles.sidebarCTA}>
            <Link href="/portal" className={styles.sidebarBtnOutline} onClick={() => setMobileOpen(false)}>
              <FiUser size={14} /> Login / Portal
            </Link>
            <Link href="/apply" className={styles.sidebarBtnFilled} onClick={() => setMobileOpen(false)}>
              Apply Now <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Accreditation badges */}
          <div className={styles.sidebarBadges}>
            {['KNEC', 'NITA', 'TVETA', 'CDACC'].map((b) => (
              <span key={b} className={styles.sidebarBadge}>{b}</span>
            ))}
          </div>

        </div>
      </aside>
    </>
  );
}