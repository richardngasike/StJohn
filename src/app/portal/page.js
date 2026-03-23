'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiUsers, FiFileText, FiCheckCircle, FiXCircle, FiClock,
  FiLogOut, FiEye, FiSettings, FiSearch, FiBell,
  FiBarChart2, FiMail, FiLock, FiEyeOff, FiRefreshCw,
  FiAlertCircle, FiTrendingUp, FiFilter,
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import styles from './admin.module.css';

const statusConfig = {
  pending:      { label: 'Pending',      color: '#92400e', bg: '#fef3c7', icon: FiClock },
  under_review: { label: 'Under Review', color: '#1e40af', bg: '#dbeafe', icon: FiEye },
  approved:     { label: 'Approved',     color: '#065f46', bg: '#d1fae5', icon: FiCheckCircle },
  rejected:     { label: 'Rejected',     color: '#991b1b', bg: '#fee2e2', icon: FiXCircle },
  enrolled:     { label: 'Enrolled',     color: '#3730a3', bg: '#e0e7ff', icon: FiCheckCircle },
};

export default function AdminPage() {
  const [authed,       setAuthed]       = useState(false);
  const [loginForm,    setLoginForm]    = useState({ email: '', password: '' });
  const [showPwd,      setShowPwd]      = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError,   setLoginError]   = useState('');

  const [applications, setApplications] = useState([]);
  const [stats,        setStats]        = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [updating,     setUpdating]     = useState(false);
  const [selected,     setSelected]     = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [totalPages,   setTotalPages]   = useState(1);
  const [totalCount,   setTotalCount]   = useState(0);

  // Check if already logged in
  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) setAuthed(true);
  }, []);

  // Fetch applications whenever authed / filter / page changes
  useEffect(() => {
    if (authed) {
      fetchApplications();
      fetchStats();
    }
  }, [authed, filterStatus, page]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        Cookies.set('admin_token', data.token, { expires: 1 });
        setAuthed(true);
        toast.success(`Welcome, ${data.user.first_name}!`);
      } else {
        setLoginError(data.message || 'Invalid admin credentials.');
      }
    } catch {
      setLoginError('Could not connect to the server. Please check your internet connection.');
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('admin_token');
    setAuthed(false);
    setApplications([]);
    setStats(null);
    toast.success('Logged out');
  };

  // ── Data fetching ─────────────────────────────────────────────────────────
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('admin_token')}`,
  });

  const fetchApplications = async (searchQuery = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery)            params.append('search', searchQuery);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications?${params}`,
        { headers: getHeaders() }
      );

      if (res.status === 401) { logout(); return; }
      if (!res.ok) throw new Error('Failed to fetch applications');

      const data = await res.json();
      setApplications(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotalCount(data.pagination?.total || 0);
    } catch (err) {
      toast.error('Failed to load applications: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/stats`,
        { headers: getHeaders() }
      );
      if (!res.ok) return;
      const data = await res.json();
      setStats(data.stats);
    } catch {}
  };

  // Search with debounce
  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(window._searchTimer);
    window._searchTimer = setTimeout(() => fetchApplications(val), 400);
  };

  // ── Status update ─────────────────────────────────────────────────────────
  const updateStatus = async (id, newStatus, notes = '') => {
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${id}/status`,
        {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({ status: newStatus, review_notes: notes }),
        }
      );
      if (!res.ok) throw new Error('Update failed');
      const data = await res.json();

      setApplications(prev =>
        prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
      );
      if (selected?.id === id) setSelected(s => ({ ...s, status: newStatus }));

      toast.success(`Application marked as "${statusConfig[newStatus]?.label}"`);
      fetchStats();
    } catch (err) {
      toast.error('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // ── Login Screen ──────────────────────────────────────────────────────────
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
            <p>Sign in with your admin credentials to manage applications.</p>

            {loginError && (
              <div className={styles.loginError}>
                <FiAlertCircle size={15} />
                <span>{loginError}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <div className={styles.inputWrap}>
                <FiMail size={15} className={styles.inputIcon} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: 40 }}
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="admin@stjohnscollege.ac.ke"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className={styles.inputWrap}>
                <FiLock size={15} className={styles.inputIcon} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                >
                  {showPwd ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              disabled={loginLoading}
            >
              {loginLoading
                ? <><span className="loading-spinner" /> Signing in...</>
                : 'Sign In to Dashboard'
              }
            </button>

            <Link href="/" className={styles.backLink}>
              ← Back to Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const statCards = [
    { label: 'Total',        value: stats?.total        || 0, icon: FiFileText,    color: 'blue' },
    { label: 'Pending',      value: stats?.pending      || 0, icon: FiClock,       color: 'yellow' },
    { label: 'Under Review', value: stats?.under_review || 0, icon: FiEye,         color: 'blue' },
    { label: 'Approved',     value: stats?.approved     || 0, icon: FiCheckCircle, color: 'green' },
    { label: 'Rejected',     value: stats?.rejected     || 0, icon: FiXCircle,     color: 'red' },
  ];

  return (
    <div className={styles.dashboard}>

      {/* ── Sidebar ── */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarIcon}><MdOutlineSchool size={22} /></div>
          <div>
            <span className={styles.sidebarName}>St Johns</span>
            <span className={styles.sidebarSub}>Admin Panel</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <span className={`${styles.sidebarLink} ${styles.sidebarLinkActive}`}>
            <FiBarChart2 size={17} /> Dashboard
          </span>
          <span className={styles.sidebarLink}>
            <FiFileText size={17} /> Applications
            {stats?.pending > 0 && (
              <span className={styles.navBadge}>{stats.pending}</span>
            )}
          </span>
          <span className={styles.sidebarLink}><FiUsers size={17} /> Students</span>
          <span className={styles.sidebarLink}><FiMail size={17} /> Messages</span>
          <span className={styles.sidebarLink}><FiSettings size={17} /> Settings</span>
        </nav>

        <button onClick={logout} className={styles.sidebarLogout}>
          <FiLogOut size={16} /> Logout
        </button>
      </div>

      {/* ── Main ── */}
      <div className={styles.main}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Applications Dashboard</h1>
            <p className={styles.pageSubtitle}>
              {totalCount} total application{totalCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className={styles.topBarRight}>
            <button
              className={styles.iconBtn}
              onClick={() => { fetchApplications(); fetchStats(); }}
              title="Refresh"
            >
              <FiRefreshCw size={16} />
            </button>
            <button className={styles.iconBtn}><FiBell size={17} /></button>
            <div className={styles.adminAvatar}>AD</div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {statCards.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${styles[`stat_${s.color}`]}`}>
              <div className={styles.statCardIcon}><s.icon size={20} /></div>
              <div className={styles.statCardNum}>{s.value}</div>
              <div className={styles.statCardLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>

          {/* Toolbar */}
          <div className={styles.tableToolbar}>
            <div className={styles.filterBtns}>
              {['all', 'pending', 'under_review', 'approved', 'rejected'].map(s => (
                <button
                  key={s}
                  onClick={() => { setFilterStatus(s); setPage(1); }}
                  className={`${styles.filterBtn} ${filterStatus === s ? styles.filterBtnActive : ''}`}
                >
                  {s === 'all' ? 'All' : statusConfig[s]?.label}
                  <span className={styles.filterCount}>
                    {s === 'all'
                      ? totalCount
                      : (stats?.[s === 'under_review' ? 'under_review' : s] ?? '—')
                    }
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.searchWrap}>
              <FiSearch size={15} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search by name, email, reference..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableScroll}>
            {loading ? (
              <div className={styles.tableLoading}>
                <span className="loading-spinner" style={{ width: 28, height: 28 }} />
                <span>Loading applications...</span>
              </div>
            ) : (
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
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={8} className={styles.emptyRow}>
                        <FiFileText size={32} />
                        <span>No applications found.</span>
                      </td>
                    </tr>
                  ) : (
                    applications.map(app => {
                      const sc = statusConfig[app.status] || statusConfig.pending;
                      const SI = sc.icon;
                      return (
                        <tr key={app.id} className={styles.tableRow}>
                          <td className={styles.refCell}>{app.reference_number}</td>
                          <td>
                            <div className={styles.applicantCell}>
                              <div className={styles.applicantAvatar}>
                                {app.first_name?.[0]}{app.last_name?.[0]}
                              </div>
                              <div>
                                <div className={styles.applicantName}>
                                  {app.first_name} {app.last_name}
                                </div>
                                <div className={styles.applicantEmail}>{app.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className={styles.programCell}>{app.program}</td>
                          <td>
                            <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                              {app.intake}
                            </span>
                          </td>
                          <td>
                            <strong style={{ color: 'var(--green-700)' }}>{app.kcse_grade}</strong>
                          </td>
                          <td>
                            <span
                              className={styles.statusBadge}
                              style={{ background: sc.bg, color: sc.color }}
                            >
                              <SI size={11} /> {sc.label}
                            </span>
                          </td>
                          <td className={styles.dateCell}>
                            {new Date(app.created_at).toLocaleDateString('en-KE')}
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button
                                onClick={() => setSelected(app)}
                                className={styles.actionView}
                                title="View Details"
                              >
                                <FiEye size={14} />
                              </button>
                              {app.status !== 'approved' && (
                                <button
                                  onClick={() => updateStatus(app.id, 'approved')}
                                  className={styles.actionApprove}
                                  title="Approve"
                                  disabled={updating}
                                >
                                  <FiCheckCircle size={14} />
                                </button>
                              )}
                              {app.status !== 'under_review' && (
                                <button
                                  onClick={() => updateStatus(app.id, 'under_review')}
                                  className={styles.actionReview}
                                  title="Mark Under Review"
                                  disabled={updating}
                                >
                                  <FiEye size={14} />
                                </button>
                              )}
                              {app.status !== 'rejected' && (
                                <button
                                  onClick={() => updateStatus(app.id, 'rejected')}
                                  className={styles.actionReject}
                                  title="Reject"
                                  disabled={updating}
                                >
                                  <FiXCircle size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
              <button
                className={styles.pageBtn}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}

          <div className={styles.tableFooter}>
            Showing {applications.length} of {totalCount} applications
          </div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Application Details</h3>
                <span>{selected.reference_number}</span>
              </div>
              <button onClick={() => setSelected(null)} className={styles.modalClose}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4>Personal Information</h4>
                <div className={styles.modalGrid}>
                  <div><span>Full Name</span><strong>{selected.first_name} {selected.last_name}</strong></div>
                  <div><span>Email</span><strong>{selected.email}</strong></div>
                  <div><span>Phone</span><strong>{selected.phone || '—'}</strong></div>
                  <div><span>ID Number</span><strong>{selected.id_number || '—'}</strong></div>
                  <div><span>Date of Birth</span><strong>{selected.date_of_birth ? new Date(selected.date_of_birth).toLocaleDateString('en-KE') : '—'}</strong></div>
                  <div><span>Gender</span><strong>{selected.gender || '—'}</strong></div>
                  <div><span>County</span><strong>{selected.county || '—'}</strong></div>
                  <div><span>Nationality</span><strong>{selected.nationality || 'Kenyan'}</strong></div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4>Academic Background</h4>
                <div className={styles.modalGrid}>
                  <div><span>School</span><strong>{selected.school_name || '—'}</strong></div>
                  <div><span>KCSE Year</span><strong>{selected.kcse_year || '—'}</strong></div>
                  <div><span>KCSE Grade</span><strong style={{ color: 'var(--green-700)' }}>{selected.kcse_grade || '—'}</strong></div>
                  <div><span>Other Qualification</span><strong>{selected.other_qualification || '—'}</strong></div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4>Program Details</h4>
                <div className={styles.modalGrid}>
                  <div><span>Program</span><strong>{selected.program}</strong></div>
                  <div><span>Intake</span><strong>{selected.intake}</strong></div>
                  <div><span>Study Mode</span><strong>{selected.study_mode || '—'}</strong></div>
                  <div><span>Sponsorship</span><strong>{selected.sponsorship || '—'}</strong></div>
                  <div><span>Applied On</span><strong>{new Date(selected.created_at).toLocaleDateString('en-KE')}</strong></div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4>Current Status</h4>
                <div
                  className={styles.statusDisplay}
                  style={{
                    background: statusConfig[selected.status]?.bg,
                    color: statusConfig[selected.status]?.color,
                  }}
                >
                  {statusConfig[selected.status]?.label}
                </div>
                {selected.review_notes && (
                  <div className={styles.reviewNotes}>
                    <strong>Review Notes:</strong> {selected.review_notes}
                  </div>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  onClick={() => updateStatus(selected.id, 'approved')}
                  className="btn btn-primary btn-sm"
                  disabled={selected.status === 'approved' || updating}
                >
                  <FiCheckCircle size={14} /> Approve
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'under_review')}
                  className={`btn btn-sm ${styles.btnReview}`}
                  disabled={selected.status === 'under_review' || updating}
                >
                  <FiEye size={14} /> Under Review
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'rejected')}
                  className={`btn btn-sm ${styles.btnReject}`}
                  disabled={selected.status === 'rejected' || updating}
                >
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