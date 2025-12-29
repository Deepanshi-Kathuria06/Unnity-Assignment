// Mobile Navigation Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // Handle dropdowns on mobile
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        // Sticky navbar on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Tab Switching Functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding tab content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Testimonial Slider
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        const slideCount = slides.length;
        
        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slideCount - 1;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });
        
        // Auto-play slider (optional)
        let autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
            updateSlider();
        }, 5000);
        
        // Pause auto-play on hover
        const slider = document.querySelector('.testimonial-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
                updateSlider();
            }, 5000);
        });
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('open');
                        q.querySelector('i').classList.remove('fa-minus');
                        q.querySelector('i').classList.add('fa-plus');
                    }
                });
                
                // Toggle current FAQ item
                question.classList.toggle('active');
                const answer = question.nextElementSibling;
                answer.classList.toggle('open');
                
                // Toggle plus/minus icon
                const icon = question.querySelector('i');
                if (question.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
        
        // Form Submission to Google Sheets
        const form = document.getElementById('franchise-form');
        const formMessage = document.getElementById('form-message');
        
       
        
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwjPCst_rvzkdFemeY_fD98RALCMQgwM_GRRvMlpSdt5hW62gv2ObXojyOV4fSpWBg/exec";
        
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    message: document.getElementById('message').value
  };
  
  // Send to Google Sheets
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    // Show success message
    formMessage.textContent = "Thank you! Your application has been submitted.";
    formMessage.className = "form-message success";
    form.reset();
  })
  .catch((error) => {
    formMessage.textContent = "Error submitting form. Please try again.";
    formMessage.className = "form-message error";
    console.error('Error:', error);
  })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        });
        
        // Smooth scrolling for anchor links
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
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileToggle.querySelector('i').classList.add('fa-bars');
                        mobileToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            });
        });
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            // Set current year in footer
            document.querySelector('.footer-bottom p').innerHTML = document.querySelector('.footer-bottom p').innerHTML.replace('2023', new Date().getFullYear());
        });