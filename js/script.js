// Contact form API URL - Update this to your backend URL
const API_BASE = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    const loader = document.querySelector('.loader');
    const censoredText = document.querySelector('.censored-text');
    const nav = document.querySelector('.main-nav');
    
    // Simulate loading
    setTimeout(() => {
        censoredText.textContent = censoredText.getAttribute('data-text');
        censoredText.style.color = '#e94560';
        
        setTimeout(() => {
            loader.style.opacity = '0';
            
            setTimeout(() => {
                loader.style.display = 'none';
                nav.style.transform = 'translateY(0)';
            }, 500);
        }, 1000);
    }, 1500);
    
    // Typing effect for hero section - Updated words
    const typingText = document.querySelector('.typing-text');
    const words = ['Cultural Preservation', 'Social Justice', 'Documentary', 'Storytelling', 'Activism', 'Resilience', 'Change'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    setTimeout(type, 2000);
    
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Work gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (lightbox) {
        // Open lightbox for images
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
                lightboxImg.style.display = 'block';
                lightboxVideo.style.display = 'none';
                
                // Display caption in lightbox if available
                const caption = this.parentElement.querySelector('.gallery-item-caption');
                if (caption) {
                    console.log('Image caption:', caption.innerHTML);
                }
            });
        });
        
        // Open lightbox for videos
        document.querySelectorAll('.gallery-item video').forEach(video => {
            video.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                const source = this.querySelector('source');
                if (source) {
                    lightboxVideo.src = source.src;
                }
                lightboxVideo.style.display = 'block';
                lightboxImg.style.display = 'none';
                lightboxVideo.play();
                
                // Display caption in lightbox if available
                const caption = this.parentElement.querySelector('.gallery-item-caption');
                if (caption) {
                    console.log('Video caption:', caption.innerHTML);
                }
            });
        });
        
        // Close lightbox
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxVideo.pause();
        });
        
        // Close when clicking outside content
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightboxVideo.pause();
            }
        });
    }
    
    // Update copyright year
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Populate skills cloud - Updated skills
    const skillsCloud = document.querySelector('.skills-cloud');
    const skills = [
        'Documentary Filmmaking', 'Cultural Preservation', 'Social Justice', 'Storytelling',
        'Photography', 'Videography', 'Color Grading', 'Sound Design', 
        'Framing & Composition', 'Lighting Design', 'Video Editing', 'Sequencing',
        'Narrative Development', 'Adobe Creative Suite', 'Digital Marketing',
        'Arabic Language', 'Cross-Cultural Communication', 'Activism'
    ];
    
    if (skillsCloud) {
        skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.classList.add('skill-tag');
            skillTag.textContent = skill;
            skillsCloud.appendChild(skillTag);
        });
    }
    
    // Populate experience accordion - Updated experiences
    const experienceAccordion = document.querySelector('.experience-accordion');
    const experiences = [
        {
            title: 'Marketing Intern',
            location: 'Genesee Valley Council for the Arts, Rochester, New York',
            description: 'Creating design posters and shooting short reel videos to promote events throughout the year. Developing social media marketing strategies and visual content for cultural events and art exhibitions.'
        },
        {
            title: 'Publicity Chair',
            location: 'University of Rochester Film Club',
            description: 'Marketing club events and participating in student film shoots as Gaffer, Art Team, Production Assistant, Boom Operator, and Grip. Organized promotional campaigns and managed social media presence for film screenings and events.'
        },
        {
            title: 'Lighting Designer',
            location: 'School Theater Productions',
            description: 'Operated lighting board for school plays and developed understanding of color theory that now informs color grading decisions in film projects. Collaborated with directors to create atmospheric lighting that enhanced narrative storytelling.'
        }
    ];
    
    if (experienceAccordion) {
        experiences.forEach(exp => {
            const item = document.createElement('div');
            item.classList.add('accordion-item');
            
            item.innerHTML = `
                <div class="accordion-header">
                    <h4 class="accordion-title">${exp.title}</h4>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <p class="accordion-location">${exp.location}</p>
                    <p class="accordion-description">${exp.description}</p>
                </div>
            `;
            
            experienceAccordion.appendChild(item);
        });
        
        // Initialize accordion items
        const newAccordionItems = document.querySelectorAll('.accordion-item');
        newAccordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
    
    // Updated Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('loading');
            
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };

            try {
                const response = await fetch(`${API_BASE}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.success) {
                    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
                    this.reset();
                } else {
                    showFormMessage('There was an error sending your message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormMessage('There was an error sending your message. Please try again.', 'error');
            } finally {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
            }
        });
    }

    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.timeline-content, .highlight-item, .experience-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
