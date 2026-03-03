'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiUsers, FiFileText, FiCheckCircle, FiXCircle, FiClock,
  FiLogOut, FiEye, FiSettings, FiSearch, FiBell,
  FiTrendingUp, FiBarChart2, FiMail, FiLock, FiEyeOff
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import styles from './admin.module.css';

const ADMIN_EMAIL    = 'admin@stjohnscollege.ac.ke';
const ADMIN_PASSWORD = 'Admin@2026';

const demoApplications = [
  { id: 1, reference_number: 'SJC-001001', first_name: 'Grace', last_name: 'Wanjiku', email: 'grace@email.com', phone: '+254 712 000 001', program: 'Diploma in Information Technology', intake: 'September 2026', study_mode: 'Full-time', kcse_grade: 'B+', status: 'pending', created_at: '2026-07-01' },
  { id: 2, reference_number: 'SJC-001002', first_name: 'Daniel', last_name: 'Omondi',  email: 'daniel@email.com', phone: '+254 712 000 002', program: 'Diploma in Business Administration', intake: 'September 2026', study_mode: 'Part-time', kcse_grade: 'B', status: 'under_review', created_at: '2026-07-03' },
  { id: 3, reference_number: 'SJC-001003', first_name: 'Fatuma', last_name: 'Hassan',  email: 'fatuma@email.com', phone: '+254 712 000 003', program: 'Certificate in Community Health', intake: 'September 2026', study_mode: 'Full-time', kcse_grade: 'C+', status: 'approved', created_at: '2026-07-05' },
  { id: 4, reference_number: 'SJC-001004', first_name: 'Peter', last_name: 'Kimani',   email: 'peter@email.com', phone: '+254 712 000 004', program: 'Diploma in Electrical Engineering', intake: 'September 2026', study_mode: 'Full-time', kcse_grade: 'B-', status: 'rejected', created_at: '2026-07-06' },
  { id: 5, reference_number: 'SJC-001005', first_name: 'Amina', last_name: 'Mwangi',   email: 'amina@email.com', phone: '+254 712 000 005', program: 'Certificate in Accounting & Finance', intake: 'January 2025', study_mode: 'Evening', kcse_grade: 'C+', status: 'pending', created_at: '2026-07-08' },
  { id: 6, reference_number: 'SJC-001006', first_name: 'James', last_name: 'Otieno',   email: 'james@email.com', phone: '+254 712 000 006', program: 'Certificate in Early Childhood Education', intake: 'September 2026', study_mode: 'Full-time', kcse_grade: 'C', status: 'under_review', created_at: '2026-07-09' },
  { id: 7, reference_number: 'SJC-001007', first_name: 'Lucy', last_name: 'Njoroge',   email: 'lucy@email.com', phone: '+254 712 000 007', program: 'Diploma in Information Technology', intake: 'January 2025', study_mode: 'Full-time', kcse_grade: 'A-', status: 'approved', created_at: '2026-07-10' },
  { id: 8, reference_number: 'SJC-001008', first_name: 'Kevin', last_name: 'Mutua',    email: 'kevin@email.com', phone: '+254 712 000 008', program: 'Short Course: Digital Marketing', intake: 'September 2026', study_mode: 'Weekend', kcse_grade: 'C-', status: 'pending', created_at: '2026-07-11' },
];

const statusConfig = {
  pending:      { label: 'Pending',      color: '#92400e', bg: '#fef3c7', icon: FiClock },
  under_review: { label: 'Under Review', color: '#1e40af', bg: '#dbeafe', icon: FiEye },
  approved:     { label: 'Approved',     color: '#065f46', bg: '#d1fae5', icon: FiCheckCircle },
  rejected:     { label: 'Rejected',     color: '#991b1b', bg: '#fee2e2', icon: FiXCircle },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState(demoApplications);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const a = Cookies.get('admin_authed');
    if (a === 'true') setAuthed(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      if (res.ok) {
        const data = await res.json();
        Cookies.set('admin_token', data.token, { expires: 1 });
        Cookies.set('admin_authed', 'true', { expires: 1 });
        setAuthed(true);
        toast.success('Welcome to Admin Dashboard!');
      } else {
        throw new Error('API login failed');
      }
    } catch {
      // Demo admin login
      if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
        Cookies.set('admin_authed', 'true', { expires: 1 });
        setAuthed(true);
        toast.success('Welcome, Administrator!');
      } else {
        toast.error('Invalid admin credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('admin_authed');
    Cookies.remove('admin_token');
    setAuthed(false);
    toast.success('Logged out');
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(true);
    try {
      const token = Cookies.get('admin_token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {}
    setApplications(apps => apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selected?.id === id) setSelected(s => ({ ...s, status: newStatus }));
    toast.success(`Application ${newStatus.replace('_', ' ')} successfully`);
    setUpdating(false);
  };

  const filtered = applications.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchSearch = `${a.first_name} ${a.last_name} ${a.email} ${a.reference_number} ${a.program}`
      .toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  if (!authed) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginBrand}>
            <div className={styles.loginIcon}><MdOutlineSchool size={32} /></div>
            <h1>Admin Portal</h1>
            <p>St Johns Training College</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <h2>Administrator Login</h2>
            <p>Enter your admin credentials to access the dashboard.</p>

            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <div className={styles.inputWrap}>
                <FiMail size={15} className={styles.inputIcon} />
                <input type="email" className="form-input" style={{ paddingLeft: 40 }}
                  value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="admin@stjohnscollege.ac.ke" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className={styles.inputWrap}>
                <FiLock size={15} className={styles.inputIcon} />
                <input type={showPwd ? 'text' : 'password'} className="form-input" style={{ paddingLeft: 40, paddingRight: 44 }}
                  value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••" required />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            <div className={styles.loginHint}>
              <FiLock size={11} />
              <span>Demo: <strong>admin@stjohnscollege.ac.ke</strong> / <strong>Admin@2026</strong></span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? <><span className="loading-spinner" /> Signing in...</> : 'Sign In to Dashboard'}
            </button>

            <Link href="/" className={styles.backLink}>Back to Website</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarIcon}><MdOutlineSchool size={22} /></div>
          <div>
            <span className={styles.sidebarName}>St Johns</span>
            <span className={styles.sidebarSub}>Admin Panel</span>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <a className={`${styles.sidebarLink} ${styles.sidebarLinkActive}`}>
            <FiBarChart2 size={17} /> Dashboard
          </a>
          <a className={styles.sidebarLink}>
            <FiFileText size={17} /> Applications
            <span className={styles.navBadge}>{stats.pending}</span>
          </a>
          <a className={styles.sidebarLink}><FiUsers size={17} /> Students</a>
          <a className={styles.sidebarLink}><FiMail size={17} /> Messages</a>
          <a className={styles.sidebarLink}><FiSettings size={17} /> Settings</a>
        </nav>
        <button onClick={logout} className={styles.sidebarLogout}>
          <FiLogOut size={16} /> Logout
        </button>
      </div>

      {/* Main */}
      <div className={styles.main}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <h1 className={styles.pageTitle}>Applications Dashboard</h1>
            <p className={styles.pageSubtitle}>Manage and review student applications</p>
          </div>
          <div className={styles.topBarRight}>
            <button className={styles.iconBtn}><FiBell size={18} /></button>
            <div className={styles.adminAvatar}>AD</div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total Applications', value: stats.total,        icon: FiFileText,    color: 'blue' },
            { label: 'Pending Review',     value: stats.pending,      icon: FiClock,       color: 'yellow' },
            { label: 'Under Review',       value: stats.under_review, icon: FiEye,         color: 'blue' },
            { label: 'Approved',           value: stats.approved,     icon: FiCheckCircle, color: 'green' },
            { label: 'Not Accepted',       value: stats.rejected,     icon: FiXCircle,     color: 'red' },
          ].map((s, i) => (
            <div key={i} className={`${styles.statCard} ${styles[`stat_${s.color}`]}`}>
              <div className={styles.statCardIcon}><s.icon size={20} /></div>
              <div className={styles.statCardNum}>{s.value}</div>
              <div className={styles.statCardLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table Area */}
        <div className={styles.tableWrap}>
          <div className={styles.tableToolbar}>
            <div className={styles.filterBtns}>
              {['all', 'pending', 'under_review', 'approved', 'rejected'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`${styles.filterBtn} ${filterStatus === s ? styles.filterBtnActive : ''}`}>
                  {s === 'all' ? 'All' : statusConfig[s]?.label}
                  <span className={styles.filterCount}>
                    {s === 'all' ? applications.length : applications.filter(a => a.status === s).length}
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.searchWrap}>
              <FiSearch size={15} className={styles.searchIcon} />
              <input className={styles.searchInput} placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Applicant</th>
                  <th>Program</th>
                  <th>Intake</th>
                  <th>KCSE</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => {
                  const sc = statusConfig[app.status];
                  const SI = sc.icon;
                  return (
                    <tr key={app.id} className={styles.tableRow}>
                      <td className={styles.refCell}>{app.reference_number}</td>
                      <td>
                        <div className={styles.applicantCell}>
                          <div className={styles.applicantAvatar}>
                            {app.first_name[0]}{app.last_name[0]}
                          </div>
                          <div>
                            <div className={styles.applicantName}>{app.first_name} {app.last_name}</div>
                            <div className={styles.applicantEmail}>{app.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.programCell}>{app.program}</td>
                      <td><span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{app.intake}</span></td>
                      <td><strong style={{ color: 'var(--green-700)' }}>{app.kcse_grade}</strong></td>
                      <td>
                        <span className={styles.statusBadge} style={{ background: sc.bg, color: sc.color }}>
                          <SI size={11} /> {sc.label}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{new Date(app.created_at).toLocaleDateString('en-KE')}</td>
                      <td>
                        <div className={styles.actionBtns}>
                          <button onClick={() => setSelected(app)} className={styles.actionView} title="View Details">
                            <FiEye size={14} />
                          </button>
                          {app.status !== 'approved' && (
                            <button onClick={() => updateStatus(app.id, 'approved')} className={styles.actionApprove} title="Approve" disabled={updating}>
                              <FiCheckCircle size={14} />
                            </button>
                          )}
                          {app.status !== 'under_review' && (
                            <button onClick={() => updateStatus(app.id, 'under_review')} className={styles.actionReview} title="Mark Under Review" disabled={updating}>
                              <FiEye size={14} />
                            </button>
                          )}
                          {app.status !== 'rejected' && (
                            <button onClick={() => updateStatus(app.id, 'rejected')} className={styles.actionReject} title="Reject" disabled={updating}>
                              <FiXCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className={styles.emptyRow}>No applications match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFooter}>
            Showing {filtered.length} of {applications.length} applications
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Application Details</h3>
                <span>{selected.reference_number}</span>
              </div>
              <button onClick={() => setSelected(null)} className={styles.modalClose}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4>Personal Information</h4>
                <div className={styles.modalGrid}>
                  <div><span>Full Name</span><strong>{selected.first_name} {selected.last_name}</strong></div>
                  <div><span>Email</span><strong>{selected.email}</strong></div>
                  <div><span>Phone</span><strong>{selected.phone}</strong></div>
                  <div><span>KCSE Grade</span><strong>{selected.kcse_grade}</strong></div>
                </div>
              </div>
              <div className={styles.modalSection}>
                <h4>Application Details</h4>
                <div className={styles.modalGrid}>
                  <div><span>Program</span><strong>{selected.program}</strong></div>
                  <div><span>Intake</span><strong>{selected.intake}</strong></div>
                  <div><span>Study Mode</span><strong>{selected.study_mode}</strong></div>
                  <div><span>Applied</span><strong>{new Date(selected.created_at).toLocaleDateString('en-KE')}</strong></div>
                </div>
              </div>
              <div className={styles.modalSection}>
                <h4>Current Status</h4>
                <div className={styles.statusDisplay} style={{ background: statusConfig[selected.status].bg, color: statusConfig[selected.status].color }}>
                  {statusConfig[selected.status].label}
                </div>
              </div>
              <div className={styles.modalActions}>
                <button onClick={() => updateStatus(selected.id, 'approved')} className="btn btn-primary btn-sm" disabled={selected.status === 'approved' || updating}>
                  <FiCheckCircle size={14} /> Approve
                </button>
                <button onClick={() => updateStatus(selected.id, 'under_review')} className={`btn btn-sm ${styles.btnReview}`} disabled={selected.status === 'under_review' || updating}>
                  <FiEye size={14} /> Mark Under Review
                </button>
                <button onClick={() => updateStatus(selected.id, 'rejected')} className={`btn btn-sm ${styles.btnReject}`} disabled={selected.status === 'rejected' || updating}>
                  <FiXCircle size={14} /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
