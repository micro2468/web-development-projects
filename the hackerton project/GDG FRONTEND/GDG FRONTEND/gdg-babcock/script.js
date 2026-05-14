document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
   
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
           
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
           
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
   
    let currentIndex = 0;
   
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
   
    const dots = document.querySelectorAll('.slider-dot');
   
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
       
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
   
    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonial();
    }
   
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }
   
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
   
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
   
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
   
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
   
    slider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

    // Load Events Dynamically
    const eventsGrid = document.querySelector('.events-grid');
   
    const eventsData = [
        {
            title: "Flutter Workshop",
            date: "June 15, 2024",
            description: "Learn how to build cross-platform apps with Flutter in this hands-on workshop.",
            image: "flutter.jpg",
            tags: ["Mobile", "Workshop"],
            type: "offline"
        },
        {
            title: "Google I/O Extended",
            date: "July 22, 2024",
            description: "Join us for the local edition of Google's annual developer conference.",
            image: "O-extend.jpg",
            tags: ["Conference", "Keynote"],
            type: "hybrid"
        },
        {
            title: "Cloud Study Jam",
            date: "August 10, 2024",
            description: "Hands-on learning event focused on Google Cloud technologies.",
            image: "cloud.jpg",
            tags: ["Cloud", "Hands-on"],
            type: "online"
        }
    ];
   
    function createEventCard(event) {
        return `
            <div class="event-card">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="event-details">
                    <div class="event-date">
                        <i class="far fa-calendar-alt"></i>
                        ${event.date}
                    </div>
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                        <span class="event-tag ${event.type}">${event.type}</span>
                    </div>
                    <a href="#" class="event-cta">Register Now</a>
                </div>
            </div>
        `;
    }
   
    function loadEvents() {
        eventsGrid.innerHTML = eventsData.map(createEventCard).join('');
    }
   
    loadEvents();

    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter form');
   
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
   
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
            this.reset();
        });
    }

    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .event-card, .team-member, .gallery-item');
       
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
           
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
   
    // Set initial state for animated elements
    document.querySelectorAll('.about-image, .event-card, .team-member, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
   
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
    // Set the date we're counting down to (YYYY, MM-1, DD)
        const eventDate = new Date(2023, 5, 15, 10, 0, 0); // June 15, 2023 at 10:00 AM
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display results
            document.getElementById("days").textContent = days.toString().padStart(2, "0");
            document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.querySelector(".countdown-title").textContent = "Event Started!";
                document.querySelector(".countdown-subtitle").textContent = "Join now!";
                document.querySelector(".countdown-timer").style.display = "none";
            }
        }
        
        // Update every second
        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 1000);
        const toggle = document.querySelector('.dark-mode-toggle');

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference or use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
body.classList.toggle('dark-mode');
            
// Save user preference
const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
localStorage.setItem('theme', theme);
});
