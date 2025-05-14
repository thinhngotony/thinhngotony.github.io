window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Add animation to skill badges
    const animateSkillBadges = () => {
        const badges = document.querySelectorAll('.badge');
        badges.forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.1}s`;
            badge.classList.add('badge-appear');
        });
    };

    // Lazy load images for better performance
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if ('loading' in HTMLImageElement.prototype) {
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        observer.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                lazyImageObserver.observe(img);
            });
        }
    };

    // Handle form submission with better user feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('#submitButton');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitButton.disabled = true;
            
            // get the form data
            const formData = {
                name: document.querySelector("input[name=name]").value,
                _replyto: document.querySelector("input[name=_replyto]").value,
                phone: document.querySelector("input[name=phone]").value,
                message: document.querySelector("textarea[name=message]").value,
            };

            // submit the form data via AJAX
            fetch("https://formspree.io/f/mqkodzpa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // hide the form and show the success message
                document.getElementById("contactForm").classList.add("d-none");
                document.getElementById("success-message").classList.remove("d-none");
                
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            })
            .catch(error => {
                // show the error message
                document.getElementById("error-message").classList.remove("d-none");
                
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (revealElements.length > 0) {
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }

    // Initialize any components that need it
    document.addEventListener('DOMContentLoaded', () => {
        animateSkillBadges();
        lazyLoadImages();
    });
});
