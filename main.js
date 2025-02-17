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

/* herp type effect */
const typed = document.querySelector('.typed');
 
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed',{
        strings: typed_strings,
        loop: true,
        typedSpeed:100,
        backSpeed:50,
        backDelay:2000
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
let filterItems = document.querySelectorAll('.portfolio_filter li');

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






//testimonail swiper
let swiper = new Swiper('.testimonial_container',{
    effect:'slide',
    loop: true,
    slidesPerview: 1,
    grabCursor: true,
    spaceBetween:100,
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

// services
let modalBtns = document.querySelectorAll('.services_button'),
    modalViews = document.querySelectorAll('.services_modal'),
    modalClose = document.querySelectorAll('.modal_close-icon');


let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn,i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach(el => {
    el.addEventListener('click', () => {
        modalViews.forEach(modalViews => {
            modalViews.classList.remove('active-modal')
        })
    })
})
// contact form
// Initialize EmailJS with your Public Key
 (function() {
    emailjs.init("E2C3piNsWz34hHO8I"); // Replace with your actual Public Key
})();

// Add event listener to the form
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log("🚀 Form submitted!"); // Log to confirm the event is triggered

    // Retrieve values from form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("📌 Name:", name);
    console.log("📌 Email:", email);
    console.log("📌 Message:", message);

    // Check if values are empty
    if (!name || !email || !message) {
        console.log("⚠️ Error: All fields are required.");
        alert("All fields are required!");
        return; // Stop function execution if any field is empty
    }

    console.log("✅ Attempting to send email...");

    // Send email using EmailJS
    emailjs.send("service_ci37fzc", "template_70etzeb", {
        name: name,
        email: email,
        message: message
    }, "E2C3piNsWz34hHO8I") // Public Key
    .then(function(response) {
        console.log("🎉 Message sent successfully!", response);
        alert("Message sent successfully!");
    })
    .catch(function(error) {
        console.error("❌ Failed to send message:", error);
        alert("Failed to send message: " + error.text);
    });
});
console.log("🚀 JavaScript is running!");

emailjs.init("E2C3piNsWz34hHO8I") // Replace with your Public Key
    .then(() => console.log("✅ EmailJS initialized!"))
    .catch(error => console.error("❌ EmailJS initialization failed:", error));
