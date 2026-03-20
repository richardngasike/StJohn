'use client';
import { useState } from 'react';
import {
  FiHeart, FiCopy, FiCheck, FiChevronDown, FiUsers,
  FiShield, FiStar, FiGlobe, FiArrowRight, FiInfo,
  FiBookOpen, FiAward, FiTrendingUp, FiGift, FiZap,
  FiLink, FiSun, FiUserCheck,
} from 'react-icons/fi';
import {
  MdOutlineVolunteerActivism,
  MdOutlineSchool,
  MdOutlineSupportAgent,
  MdOutlinePeople,
  MdOutlineHealthAndSafety,
  MdOutlineWoman,
  MdOutlineLightbulb,
} from 'react-icons/md';
import toast from 'react-hot-toast';
import styles from './donate.module.css';

const CAUSES = [
  {
    id: 'fgm',
    Icon: MdOutlineHealthAndSafety,
    label: 'FGM Survivors',
    color: 'purple',
    title: 'Girls Rescued from FGM',
    description:
      'Many girls in our program were rescued from Female Genital Mutilation — a harmful traditional practice that robs girls of their health, dignity, and future. Your donation funds their education, trauma counselling, and safe accommodation so they can heal and thrive.',
    impact: 'KES 15,000 sponsors one girl for a full term',
    stats: '84 girls supported since 2018',
  },
  {
    id: 'early-marriage',
    Icon: MdOutlineWoman,
    label: 'Child Marriage Survivors',
    color: 'rose',
    title: 'Girls Saved from Child Marriage',
    description:
      'Hundreds of young girls in Kenya are pulled out of school and forced into marriage before age 18. We rescue and re-enroll them, providing full scholarships, mentorship, and life-skills training so they can reclaim their education and independence.',
    impact: 'KES 20,000 covers a full year of school fees',
    stats: '130+ girls re-enrolled since 2019',
  },
  {
    id: 'poverty',
    Icon: MdOutlineLightbulb,
    label: 'Needy but Brilliant',
    color: 'green',
    title: 'Students from Poor Backgrounds',
    description:
      'Talented young Kenyans are denied education simply because their families cannot afford fees. We identify high-potential students from the most vulnerable households and fully sponsor their training — turning potential into careers and breaking cycles of poverty.',
    impact: 'KES 45,000 fully sponsors one diploma student',
    stats: '210+ students sponsored to date',
  },
  {
    id: 'general',
    Icon: MdOutlineSchool,
    label: 'General Scholarship Fund',
    color: 'gold',
    title: 'General Scholarship Fund',
    description:
      'Support our overall scholarship pool, which the college allocates each term to the most deserving students across all causes — FGM survivors, child marriage survivors, orphans, and youth from extremely low-income households.',
    impact: 'Every dollar makes a direct difference',
    stats: '400+ total beneficiaries across all programs',
  },
];

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const BANK = {
  bank: 'KCB Bank',
  swift: 'KCBLKENX',
  account: '1204223807',
  beneficiary: 'St Johns Training College Foundation',
  branch: 'Nairobi Branch',
};

const FAQS = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'St Johns Training College Foundation is a registered charitable organization. Donations may qualify for tax deductions under Kenyan law. Please consult your tax advisor for guidance relevant to your country.',
  },
  {
    q: 'How is my donation used?',
    a: '100% of donations go directly to student scholarships and welfare. Administrative costs are covered separately by the college. You will receive an impact report showing exactly how your gift was used.',
  },
  {
    q: 'Can I sponsor a specific student?',
    a: 'Yes! Contact us at donations@stjohnscollege.ac.ke to arrange a named sponsorship. We will match you with a student whose story resonates with you and provide regular updates on their progress.',
  },
  {
    q: 'Can I donate in Kenyan Shillings?',
    a: 'Absolutely. M-Pesa and local bank transfers in KES are welcome. Contact us at +254 720 215 715 for M-Pesa paybill details or local bank account information.',
  },
  {
    q: 'Will I receive a receipt?',
    a: 'Yes. Email us your transfer confirmation to donations@stjohnscollege.ac.ke and we will send you an official donation receipt within 48 hours.',
  },
];

const IMPACT_ROWS = [
  { Icon: FiBookOpen,   amount: '$25',   desc: 'Buys textbooks and stationery for one student for a term' },
  { Icon: FiUserCheck,  amount: '$50',   desc: 'Covers counselling sessions for an FGM or GBV survivor' },
  { Icon: FiShield,     amount: '$100',  desc: 'Pays one month of accommodation for a rescued girl' },
  { Icon: FiAward,      amount: '$250',  desc: 'Funds one term of tuition for a child marriage survivor' },
  { Icon: FiTrendingUp, amount: '$500',  desc: 'Sponsors a full year of certificate training for a needy student' },
  { Icon: FiGift,       amount: '$1000', desc: 'Fully sponsors one diploma student — fees, books, and welfare' },
];

export default function DonatePage() {
  const [selectedCause, setSelectedCause] = useState('poverty');
  const [amount, setAmount]               = useState(100);
  const [customAmount, setCustomAmount]   = useState('');
  const [useCustom, setUseCustom]         = useState(false);
  const [copied, setCopied]               = useState('');
  const [openFaq, setOpenFaq]             = useState(null);
  const [showReceipt, setShowReceipt]     = useState(false);
  const [donorName, setDonorName]         = useState('');
  const [donorEmail, setDonorEmail]       = useState('');

  const finalAmount = useCustom ? parseFloat(customAmount) || 0 : amount;
  const cause       = CAUSES.find(c => c.id === selectedCause);

  function copyToClipboard(text, field) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      toast.success(`${field} copied!`);
      setTimeout(() => setCopied(''), 2500);
    });
  }

  function handlePreset(val) {
    setAmount(val);
    setUseCustom(false);
    setCustomAmount('');
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (!donorName || !donorEmail) { toast.error('Please enter your name and email'); return; }
    if (finalAmount < 1)           { toast.error('Please enter a valid donation amount'); return; }
    setShowReceipt(true);
    toast.success('Thank you! Your pledge has been recorded. Please complete the bank transfer.');
  }

  return (
    <>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>

            {/* Left: text */}
            <div className={styles.heroText}>
              <div className={styles.heroBreadcrumb}>
                <a href="/">Home</a><span>/</span><span>Donate</span>
              </div>

              <div className={styles.heroIconWrap}>
                <MdOutlineVolunteerActivism size={32} />
              </div>

              <h1 className={styles.heroTitle}>
                Change a Life.<br />
                <span>Fund a Future.</span>
              </h1>

              <p className={styles.heroSub}>
                Your donation directly sponsors girls rescued from FGM and child
                marriage, and brilliant students who cannot afford fees — giving them
                education, dignity, and a path out of poverty.
              </p>

              <div className={styles.heroStats}>
                {[
                  { Icon: FiUsers,                   value: '100+',  label: 'Students Supported' },
                  { Icon: MdOutlineVolunteerActivism, value: '11 yrs', label: 'Running Since 2018' },
                  { Icon: FiHeart,                   value: '100%',  label: 'Goes to Students' },
                ].map((s, i) => (
                  <div key={i} className={styles.heroStat}>
                    <s.Icon size={18} className={styles.heroStatIcon} />
                    <span className={styles.heroStatVal}>{s.value}</span>
                    <span className={styles.heroStatLbl}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div className={styles.heroImageWrap}>
              <div className={styles.heroImageFrame}>
                <img
                  src="/images/donate.png"
                  alt="Students at St Johns Training College"
                  className={styles.heroImage}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add(styles.heroImageFallback);
                  }}
                />
                <div className={styles.heroImagePlaceholder}>
                  <MdOutlinePeople size={56} />
                  <span>Add donate.png to<br />public/images/</span>
                </div>

                <div className={styles.heroBadge}>
                  <FiHeart size={16} />
                  <div>
                    <strong>400+ Lives Changed</strong>
                    <span>through your generosity</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <section className="section">
        <div className="container">
          <div className={styles.mainGrid}>

            {/* ── LEFT ── */}
            <div className={styles.left}>

              {/* Cause selector */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                  <FiHeart size={17} /> Choose a Cause
                </h2>

                <div className={styles.causes}>
                  {CAUSES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCause(c.id)}
                      className={[
                        styles.causeBtn,
                        styles[`cause_${c.color}`],
                        selectedCause === c.id ? styles.causeBtnActive : '',
                      ].join(' ')}
                    >
                      <span className={`${styles.causeIconWrap} ${styles[`causeIcon_${c.color}`]}`}>
                        <c.Icon size={18} />
                      </span>
                      <span className={styles.causeLabel}>{c.label}</span>
                      {selectedCause === c.id && <FiCheck size={14} className={styles.causeCheck} />}
                    </button>
                  ))}
                </div>

                {cause && (
                  <div className={`${styles.causeDetail} ${styles[`causeDetail_${cause.color}`]}`}>
                    <div className={styles.causeDetailHeader}>
                      <span className={`${styles.causeDetailIcon} ${styles[`causeDetailIcon_${cause.color}`]}`}>
                        <cause.Icon size={24} />
                      </span>
                      <h3>{cause.title}</h3>
                    </div>
                    <p>{cause.description}</p>
                    <div className={styles.causeDetailMeta}>
                      <span className={styles.causeImpact}><FiStar size={12} /> {cause.impact}</span>
                      <span className={styles.causeStats}><FiUsers size={12} /> {cause.stats}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}><FiGlobe size={17} /> Donation Amount (USD)</h2>
                <div className={styles.presets}>
                  {PRESET_AMOUNTS.map(p => (
                    <button
                      key={p}
                      onClick={() => handlePreset(p)}
                      className={`${styles.presetBtn} ${!useCustom && amount === p ? styles.presetBtnActive : ''}`}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
                <div className={styles.customRow}>
                  <span className={styles.customSymbol}>$</span>
                  <input
                    type="number"
                    min="1"
                    className={`${styles.customInput} ${useCustom ? styles.customInputActive : ''}`}
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setUseCustom(true); }}
                    onFocus={() => setUseCustom(true)}
                  />
                </div>
                {finalAmount > 0 && (
                  <div className={styles.amountSummary}>
                    You are donating <strong>${finalAmount.toLocaleString()}</strong> to{' '}
                    <strong>{cause?.label}</strong>
                  </div>
                )}
              </div>

              {/* Donor form / receipt */}
              {!showReceipt ? (
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}><FiInfo size={17} /> Your Details (for receipt)</h2>
                  <form onSubmit={handleConfirm} className={styles.donorForm}>
                    <div className="form-group">
                      <label className="form-label">Full Name <span className="required">*</span></label>
                      <input
                        className="form-input"
                        value={donorName}
                        onChange={e => setDonorName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address <span className="required">*</span></label>
                      <input
                        type="email"
                        className="form-input"
                        value={donorEmail}
                        onChange={e => setDonorEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <button type="submit" className={`btn btn-primary btn-lg ${styles.pledgeBtn}`}>
                      <FiHeart size={16} />
                      Pledge ${finalAmount > 0 ? finalAmount.toLocaleString() : '—'} &amp; See Bank Details
                    </button>
                  </form>
                </div>
              ) : (
                <div className={`${styles.card} ${styles.receiptCard}`}>
                  <div className={styles.receiptCheck}><FiCheck size={28} /></div>
                  <h3>Pledge Recorded — Thank You, {donorName.split(' ')[0]}!</h3>
                  <p>
                    Please complete your transfer of <strong>${finalAmount.toLocaleString()}</strong> using
                    the bank details on the right, then email your receipt to{' '}
                    <strong>donations@stjohnscollege.ac.ke</strong> and we'll send you an official
                    acknowledgement within 48 hours.
                  </p>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowReceipt(false)}>
                    Make Another Donation
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT ── */}
            <div className={styles.right}>

              {/* Bank details */}
              <div className={`${styles.card} ${styles.bankCard}`}>
                <div className={styles.bankHeader}>
                  <div className={styles.bankHeaderIcon}>
                    <FiShield size={22} />
                  </div>
                  <div>
                    <h3>Bank Transfer Details</h3>
                    <p>International wire transfer — USD or KES</p>
                  </div>
                </div>

                {[
                  { label: 'Bank Name',        value: BANK.bank,        field: 'bank' },
                  { label: 'Beneficiary Name', value: BANK.beneficiary, field: 'beneficiary' },
                  { label: 'Account Number',   value: BANK.account,     field: 'account' },
                  { label: 'SWIFT / BIC Code', value: BANK.swift,       field: 'swift' },
                  { label: 'Branch',           value: BANK.branch,      field: 'branch' },
                ].map(row => (
                  <div key={row.field} className={styles.bankRow}>
                    <div className={styles.bankRowInfo}>
                      <span className={styles.bankLabel}>{row.label}</span>
                      <span className={styles.bankValue}>{row.value}</span>
                    </div>
                    <button
                      className={`${styles.copyBtn} ${copied === row.field ? styles.copyBtnDone : ''}`}
                      onClick={() => copyToClipboard(row.value, row.field)}
                      title={`Copy ${row.label}`}
                    >
                      {copied === row.field ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    </button>
                  </div>
                ))}

                <div className={styles.bankNote}>
                  <FiShield size={13} />
                  <span>
                    Use <strong>{donorName || 'YOUR NAME'} — {cause?.label || 'Donation'}</strong> as
                    your transfer reference so we can allocate your gift correctly.
                  </span>
                </div>

                <a
                  href={`mailto:donations@stjohnscollege.ac.ke?subject=Donation Receipt — $${finalAmount || 'XX'} — ${cause?.label || 'Scholarship'}&body=Dear St Johns Foundation,%0A%0APlease find attached my transfer receipt for a donation of $${finalAmount || 'XX'} to the ${cause?.title || 'scholarship fund'}.%0A%0AName: ${donorName || ''}%0A%0AThank you.`}
                  className={`btn btn-primary ${styles.emailBtn}`}
                >
                  <FiArrowRight size={15} /> Email Us Your Receipt
                </a>
              </div>

              {/* Impact */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}><MdOutlineLightbulb size={18} /> Your Impact</h3>
                <div className={styles.impacts}>
                  {IMPACT_ROWS.map((imp, i) => (
                    <div key={i} className={styles.impactRow}>
                      <div className={styles.impactIconWrap}>
                        <imp.Icon size={15} />
                      </div>
                      <span className={styles.impactAmount}>{imp.amount}</span>
                      <span className={styles.impactDesc}>{imp.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className={`${styles.card} ${styles.contactCard}`}>
                <div className={styles.contactCardIcon}>
                  <MdOutlineSupportAgent size={24} />
                </div>
                <h3>Questions about donating?</h3>
                <p>
                  Our foundation team is happy to help with large gifts, named
                  sponsorships, or corporate giving programs.
                </p>
                <a href="mailto:stjohnstrainingcollege@gmail.com" className="btn btn-secondary btn-sm">
                 stjohnstrainingcollege@gmail.com
                </a>
                <a href="tel:+254720215715" className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>
                  +254 720 215 715
                </a>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {FAQS.map((faq, i) => (
                <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                  <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <FiChevronDown size={17} className={styles.faqChevron} />
                  </button>
                  {openFaq === i && <div className={styles.faqA}>{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}