// script.js - SPA router and interactivity (redirects to static dashboard pages)
// This version keeps landing/about/login/register rendering in #app,
// but when login/register completes it redirects to student.html or admin.html

const routes = {
  '': renderLanding,
  '#about': renderAbout,
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