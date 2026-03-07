'use client';
import { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdFormatQuote } from 'react-icons/md';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Grace Wanjiku',
    role: 'IT Professional at Safaricom',
    program: 'Diploma in Information Technology, 2022',
    text: 'St Johns gave me not just technical knowledge but the confidence to compete in the job market. I secured my job at Safaricom three months after graduation. The lecturers are dedicated and the facilities are excellent.',
    rating: 5,
    initials: 'GW',
  },
  {
    name: 'Daniel Omondi',
    role: 'Entrepreneur & Business Owner',
    program: 'Diploma in Business Administration, 2021',
    text: 'The business program at St Johns was transformative. The practical approach, case studies, and mentorship I received helped me start my own company. Today I employ 12 people. I owe my success to this institution.',
    rating: 5,
    initials: 'DO',
  },
  {
    name: 'Fatuma Hassan',
    role: 'Community Health Officer, Ministry of Health',
    program: 'Certificate in Community Health, 2023',
    text: 'The community health program is well-structured and practically oriented. My clinical placements were invaluable. I passed my licensing exam on the first attempt and got posted immediately. Highly recommend St Johns.',
    rating: 5,
    initials: 'FH',
  },
  {
    name: 'Peter Kimani',
    role: 'Electrical Contractor',
    program: 'Diploma in Electrical Engineering, 2020',
    text: 'The hands-on training at St Johns is unlike any other institution. The workshop facilities are top-notch. I registered my electrical contracting company immediately after graduation and business is thriving.',
    rating: 5,
    initials: 'PK',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setActive(idx);
    setTimeout(() => setAnimating(false), 400);
  };

  const next = () => goTo((active + 1) % testimonials.length);
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [active]);

  const t = testimonials[active];

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className={styles.bgDecor} />
      <div className="container">
        <div className="section-label" style={{ justifyContent: 'center', display: 'flex', marginBottom: 16 }}>
          <FiStar size={12} /> Student Testimonials
        </div>
        <h2 className="section-title" style={{ textAlign: 'center', color: 'white', marginBottom: 60 }}>
          What Our <em style={{ color: 'var(--gold-300)', fontStyle: 'italic' }}>Graduates</em> Say
        </h2>

        <div className={styles.carousel}>
          {/* Navigation - left */}
          <button onClick={prev} className={styles.navBtn} aria-label="Previous">
            <FiChevronLeft size={20} />
          </button>

          {/* Testimonial Card */}
          <div className={`${styles.card} ${animating ? styles.cardAnimating : ''}`}>
            <MdFormatQuote size={52} className={styles.quoteIcon} />

            <div className={styles.stars}>
              {Array(t.rating).fill(0).map((_, i) => (
                <FiStar key={i} size={16} className={styles.star} />
              ))}
            </div>

            <blockquote className={styles.quote}>{t.text}</blockquote>

            <div className={styles.author}>
              <div className={styles.avatar}>{t.initials}</div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorRole}>{t.role}</div>
                <div className={styles.authorProgram}>{t.program}</div>
              </div>
            </div>
          </div>

          {/* Navigation - right */}
          <button onClick={next} className={styles.navBtn} aria-label="Next">
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className={styles.thumbnails}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            >
              <div className={styles.thumbAvatar}>{t.initials}</div>
              <div className={styles.thumbInfo}>
                <div className={styles.thumbName}>{t.name}</div>
                <div className={styles.thumbRole}>{t.role.split(' at ')[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
