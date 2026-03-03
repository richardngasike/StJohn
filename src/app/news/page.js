'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiCalendar, FiTag, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';
import styles from './news.module.css';

const categories = ['All', 'Admissions', 'Events', 'Achievements', 'Partnerships', 'Announcements'];

const allNews = [
  { id: 1, category: 'Admissions',    tag: 'Important', title: '2024/2025 Academic Year Applications Now Open',                    excerpt: 'The admissions portal is now open for the new academic year. Apply for certificate, diploma, and short courses before August 30, 2024. Our admissions team is available to guide you through the process.', date: 'July 15, 2024', readTime: '3 min', featured: true },
  { id: 2, category: 'Events',        tag: 'Upcoming',  title: 'Annual Graduation Ceremony: Class of 2024',                        excerpt: 'Join us as we celebrate the achievements of our latest graduating class. The ceremony will be held at the college main auditorium on August 10, 2024 at 10:00am.', date: 'July 8, 2024',  readTime: '2 min', featured: false },
  { id: 3, category: 'Partnerships',  tag: 'New',       title: 'St Johns Signs MOU with Three Leading Tech Companies',              excerpt: 'The college has formalized partnerships with Safaricom, Andela, and Cellulant for internship placements, curriculum development, and graduate employment pathways.', date: 'June 28, 2024', readTime: '4 min', featured: false },
  { id: 4, category: 'Achievements',  tag: 'Award',     title: 'St Johns Ranked Best TVET Institution in Nairobi County',           excerpt: 'St Johns Training College has been recognized by KNQA for outstanding academic quality, graduate employment rates, and institutional governance.', date: 'June 20, 2024', readTime: '3 min', featured: false },
  { id: 5, category: 'Announcements', tag: 'Notice',    title: 'Library Extended Hours During Examination Period',                   excerpt: 'The college library will extend its operating hours to 10pm on weekdays and 6pm on weekends during the upcoming examination period starting July 22, 2024.', date: 'June 18, 2024', readTime: '1 min', featured: false },
  { id: 6, category: 'Events',        tag: 'Past',      title: 'Career Fair 2024 Draws 500+ Students and 40 Employers',             excerpt: 'Our annual career fair was a massive success with 40 employers, 500+ students, and over 120 on-the-spot job offers and internship placements across all programs.', date: 'June 10, 2024', readTime: '5 min', featured: false },
  { id: 7, category: 'Admissions',    tag: 'Scholarship','title': 'New Scholarship Fund for Needy but Brilliant Students Launched',  excerpt: 'The St Johns Foundation has launched a new scholarship fund to support academically talented students from disadvantaged backgrounds. Applications open July 1.', date: 'May 30, 2024',  readTime: '3 min', featured: false },
  { id: 8, category: 'Achievements',  tag: 'Record',    title: 'IT Department Students Win National Hackathon Competition',          excerpt: 'A team of four IT students from St Johns won the 2024 National Student Hackathon, developing an innovative mobile health application for rural communities.', date: 'May 22, 2024',  readTime: '4 min', featured: false },
  { id: 9, category: 'Partnerships',  tag: 'Community', title: 'College Launches Free Weekend Skills Training for Youth in Nairobi', excerpt: 'In partnership with Nairobi County Government, St Johns will offer free weekend training in digital skills, entrepreneurship, and vocational trades every Saturday.', date: 'May 15, 2024',  readTime: '3 min', featured: false },
];

const catColors = {
  Admissions: 'green', Events: 'gold', Achievements: 'brown',
  Partnerships: 'green', Announcements: 'gold',
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allNews.filter(n => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                        n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== featured);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span><span>News & Events</span>
            </div>
            <h1>News & Events</h1>
            <p>Stay informed with the latest news, events, and announcements from St Johns Training College.</p>
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
                </button>
              ))}
            </div>
            <div className={styles.searchBar}>
              <FiSearch size={15} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <FiSearch size={40} />
              <h3>No results found</h3>
              <p>Try a different search term or category.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn btn-primary">Clear</button>
            </div>
          ) : (
            <div className={styles.layout}>
              {/* Featured */}
              {featured && (
                <Link href={`/news/${featured.id}`} className={styles.featured}>
                  <div className={styles.featImg}>
                    <div className={styles.featImgPlaceholder}>
                      <FiCalendar size={40} />
                      <span>{featured.date}</span>
                    </div>
                  </div>
                  <div className={styles.featContent}>
                    <div className={styles.featMeta}>
                      <span className={`badge badge-${catColors[featured.category] || 'green'}`}>
                        <FiTag size={10} /> {featured.category}
                      </span>
                      <span className={styles.metaDate}><FiCalendar size={12} /> {featured.date}</span>
                      <span className={styles.metaRead}><FiClock size={12} /> {featured.readTime} read</span>
                    </div>
                    <h2 className={styles.featTitle}>{featured.title}</h2>
                    <p className={styles.featExcerpt}>{featured.excerpt}</p>
                    <span className={styles.featReadMore}>
                      Read Full Story <FiArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className={styles.grid}>
                {rest.map(item => (
                  <Link key={item.id} href={`/news/${item.id}`} className={styles.card}>
                    <div className={styles.cardImg}>
                      <div className={styles.cardImgPlaceholder}>
                        <FiCalendar size={28} />
                      </div>
                      <span className={`badge badge-${catColors[item.category] || 'green'} ${styles.cardBadge}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardExcerpt}>{item.excerpt}</p>
                      <div className={styles.cardMeta}>
                        <span><FiCalendar size={12} /> {item.date}</span>
                        <span><FiClock size={12} /> {item.readTime} read</span>
                      </div>
                      <span className={styles.cardReadMore}>
                        Read More <FiArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
