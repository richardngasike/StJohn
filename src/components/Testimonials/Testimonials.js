'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Andrew Lekupe',
    role: 'IT Professional',
    company: 'Samburu County',
    program: 'Diploma in Information Technology, 2022',
    text: 'St Johns gave me not just technical knowledge but the confidence to compete in the job market. I secured my job at Safaricom three months after graduation. The lecturers are dedicated and the facilities are excellent.',
    rating: 5,
    initials: 'GW',
    image: '/images/lekupe.jpeg',
    accent: 'var(--green-400)',
  },
  {
    name: 'Jemima Natumi',
    role: 'Health Records Office',
    company: 'Hospital',
    program: 'Diploma in Health Records with IT',
    text: 'The health records course i did at St johns is very outstdaning compared to other.',
    rating: 5,
    initials: 'DO',
    image: '/images/selina.png',
    accent: 'var(--gold-400)',
  },
  {
    name: 'Fatuma Hassan',
    role: 'Community Health Officer',
    company: 'Ministry of Health',
    program: 'Certificate in Community Health, 2023',
    text: 'The community health program is well-structured and practically oriented. My clinical placements were invaluable. I passed my licensing exam on the first attempt and got posted immediately. Highly recommend St Johns.',
    rating: 5,
    initials: 'FH',
    image: '/images/fatuma.png',
    accent: 'var(--green-300)',
  },
  {
    name: 'Izoo',
    role: 'Electrical Contractor',
    company: 'Self-employed',
    program: 'Diploma in Electrical Engineering, 2020',
    text: 'The hands-on training at St Johns is unlike any other institution. The workshop facilities are top-notch. I registered my electrical contracting company immediately after graduation and business is thriving.',
    rating: 5,
    initials: 'PK',
    image: '/images/izoo.png',
    accent: 'var(--gold-300)',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [sliding, setSliding] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx, dir = 'next') => {
    if (sliding || idx === active) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setDisplayed(idx);
      setActive(idx);
      setSliding(false);
    }, 420);
  };

  const next = () => goTo((active + 1) % testimonials.length, 'next');
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length, 'prev');

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % testimonials.length;
        setDirection('next');
        setSliding(true);
        setTimeout(() => { setDisplayed(next); setSliding(false); }, 420);
        return next;
      });
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[displayed];

  return (
    <section className={`section ${styles.testimonials}`}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={`container ${styles.inner}`}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.labelRow}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Student Voices</span>
            <span className={styles.labelLine} />
          </div>
          <h2 className={styles.heading}>
            What Our <em>Graduates</em> Say
          </h2>
        </div>

        {/* Main Stage */}
        <div className={styles.stage}>

          {/* Prev Button */}
          <button
            onClick={() => { prev(); resetTimer(); }}
            className={styles.navBtn}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Card */}
          <div
            className={[
              styles.card,
              sliding
                ? direction === 'next'
                  ? styles.slideOutLeft
                  : styles.slideOutRight
                : styles.slideIn,
            ].join(' ')}
          >
            {/* Image Column */}
            <div className={styles.imgCol}>
              <div className={styles.imgFrame}>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className={styles.imgGradient} />
              </div>

              {/* Name tag over image bottom */}
              <div className={styles.nameTag}>
                <span className={styles.nameTagName}>{t.name}</span>
                <span className={styles.nameTagRole}>{t.role}</span>
                <span className={styles.nameTagCompany}>{t.company}</span>
              </div>

              {/* Accent number */}
              <div className={styles.indexBadge}>
                <span>{String(active + 1).padStart(2, '0')}</span>
                <span className={styles.indexTotal}>/ {String(testimonials.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Quote Column */}
            <div className={styles.quoteCol}>
              <div className={styles.quoteMarkLarge}>"</div>

              <div className={styles.stars}>
                {Array(t.rating).fill(0).map((_, i) => (
                  <FiStar key={i} size={14} className={styles.star} />
                ))}
              </div>

              <blockquote className={styles.quoteText}>
                {t.text}
              </blockquote>

              <div className={styles.divider} />

              <div className={styles.programRow}>
                <span className={styles.programLabel}>Programme</span>
                <span className={styles.programValue}>{t.program}</span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => { next(); resetTimer(); }}
            className={styles.navBtn}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={22} />
          </button>
        </div>

        {/* Dots + Thumbnails row */}
        <div className={styles.controls}>
          {/* Progress dots */}
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i, i > active ? 'next' : 'prev'); resetTimer(); }}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className={styles.thumbStrip}>
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > active ? 'next' : 'prev'); resetTimer(); }}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            >
              <div className={styles.thumbImgWrap}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="48px"
                />
              </div>
              <div className={styles.thumbText}>
                <span className={styles.thumbName}>{item.name}</span>
                <span className={styles.thumbRole}>{item.role}</span>
              </div>
              {i === active && <span className={styles.thumbActivePip} />}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}