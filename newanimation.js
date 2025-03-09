/**
 * Modern 3D Animations for Portfolio Website
 * Adds interactive 3D effects and animations to enhance the user experience
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('3D animations initialized');
    
    // Initialize all animations
    initHeroAnimations();
    initPortfolioAnimations();
    initAboutAnimations();
    initScrollAnimations();
});

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
    });
    
    // 3D tilt effect on mouse move
    hero.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        const heroContent = hero.querySelector('.hero_content');
        
        if (heroContent) {
            heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
    
    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        const heroContent = hero.querySelector('.hero_content');
        if (heroContent) {
            heroContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    });
}

/**
 * Initialize portfolio item 3D hover effects
 */
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio_wrap');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', handlePortfolioMouseMove);
        item.addEventListener('mouseleave', handlePortfolioMouseLeave);
    });
}

/**
 * Handle mouse movement over portfolio items
 */
function handlePortfolioMouseMove(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Get mouse position relative to card
    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;
    
    // Calculate rotation
    const rotateY = ((mouseX - cardWidth / 2) / cardWidth) * 10;
    const rotateX = -((mouseY - cardHeight / 2) / cardHeight) * 10;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

/**
 * Handle mouse leave from portfolio items
 */
function handlePortfolioMouseLeave() {
    // Reset transform
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
}

/**
 * Initialize about section animations
 */
function initAboutAnimations() {
    const aboutImg = document.querySelector('.about_img');
    if (!aboutImg) return;
    
    // 3D tilt effect on mouse move
    aboutImg.addEventListener('mousemove', (e) => {
        const rect = aboutImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        const rotateX = (0.5 - yPercent) * 20;
        const rotateY = (xPercent - 0.5) * 20;
        
        aboutImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset on mouse leave
    aboutImg.addEventListener('mouseleave', () => {
        aboutImg.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-10deg)';
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section_title, .about_content, .portfolio_item, .about_info > div');
    
    const revealScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add active class initially
    window.addEventListener('load', revealScroll);
    
    // Add active class on scroll
    window.addEventListener('scroll', revealScroll);
}
