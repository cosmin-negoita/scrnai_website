import { makeScroller } from './scroller.js';
import { contentScroller } from './contentscroller.js';
import { makeMarquee } from './marquee.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const navBar = document.querySelector('.navBar');
    
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                navBar.classList.add('navBar--scrolling');
            } else {
                navBar.classList.remove('navBar--scrolling');
            }
        });
    } else {
        console.warn('Navigation bar element not found! Check if the class "navBar" exists in your HTML.');
    }

    

    contentScroller.init();
    makeScroller('useCases__scroller');

    const marqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const className = Array.from(target.classList)[0]; // Get the first class
                makeMarquee(className, 1, 16, 0, 'right', className === 'marquee' ? 100 : 80);
            }
        });
    });

    // Export the observer so it can be used elsewhere if needed
    window.marqueeObserver = marqueeObserver;

    document.querySelectorAll('.marquee, .input, .output').forEach(element => {
        marqueeObserver.observe(element);
    });

    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion__header');
        const content = accordion.querySelector('.accordion__content');
        
        // Set initial height for animation
        if (accordion.classList.contains('open')) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0';
        }

        header.addEventListener('click', () => {
            // Close all other accordions
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('open')) {
                    otherAccordion.classList.remove('open');
                    otherAccordion.querySelector('.accordion__content').style.height = '0';
                }
            });

            // Toggle current accordion
            accordion.classList.toggle('open');
            content.style.height = accordion.classList.contains('open') ? 
                content.scrollHeight + 'px' : '0';
        });
    });
});