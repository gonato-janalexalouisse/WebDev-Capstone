// script.js - SPA router and interactivity (redirects to static dashboard pages)
// This version keeps landing/about/login/register rendering in #app,
// but when login/register completes it redirects to student.html or admin.html

const routes = {
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

  const form = document.getElementById('loginForm');

  form.onsubmit = function(e) {
    e.preventDefault();
    const role = form.role.value;
    const email = form.email.value.trim() || (role === 'admin' ? 'admin@example.edu' : 'student@example.edu');
    const name = role === 'admin' ? 'Admin User' : 'John Student';
    
    setSession({ name, email, role });
    
    if (role === 'admin') {
      window.location.href = 'admin.html';
      return;
    }

    window.location.href = 'student.html';
  };
}

function renderRegister() {
  const form = document.getElementById('registerForm');
  if (!form) return; 

  form.onsubmit = function(e) {
    e.preventDefault();
    const role = form.role.value;
    const name = form.fullName.value.trim() || (role === 'admin' ? 'Admin User' : 'John Student');
    const email = form.email.value.trim() || (role === 'admin' ? 'admin@example.edu' : 'student@example.edu');

    // Save fake session
    setSession({ name, email, role });
    window.location.href = role === 'admin' ? 'admin.html' : 'student.html';
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
  } else {
    renderNotFound();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  renderLogin();
  renderRegister();
});