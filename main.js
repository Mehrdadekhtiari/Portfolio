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
const typed = document.querySelector('.typed');
 
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed',{
        strings: typed_strings,
        loop: true,
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 1000,
        fadeOut: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

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


// Resume scroll

const pages = document.querySelectorAll('.page');
const resume = document.querySelector('.resume');

function resumeActive() {
    const scrollY = window.pageYOffset; 

    pages.forEach(page => {
        const sectionHeight = page.offsetHeight;
        const sectionTop = page.offsetTop - 5;

        let sectionId = page.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.resume_tabs a[href *=' + sectionId + ']').classList.add('current');
        } else {
            document.querySelector('.resume_tabs a[href *=' + sectionId + ']').classList.remove('current');
        }
    })
    
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

