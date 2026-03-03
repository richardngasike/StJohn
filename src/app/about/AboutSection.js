import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './AboutSection.module.css';

const highlights = [
  'Fully accredited by KNEC, NITA, and TVETA',
  'Experienced and dedicated faculty members',
  'Modern laboratories and workshop facilities',
  'Strong industry partnerships for internships',
  'Scholarship and financial aid programs',
  'Active student clubs and extracurricular activities',
];

export default function About() {
  return (
    <section className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Image Side */}
          <div className={styles.imgSide}>
            <div className={styles.imgMain}>
              <div className={styles.imgPlaceholder}>
                <MdOutlineSchool size={64} />
                <p>St Johns Campus</p>
                <span>Established 1994</span>
              </div>
            </div>
            <div className={styles.imgCard}>
              <div className={styles.imgCardIcon}><MdOutlineSchool size={22} /></div>
              <div>
                <strong>ISO 9001:2015</strong>
                <span>Quality Management Certified</span>
              </div>
            </div>
            <div className={styles.imgBadge}>
              <span className={styles.imgBadgeNum}>30+</span>
              <span className={styles.imgBadgeText}>Years of Excellence</span>
            </div>
          </div>

          {/* Content Side */}
          <div className={styles.content}>
            <div className="section-label">About St Johns</div>
            <h2 className="section-title">
              A Legacy of <span>Academic Excellence</span> in Kenya
            </h2>
            <p className={styles.lead}>
              Founded in 1994, St Johns Training College has grown to become one of Kenya's most respected
              technical and vocational training institutions, dedicated to producing competent, ethical,
              and employable graduates.
            </p>
            <p className={styles.body}>
              Our holistic approach to education combines rigorous academic instruction with hands-on
              practical training, mentorship, and character development. We partner with industry leaders
              to ensure our programs remain relevant and our graduates are ready for the workforce.
            </p>

            <div className={styles.highlights}>
              {highlights.map((h, i) => (
                <div key={i} className={styles.highlight}>
                  <div className={styles.checkIcon}><FiCheck size={13} /></div>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <Link href="/about" className="btn btn-primary btn-lg">
                Learn More <FiArrowRight size={16} />
              </Link>
              <Link href="/apply" className="btn btn-secondary btn-lg">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
