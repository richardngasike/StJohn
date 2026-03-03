'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiClock, FiUsers, FiBook, FiAward, FiArrowRight, FiSearch } from 'react-icons/fi';
import {
  MdOutlineComputer, MdOutlineBusinessCenter, MdOutlineHealthAndSafety,
  MdOutlineEngineering, MdOutlineAccountBalance, MdOutlineSchool,
  MdOutlineAgriculture, MdOutlineConstruction
} from 'react-icons/md';
import styles from './programs.module.css';

const categories = ['All', 'Certificate', 'Diploma', 'Short Course'];

const allPrograms = [
  { icon: MdOutlineComputer,       level: 'Diploma',      cat: 'Diploma',      title: 'Information Technology',          duration: '2 Years', intake: 'Sept & Jan', fee: 'KES 45,000/yr', students: 340, desc: 'Programming, networking, cybersecurity, database management and cloud computing.', id: 'it' },
  { icon: MdOutlineBusinessCenter, level: 'Diploma',      cat: 'Diploma',      title: 'Business Administration',         duration: '2 Years', intake: 'Sept & Jan', fee: 'KES 42,000/yr', students: 280, desc: 'Management, entrepreneurship, marketing, human resources and organizational behavior.', id: 'business' },
  { icon: MdOutlineHealthAndSafety,level: 'Certificate',  cat: 'Certificate',  title: 'Community Health',                duration: '18 Months', intake: 'Sept',  fee: 'KES 38,000/yr', students: 210, desc: 'Public health, clinical care, community outreach and health promotion strategies.', id: 'health' },
  { icon: MdOutlineEngineering,    level: 'Diploma',      cat: 'Diploma',      title: 'Electrical Engineering',          duration: '2 Years', intake: 'Sept',    fee: 'KES 50,000/yr', students: 175, desc: 'Electrical installation, renewable energy systems, instrumentation and power distribution.', id: 'electrical' },
  { icon: MdOutlineAccountBalance, level: 'Certificate',  cat: 'Certificate',  title: 'Accounting & Finance',            duration: '1 Year',  intake: 'Sept & Jan', fee: 'KES 35,000/yr', students: 295, desc: 'Bookkeeping, financial reporting, tax compliance, QuickBooks and accounting software.', id: 'accounting' },
  { icon: MdOutlineSchool,         level: 'Certificate',  cat: 'Certificate',  title: 'Early Childhood Education',       duration: '1 Year',  intake: 'Sept',    fee: 'KES 32,000/yr', students: 190, desc: 'Child development, pedagogy, early literacy, numeracy and classroom management.', id: 'ece' },
  { icon: MdOutlineAgriculture,    level: 'Certificate',  cat: 'Certificate',  title: 'Agriculture & Food Technology',   duration: '1 Year',  intake: 'Sept',    fee: 'KES 30,000/yr', students: 120, desc: 'Crop production, agribusiness, food processing and modern farming technologies.', id: 'agri' },
  { icon: MdOutlineConstruction,   level: 'Diploma',      cat: 'Diploma',      title: 'Building Technology',             duration: '2 Years', intake: 'Sept',    fee: 'KES 48,000/yr', students: 145, desc: 'Construction management, quantity surveying, architectural drafting and project management.', id: 'building' },
  { icon: MdOutlineComputer,       level: 'Short Course', cat: 'Short Course', title: 'Digital Marketing',               duration: '3 Months',intake: 'Monthly', fee: 'KES 15,000',   students: 85,  desc: 'SEO, social media marketing, email campaigns, analytics and content strategy.', id: 'digital' },
  { icon: MdOutlineBusinessCenter, level: 'Short Course', cat: 'Short Course', title: 'Entrepreneurship & Startup',      duration: '2 Months',intake: 'Monthly', fee: 'KES 12,000',   students: 95,  desc: 'Business planning, fundraising, market research and lean startup methodology.', id: 'startup' },
  { icon: MdOutlineHealthAndSafety,level: 'Certificate',  cat: 'Certificate',  title: 'Pharmacy Technician',             duration: '2 Years', intake: 'Sept',    fee: 'KES 55,000/yr', students: 130, desc: 'Pharmaceutical dispensing, drug interactions, healthcare regulation and patient care.', id: 'pharmacy' },
  { icon: MdOutlineEngineering,    level: 'Short Course', cat: 'Short Course', title: 'Plumbing & Water Technology',     duration: '6 Months',intake: 'Sept & Jan', fee: 'KES 22,000', students: 75, desc: 'Pipe fitting, water supply systems, sanitation and drainage technology.', id: 'plumbing' },
];

const colorMap = {
  Diploma:      { bg: 'var(--green-100)',  color: 'var(--green-700)' },
  Certificate:  { bg: 'var(--gold-100)',   color: 'var(--gold-700)' },
  'Short Course':{ bg: 'var(--brown-100)', color: 'var(--brown-700)' },
};

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allPrograms.filter(p => {
    const matchCat = activeCategory === 'All' || p.cat === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span><span>Programs</span>
            </div>
            <h1>Academic Programs</h1>
            <p>Explore 40+ certificate, diploma, and short courses designed for career success in Kenya.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.filterTabs}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                >
                  {cat}
                  <span className={styles.filterCount}>
                    {cat === 'All' ? allPrograms.length : allPrograms.filter(p => p.cat === cat).length}
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.searchBar}>
              <FiSearch size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((p, i) => {
              const c = colorMap[p.cat];
              return (
                <div key={i} className={styles.card} id={p.id}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon} style={{ background: c.bg }}>
                      <p.icon size={28} style={{ color: c.color }} />
                    </div>
                    <span className={`badge`} style={{ background: c.bg, color: c.color }}>
                      {p.level}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <FiClock size={13} />
                      <span><strong>Duration:</strong> {p.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiBook size={13} />
                      <span><strong>Intake:</strong> {p.intake}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiAward size={13} />
                      <span><strong>Fee:</strong> {p.fee}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiUsers size={13} />
                      <span><strong>Enrolled:</strong> {p.students}</span>
                    </div>
                  </div>
                  <Link href="/apply" className={styles.cardBtn}>
                    Apply for this Program <FiArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <FiSearch size={40} />
              <h3>No programs found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
