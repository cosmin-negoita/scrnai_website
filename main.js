import { makeScroller } from './scroller.js';
import { contentScroller } from './contentscroller.js';
import { makeMarquee } from './marquee.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar
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

    // Initialize sliders
    contentScroller.init();
    makeScroller({ className: 'useCases__scroller', elementsPerSlide: { desktop: 3, tablet: 2, mobile: 1 } });

    // Initialize marquee
    makeMarquee({ className: 'marquee', duration: 10, gap: 16, direction: 'left', fadeWidth: 80 });
    makeMarquee({ className: 'input', duration: 10, gap: 16, direction: 'right', fadeWidth: 80 });
    makeMarquee({ className: 'output', duration: 10, gap: 16, direction: 'right', fadeWidth: 80 });

    // Accordion
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion__header');
        const content = accordion.querySelector('.accordion__content');
        
        if (accordion.classList.contains('open')) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0';
        }

        header.addEventListener('click', () => {
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('open')) {
                    otherAccordion.classList.remove('open');
                    otherAccordion.querySelector('.accordion__content').style.height = '0';
                }
            });

            accordion.classList.toggle('open');
            content.style.height = accordion.classList.contains('open') ? 
                content.scrollHeight + 'px' : '0';
        });
    });
});