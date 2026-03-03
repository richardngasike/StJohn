'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUser, FiLock, FiEye, FiEyeOff, FiFileText, FiCheckCircle, FiClock, FiXCircle, FiArrowRight, FiLogOut, FiBell } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import styles from './portal.module.css';

export default function PortalPage() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('login');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });

  useEffect(() => {
    try {
      const u = Cookies.get('user');
      if (u) {
        const parsed = JSON.parse(u);
        setUser(parsed);
        fetchApplications(parsed.id);
      }
    } catch {}
  }, []);

  const fetchApplications = async (userId) => {
    try {
      const token = Cookies.get('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch {
      // demo data
      setApplications([
        { id: 1, reference_number: 'SJC-001234', program: 'Diploma in Information Technology', intake: 'September 2024', status: 'under_review', created_at: '2024-07-10', study_mode: 'Full-time' },
      ]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        Cookies.set('token', data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
        setUser(data.user);
        fetchApplications(data.user.id);
        toast.success(`Welcome back, ${data.user.first_name}!`);
      } else {
        toast.error(data.message || 'Invalid email or password');
      }
    } catch {
      // Demo login
      const demoUser = { id: 1, first_name: 'Demo', last_name: 'Student', email: loginForm.email, role: 'student' };
      Cookies.set('token', 'demo-token', { expires: 7 });
      Cookies.set('user', JSON.stringify(demoUser), { expires: 7 });
      setUser(demoUser);
      fetchApplications(1);
      toast.success('Welcome to the Student Portal (Demo Mode)!');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: regForm.firstName, last_name: regForm.lastName,
          email: regForm.email, phone: regForm.phone, password: regForm.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Account created! Please log in.');
        setTab('login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch {
      toast.success('Account created! Please log in. (Demo mode)');
      setTab('login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    setApplications([]);
    toast.success('Logged out successfully');
  };

  const statusConfig = {
    pending:      { icon: FiClock,       label: 'Pending Review', color: '#92400e', bg: '#fef3c7' },
    under_review: { icon: FiClock,       label: 'Under Review',   color: '#1e40af', bg: '#dbeafe' },
    approved:     { icon: FiCheckCircle, label: 'Approved',       color: '#065f46', bg: '#d1fae5' },
    rejected:     { icon: FiXCircle,     label: 'Not Accepted',   color: '#991b1b', bg: '#fee2e2' },
  };

  if (user) {
    return (
      <div className={styles.dashboard}>
        <div className="page-header" style={{ padding: '100px 0 60px' }}>
          <div className="container">
            <div className={styles.dashHeader}>
              <div className={styles.dashUser}>
                <div className={styles.dashAvatar}>
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </div>
                <div>
                  <h1 className={styles.dashName}>Welcome, {user.first_name}!</h1>
                  <p className={styles.dashEmail}>{user.email}</p>
                </div>
              </div>
              <div className={styles.dashActions}>
                <button className={styles.notifBtn}><FiBell size={18} /></button>
                <button onClick={logout} className={styles.logoutBtn}>
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="section-sm">
          <div className="container">
            <div className={styles.dashGrid}>
              {/* Quick Actions */}
              <div className={styles.quickActions}>
                <h3 className={styles.widgetTitle}>Quick Actions</h3>
                <Link href="/apply" className={styles.qaBtn}>
                  <div className={styles.qaBtnIcon} style={{ background: 'var(--green-100)', color: 'var(--green-700)' }}>
                    <FiFileText size={20} />
                  </div>
                  <div>
                    <strong>New Application</strong>
                    <span>Apply for a program</span>
                  </div>
                  <FiArrowRight size={16} />
                </Link>
                <Link href="/portal/results" className={styles.qaBtn}>
                  <div className={styles.qaBtnIcon} style={{ background: 'var(--gold-100)', color: 'var(--gold-700)' }}>
                    <MdOutlineSchool size={20} />
                  </div>
                  <div>
                    <strong>Exam Results</strong>
                    <span>View your results</span>
                  </div>
                  <FiArrowRight size={16} />
                </Link>
                <Link href="/portal/fees" className={styles.qaBtn}>
                  <div className={styles.qaBtnIcon} style={{ background: 'var(--brown-100)', color: 'var(--brown-700)' }}>
                    <FiUser size={20} />
                  </div>
                  <div>
                    <strong>Fee Statement</strong>
                    <span>View fee balance</span>
                  </div>
                  <FiArrowRight size={16} />
                </Link>
              </div>

              {/* My Applications */}
              <div className={styles.appsWidget}>
                <h3 className={styles.widgetTitle}>My Applications</h3>
                {applications.length === 0 ? (
                  <div className={styles.emptyApps}>
                    <FiFileText size={36} />
                    <h4>No Applications Yet</h4>
                    <p>You haven't submitted any applications.</p>
                    <Link href="/apply" className="btn btn-primary btn-sm">Apply Now</Link>
                  </div>
                ) : (
                  <div className={styles.appsList}>
                    {applications.map(app => {
                      const sc = statusConfig[app.status] || statusConfig.pending;
                      const StatusIcon = sc.icon;
                      return (
                        <div key={app.id} className={styles.appCard}>
                          <div className={styles.appCardTop}>
                            <span className={styles.appRef}>{app.reference_number}</span>
                            <span className={styles.appStatus} style={{ background: sc.bg, color: sc.color }}>
                              <StatusIcon size={12} /> {sc.label}
                            </span>
                          </div>
                          <h4 className={styles.appProgram}>{app.program}</h4>
                          <div className={styles.appMeta}>
                            <span>Intake: {app.intake}</span>
                            <span>Mode: {app.study_mode}</span>
                            <span>Applied: {new Date(app.created_at).toLocaleDateString('en-KE')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className={styles.notifWidget}>
                <h3 className={styles.widgetTitle}>Notifications</h3>
                <div className={styles.notifList}>
                  <div className={styles.notifItem}>
                    <div className={styles.notifDot} style={{ background: 'var(--green-500)' }} />
                    <div>
                      <p>Your application is under review</p>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className={styles.notifItem}>
                    <div className={styles.notifDot} style={{ background: 'var(--gold-500)' }} />
                    <div>
                      <p>September 2024 intake deadline: Aug 30</p>
                      <span>5 days ago</span>
                    </div>
                  </div>
                  <div className={styles.notifItem}>
                    <div className={styles.notifDot} style={{ background: 'var(--green-400)' }} />
                    <div>
                      <p>Welcome to St Johns Student Portal!</p>
                      <span>7 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="breadcrumb">
              <a href="/">Home</a><span className="sep">/</span><span>Student Portal</span>
            </div>
            <h1>Student Portal</h1>
            <p>Access your applications, results, fee statements, and more.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.authLayout}>
            <div className={styles.authCard}>
              <div className={styles.authTabs}>
                <button className={`${styles.authTab} ${tab === 'login' ? styles.authTabActive : ''}`} onClick={() => setTab('login')}>Login</button>
                <button className={`${styles.authTab} ${tab === 'register' ? styles.authTabActive : ''}`} onClick={() => setTab('register')}>Create Account</button>
              </div>

              {tab === 'login' ? (
                <form onSubmit={handleLogin} className={styles.authForm}>
                  <div className={styles.authIcon}><MdOutlineSchool size={32} /></div>
                  <h2>Welcome Back</h2>
                  <p>Sign in to access your student portal</p>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className={styles.inputWrap}>
                      <FiMail size={16} className={styles.inputIcon} />
                      <input type="email" className="form-input" style={{ paddingLeft: 40 }} value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className={styles.inputWrap}>
                      <FiLock size={16} className={styles.inputIcon} />
                      <input type={showPwd ? 'text' : 'password'} className="form-input" style={{ paddingLeft: 40, paddingRight: 44 }} value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" required />
                      <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className={styles.forgotRow}>
                    <a href="#" className={styles.forgotLink}>Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? <><span className="loading-spinner" /> Signing in...</> : 'Sign In'}
                  </button>
                  <div className={styles.adminNote}>
                    <FiLock size={12} />
                    <span>Admin? <a href="/admin">Click here to access the admin panel</a></span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className={styles.authForm}>
                  <div className={styles.authIcon}><MdOutlineSchool size={32} /></div>
                  <h2>Create Account</h2>
                  <p>Register to track your application</p>
                  <div className={styles.formRow}>
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input className="form-input" value={regForm.firstName} onChange={e => setRegForm(f => ({ ...f, firstName: e.target.value }))} placeholder="John" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input className="form-input" value={regForm.lastName} onChange={e => setRegForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" value={regForm.phone} onChange={e => setRegForm(f => ({ ...f, phone: e.target.value }))} placeholder="+254 7XX XXX XXX" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-input" value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))} placeholder="Min. 8 characters" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-input" value={regForm.confirm} onChange={e => setRegForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat password" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? <><span className="loading-spinner" /> Creating Account...</> : 'Create Account'}
                  </button>
                </form>
              )}
            </div>

            <div className={styles.authInfo}>
              <h3>Student Portal Features</h3>
              {[
                { icon: FiFileText, title: 'Track Applications', desc: 'Monitor the status of your admission applications in real-time.' },
                { icon: MdOutlineSchool, title: 'Exam Results', desc: 'Access your semester exam results and academic transcript.' },
                { icon: FiUser, title: 'Fee Statement', desc: 'View your fee balance, payment history, and download receipts.' },
                { icon: FiBell, title: 'Notifications', desc: 'Receive instant updates about your application and college news.' },
              ].map((f, i) => (
                <div key={i} className={styles.infoFeature}>
                  <div className={styles.infoFeatureIcon}><f.icon size={18} /></div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FiMail({ size, className }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
