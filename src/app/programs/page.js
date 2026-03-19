'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiClock, FiUsers, FiBook, FiAward, FiArrowRight, FiSearch } from 'react-icons/fi';
import {
  MdOutlineComputer, MdOutlineBusinessCenter, MdOutlineHealthAndSafety,
  MdOutlineEngineering, MdOutlineAccountBalance, MdOutlineSchool,
  MdOutlineAgriculture, MdOutlineConstruction, MdOutlineDirectionsCar
} from 'react-icons/md';
import styles from './programs.module.css';

const categories = ['All', 'Certificate', 'Diploma', 'Short Course', 'Artisan', 'CBET', 'Professional', 'Driving'];

const allPrograms = [
  // ================= DIPLOMA COURSES =================
  { title: 'Diploma in Information Technology', level: 'Diploma', cat: 'KNEC', duration: '2-3 Years' },
  { title: 'Diploma in Business Management', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Supply Chain Management', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Human Resource Management', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Electrical & Electronics Engineering', level: 'Diploma', cat: 'KNEC', duration: '3 Years' },
  { title: 'Diploma in Civil Engineering', level: 'Diploma', cat: 'KNEC', duration: '3 Years' },
  { title: 'Diploma in Mechanical Engineering', level: 'Diploma', cat: 'KNEC', duration: '3 Years' },
  { title: 'Diploma in Hospitality Management', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Tourism Management', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Journalism & Mass Communication', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },
  { title: 'Diploma in Early Childhood Development Education (ECDE)', level: 'Diploma', cat: 'KNEC', duration: '2 Years' },

  // ================= CERTIFICATE COURSES =================
  { title: 'Certificate in Information Technology', level: 'Certificate', cat: 'KNEC', duration: '1-2 Years' },
  { title: 'Certificate in Business Administration', level: 'Certificate', cat: 'KNEC', duration: '1 Year' },
  { title: 'Certificate in Electrical Installation', level: 'Certificate', cat: 'KNEC', duration: '1-2 Years' },
  { title: 'Certificate in Plumbing', level: 'Certificate', cat: 'KNEC', duration: '1 Year' },
  { title: 'Certificate in Automotive Engineering', level: 'Certificate', cat: 'KNEC', duration: '1-2 Years' },
  { title: 'Certificate in Catering & Accommodation', level: 'Certificate', cat: 'KNEC', duration: '1 Year' },
  { title: 'Certificate in Community Health', level: 'Certificate', cat: 'KNEC', duration: '1 Year' },

  // ================= ARTISAN COURSES =================
  { title: 'Artisan in Masonry', level: 'Artisan', cat: 'TVET', duration: '6-12 Months' },
  { title: 'Artisan in Plumbing', level: 'Artisan', cat: 'TVET', duration: '6-12 Months' },
  { title: 'Artisan in Hairdressing & Beauty Therapy', level: 'Artisan', cat: 'TVET', duration: '6 Months' },
  { title: 'Artisan in Welding & Fabrication', level: 'Artisan', cat: 'TVET', duration: '6-12 Months' },
  { title: 'Artisan in Carpentry & Joinery', level: 'Artisan', cat: 'TVET', duration: '6-12 Months' },

  // ================= CBET COURSES =================
  { title: 'ICT Technician (CBET Level 5)', level: 'CBET', cat: 'CDACC', duration: '1-2 Years' },
  { title: 'Electrical Technician (CBET Level 5)', level: 'CBET', cat: 'CDACC', duration: '1-2 Years' },
  { title: 'Food & Beverage Service (CBET)', level: 'CBET', cat: 'CDACC', duration: '6-12 Months' },
  { title: 'Fashion Design & Garment Making (CBET)', level: 'CBET', cat: 'CDACC', duration: '6-12 Months' },
  { title: 'Building Construction Technician (CBET)', level: 'CBET', cat: 'CDACC', duration: '1 Year' },

  // ================= PROFESSIONAL COURSES =================
  { title: 'Certified Public Accountant (CPA)', level: 'Professional', cat: 'KASNEB', duration: '2-3 Years' },
  { title: 'Certified Human Resource Professional (CHRP)', level: 'Professional', cat: 'IHRM', duration: '1-2 Years' },
  { title: 'Certified Digital Marketer', level: 'Professional', cat: 'Private', duration: '3 Months' },

  // ================= SHORT COURSES =================
  { title: 'Computer Packages', level: 'Short Course', cat: 'Short', duration: '1-3 Months' },
  { title: 'Graphic Design', level: 'Short Course', cat: 'Short', duration: '3 Months' },
  { title: 'Web Development', level: 'Short Course', cat: 'Short', duration: '3-6 Months' },
  { title: 'Cyber Security Basics', level: 'Short Course', cat: 'Short', duration: '2 Months' },
  { title: 'Digital Marketing', level: 'Short Course', cat: 'Short', duration: '3 Months' },

  // ================= DRIVING COURSES =================
  { title: 'Driving Class B (Light Vehicles)', level: 'Driving', cat: 'NTSA', duration: '1 Month' },
  { title: 'Driving Class C (Commercial Vehicles)', level: 'Driving', cat: 'NTSA', duration: '1-2 Months' },
  { title: 'Motorcycle Riding (Class A)', level: 'Driving', cat: 'NTSA', duration: '2-4 Weeks' },
];

const colorMap = {
  Diploma: { bg: 'var(--green-100)', color: 'var(--green-700)' },
  Certificate: { bg: 'var(--gold-100)', color: 'var(--gold-700)' },
  'Short Course': { bg: 'var(--brown-100)', color: 'var(--brown-700)' },
  Artisan: { bg: 'var(--blue-100)', color: 'var(--blue-700)' },
  CBET: { bg: 'var(--purple-100)', color: 'var(--purple-700)' },
  Professional: { bg: 'var(--pink-100)', color: 'var(--pink-700)' },
  Driving: { bg: 'var(--orange-100)', color: 'var(--orange-700)' },
};

const iconMap = {
  Diploma: MdOutlineSchool,
  Certificate: MdOutlineSchool,
  'Short Course': MdOutlineComputer,
  Artisan: MdOutlineConstruction,
  CBET: MdOutlineEngineering,
  Professional: MdOutlineBusinessCenter,
  Driving: MdOutlineDirectionsCar,
};

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allPrograms.filter(p => {
    const matchCat = activeCategory === 'All' || p.level === activeCategory;
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
                    {cat === 'All' ? allPrograms.length : allPrograms.filter(p => p.level === cat).length}
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

          <div className={styles.grid}>
            {filtered.map((p, i) => {
              const c = colorMap[p.level] || { bg: '#eee', color: '#333' };
              const Icon = iconMap[p.level] || MdOutlineSchool;

              return (
                <div key={i} className={styles.card}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon} style={{ background: c.bg }}>
                      <Icon size={28} style={{ color: c.color }} />
                    </div>
                    <span className={`badge`} style={{ background: c.bg, color: c.color }}>
                      {p.level}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc || 'No description available'}</p>
                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <FiClock size={13} />
                      <span><strong>Duration:</strong> {p.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiBook size={13} />
                      <span><strong>Intake:</strong> {p.intake || 'N/A'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiAward size={13} />
                      <span><strong>Fee:</strong> {p.fee || 'N/A'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiUsers size={13} />
                      <span><strong>Enrolled:</strong> {p.students || 'N/A'}</span>
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