// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active section in nav
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// Contact form submission
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const baseUrl = window.location.origin;
      console.log("Sending to:", baseUrl + "/send-email");
      
      const res = await fetch(`${baseUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
     });

      const data = await res.json();
      
      if (data.success) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert(`❌ ${data.error || "Failed to send message."}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Error sending message. Check console.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Scroll reveal effect
const revealElements = document.querySelectorAll("section, header");
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    
    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
