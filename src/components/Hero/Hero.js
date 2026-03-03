'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FiChevronLeft, FiChevronRight, FiArrowRight,
  FiPlay, FiAward, FiUsers, FiBook
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    tag: 'Academic Excellence',
    title: 'St Johns\nTraining College',
    subtitle: 'St Johns Training College provides world-class education rooted in African values, preparing graduates for professional success and national service.',
    cta: { label: 'Explore Programs', href: '/programs' },
    cta2: { label: 'Apply Now', href: '/apply' },
    bg: 'slide1',
    accent: 'Aspire to Inspire before you Expire',
    stat: { value: '98%', label: 'Employment Rate' },
  },
  {
    id: 2,
    tag: '2024/2025 Admissions Open',
    title: 'Your Future Starts\nHere Today',
    subtitle: 'Join thousands of successful graduates who began their journey at St Johns. Applications for the new academic year are now open.',
    cta: { label: 'Apply Online', href: '/apply' },
    cta2: { label: 'Learn More', href: '/about' },
    bg: 'slide2',
    accent: 'Deadline: August 30, 2024',
    stat: { value: '2,500+', label: 'Students Enrolled' },
  },
  {
    id: 3,
    tag: 'Holistic Development',
    title: 'Beyond Academics:\nGrow, Lead, Thrive',
    subtitle: 'Our campus offers state-of-the-art facilities, mentorship programs, sports, and extracurricular activities that shape well-rounded professionals.',
    cta: { label: 'Campus Life', href: '/about#campus' },
    cta2: { label: 'Student Portal', href: '/portal' },
    bg: 'slide3',
    accent: 'Modern Campus Facilities',
    stat: { value: '40+', label: 'Programs Offered' },
  },
  {
    id: 4,
    tag: 'Industry Partnerships',
    title: 'Connecting Education\nWith Industry',
    subtitle: 'Our partnerships with leading companies ensure our curriculum is current, our internship placements are premium, and your career prospects are exceptional.',
    cta: { label: 'Our Programs', href: '/programs' },
    cta2: { label: 'Contact Us', href: '/contact' },
    bg: 'slide4',
    accent: '120+ Industry Partners',
    stat: { value: '30+', label: 'Years of Excellence' },
  },
];

const bgImages = [
  '/images/hero.png',
  '/images/hero2.png',
  '/images/hero3.png',
  '/images/hero4.png',
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx, dir = 1) => {
    if (animating) return;
    setPrev(active);
    setDirection(dir);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 700);
  }, [active, animating]);

  const next = useCallback(() => {
    goTo((active + 1) % slides.length, 1);
  }, [active, goTo]);

  const goBack = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length, -1);
  }, [active, goTo]);

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
    >
      {/* Background */}
      <div className={styles.bgWrapper}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.bg} ${i === active ? styles.bgActive : ''}`}
            style={{ backgroundImage: `url(${bgImages[i]})` }}
          />
        ))}
        {/* Decorative overlay */}
        <div className={styles.overlay} />
        <div className={styles.patternOverlay} />
        {/* Floating shapes */}
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.contentLeft}>
          {/* Tag */}
          <div className={styles.tag} key={`tag-${active}`}>
            <MdOutlineSchool size={13} />
            <span>{slide.tag}</span>
          </div>
          {/* Title */}
          <h1 className={styles.title} key={`title-${active}`}>
            {slide.title.split('\n').map((line, i) => (
              <span key={i} className={styles.titleLine} style={{ animationDelay: `${i * 0.12}s` }}>
                {i === 0 ? line : <em>{line}</em>}
              </span>
            ))}
          </h1>
          {/* Subtitle */}
          <p className={styles.subtitle} key={`sub-${active}`}>
            {slide.subtitle}
          </p>
          {/* Accent */}
          <div className={styles.accent} key={`accent-${active}`}>
            <FiAward size={14} />
            <span>{slide.accent}</span>
          </div>
          {/* CTAs */}
          <div className={styles.ctas} key={`cta-${active}`}>
            <Link href={slide.cta.href} className={styles.ctaPrimary}>
              {slide.cta.label}
              <FiArrowRight size={16} />
            </Link>
            <Link href={slide.cta2.href} className={styles.ctaSecondary}>
              {slide.cta2.label}
            </Link>
          </div>
          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <FiUsers size={16} />
              <div>
                <strong>2,500+</strong>
                <span>Students</span>
              </div>
            </div>
            <div className={styles.quickStatDivider} />
            <div className={styles.quickStat}>
              <FiBook size={16} />
              <div>
                <strong>40+</strong>
                <span>Programs</span>
              </div>
            </div>
            <div className={styles.quickStatDivider} />
            <div className={styles.quickStat}>
              <FiAward size={16} />
              <div>
                <strong>30+</strong>
                <span>Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Stat Card */}
        <div className={styles.contentRight}>
          <div className={styles.statCard} key={`stat-${active}`}>
            <div className={styles.statIcon}><MdOutlineSchool size={28} /></div>
            <div className={styles.statValue}>{slide.stat.value}</div>
            <div className={styles.statLabel}>{slide.stat.label}</div>
            <div className={styles.statCardLine} />
            <p className={styles.statDesc}>St Johns Training College — proudly shaping Kenya's future professionals since 1994.</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button onClick={goBack} className={styles.controlBtn} aria-label="Previous slide">
          <FiChevronLeft size={20} />
        </button>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className={styles.controlBtn} aria-label="Next slide">
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          key={`progress-${active}`}
          className={`${styles.progress} ${!paused ? styles.progressAnimate : ''}`}
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
