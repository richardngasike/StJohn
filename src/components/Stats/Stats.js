'use client';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FiUsers, FiAward, FiBriefcase, FiBook } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './Stats.module.css';

const stats = [
  { icon: FiUsers,  value: 2500, suffix: '+', label: 'Students Enrolled',   desc: 'Active learners across all programs' },
  { icon: FiBook,   value: 40,   suffix: '+', label: 'Programs Offered',    desc: 'Certificate, diploma & short courses' },
  { icon: FiAward,  value: 30,   suffix: '+', label: 'Years of Excellence', desc: 'Proudly educating since 2010' },
  { icon: FiBriefcase, value: 98, suffix: '%', label: 'Employment Rate',   desc: 'Graduates placed within 6 months' },
  { icon: MdOutlineSchool, value: 15000, suffix: '+', label: 'Alumni Network', desc: 'Professionals across East Africa' },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.stats}>
      <div className={styles.bgDecor} />
      <div className={`container ${styles.inner}`} ref={ref}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Our Impact in Numbers</h2>
          <p className={styles.sub}>Decades of commitment to academic excellence and graduate success</p>
        </div>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.icon}>
                <s.icon size={26} />
              </div>
              <div className={styles.value}>
                {inView ? (
                  <CountUp
                    end={s.value}
                    duration={2.4}
                    delay={i * 0.15}
                    separator=","
                  />
                ) : '0'}
                <span className={styles.suffix}>{s.suffix}</span>
              </div>
              <div className={styles.label}>{s.label}</div>
              <div className={styles.desc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
