'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowRight, FiClock, FiBook, FiChevronRight, FiPhone, FiMail,
} from 'react-icons/fi';
import {
  MdOutlineComputer, MdOutlineBusinessCenter, MdOutlineHealthAndSafety,
  MdOutlineEngineering, MdOutlineAccountBalance, MdOutlineSchool,
  MdOutlineRestaurant, MdOutlineSpa, MdOutlineAgriculture, MdOutlineStore,
  MdOutlineDirectionsCar, MdOutlinePsychology, MdOutlineHub,
} from 'react-icons/md';
import styles from './Programs.module.css';

/* ─────────────────────────────────────────────
   DATA  –  sourced directly from the brochure
───────────────────────────────────────────── */

const certificateCourses = [
  { title: 'Community Development and Social Work', duration: '1 Year', qualification: 'D Minus / D Plain', icon: MdOutlineHub, color: 'teal' },
  { title: 'Hair Dressing and Beauty Therapy',       duration: '9 Months', qualification: 'ALL',             icon: MdOutlineSpa, color: 'pink' },
  { title: 'Business Administration and Management', duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineBusinessCenter, color: 'green' },
  { title: 'Human Resource Management',              duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineAccountBalance, color: 'purple' },
  { title: 'Secretarial Studies',                    duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineComputer, color: 'blue' },
  { title: 'Information Communication Technology',  duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineComputer, color: 'blue' },
  { title: 'Nutrition and Dietetics',                duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineHealthAndSafety, color: 'red' },
  { title: 'Community Health Assistant',             duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineHealthAndSafety, color: 'red' },
  { title: 'Health Records and IT',                  duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineComputer, color: 'blue' },
  { title: 'Front Office',                           duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineBusinessCenter, color: 'green' },
  { title: 'Tourism Management',                     duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineStore, color: 'orange' },
  { title: 'General Agriculture',                    duration: '1 Year',   qualification: 'D Minus / D Plain', icon: MdOutlineAgriculture, color: 'lime' },
  { title: 'Food Production & Catering',             duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineRestaurant, color: 'orange' },
  { title: 'Counselling Psychology',                 duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlinePsychology, color: 'purple' },
  { title: 'Supply and Chain',                       duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineHub, color: 'teal' },
  { title: 'Finance and Banking',                    duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineAccountBalance, color: 'green' },
  { title: 'Tour Guide',                             duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineStore, color: 'orange' },
  { title: 'Store Keeping',                          duration: '1 Year',   qualification: 'D Plain',         icon: MdOutlineStore, color: 'lime' },
  { title: 'Health Support Service / Nurse Assistant', duration: '1 Year', qualification: 'D Minus / D Plain', icon: MdOutlineHealthAndSafety, color: 'red' },
];

const diplomaCourses = [
  { title: 'Community Development and Social Work',          duration: '2 Years', qualification: 'C Minus', icon: MdOutlineHub, color: 'teal' },
  { title: 'Human Resource Management',                      duration: '2 Years', qualification: 'C Minus', icon: MdOutlineAccountBalance, color: 'purple' },
  { title: 'Business Administration and Management',         duration: '2 Years', qualification: 'C Minus', icon: MdOutlineBusinessCenter, color: 'green' },
  { title: 'Information Communication Technology',           duration: '2 Years', qualification: 'C Minus', icon: MdOutlineComputer, color: 'blue' },
  { title: 'Nutrition and Dietetics',                        duration: '2 Years', qualification: 'C Minus', icon: MdOutlineHealthAndSafety, color: 'red' },
  { title: 'Community Health Assistant',                     duration: '2 Years', qualification: 'C Minus', icon: MdOutlineHealthAndSafety, color: 'red' },
  { title: 'Health Records and IT',                          duration: '2 Years', qualification: 'C Minus', icon: MdOutlineComputer, color: 'blue' },
  { title: 'Secretarial Studies',                            duration: '2 Years', qualification: 'C Minus', icon: MdOutlineComputer, color: 'blue' },
  { title: 'Diploma in Teacher Education (Primary & ECDE)', duration: '3 Years', qualification: 'C Plain',  icon: MdOutlineSchool, color: 'gold', tag: 'KNEC' },
  { title: 'Diploma in Secondary Teacher Education',         duration: '3 Years', qualification: 'C Plus',  icon: MdOutlineSchool, color: 'gold', tag: 'KNEC' },
  { title: 'General Agriculture',                            duration: '2 Years', qualification: 'C Minus', icon: MdOutlineAgriculture, color: 'lime' },
  { title: 'Nutrition and Dietetics',                        duration: '2 Years', qualification: 'C Minus', icon: MdOutlineRestaurant, color: 'orange' },
  { title: 'Counselling Psychology',                         duration: '2 Years', qualification: 'C Minus', icon: MdOutlinePsychology, color: 'purple' },
  { title: 'Food Production & Catering',                     duration: '2 Years', qualification: 'C Minus', icon: MdOutlineRestaurant, color: 'orange' },
  { title: 'Supply and Chain',                               duration: '2 Years', qualification: 'C Minus', icon: MdOutlineHub, color: 'teal' },
  { title: 'Finance and Banking',                            duration: '2 Years', qualification: 'C Minus', icon: MdOutlineAccountBalance, color: 'green' },
  { title: 'Tour Guide',                                     duration: '2 Years', qualification: 'C Minus', icon: MdOutlineStore, color: 'orange' },
  { title: 'Health Support Services',                        duration: '2 Years', qualification: 'C Minus', icon: MdOutlineHealthAndSafety, color: 'red' },
];

const technicalCourses = [
  { title: 'Plumbing and Pipe Fitting',  duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'orange' },
  { title: 'Tailoring and Dress Making', duration: '3 Months', qualification: 'ALL', icon: MdOutlineSpa, color: 'pink' },
  { title: 'Electricals',                duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'blue' },
  { title: 'Solar Installation',         duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'lime' },
  { title: 'Interior Design Decorations',duration: '3 Months', qualification: 'ALL', icon: MdOutlineStore, color: 'purple' },
  { title: 'Masonry Construction',       duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'orange' },
  { title: 'Mobile Repair',              duration: '3 Months', qualification: 'ALL', icon: MdOutlineComputer, color: 'blue' },
  { title: 'Motor Cycle Repair',         duration: '3 Months', qualification: 'ALL', icon: MdOutlineDirectionsCar, color: 'green' },
  { title: 'Mechanical Engineering',     duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'teal' },
  { title: 'Electrical Wireman',         duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'orange' },
  { title: 'Welding and Fabrication',    duration: '3 Months', qualification: 'ALL', icon: MdOutlineEngineering, color: 'red' },
];

const colorMap = {
  blue:   { bg: '#dbeafe', icon: '#1d4ed8', border: '#bfdbfe' },
  green:  { bg: '#d1fae5', icon: '#065f46', border: '#a7f3d0' },
  red:    { bg: '#fee2e2', icon: '#991b1b', border: '#fecaca' },
  orange: { bg: '#ffedd5', icon: '#9a3412', border: '#fed7aa' },
  purple: { bg: '#ede9fe', icon: '#5b21b6', border: '#ddd6fe' },
  teal:   { bg: '#ccfbf1', icon: '#115e59', border: '#99f6e4' },
  pink:   { bg: '#fce7f3', icon: '#9d174d', border: '#fbcfe8' },
  lime:   { bg: '#ecfccb', icon: '#365314', border: '#d9f99d' },
  gold:   { bg: '#fef9c3', icon: '#92400e', border: '#fde68a' },
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function CourseCard({ course, level }) {
  const colors = colorMap[course.color] || colorMap.blue;
  const Icon = course.icon;
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div
          className={styles.cardIcon}
          style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
        >
          <Icon size={26} style={{ color: colors.icon }} />
        </div>
        <div className={styles.cardMeta}>
          <span className={`${styles.levelBadge} ${styles[`level_${level.toLowerCase()}`]}`}>
            {level}
          </span>
          {course.tag && (
            <span className={styles.tagBadge}>{course.tag}</span>
          )}
        </div>
      </div>
      <h3 className={styles.cardTitle}>{course.title}</h3>
      <div className={styles.cardStats}>
        <span><FiClock size={12} /> {course.duration}</span>
        <span><FiBook size={12} /> Min: {course.qualification}</span>
      </div>
      <Link href="/apply" className={styles.cardBtn}>
        Apply Now <FiChevronRight size={13} />
      </Link>
    </div>
  );
}

function SectionBlock({ label, courses, level, id }) {
  return (
    <div className={styles.block} id={id}>
      <div className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>{label}</h3>
        <span className={styles.blockCount}>{courses.length} courses</span>
      </div>
      <div className={styles.grid}>
        {courses.map((c, i) => (
          <CourseCard key={i} course={c} level={level} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TABS
───────────────────────────────────────────── */
const TABS = [
  { id: 'all',         label: 'All Programs' },
  { id: 'certificate', label: 'Certificate' },
  { id: 'diploma',     label: 'Diploma' },
  { id: 'technical',   label: 'Technical' },
  { id: 'driving',     label: 'School of Driving' },
];

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Programs() {
  const [activeTab, setActiveTab] = useState('all');

  const showCert  = activeTab === 'all' || activeTab === 'certificate';
  const showDip   = activeTab === 'all' || activeTab === 'diploma';
  const showTech  = activeTab === 'all' || activeTab === 'technical';
  const showDrive = activeTab === 'all' || activeTab === 'driving';

  return (
    <section className={`section ${styles.programs}`} id="programs">
      <div className="container">

        {/* ── Section Header ── */}
        <div className={styles.header}>
          <div>
            <div className="section-label">
              <FiBook size={12} /> Academic Programs
            </div>
            <h2 className="section-title">
              Programs Designed for <span>Career Success</span>
            </h2>
          </div>
          <Link href="/apply" className={`btn btn-primary ${styles.applyBtn}`}>
            Apply Now <FiArrowRight size={16} />
          </Link>
        </div>

        <p className={`section-subtitle ${styles.sub}`}>
          Choose from Certificate, Diploma, Technical, and Driving programmes accredited by
          <strong> KNEC</strong>, <strong>CDACC</strong>, <strong>NTSA</strong>, and other recognised bodies.
          All qualifications are nationally recognised.
        </p>

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Programme Blocks ── */}
        {showCert && (
          <SectionBlock
            id="certificate"
            label="Certificate Programmes"
            courses={certificateCourses}
            level="Certificate"
          />
        )}

        {showDip && (
          <SectionBlock
            id="diploma"
            label="Diploma Programmes"
            courses={diplomaCourses}
            level="Diploma"
          />
        )}

        {showTech && (
          <SectionBlock
            id="technical"
            label="Technical Courses"
            courses={technicalCourses}
            level="Technical"
          />
        )}

        {/* ── School of Driving ── */}
        {showDrive && (
          <div className={styles.block} id="driving">
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>School of Driving</h3>
              <span className={styles.blockCount}>Professional Training</span>
            </div>
            <div className={styles.drivingCard}>
              <div className={styles.drivingIcon}>
                <MdOutlineDirectionsCar size={48} />
              </div>
              <div className={styles.drivingContent}>
                <h4>Professional Driving Training</h4>
                <ul className={styles.drivingList}>
                  <li>Duration: <strong>1 Month</strong></li>
                  <li>Manual &amp; Automatic Vehicles</li>
                  <li>Requirement: <strong>National ID</strong></li>
                  <li>Practical &amp; Theory Lessons</li>
                  <li>NTSA Exam Preparation</li>
                </ul>
              </div>
              <div className={styles.drivingCta}>
                <p className={styles.drivingTagline}>Qualify fast. Drive professionally.</p>
                <Link href="/apply" className={`btn btn-primary`}>
                  Enroll Now <FiArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h3>Ready to begin your journey?</h3>
              <p>
                Visit our campus at Cereal Board Road, behind AP Camp, Maralal, or contact our
                admissions team today.
              </p>
              <div className={styles.ctaContacts}>
                <span><FiPhone size={14} /> 0720 215715 / 0741 573059</span>
                <span><FiPhone size={14} /> 0743 345810 / 0707 708557</span>
                <span><FiMail size={14} /> stjohnscollegemaralal@gmail.com</span>
              </div>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/apply"   className="btn btn-primary">Apply Online</Link>
              <Link href="/contact" className="btn btn-secondary">Contact Admissions</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}