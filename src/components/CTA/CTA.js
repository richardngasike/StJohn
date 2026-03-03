import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.icon}>
            <MdOutlineSchool size={36} />
          </div>
          <h2 className={styles.title}>
            Ready to Begin Your<br />
            <em>Academic Journey?</em>
          </h2>
          <p className={styles.sub}>
            Applications for the 2024/2025 academic year are open. Join over 2,500 students
            already building their futures at St Johns Training College.
          </p>
          <div className={styles.actions}>
            <Link href="/apply" className={styles.btnPrimary}>
              Apply Online Now <FiArrowRight size={18} />
            </Link>
            <a href="tel:+254700000000" className={styles.btnSecondary}>
              <FiPhone size={16} /> Call Admissions
            </a>
          </div>
          <p className={styles.note}>
            Application deadline: <strong>August 30, 2024</strong> &nbsp;·&nbsp; 
            Intake: <strong>September 2024</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
