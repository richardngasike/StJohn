import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from 'react-icons/fi';

const newsData = {
  1: { category: 'Admissions', title: '2024/2025 Academic Year Applications Now Open', date: 'July 15, 2024', readTime: '3 min', content: `St Johns Training College is pleased to announce that applications for the 2024/2025 academic year are now open. Prospective students can apply for our wide range of certificate, diploma, and short courses through our online application portal.\n\nThis year's intake includes new programs in Digital Marketing and Data Science, responding to the growing demand for digital skills in Kenya's economy.\n\nKey dates to remember:\n- Application Period: July 1 – August 30, 2024\n- Intake Date: September 2, 2024\n- Orientation Week: September 2–6, 2024\n\nApplicants are encouraged to apply early as spaces are limited. Our admissions team is available Monday to Friday, 8am to 5pm to assist with queries.` },
  2: { category: 'Events', title: 'Annual Graduation Ceremony: Class of 2024', date: 'July 8, 2024', readTime: '2 min', content: `St Johns Training College will hold its Annual Graduation Ceremony for the Class of 2024 on August 10, 2024 at 10:00am at the College Main Auditorium.\n\nThis year's graduating class comprises over 600 students from all programs including IT, Business Administration, Community Health, Electrical Engineering, and Early Childhood Education.\n\nThe ceremony will be presided over by the Principal, Dr. James Mwangi, with special guests from the Ministry of Education, industry partners, and the college Board of Governors.\n\nGuests are required to present their invitation letters at the gate. The ceremony will be livestreamed on our official YouTube channel.` },
};

export async function generateStaticParams() {
  return Object.keys(newsData).map(id => ({ id }));
}

export function generateMetadata({ params }) {
  const item = newsData[params.id];
  return { title: item?.title || 'News Article' };
}

export default function NewsDetailPage({ params }) {
  const item = newsData[params.id];

  if (!item) {
    return (
      <div style={{ padding: '160px 0 80px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Article Not Found</h1>
          <Link href="/news" className="btn btn-primary">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span>
              <a href="/news">News</a><span className="sep">/</span>
              <span>Article</span>
            </div>
            <h1 style={{ maxWidth: 720, margin: '0 auto' }}>{item.title}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
              <Link href="/news" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green-700)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                <FiArrowLeft size={16} /> Back to News
              </Link>
              <span className="badge badge-green"><FiTag size={10} /> {item.category}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}><FiCalendar size={13} /> {item.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}><FiClock size={13} /> {item.readTime} read</span>
            </div>

            <div style={{ background: 'white', borderRadius: 20, padding: '40px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', lineHeight: 1.85, color: 'var(--text-medium)', fontSize: '1.02rem' }}>
              {item.content.split('\n').map((para, i) => (
                <p key={i} style={{ marginBottom: para === '' ? 8 : 18 }}>{para}</p>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, gap: 16, flexWrap: 'wrap' }}>
              <Link href="/news" className="btn btn-secondary"><FiArrowLeft size={15} /> All News</Link>
              <button className="btn btn-primary"><FiShare2 size={15} /> Share Article</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
