'use client';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiTag, FiClock } from 'react-icons/fi';
import styles from './News.module.css';

const news = [
  {
    id: 1,
    category: 'Admissions',
    tag: 'Important',
    title: '2024/2025 Academic Year Applications Now Open',
    excerpt: 'The admissions portal is now open for the new academic year. Apply for certificate, diploma, and short courses before August 30, 2024.',
    date: 'July 15, 2024',
    readTime: '3 min read',
    featured: true,
    color: 'green',
  },
  {
    id: 2,
    category: 'Events',
    tag: 'Upcoming',
    title: 'Annual Graduation Ceremony: Class of 2024',
    excerpt: 'Join us as we celebrate the achievements of our latest graduating class. The ceremony will be held at the college main auditorium.',
    date: 'July 8, 2024',
    readTime: '2 min read',
    featured: false,
    color: 'gold',
  },
  {
    id: 3,
    category: 'Partnerships',
    tag: 'New',
    title: 'St Johns Signs MOU with Leading Tech Companies',
    excerpt: 'The college has formalized partnerships with three major technology firms for internship placements and curriculum development.',
    date: 'June 28, 2024',
    readTime: '4 min read',
    featured: false,
    color: 'brown',
  },
  {
    id: 4,
    category: 'Achievements',
    tag: 'Award',
    title: 'College Ranked Best TVET Institution in Nairobi County',
    excerpt: 'St Johns Training College has been recognized by the Kenya National Qualifications Authority for outstanding academic quality.',
    date: 'June 20, 2024',
    readTime: '3 min read',
    featured: false,
    color: 'green',
  },
];

export default function News() {
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <section className={`section ${styles.news}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className="section-label">
              <FiCalendar size={12} /> News & Events
            </div>
            <h2 className="section-title">
              Latest from <span>St Johns</span>
            </h2>
          </div>
          <Link href="/news" className={`btn btn-secondary`}>
            All News <FiArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Featured */}
          <div className={styles.featured}>
            <div className={`badge badge-green ${styles.featBadge}`}>Featured</div>
            <span className={`badge badge-${featured.color === 'green' ? 'green' : 'gold'}`}>
              {featured.category}
            </span>
            <h3 className={styles.featTitle}>{featured.title}</h3>
            <p className={styles.featExcerpt}>{featured.excerpt}</p>
            <div className={styles.featMeta}>
              <span><FiCalendar size={13} /> {featured.date}</span>
              <span><FiClock size={13} /> {featured.readTime}</span>
            </div>
            <Link href={`/news/${featured.id}`} className={styles.featBtn}>
              Read Full Story <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Other news */}
          <div className={styles.list}>
            {rest.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <span className={`badge badge-${item.color === 'green' ? 'green' : item.color === 'gold' ? 'gold' : 'brown'}`}>
                    <FiTag size={10} /> {item.category}
                  </span>
                  <h4 className={styles.itemTitle}>
                    <Link href={`/news/${item.id}`}>{item.title}</Link>
                  </h4>
                  <p className={styles.itemExcerpt}>{item.excerpt}</p>
                  <div className={styles.itemMeta}>
                    <span><FiCalendar size={12} /> {item.date}</span>
                    <span><FiClock size={12} /> {item.readTime}</span>
                  </div>
                </div>
                <Link href={`/news/${item.id}`} className={styles.itemArrow}>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            ))}

            <Link href="/news" className={styles.viewAll}>
              View all news and events <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
