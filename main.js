import { makeScroller } from './scroller.js';
import { contentScroller } from './contentscroller.js';
import { makeMarquee } from './marquee.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar
    const navBar = document.querySelector('.navBar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navBar.classList.add('navBar--scrolling');
        } else {
            navBar.classList.remove('navBar--scrolling');
        }
    });

    // Initialize sliders
    contentScroller.init();
    makeScroller({ className: 'useCases__scroller', elementsPerSlide: { desktop: 3, tablet: 2, mobile: 1 } });

    // Initialize marquee
    makeMarquee({ className: 'marquee', duration: 20, gap: 16, direction: 'left', fadeWidth: 80 });
    makeMarquee({ className: 'input', duration: 20, gap: 16, direction: 'right', fadeWidth: 80 });
    makeMarquee({ className: 'output', duration: 20, gap: 16, direction: 'right', fadeWidth: 80 });

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

    // Menu
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
    const menuButton = document.querySelector('.navBar__menu-button');
    const closeButton = document.querySelector('.close-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--open');
            setTimeout(() => {
                mobileMenu.classList.remove('mobile-menu--active');
            }, 100);
        });
    });

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-menu--active');
        setTimeout(() => {
            mobileMenu.classList.toggle('mobile-menu--open');
        }, 100);
    });

    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        setTimeout(() => {
            mobileMenu.classList.remove('mobile-menu--active');
        }, 100);
    });
});