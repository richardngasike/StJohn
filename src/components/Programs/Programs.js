'use client';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiUsers, FiBook, FiChevronRight } from 'react-icons/fi';
import {
  MdOutlineComputer, MdOutlineBusinessCenter, MdOutlineHealthAndSafety,
  MdOutlineEngineering, MdOutlineAccountBalance, MdOutlineSchool
} from 'react-icons/md';
import styles from './Programs.module.css';

const programs = [
  {
    icon: MdOutlineComputer,
    color: 'blue',
    level: 'Diploma',
    title: 'Information Technology',
    desc: 'Master modern programming, networking, cybersecurity, and cloud computing skills for the digital economy.',
    duration: '2 Years',
    students: '340',
    tag: 'High Demand',
  },
  {
    icon: MdOutlineBusinessCenter,
    color: 'green',
    level: 'Diploma',
    title: 'Business Administration',
    desc: 'Develop comprehensive business management, entrepreneurship, and leadership competencies.',
    duration: '2 Years',
    students: '280',
    tag: 'Popular',
  },
  {
    icon: MdOutlineHealthAndSafety,
    color: 'red',
    level: 'Certificate',
    title: 'Community Health',
    desc: 'Train for impactful roles in public health, clinical care, and community wellness programs.',
    duration: '1.5 Years',
    students: '210',
    tag: 'Government Funded',
  },
  {
    icon: MdOutlineEngineering,
    color: 'orange',
    level: 'Diploma',
    title: 'Electrical Engineering',
    desc: 'Build practical skills in electrical installation, renewable energy, and power systems.',
    duration: '2 Years',
    students: '175',
    tag: 'New Intake',
  },
  {
    icon: MdOutlineAccountBalance,
    color: 'purple',
    level: 'Certificate',
    title: 'Accounting & Finance',
    desc: 'Gain expertise in bookkeeping, financial reporting, tax compliance, and accounting software.',
    duration: '1 Year',
    students: '295',
    tag: 'Popular',
  },
  {
    icon: MdOutlineSchool,
    color: 'teal',
    level: 'Certificate',
    title: 'Early Childhood Education',
    desc: 'Prepare to nurture young minds with modern pedagogical techniques and child development knowledge.',
    duration: '1 Year',
    students: '190',
    tag: 'Accredited',
  },
];

const colorMap = {
  blue:   { bg: '#dbeafe', icon: '#1d4ed8', border: '#bfdbfe' },
  green:  { bg: '#d1fae5', icon: '#065f46', border: '#a7f3d0' },
  red:    { bg: '#fee2e2', icon: '#991b1b', border: '#fecaca' },
  orange: { bg: '#ffedd5', icon: '#9a3412', border: '#fed7aa' },
  purple: { bg: '#ede9fe', icon: '#5b21b6', border: '#ddd6fe' },
  teal:   { bg: '#ccfbf1', icon: '#115e59', border: '#99f6e4' },
};

export default function Programs() {
  return (
    <section className={`section ${styles.programs}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className="section-label">
              <FiBook size={12} /> Academic Programs
            </div>
            <h2 className="section-title">
              Programs Designed for <span>Career Success</span>
            </h2>
          </div>
          <Link href="/programs" className={`btn btn-secondary ${styles.seeAll}`}>
            All Programs <FiArrowRight size={16} />
          </Link>
        </div>

        <p className={`section-subtitle ${styles.sub}`}>
          Choose from a wide range of certificate, diploma, and short courses accredited by KNEC, NITA, and other recognized bodies.
        </p>

        <div className={styles.grid}>
          {programs.map((p, i) => {
            const colors = colorMap[p.color];
            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.cardIcon}
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <p.icon size={28} style={{ color: colors.icon }} />
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={`badge badge-green ${styles.level}`}>{p.level}</span>
                    {p.tag && <span className={`badge badge-gold`}>{p.tag}</span>}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>

                <div className={styles.cardStats}>
                  <span>
                    <FiClock size={13} /> {p.duration}
                  </span>
                  <span>
                    <FiUsers size={13} /> {p.students} Students
                  </span>
                </div>

                <Link href="/apply" className={styles.cardBtn}>
                  Apply for this Program <FiChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <div>
              <h3>Can't find your program?</h3>
              <p>We offer 40+ programs. Explore our full catalog or contact our admissions team.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/programs" className="btn btn-primary">View All Programs</Link>
              <Link href="/contact" className="btn btn-secondary">Contact Admissions</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
