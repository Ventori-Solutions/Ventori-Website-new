/*
 * Ventori Data Solutions – Interactive Behaviours
 *
 * This script handles the mobile navigation toggle, dynamic year in the footer
 * and simple scroll‑reveal animations for page sections. No external
 * dependencies are used.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav ul');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => {
    revealObserver.observe(el);
  });
});
