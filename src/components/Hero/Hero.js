'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiAward,
  FiUsers,
  FiBook,
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    title: "St. John's\nTraining College",
    subtitle:
      'Providing world-class teacher training that prepares graduates for professional success and national service in Kenya.',
    cta: { label: 'Explore Programs', href: '/programs' },
    cta2: { label: 'Apply Now', href: '/apply' },
    bg: 'slide1',
    accent: 'Aspire to Inspire before you Expire',
    stat: { value: '98%', label: 'Employment Rate' },
  },
  {
    id: 2,
    title: 'Your Future Starts\nHere Today',
    subtitle:
      "Join thousands of successful graduates who began their journey at St. John's. Applications for the new academic year are now open.",
    cta: { label: 'Apply Online', href: '/apply' },
    cta2: { label: 'Learn More', href: '/about' },
    bg: 'slide2',
    accent: 'Deadline: August 30, 2026',
    stat: { value: '1,000+', label: 'Students Enrolled' },
  },
  {
    id: 3,
    title: 'Beyond Academics:\nGrow, Lead, Thrive',
    subtitle:
      'State-of-the-art facilities, mentorship, sports, and extracurricular activities that shape well-rounded educators.',
    cta: { label: 'Campus Life', href: '/about#campus' },
    cta2: { label: 'Student Portal', href: '/portal' },
    bg: 'slide3',
    accent: 'Modern Campus Facilities',
    stat: { value: '40+', label: 'Programs Offered' },
  },
  {
    id: 4,
    title: 'Connecting Education\nWith Industry',
    subtitle:
      'Strong partnerships ensure relevant curriculum, premium internships, and excellent career prospects for our graduates.',
    cta: { label: 'Our Programs', href: '/programs' },
    cta2: { label: 'Contact Us', href: '/contact' },
    bg: 'slide4',
    accent: '50+ Industry Partners',
    stat: { value: '30+', label: 'Years of Excellence' },
  },
];

const bgImages = [
  '/images/hero11.png',
  '/images/hero2.png',
  '/images/hero10.png',
  '/images/bg.jpeg',
 
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (idx, dir = 1) => {
      if (animating || idx === active) return;
      setPrev(active);
      setDirection(dir);
      setAnimating(true);
      setActive(idx);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 800);
    },
    [active, animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % slides.length, 1);
  }, [active, goTo]);

  const goBack = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length, -1);
  }, [active, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[active];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      {/* Background Slides */}
      <div className={styles.bgWrapper}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.bg}${i === active ? ` ${styles.bgActive}` : ''}${prev === i ? ` ${styles.bgPrev}` : ''}`}
            style={{ backgroundImage: `url(${bgImages[i]})` }}
            aria-hidden="true"
          />
        ))}
        <div className={styles.overlay} />
        <div className={styles.patternOverlay} />
        {/* Decorative floating shapes */}
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
      </div>

      {/* Main Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.contentLeft}>

          {/* Title */}
          <h1 className={styles.title} key={`title-${active}`}>
            {slide.title.split('\n').map((line, i) => (
              <span
                key={i}
                className={styles.titleLine}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle} key={`sub-${active}`}>
            {slide.subtitle}
          </p>

          {/* Accent */}
          <div className={styles.accent} key={`accent-${active}`}>
            <FiAward size={16} />
            <span>{slide.accent}</span>
          </div>

          {/* CTAs */}
          <div className={styles.ctas} key={`cta-${active}`}>
            <Link
              href={slide.cta.href}
              className={styles.ctaPrimary}
              aria-label={slide.cta.label}
            >
              {slide.cta.label}
              <FiArrowRight size={18} />
            </Link>
            <Link
              href={slide.cta2.href}
              className={styles.ctaSecondary}
              aria-label={slide.cta2.label}
            >
              {slide.cta2.label}
            </Link>
          </div>

          {/* Dynamic Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <FiUsers size={18} />
              <div>
                <strong>1,000+</strong>
                <span>Students</span>
              </div>
            </div>
            <div className={styles.quickStatDivider} />
            <div className={styles.quickStat}>
              <FiBook size={18} />
              <div>
                <strong>{slide.stat.value.includes('+') ? slide.stat.value : '40+'}</strong>
                <span>Programs</span>
              </div>
            </div>
            <div className={styles.quickStatDivider} />
            <div className={styles.quickStat}>
              <FiAward size={18} />
              <div>
                <strong>30+</strong>
                <span>Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Stat Card */}
        <div className={styles.contentRight}>
          <div className={styles.statCard} key={`stat-${active}`}>
            <div className={styles.statIcon}>
              <MdOutlineSchool size={32} />
            </div>
            <div className={styles.statValue}>{slide.stat.value}</div>
            <div className={styles.statLabel}>{slide.stat.label}</div>
            <div className={styles.statCardLine} />
            <p className={styles.statDesc}>
              St. John&apos;s Training College — proudly shaping Kenya&apos;s future
              educators since 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={styles.controls}>
        <button
          onClick={goBack}
          className={styles.controlBtn}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={22} />
        </button>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className={`${styles.dot}${i === active ? ` ${styles.dotActive}` : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? 'true' : 'false'}
            />
          ))}
        </div>
        <button
          onClick={next}
          className={styles.controlBtn}
          aria-label="Next slide"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          key={`progress-${active}`}
          className={`${styles.progress}${!paused ? ` ${styles.progressAnimate}` : ''}`}
        />
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}