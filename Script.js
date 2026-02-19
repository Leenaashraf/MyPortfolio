// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Highlight active section in nav
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) link.classList.add("active");
  });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// Contact form submission
const form = document.getElementById("contact-form");
form.addEventListener("submit", async e => {
  e.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  try {
    const res = await fetch("http://localhost:3000/send-email", {  // match port here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();
    if (data.success) {
      alert("✅ Message sent!");
      form.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (err) {
    alert("❌ Error sending message. Check console.");
    console.error(err);
  }
});

// Scroll reveal effect
const revealElements = document.querySelectorAll("section, header");
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add("show");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
