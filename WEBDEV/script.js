// script.js - SPA router and interactivity (redirects to static dashboard pages)
// This version keeps landing/about/login/register rendering in #app,
// but when login/register completes it redirects to student.html or admin.html

const routes = {
  '': renderLanding,
  '#about': renderAbout,
  '#login': renderLogin,
  '#register': renderRegister,
  '#404': renderNotFound,
};

// Simple session helpers (vanilla)
function setSession(user) {
  // user = { name, email, role }
  localStorage.setItem('pup_ogos_user', JSON.stringify(user));
}
function getSession() {
  try {
    return JSON.parse(localStorage.getItem('pup_ogos_user'));
  } catch (e) {
    return null;
  }
}
function clearSession() {
  localStorage.removeItem('pup_ogos_user');
}

function renderLanding() {
  document.getElementById('app').innerHTML = `
    <section class="hero">
      <div class="container">
        <div style="display:flex;align-items:center;gap:16px;justify-content:center;margin-bottom:24px;">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F77bb8ffeb5044269a785b26ec474fa4e%2Fb60277a6da2341b19630cd41f26ef516?format=webp&width=800" alt="PUPT Logo" style="width:48px;height:48px;border-radius:50%;background:#fff;">
          <div>
            <h1 class="hero__title" style="color:#FFD700;font-size:2rem;margin:0;">PUPT-OGOS</h1>
            <p class="header__subtitle" style="color:#222;font-size:1rem;margin:0;">Guidance Office Services</p>
          </div>
        </div>
        <p class="hero__desc">Your one-stop online solution for all guidance office services at Polytechnic University of the Philippines – Taguig</p>
        <div class="hero__actions">
          <a href="#login" class="btn btn-primary">Get Started</a>
          <a href="#about" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
    <section class="features">
      <div class="container">
        <h2 class="section__title">Key Features</h2>
        <div class="features__grid">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3 class="feature-title">Secure Access</h3>
            <p class="feature-desc">Role-based access for students, staff, and counselors</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3 class="feature-title">Easy Scheduling</h3>
            <p class="feature-desc">Book and manage appointments online</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3 class="feature-title">Digital Records</h3>
            <p class="feature-desc">Centralized student guidance records</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3 class="feature-title">Support Team</h3>
            <p class="feature-desc">Dedicated guidance counselors</p>
          </div>
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <h2 class="section__title">About PUPT-OGOS</h2>
        <p class="section__desc">The PUPT-OGOS was developed to improve the efficiency and accessibility of the university's guidance services. It replaces manual paper-based processes with a centralized online system for handling student records, counseling logs, and appointment scheduling.</p>
      </div>
    </section>
    <section class="services">
      <div class="container">
        <h2 class="section__title">Our Services</h2>
        <div class="services__grid">
          <div class="service-card">
            <h3 class="service-title">For Students</h3>
            <ul class="service-list">
              <li>Submit digital Personal Data Sheets</li>
              <li>Schedule counseling sessions online</li>
              <li>View appointment confirmations</li>
              <li>Access guidance resources</li>
            </ul>
          </div>
          <div class="service-card">
            <h3 class="service-title">For Administrators</h3>
            <ul class="service-list">
              <li>Manage student records and profiles</li>
              <li>Monitor appointment schedules</li>
              <li>Generate reports and analytics</li>
              <li>Manage user accounts and access</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="cta">
      <div class="container">
        <h2 class="section__title">Ready to Get Started?</h2>
        <p class="section__desc">Create an account or log in to access PUPT-OGOS</p>
        <a href="#login" class="btn btn-primary">Login / Sign Up</a>
      </div>
    </section>
  `;
}
function renderAbout() {
  document.getElementById('app').innerHTML = `
    <section class="about">
      <div class="container">
        <h2 class="section__title">About PUPT-OGOS</h2>
        <p class="section__desc">The PUPT-OGOS was developed to improve the efficiency and accessibility of the university's guidance services. It replaces manual paper-based processes with a centralized online system for handling student records, counseling logs, and appointment scheduling.</p>
      </div>
    </section>
  `;
}
function renderLogin() {
  // If already logged in, redirect to appropriate dashboard
  const session = getSession();
  if (session && session.role === 'admin') {
    window.location.href = 'admin.html';
    return;
  } else if (session && session.role === 'student') {
    window.location.href = 'student.html';
    return;
  }

  document.getElementById('app').innerHTML = `
    <h2 class="section__title" style="color:var(--primary);text-align:center;margin-top:32px;">Login</h2>
    <div class="form-card" style="max-width:420px;margin:32px auto 0 auto;background:#fff;padding:24px 20px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
      <form class="form" id="loginForm" style="gap:16px;background:none;padding:0;box-shadow:none;">
        <label style="font-weight:600;color:#222;">Email Address</label>
        <input type="email" name="email" required>
        <label style="font-weight:600;color:#222;">Password</label>
        <input type="password" name="password" required>
        <label style="font-weight:600;color:#222;">Role</label>
        <select name="role" required style="padding:12px;border-radius:12px;border:1px solid #ddd;">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" class="btn btn-primary" style="background:var(--primary);color:#fff;font-weight:800;font-size:1.05rem;letter-spacing:0.6px;margin-top:8px;border-radius:12px;">Log In</button>
        <div style="margin-top:14px;text-align:center;font-size:0.97rem;">
          Don't have an account? <a href="#register" style="color:#0056d2;text-decoration:underline;font-weight:600;">Sign up here</a>
        </div>
      </form>
    </div>
  `;
  const form = document.getElementById('loginForm');
  form.onsubmit = function(e) {
    e.preventDefault();
    const role = form.role.value;
    const email = form.email.value.trim() || (role === 'admin' ? 'admin@example.edu' : 'student@example.edu');
    const name = role === 'admin' ? 'Admin User' : 'John Student';
    // Set a simple session (for demo). In real app, authenticate on server.
    setSession({ name, email, role });
    // Redirect to separate static dashboard pages
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'student.html';
    }
  };
}
function renderRegister() {
  document.getElementById('app').innerHTML = `
    <section class="register">
      <div class="container">
        <h2 class="section__title">Create Account</h2>
        <form class="form" id="registerForm">
          <label>Full Name</label>
          <input type="text" name="fullName" required>
          <label>Email Address</label>
          <input type="email" name="email" required>
          <label>Password</label>
          <input type="password" name="password" required>
          <label>Role</label>
          <select name="role" required style="padding:12px;border-radius:12px;border:1px solid #ddd;">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" class="btn btn-primary">Create Account</button>
        </form>
        <p>Already have an account? <a href="#login">Log in here</a></p>
      </div>
    </section>
  `;
  document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    const role = e.target.role.value;
    const name = e.target.fullName.value.trim() || (role === 'admin' ? 'Admin User' : 'John Student');
    const email = e.target.email.value.trim() || (role === 'admin' ? 'admin@example.edu' : 'student@example.edu');
    // Simulate account creation and set session
    setSession({ name, email, role });
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'student.html';
    }
  };
}
function renderNotFound() {
  document.getElementById('app').innerHTML = `
    <section class="not-found">
      <div class="container">
        <h1 class="not-found__title">404</h1>
        <p class="not-found__desc">Oops! Page not found</p>
        <a href="index.html" class="btn btn-primary">Return to Home</a>
      </div>
    </section>
  `;
}
function router() {
  const hash = location.hash || '';
  if (hash === '' || hash === '#' || hash === '#about') {
    renderLanding();
    if (hash === '#about') {
      setTimeout(() => {
        const aboutSection = document.querySelector('.about');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  } else if (hash === '#login') {
    renderLogin();
  } else if (hash === '#register') {
    renderRegister();
  } else {
    renderNotFound();
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);