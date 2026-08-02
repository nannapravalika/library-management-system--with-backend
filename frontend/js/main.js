/* ==========================================
   SMART LIBRARY MANAGEMENT SYSTEM
   main.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       MOBILE NAVIGATION
    =========================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* ===========================
       ANIMATED COUNTERS
    =========================== */

    const counters = document.querySelectorAll(".stat h2");

    counters.forEach(counter => {

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        if (isNaN(target)) return;

        let count = 0;

        const speed = target / 100;

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count) + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = text;

            }

        };

        updateCounter();

    });

    /* ===========================
       ACTIVE NAVIGATION
    =========================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

});


/* ===========================
   STICKY NAVBAR SHADOW
=========================== */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector("header");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.12)";

    }

    else {

        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";

    }

});


/* ===========================
   SCROLL TO TOP BUTTON
=========================== */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#166534";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
topBtn.style.transition = ".3s";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ===========================
   FADE IN ON SCROLL
=========================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(

    ".feature-card,.book-card,.category-card,.testimonial-card"

).forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});