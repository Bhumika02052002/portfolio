// Typing animation (unchanged)
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

// PDF Resume Generation (unchanged)
async function generateResumePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  doc.setFont("helvetica");
  doc.setFontSize(20);
  doc.setTextColor(0, 150, 200);
  doc.text("Bhumika Mishra", 20, 20);
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.text("Aspiring Cyber Security Analyst | SOC & Vulnerability Assessment Focus", 20, 28);
  doc.setDrawColor(0,150,200);
  doc.line(20, 32, 190, 32);
  doc.setTextColor(0,0,0);
  doc.setFontSize(10);
  doc.text("📍 Gujarat, India | ✉ mishrabhumika0202@gmail.com | 📞 +91 6355915116", 20, 40);
  doc.text("🔗 linkedin.com/in/bhumikamishra2002 | Ready to Relocate", 20, 46);
  
  doc.setFontSize(12);
  doc.setTextColor(0,100,150);
  doc.text("PROFILE SUMMARY", 20, 56);
  doc.setFontSize(10);
  doc.setTextColor(60,60,60);
  doc.text("Cybersecurity enthusiast with hands-on training in vulnerability assessment and security operations. Completed a 4-month Tata STRIVE foundation course covering Kali Linux tools, network analysis, and basic penetration testing. Solved 50+ TryHackMe rooms and actively learning through Hack The Box. Seeking entry-level role in Cyber Security, SOC, or Cyber Risk.", 20, 63, {maxWidth: 170});
  
  doc.setFontSize(12);
  doc.setTextColor(0,100,150);
  doc.text("KEY SKILLS & TOOLS", 20, 82);
  doc.autoTable({
    startY: 87,
    head: [['Area', 'Details']],
    body: [
      ['Security Operations', 'Alert triage basics, incident handling concepts'],
      ['Vulnerability Assessment', 'Nmap, OpenVAS, manual testing techniques'],
      ['Tools', 'Kali Linux, Wireshark, SQLmap, Hydra, John the Ripper'],
      ['Programming', 'Python, JavaScript, HTML/CSS, SQL'],
      ['Currently Learning', 'SIEM (Splunk), Threat Hunting']
    ],
    theme: 'striped',
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [13,202,240], textColor: [0,0,0] }
  });
  
  let finalY = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(12);
  doc.setTextColor(0,100,150);
  doc.text("EXPERIENCE & TRAINING", 20, finalY);
  doc.setFontSize(9);
  doc.setTextColor(40,40,40);
  doc.text("Frontend Intern – Wappzo Infotech (2023): Collaborated on responsive web modules, performed code reviews, and contributed minor security fixes (input validation).", 20, finalY+6);
  doc.text("Tata STRIVE Cybersecurity Foundation (4 months): Vulnerability assessment, pen testing basics, forensics, Linux/Windows commands, and Kali tools (SQLmap, Hydra, Wireshark, Nmap).", 20, finalY+12);
  
  let labsY = finalY + 22;
  doc.setFontSize(12);
  doc.setTextColor(0,100,150);
  doc.text("HANDS-ON LABS", 20, labsY);
  doc.setFontSize(9);
  doc.text("• TryHackMe: Completed 50+ rooms covering web attacks, network scanning, privilege escalation, and log analysis.", 20, labsY+6);
  doc.text("• Hack The Box: Active member, practicing real-world inspired challenges.", 20, labsY+12);
  doc.text("• Focus areas: Vulnerability scanning, SQL injection, XSS, network traffic analysis, password attacks.", 20, labsY+18);
  
  doc.save("Bhumika_Mishra_Resume.pdf");
}

// Attach resume buttons
const heroBtn = document.getElementById("resumeBtnHero");
const sectionBtn = document.getElementById("resumeBtnSection");
if (heroBtn) heroBtn.addEventListener("click", (e) => { e.preventDefault(); generateResumePDF(); });
if (sectionBtn) sectionBtn.addEventListener("click", (e) => { e.preventDefault(); generateResumePDF(); });

// Contact form submission with improved error handling
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
        // Check for Formspree "Form not found" error
        if (errorData.error && errorData.error.includes("Form not found")) {
          formStatus.innerHTML = '<span class="text-warning"><i class="fas fa-exclamation-triangle"></i> Contact form is not configured yet. Please email me directly at <strong>mishrabhumika0202@gmail.com</strong></span>';
        } else {
          formStatus.innerHTML = `<span class="text-danger"><i class="fas fa-exclamation-circle"></i> Error: ${errorData.error || 'Something went wrong. Please try again.'}</span>`;
        }
      }
    } catch (error) {
      formStatus.innerHTML = '<span class="text-danger"><i class="fas fa-exclamation-circle"></i> Network error. Please check your connection and try again.</span>';
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i> Send Message';
      // Clear success/error messages after 5 seconds (but keep the "not configured" message longer)
      setTimeout(() => {
        if (!formStatus.innerHTML.includes('configured')) {
          formStatus.innerHTML = '';
        }
      }, 5000);
    }
  });
}

// Scroll reveal (unchanged)
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

// Smooth scrolling and active nav (unchanged)
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

// Toast for external links (unchanged)
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