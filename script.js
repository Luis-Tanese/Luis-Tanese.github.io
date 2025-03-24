const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");
const contactForm = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
                index / 7 + 0.3
            }s`;
        }
    });
});

navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");

            navLinksItems.forEach((link) => {
                link.style.animation = "";
            });
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth",
            });
        }
    });
});

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        console.log("Form submitted:", { name, email, message });

        const formGroups = document.querySelectorAll(".form-group");
        formGroups.forEach((group) => (group.style.display = "none"));

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.display = "none";

        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
        `;

        contactForm.appendChild(successMessage);

        setTimeout(() => {
            contactForm.reset();
            successMessage.remove();
            formGroups.forEach((group) => (group.style.display = "block"));
            submitBtn.style.display = "block";
        }, 5000);
    });
}

const skillItems = document.querySelectorAll(".skill-item");
const projectCards = document.querySelectorAll(".project-card");
const aboutCards = document.querySelectorAll(".card");
const sections = document.querySelectorAll("section");

let lastScrollTop = 0;
let scrollDirection = "down";

window.addEventListener("scroll", () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = st > lastScrollTop ? "down" : "up";
    lastScrollTop = st <= 0 ? 0 : st;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            entry.target.classList.remove("animate-out");
        } else {
            if (entry.target.classList.contains("animate")) {
                entry.target.classList.add("animate-out");
                entry.target.classList.remove("animate");
            }
        }
    });
}, observerOptions);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                entry.target.classList.remove("section-hidden");
            } else {
                entry.target.classList.add("section-hidden");
                entry.target.classList.remove("section-visible");
            }
        });
    },
    { threshold: 0.1 }
);

skillItems.forEach((item) => observer.observe(item));
projectCards.forEach((card) => observer.observe(card));
aboutCards.forEach((card) => observer.observe(card));

sections.forEach((section) => sectionObserver.observe(section));

const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .skill-item, .project-card, .card {
        opacity: 0;
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .skill-item.animate, .project-card.animate, .card.animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .skill-item.animate-out, .project-card.animate-out, .card.animate-out {
        animation: fadeOutDown 0.6s ease forwards;
    }
    
    section {
        transition: opacity 0.8s ease;
    }
    
    .section-hidden {
        opacity: 0.3;
    }
    
    .section-visible {
        opacity: 1;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-message i {
        font-size: 3rem;
        color: #4CAF50;
        margin-bottom: 1rem;
    }
`;

document.head.appendChild(style);

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleScreenChange(e) {
    if (e.matches) {
        hamburger.style.display = "block";
    } else {
        hamburger.style.display = "none";
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
}

document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

handleScreenChange(mediaQuery);

mediaQuery.addEventListener("change", handleScreenChange);
