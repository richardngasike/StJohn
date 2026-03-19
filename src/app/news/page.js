'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiTag, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';
import styles from './news.module.css';

const categories = ['All', 'Admissions', 'Events', 'Achievements', 'Partnerships', 'Announcements'];

const allNews = [
  {
    id: 1,
    category: 'Announcements',
    tag: 'Ongoing',
    title: 'KNEC & CDACC Examinations Currently Underway at St Johns',
    excerpt: 'St Johns Training College is currently hosting the March 2026 KNEC and CDACC examinations. Students are urged to arrive early, carry their admission letters and national IDs, and maintain exam integrity throughout the period. All the best to our candidates!',
    date: 'March 19, 2026',
    readTime: '2 min',
    featured: true,
    image: '/images/exams.jpeg',
    imageAlt: 'Students sitting KNEC and CDACC examinations at St Johns',
  },
  {
    id: 2,
    category: 'Admissions',
    tag: 'Open',
    title: 'January 2026 Intake: Applications Now Being Accepted',
    excerpt: 'St Johns Training College is accepting applications for the January 2026 intake across all certificate and diploma programmes including ICT, Business Management, Community Development, and Human Resource Management. Visit our admissions office or apply online.',
    date: 'January 6, 2026',
    readTime: '3 min',
    featured: false,
    image: '/news-admissions.jpg',
    imageAlt: 'Admissions office at St Johns Training College',
  },
  {
    id: 3,
    category: 'Events',
    tag: 'Graduation',
    title: 'Class of 2025 Graduation Ceremony: A Day to Remember',
    excerpt: 'St Johns Training College proudly celebrated its Class of 2025 graduates in a colourful ceremony attended by students, families, and dignitaries from Samburu County. Over 80 students received certificates and diplomas across various programmes.',
    date: 'December 12, 2025',
    readTime: '4 min',
    featured: false,
    image: '/news-graduation.jpg',
    imageAlt: 'Graduation ceremony for St Johns Class of 2025',
  },
  {
    id: 4,
    category: 'Achievements',
    tag: 'Award',
    title: 'St Johns Recognised as Top TVET Institution in Samburu County',
    excerpt: 'St Johns Training College has been recognised by the Technical and Vocational Education and Training Authority (TVETA) for its outstanding performance in graduate outcomes, institutional governance, and quality assurance standards.',
    date: 'November 20, 2025',
    readTime: '3 min',
    featured: false,
    image: '/news-award.jpg',
    imageAlt: 'St Johns receiving TVETA recognition award',
  },
  {
    id: 5,
    category: 'Announcements',
    tag: 'Notice',
    title: 'College Library Extended Hours for Revision Season',
    excerpt: 'To support students preparing for the upcoming KNEC and CDACC examinations, the St Johns library will remain open until 9:00 PM on weekdays and 5:00 PM on Saturdays. Students are encouraged to make full use of the facility.',
    date: 'November 5, 2025',
    readTime: '1 min',
    featured: false,
    image: '/news-library.jpg',
    imageAlt: 'Students studying in the St Johns library',
  },
  {
    id: 6,
    category: 'Events',
    tag: 'Community',
    title: 'St Johns Hosts Free Digital Skills Training for Samburu Youth',
    excerpt: 'In partnership with Samburu County Government, St Johns Training College offered free Saturday digital skills sessions for out-of-school youth in Maralal. Over 120 young people participated in sessions covering computer basics, internet use, and online entrepreneurship.',
    date: 'October 18, 2025',
    readTime: '3 min',
    featured: false,
    image: '/news-community.jpg',
    imageAlt: 'Youth attending free digital skills training at St Johns',
  },
  {
    id: 7,
    category: 'Achievements',
    tag: 'Record',
    title: 'ICT Students Shine at Regional Innovation Challenge',
    excerpt: 'A team of four ICT diploma students from St Johns represented Samburu County at the 2025 Regional TVET Innovation Challenge, impressing judges with a mobile app designed to connect Samburu pastoralists with veterinary services.',
    date: 'September 30, 2025',
    readTime: '4 min',
    featured: false,
    image: '/news-innovation.jpg',
    imageAlt: 'St Johns ICT students at the Regional Innovation Challenge',
  },
  {
    id: 8,
    category: 'Partnerships',
    tag: 'MOU',
    title: 'New Partnership with Safaricom Foundation for Student Scholarships',
    excerpt: 'St Johns Training College has signed a Memorandum of Understanding with the Safaricom Foundation to provide scholarship support for bright but financially needy students in ICT and Business programmes starting September 2025.',
    date: 'August 14, 2025',
    readTime: '3 min',
    featured: false,
    image: '/news-partnership.jpg',
    imageAlt: 'St Johns and Safaricom Foundation MOU signing ceremony',
  },
  {
    id: 9,
    category: 'Admissions',
    tag: 'Scholarship',
    title: 'St Johns Foundation Scholarship Applications Open for 2025/2026',
    excerpt: 'The St Johns Foundation is calling for applications from academically talented students from disadvantaged backgrounds. Scholarships will cover tuition fees and are available across all full-time certificate and diploma programmes.',
    date: 'July 1, 2025',
    readTime: '2 min',
    featured: false,
    image: '/news-scholarship.jpg',
    imageAlt: 'St Johns scholarship announcement',
  },
];

const catColors = {
  Admissions: 'green',
  Events: 'gold',
  Achievements: 'brown',
  Partnerships: 'green',
  Announcements: 'gold',
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allNews.filter(n => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
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
              <a href="/">Home</a>
              <span className="sep">/</span>
              <span>News &amp; Events</span>
            </div>
            <h1>News &amp; Events</h1>
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
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="btn btn-primary"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className={styles.layout}>

              {/* Featured Article */}
              {featured && (
                <Link href={`/news/${featured.id}`} className={styles.featured}>
                  <div className={styles.featImg}>
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                    <div className={styles.featImgOverlay} />
                  </div>
                  <div className={styles.featContent}>
                    <div className={styles.featMeta}>
                      <span className={`badge badge-${catColors[featured.category] || 'green'}`}>
                        <FiTag size={10} /> {featured.category}
                      </span>
                      <span className={styles.featTagPill}>{featured.tag}</span>
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

              {/* News Grid */}
              <div className={styles.grid}>
                {rest.map(item => (
                  <Link key={item.id} href={`/news/${item.id}`} className={styles.card}>
                    <div className={styles.cardImg}>
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className={styles.cardImgOverlay} />
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