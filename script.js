// Typing animation
const phrases = [
  "Vulnerability Assessment",
  "Security Operations (SOC)",
  "Threat Analysis",
  "Exploring SIEM",
  "Hands-on Labs"
];
let idx = 0, charIdx = 0, currentText = "", isDeleting = false;
const typedSpan = document.getElementById("dynamic-text");

function typeEffect() {
  if (!typedSpan) return;
  const fullText = phrases[idx];
  if (isDeleting) {
    currentText = fullText.substring(0, charIdx--);
  } else {
    currentText = fullText.substring(0, charIdx++);
  }
  typedSpan.innerText = currentText;
  if (!isDeleting && charIdx === fullText.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false;
    idx = (idx + 1) % phrases.length;
    setTimeout(typeEffect, 300);
    return;
  }
  let speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
}
typeEffect();

// Contact form submission (Formspree)
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendMessageBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const url = contactForm.action;
    
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Sending...';
    formStatus.innerHTML = '';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        formStatus.innerHTML = '<span class="text-success"><i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.</span>';
        contactForm.reset();
      } else {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes("Form not found")) {
          formStatus.innerHTML = '<span class="text-warning"><i class="fas fa-exclamation-triangle"></i> Contact form is not configured yet. Please email me directly at <strong>mishrabhumi43@gmail.com</strong></span>';
        } else {
          formStatus.innerHTML = `<span class="text-danger"><i class="fas fa-exclamation-circle"></i> Error: ${errorData.error || 'Something went wrong. Please try again.'}</span>`;
        }
      }
    } catch (error) {
      formStatus.innerHTML = '<span class="text-danger"><i class="fas fa-exclamation-circle"></i> Network error. Please check your connection and try again.</span>';
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i> Send Message';
      setTimeout(() => {
        if (!formStatus.innerHTML.includes('configured')) {
          formStatus.innerHTML = '';
        }
      }, 5000);
    }
  });
}

// Scroll reveal
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeElements.forEach(el => observer.observe(el));

// Smooth scrolling and active nav
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Toast for external links
const toastElement = document.getElementById('externalLinkToast');
let toast = null;
if (toastElement) {
  toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 2000 });
}

document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('target') === '_blank') {
      if (toast) toast.show();
    }
  });
});
