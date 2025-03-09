const iconToggle = document.querySelector('.toggle_icon');
const navbarMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu_link');
const iconClose = document.querySelector('.close_icon');

iconToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

iconClose.addEventListener('click', () =>{
    navbarMenu.classList.remove('active');
});

menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    })
})

// change background header

function scrollHeader() {
    const header = document.getElementById('header');
    this.scrollY >= 20 ? header.classList.add('active') : header.classList.remove('active');
}

window.addEventListener('scroll', scrollHeader);

/* hero type effect */
document.addEventListener('DOMContentLoaded', function() {
    // Wait for document to fully load
    window.addEventListener('load', function() {
        const typedElement = document.querySelector('.typed');
        
        if (typedElement) {
            // Force element visibility before initialization
            typedElement.style.color = '#000000';
            typedElement.style.opacity = '1';
            typedElement.style.visibility = 'visible';
            
            // Initialize Typed.js with optimized settings
            const typed = new Typed('.typed', {
                strings: ['turns ideas into impact'],
                typeSpeed: 40,          // Faster typing
                backSpeed: 25,          // Faster backspacing
                backDelay: 3000,        // Longer pause before backspacing
                startDelay: 500,        // Less delay before starting
                loop: true,             // Continue looping
                showCursor: true,       // Show cursor
                cursorChar: '|',        // Cursor character
                autoInsertCss: false,   // Don't auto-insert CSS
                smartBackspace: false,  // Don't use smart backspace
                onBegin: function() {
                    console.log('Typing started');
                },
                onComplete: function() {
                    console.log('Typing complete');
                    // Force visibility again when complete
                    typedElement.style.color = '#000000';
                }
            });
            
            // Fallback mechanism
            setTimeout(function() {
                if (!typedElement.textContent) {
                    typedElement.textContent = 'turns ideas into impact';
                    typedElement.style.color = '#000000';
                }
            }, 2000);
        }
    });
});

// Scroll section active link
const sections = document.querySelectorAll('section[id]');
 
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50; // Adjust this value to set the offset

        let sectionId = section.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

window.addEventListener('scroll', scrollActive);

// Get all resume pages and tabs
const pages = document.querySelectorAll('.page');
const resume = document.querySelector('.resume');

// Resume scroll - enhanced to make tabs bold when scrolling
function resumeActive() {
    const scrollY = window.pageYOffset;
    const resumeSection = document.getElementById('resume');
    const resumeRect = resumeSection ? resumeSection.getBoundingClientRect() : null;
    
    // Check if we're in the resume section
    if (resumeSection && resumeRect && resumeRect.top <= 100 && resumeRect.bottom >= 100) {
        // We're in the resume section, so determine which subsection we're in
        pages.forEach(page => {
            const rect = page.getBoundingClientRect();
            let sectionId = page.getAttribute('id');
            
            // If this page is visible in the viewport (with some buffer)
            if (rect.top <= 300 && rect.bottom >= 100) {
                // Get all tab links
                const allTabs = document.querySelectorAll('.resume_tabs ul li a');
                
                // Remove current class and bold styling from all tabs
                allTabs.forEach(tab => {
                    tab.classList.remove('current');
                    tab.style.fontWeight = '500'; // Reset to normal weight
                });
                
                // Add current class to the tab corresponding to this page
                const targetTab = document.querySelector('.resume_tabs a[href*=' + sectionId + ']');
                if (targetTab) {
                    targetTab.classList.add('current');
                    targetTab.style.fontWeight = '700'; // Make it bold
                }
                
                // Hide all pages with animation
                pages.forEach(p => {
                    if (p !== page) {
                        p.classList.remove('active');
                    }
                });
                
                // Show this page with animation
                page.classList.add('active');
                
                // Since we found the visible page, no need to check others
                return;
            }
        });
    } else {
        // If we're not in the resume section, reset all tabs to normal weight
        const allTabs = document.querySelectorAll('.resume_tabs ul li a');
        allTabs.forEach(tab => {
            if (!tab.classList.contains('current')) {
                tab.style.fontWeight = '500';
            }
        });
    }
}

window.addEventListener('scroll', resumeActive)


// portfolio
let filterItems = document.querySelectorAll('.portfolio_filters li');

function activePortfolio() {
    filterItems.forEach(el => {
        el.classList.remove('filter-active');
        this.classList.add('filter-active');
    })
}
filterItems.forEach(el =>{
    el.addEventListener('click', activePortfolio);
})

//mixitup filter portfolio
let mixerPortfolio = mixitup('.portfolio_wrap-container', {
    selectors: {
        target: '.portfolio_item'
    },
    animation: {
        duration: 300
    }
})






//testimonial swiper
let swiper = new Swiper('.testimonial_container',{
    effect: 'slide',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 800,
    breakpoints: {
        576: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1,
        }
    }
});

// Services modal functionality with data-attributes
const initializeModals = () => {
    const serviceItems = document.querySelectorAll('.services_item');
    const modalViews = document.querySelectorAll('.services_modal');
    const modalClose = document.querySelectorAll('.modal_close-icon');
    const body = document.body;
    let savedScrollY = 0;

    // Function to toggle body scroll
    const toggleBodyScroll = (disableScroll) => {
        if (disableScroll) {
            // Save current scroll position
            savedScrollY = window.pageYOffset;
            console.log('Saved scroll position on open:', savedScrollY);
            // Set CSS variable for the negative scroll position
            document.documentElement.style.setProperty('--scroll-position', `-${savedScrollY}px`);
            // Add the modal-open class to lock the body
            body.classList.add('modal-open');
        } else {
            // Get the saved scroll position before removing the class
            const scrollPosition = savedScrollY;
            
            // Remove the modal-open class to unlock the body
            body.classList.remove('modal-open');
            document.documentElement.style.removeProperty('--scroll-position');
            body.style.position = '';
            body.style.width = '';
            body.style.top = '';
            body.style.overflow = '';
            
            // Use setTimeout to ensure styles are applied before scrolling
            if (scrollPosition !== undefined) {
                console.log('Restoring scroll position on close:', scrollPosition);
                // Use setTimeout with 0 delay to let the browser handle the class removal first
                setTimeout(() => {
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'instant' // Use instant instead of smooth to avoid animation
                    });
                    console.log('Scroll position restored to:', scrollPosition);
                }, 0);
            }
        }
    };

    // Close all modals function
    const closeAllModals = (e) => {
        // If event is provided, prevent default and stop propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        modalViews.forEach(modal => {
            modal.classList.remove('active-modal');
        });
        
        // Restore scroll position properly - make sure this happens after the modals are closed
        setTimeout(() => {
            toggleBodyScroll(false);
        }, 10);
        
        console.log('All modals closed');
    };

    // Open specific modal by service type
    const openModal = (serviceType, e) => {
        // If event is provided, prevent default and stop propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const targetModal = document.querySelector(`.services_modal[data-service="${serviceType}"]`);
        if (targetModal) {
            // Close any open modals first
            closeAllModals();
            
            // Force layout recalculation
            void targetModal.offsetWidth;
            
            // Open the target modal
            targetModal.classList.add('active-modal');
            
            // Disable scrolling
            toggleBodyScroll(true);
            
            console.log(`Modal opened for ${serviceType}`);
        }
    };

    // Click handlers for service buttons
    serviceItems.forEach(item => {
        const serviceBtn = item.querySelector('.services_button');
        const serviceType = item.getAttribute('data-service');
        
        if (serviceBtn && serviceType) {
            serviceBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openModal(serviceType, e);
            });
        }
    });

    // Close modal when clicking the X button
    modalClose.forEach((closeBtn) => {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals(e);
            console.log('Modal closed via X button');
            return false; // Additional safeguard against event bubbling
        });
        
        // Also add event listener to the ion-icon inside the close button div
        const iconInside = closeBtn.querySelector('ion-icon');
        if (iconInside) {
            iconInside.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeAllModals(e);
                console.log('Modal closed via X icon inside button');
                return false;
            });
        }
    });

    // Close modal when clicking outside the modal content
    modalViews.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                e.preventDefault();
                e.stopPropagation();
                closeAllModals(e);
                console.log('Modal closed via outside click');
                return false; // Additional safeguard against event bubbling
            }
        });
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.services_modal.active-modal')) {
            e.preventDefault();
            closeAllModals(e);
            console.log('Modal closed via Escape key');
        }
    });

    console.log('Modal functionality initialized with data-attribute approach');

    // Expose the toggleBodyScroll function so it can be called from other handlers
    return {
        toggleBodyScroll,
        savedScrollY: () => savedScrollY
    };
};

// Initialize modals when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, initializing modals");
    
    // Keep track of scroll position across the entire document
    let documentSavedScrollY = 0;
    
    // Initialize modals and store the returned object in the window for global access
    setTimeout(() => {
        window.initModals = initializeModals();
    }, 100); // Short delay to ensure everything is loaded
    
    // Add direct event handler for close icons
    document.addEventListener('click', function(e) {
        // Check if the clicked element or any of its parents is a close icon
        let target = e.target;
        let isCloseIcon = false;
        
        // Check up to 3 levels of parent elements to find a close icon
        for (let i = 0; i < 3; i++) {
            if (!target) break;
            
            if (target.classList && (
                target.classList.contains('modal_close-icon') || 
                (target.nodeName === 'ION-ICON' && target.parentElement && target.parentElement.classList.contains('modal_close-icon'))
            )) {
                isCloseIcon = true;
                break;
            }
            
            target = target.parentElement;
        }
        
        if (isCloseIcon) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find all modals and close them
            document.querySelectorAll('.services_modal').forEach(modal => {
                modal.classList.remove('active-modal');
            });
            
            // Instead of handling scroll restoration directly, defer to initializeModals' toggleBodyScroll
            // This ensures consistent scroll position handling across all modal closing methods
            const initModals = window.initModals;
            if (typeof initModals === 'object' && typeof initModals.toggleBodyScroll === 'function') {
                setTimeout(() => {
                    initModals.toggleBodyScroll(false);
                }, 10);
            } else {
                // Fallback in case we can't access initializeModals
                const body = document.body;
                body.classList.remove('modal-open');
                body.style.position = '';
                body.style.width = '';
                body.style.top = '';
                body.style.overflow = '';
                
                // Use requestAnimationFrame for scroll restoration
                if (typeof savedScrollY !== 'undefined' && savedScrollY > 0) {
                    requestAnimationFrame(() => {
                        window.scrollTo({
                            top: savedScrollY,
                            behavior: 'instant'
                        });
                        console.log('Document handler restored scroll to:', savedScrollY);
                    });
                } else if (documentSavedScrollY > 0) {
                    requestAnimationFrame(() => {
                        window.scrollTo({
                            top: documentSavedScrollY,
                            behavior: 'instant'
                        });
                        console.log('Document handler restored scroll to:', documentSavedScrollY);
                    });
                }
            }
            
            console.log('Direct handler closed modals via close icon');
            return false;
        }
    }, true);
    
    // Add a global event listener to the modals container to capture any potential issues
    const modalsContainer = document.querySelector('.services_modals_container');
    if (modalsContainer) {
        modalsContainer.addEventListener('click', function(e) {
            // Extended selector to capture clicks on the close icon or its wrapper div
            const isCloseIcon = e.target.classList.contains('modal_close-icon') || 
                               e.target.parentElement.classList.contains('modal_close-icon') ||
                               (e.target.nodeName === 'ION-ICON' && e.target.parentElement.classList.contains('modal_close-icon'));
            
            if (isCloseIcon) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the parent modal and close it
                const parentModal = e.target.closest('.services_modal');
                if (parentModal) {
                    parentModal.classList.remove('active-modal');
                    
                    // Instead of handling scroll restoration directly, defer to initializeModals' toggleBodyScroll
                    // This ensures consistent scroll position handling across all modal closing methods
                    const initModals = window.initModals;
                    if (typeof initModals === 'object' && typeof initModals.toggleBodyScroll === 'function') {
                        setTimeout(() => {
                            initModals.toggleBodyScroll(false);
                        }, 10);
                    } else {
                        // Restore body styles properly
                        const body = document.body;
                        body.classList.remove('modal-open');
                        body.style.position = '';
                        body.style.width = '';
                        body.style.top = '';
                        body.style.overflow = '';
                        
                        // Use requestAnimationFrame for scroll restoration
                        if (typeof savedScrollY !== 'undefined' && savedScrollY > 0) {
                            requestAnimationFrame(() => {
                                window.scrollTo({
                                    top: savedScrollY,
                                    behavior: 'instant'
                                });
                                console.log('Container handler restored scroll to:', savedScrollY);
                            });
                        } else if (documentSavedScrollY > 0) {
                            requestAnimationFrame(() => {
                                window.scrollTo({
                                    top: documentSavedScrollY,
                                    behavior: 'instant'
                                });
                                console.log('Container handler restored scroll to:', documentSavedScrollY);
                            });
                        }
                    }
                    
                    console.log('Global handler closed modal via close icon');
                } else {
                    // If for some reason we can't find the parent, just close all modals
                    document.querySelectorAll('.services_modal').forEach(modal => {
                        modal.classList.remove('active-modal');
                    });
                    
                    // Instead of handling scroll restoration directly, defer to initializeModals' toggleBodyScroll
                    // This ensures consistent scroll position handling across all modal closing methods
                    const initModals = window.initModals;
                    if (typeof initModals === 'object' && typeof initModals.toggleBodyScroll === 'function') {
                        setTimeout(() => {
                            initModals.toggleBodyScroll(false);
                        }, 10);
                    } else {
                        // Restore body styles properly
                        const body = document.body;
                        body.classList.remove('modal-open');
                        body.style.position = '';
                        body.style.width = '';
                        body.style.top = '';
                        body.style.overflow = '';
                        
                        // Use requestAnimationFrame for scroll restoration
                        if (typeof savedScrollY !== 'undefined' && savedScrollY > 0) {
                            requestAnimationFrame(() => {
                                window.scrollTo({
                                    top: savedScrollY,
                                    behavior: 'instant'
                                });
                                console.log('Container fallback handler restored scroll to:', savedScrollY);
                            });
                        } else if (documentSavedScrollY > 0) {
                            requestAnimationFrame(() => {
                                window.scrollTo({
                                    top: documentSavedScrollY,
                                    behavior: 'instant'
                                });
                                console.log('Container fallback handler restored scroll to:', documentSavedScrollY);
                            });
                        }
                    }
                    
                    console.log('Global handler closed all modals as fallback');
                }
                
                return false;
            }
        }, true); // Use capture phase to ensure we get the event first
    }
    
    // Capture the current scroll position whenever a modal is about to be opened
    const serviceButtons = document.querySelectorAll('.services_button');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            documentSavedScrollY = window.pageYOffset;
            console.log('Saved scroll position: ' + documentSavedScrollY);
        });
    });
});

// contact form
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 JavaScript is running!");

    if (typeof emailjs === "undefined") {
        console.error("❌ EmailJS is not loaded. Check the script import!");
        return;
    }

    // ✅ Initialize EmailJS
    emailjs.init("E2C3piNsWz34hHO8I");

    const contactForm = document.getElementById("contact-form");
    if (!contactForm) {
        console.error("❌ Contact form not found! Check your HTML.");
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("📌 Form submitted!");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            console.log("⚠️ Error: All fields are required.");
            alert("All fields are required!");
            return;
        }

        console.log("✅ Sending email...");

        // ✅ Send email using EmailJS
        emailjs.send("service_ci37fzc", "template_70etzeb", {
            name: name,
            email: email,
            message: message
        })
        .then(response => {
            console.log("🎉 Message sent successfully!", response);
            alert("Message sent successfully!");
            contactForm.reset();
        })
        .catch(error => {
            console.error("❌ Failed to send message:", error);
            alert("Failed to send message. Check console.");
        });
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back_to_top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover animations to footer links for better interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Animate footer elements on scroll into view
    const footerElements = document.querySelectorAll('.footer_container > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    footerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Resume tabs click functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeTabs = document.querySelectorAll('.resume_tabs ul li a');
    
    // Add click event listeners to tabs
    resumeTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove current class from all tabs
            resumeTabs.forEach(tab => {
                tab.classList.remove('current');
                tab.style.fontWeight = '500'; // Set to normal weight
            });
            
            // Add current class to clicked tab
            this.classList.add('current');
            this.style.fontWeight = '700'; // Make it bold
            
            // Get the target page
            const target = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(target);
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            if (targetPage) {
                targetPage.classList.add('active');
                
                // Scroll to the resume section to ensure it's visible
                const resumeSection = document.getElementById('resume');
                if (resumeSection) {
                    resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Initialize tabs - show first one by default
    function initResumeTabs() {
        const firstTab = document.querySelector('.resume_tabs ul li a');
        const firstPage = document.querySelector('.page');
        
        if (firstTab && firstPage) {
            firstTab.classList.add('current');
            firstTab.style.fontWeight = '700'; // Bold the first tab initially
            firstPage.classList.add('active');
        }
    }
    
    // Check if any tab already has 'current' class, if not initialize
    const hasCurrentTab = document.querySelector('.resume_tabs ul li a.current');
    if (!hasCurrentTab) {
        initResumeTabs();
    }
    
    // Make sure the current tab is always bold
    const currentTab = document.querySelector('.resume_tabs ul li a.current');
    if (currentTab) {
        currentTab.style.fontWeight = '700';
    }
});

// Initialize scrolling skills when the skills tab is active
document.addEventListener('DOMContentLoaded', function() {
    const skillsTab = document.querySelector('.resume_tabs a[href="#page-3"]');
    const skillsPage = document.getElementById('page-3');
    const skillsContainer = document.querySelector('.skills-scroll-container');
    
    if (skillsTab && skillsPage && skillsContainer) {
        // Duplicate skill boxes for continuous infinite scrolling
        const cloneSkills = () => {
            // Get all the skill boxes
            const skillBoxes = skillsPage.querySelectorAll('.skill-box');
            
            // Clone each skill box and append to the container
            skillBoxes.forEach(box => {
                const clone = box.cloneNode(true);
                skillsContainer.appendChild(clone);
            });
        };
        
        // Clone skills for continuous scrolling
        cloneSkills();
        
        // Handle tab click to ensure animation starts correctly
        skillsTab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show the skills page
            const allPages = document.querySelectorAll('.page');
            allPages.forEach(page => {
                page.classList.remove('active');
            });
            
            skillsPage.classList.add('active');
            
            // Reset animation
            skillsContainer.style.animation = 'none';
            // Force reflow
            void skillsContainer.offsetWidth;
            // Restart animation
            skillsContainer.style.animation = 'scrollSkills 35s linear infinite';
            
            // Mark the skills tab as current
            const allTabs = document.querySelectorAll('.resume_tabs ul li a');
            allTabs.forEach(tab => {
                tab.classList.remove('current');
                tab.style.fontWeight = '500';
            });
            
            skillsTab.classList.add('current');
            skillsTab.style.fontWeight = '700';
        });
        
        // Handle hover on skill boxes
        const skillBoxes = document.querySelectorAll('.skill-box');
        skillBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                skillsContainer.style.animationPlayState = 'paused';
            });
            
            box.addEventListener('mouseleave', function() {
                skillsContainer.style.animationPlayState = 'running';
            });
        });
    }
});
