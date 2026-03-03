import { FiCheck, FiAward, FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './about.module.css';

export const metadata = { title: 'About Us' };

const leadership = [
  { name: 'Dr Leornanrd Mambo', role: 'Principal', desc: 'PhD in Education Management, 20+ years in academia' },
  { name: 'Prof. Lempapa', role: 'Deputy Principal Academics', desc: 'PhD Education Policy, Former KNEC examiner' },
  { name: 'Mr. Lesilele', role: 'Registrar', desc: 'MBA, 15+ years in institutional management' },
  { name: 'Dr. Sarah', role: 'Dean of Students', desc: 'PhD Counseling Psychology, Student welfare expert' },
];

const values = [
  { icon: FiAward, title: 'Excellence', desc: 'We pursue the highest standards in education, teaching, and institutional management.' },
  { icon: FiTarget, title: 'Integrity', desc: 'Honesty, transparency, and ethical conduct guide all our decisions and interactions.' },
  { icon: FiHeart, title: 'Compassion', desc: 'We care deeply about student welfare and the wellbeing of our entire college community.' },
  { icon: FiEye, title: 'Innovation', desc: 'We embrace new ideas, technologies, and methods to continuously improve our offerings.' },
];

const milestones = [
  { year: '2010', event: 'College founded with 3 programs and 45 students' },
  { year: '2012', event: 'Received full KNEC accreditation for diploma programs' },
  { year: '2013', event: 'Expanded to new campus with modern laboratories' },
  { year: '2013', event: 'Launched computer science and IT programs' },
  { year: '2018', event: 'Achieved ISO 9001:2015 Quality Management certification' },
  { year: '2021', event: 'Launched online student portal and digital learning platform' },
  { year: '2024', event: '30 years of excellence — 15,000+ graduates across East Africa' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span><span>About Us</span>
            </div>
            <h1>About St Johns Training College</h1>
            <p>Three decades of shaping Kenya's future professionals with quality education and values.</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className={styles.mvGrid} id="mission">
            <div className={styles.mvCard} style={{ background: 'linear-gradient(135deg, var(--green-900), var(--green-700))' }}>
              <div className={styles.mvIcon}><FiTarget size={28} /></div>
              <h3>Our Mission</h3>
              <p>To provide quality, accessible, and relevant technical and vocational education that empowers students with skills, knowledge, and values for successful careers and responsible citizenship in Kenya and beyond.</p>
            </div>
            <div className={styles.mvCard} style={{ background: 'linear-gradient(135deg, var(--brown-800), var(--brown-700))' }}>
              <div className={styles.mvIcon}><FiEye size={28} /></div>
              <h3>Our Vision</h3>
              <p>To be the leading technical and vocational training institution in East Africa, recognized for excellence, innovation, and the transformative impact of our graduates on society and the economy.</p>
            </div>
            <div className={styles.mvCard} style={{ background: 'linear-gradient(135deg, var(--gold-700), var(--gold-500))' }}>
              <div className={styles.mvIcon}><FiHeart size={28} /></div>
              <h3>Our Philosophy</h3>
              <p>Education is not merely about transferring knowledge but transforming lives. We believe every student deserves a nurturing environment that cultivates their full potential — academically, professionally, and personally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className={`section ${styles.historySection}`} id="history">
        <div className="container">
          <div className={styles.historyGrid}>
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">10 Years of <span>Transforming Lives</span></h2>
              <p className={styles.historyLead}>
                St Johns Training College was established in 2010 with a vision to provide accessible quality education in Samburu. Starting with just three programs and 45 students, we have grown into a premier institution serving over 2,500 students annually.
              </p>
              <p className={styles.historyBody}>
                Over three decades, we have continuously evolved our programs, expanded our facilities, and deepened our industry partnerships. Our commitment to quality has earned us full accreditation from KNEC, NITA, and TVETA, as well as ISO 9001:2015 certification for quality management.
              </p>
              <p className={styles.historyBody}>
                Today, our alumni network spans East Africa, with graduates serving in government, corporate organizations, NGOs, and as successful entrepreneurs. We are proud of every student who has passed through our doors and gone on to make a positive impact in their communities.
              </p>
            </div>
            <div className={styles.timeline} id="history">
              {milestones.map((m, i) => (
                <div key={i} className={styles.milestone}>
                  <div className={styles.milestoneYear}>{m.year}</div>
                  <div className={styles.milestoneLine} />
                  <div className={styles.milestoneEvent}>{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Core Values</div>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 52 }}>
            What We <span>Stand For</span>
          </h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}><v.icon size={24} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" id="leadership">
        <div className="container">
          <div className="section-label">Leadership</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Our <span>Leadership Team</span>
          </h2>
          <div className={styles.leaderGrid}>
            {leadership.map((l, i) => (
              <div key={i} className={styles.leaderCard}>
                <div className={styles.leaderAvatar}>
                  <MdOutlineSchool size={32} />
                </div>
                <h4>{l.name}</h4>
                <p className={styles.leaderRole}>{l.role}</p>
                <p className={styles.leaderDesc}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className={`section ${styles.accSection}`} id="accreditation">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', color: 'white', marginBottom: 48 }}>
            Our <em style={{ color: 'var(--gold-300)', fontStyle: 'italic' }}>Accreditations</em>
          </h2>
          <div className={styles.accGrid}>
            {['KNEC', 'NITA', 'TVETA', 'ISO 9001:2015', 'KASNEB', 'Ministry of Education'].map((a, i) => (
              <div key={i} className={styles.accCard}>
                <MdOutlineSchool size={28} />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
