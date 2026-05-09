'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
} from 'react-icons/fi';
import {
  MdOutlineSchool,
  MdOutlineVerified,
  MdOutlineCalendarMonth,
  MdOutlineCorporateFare,
} from 'react-icons/md';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    eyebrow: 'Teacher Training Excellence',
    title: "Shaping Kenya's\nNext Generation",
    subtitle:
      "Aspire to Inspire before you Expire — St. John's prepares educators who lead, inspire, and transform communities across Kenya.",
    cta: { label: 'Explore Programs', href: '/programs' },
    cta2: { label: 'Apply Now', href: '/apply' },
    bg: '/images/hero100.png',
    stat: { value: '98%', label: 'Employment Rate', icon: MdOutlineVerified },
  },
  {
    id: 2,
    eyebrow: 'Admissions Open — 2026',
    title: 'Your Future\nStarts Here',
    subtitle:
      "Applications for the new academic year are open. Join thousands of successful graduates who began their journey at St. John's Training College.",
    cta: { label: 'Apply Online', href: '/apply' },
    cta2: { label: 'Learn More', href: '/about' },
    bg: '/images/hero2.png',
    stat: { value: 'Aug 30', label: 'Application Deadline', icon: MdOutlineCalendarMonth },
  },
  {
    id: 3,
    eyebrow: 'Campus Life & Facilities',
    title: 'Grow, Lead\nand Thrive',
    subtitle:
      'State-of-the-art facilities, mentorship programmes, sports, and extracurricular activities that shape well-rounded, confident educators.',
    cta: { label: 'Campus Life', href: '/about#campus' },
    cta2: { label: 'Student Portal', href: '/portal' },
    bg: '/images/hero10.png',
    stat: { value: '40+', label: 'Programmes Offered', icon: MdOutlineSchool },
  },
  {
    id: 4,
    eyebrow: 'Industry Partnerships',
    title: 'Education Meets\nOpportunity',
    subtitle:
      'Strong partnerships with leading institutions ensure relevant curriculum, premium placements, and exceptional career prospects for our graduates.',
    cta: { label: 'Our Programmes', href: '/programs' },
    cta2: { label: 'Contact Us', href: '/contact' },
    bg: '/images/bg.jpeg',
    stat: { value: '50+', label: 'Industry Partners', icon: MdOutlineCorporateFare },
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (animating || idx === active) return;
      setPrev(active);
      setAnimating(true);
      setActive(idx);
      setContentKey((k) => k + 1);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 1000);
    },
    [active, animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % slides.length);
  }, [active, goTo]);

  const goBack = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  const slide = slides[active];
  const StatIcon = slide.stat.icon;

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      {/* ── Backgrounds ── */}
      <div className={styles.bgWrapper} aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={[
              styles.bg,
              i === active ? styles.bgActive : '',
              prev === i ? styles.bgPrev : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ backgroundImage: `url(${s.bg})` }}
          />
        ))}

        {/* Cinematic overlays — four layers for strong text protection */}
        <div className={styles.overlayBase} />
        <div className={styles.overlayBottom} />
        <div className={styles.overlayTop} />
        <div className={styles.overlayLeft} />

        {/* Grain texture */}
        <div className={styles.grain} />
      </div>

      {/* ── Side Arrows ── */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goBack}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={28} />
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={next}
        aria-label="Next slide"
      >
        <FiChevronRight size={28} />
      </button>

      {/* ── Main Content — centred ── */}
      <div className={styles.stage}>
        {/* Eyebrow */}
        <div className={styles.eyebrow} key={`ey-${contentKey}`}>
          <span className={styles.eyebrowLine} />
          <span>{slide.eyebrow}</span>
          <span className={styles.eyebrowLine} />
        </div>

        {/* Title */}
        <h1 className={styles.title} key={`ti-${contentKey}`}>
          {slide.title.split('\n').map((line, i) => (
            <span
              key={i}
              className={styles.titleLine}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle} key={`su-${contentKey}`}>
          {slide.subtitle}
        </p>

        {/* CTA Row */}
        <div className={styles.ctas} key={`ct-${contentKey}`}>
          <Link href={slide.cta.href} className={styles.ctaPrimary}>
            <span>{slide.cta.label}</span>
            <FiArrowUpRight size={18} className={styles.ctaIcon} />
          </Link>
          <Link href={slide.cta2.href} className={styles.ctaSecondary}>
            {slide.cta2.label}
          </Link>
        </div>
      </div>

      {/* ── Slide Counter ── */}
      <div className={styles.counter} aria-hidden="true">
        <span className={styles.counterActive}>
          {String(active + 1).padStart(2, '0')}
        </span>
        <span className={styles.counterSep} />
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Bottom Bar — stat + dots + progress ── */}
      <div className={styles.bottomBar}>
        {/* Stat pill */}
        <div className={styles.statPill} key={`sp-${contentKey}`}>
          <div className={styles.statPillIcon}>
            <StatIcon size={18} />
          </div>
          <div className={styles.statPillBody}>
            <strong>{slide.stat.value}</strong>
            <span>{slide.stat.label}</span>
          </div>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={[styles.dot, i === active ? styles.dotActive : '']
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            key={`pr-${contentKey}`}
            className={[
              styles.progress,
              !paused ? styles.progressAnimate : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      </div>

      {/* ── College name watermark ── */}
      <div className={styles.watermark} aria-hidden="true">
        St. John&apos;s Training College
      </div>
    </section>
  );
}