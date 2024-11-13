function makeScroller({ 
    className, 
    prevButton = 'scroller__prev', 
    nextButton = 'scroller__next', 
    fadeWidth = 0, 
    elementsPerSlide = {
        desktop: 3,
        tablet: 2,
        mobile: 1
    },
    breakpoints = {
        tablet: 1024,
        mobile: 767
    },
    gap = 16 
}) {
    class Scroller {
        constructor(element, fadeWidth, elementsPerSlide, prevButton, nextButton, breakpoints) {
            this.element = element;
            this.prevButton = document.querySelector(`.${prevButton}`);
            this.nextButton = document.querySelector(`.${nextButton}`);
            this.currentIndex = 0;
            this.fadeWidth = fadeWidth;
            this.elementsPerSlide = elementsPerSlide;
            this.breakpoints = breakpoints;
            this.totalElements = this.element.children.length;
            this.totalSlides = Math.ceil(this.element.children.length / this.elementsPerSlide.desktop);
            this.gap = gap;
            this.container = element.querySelector('.scroller__container') || this.createContainer();

            this.element.classList.add('scroller');
            if (this.fadeWidth > 0) {
                this.element.classList.add('scroller--fade');
            }
            
            this.updateDimensions();
            this.updateDimensions = this.updateDimensions.bind(this);
            window.addEventListener('resize', this.updateDimensions);

            if (this.prevButton) this.prevButton.addEventListener('click', () => this.switchSlides('prev'));
            if (this.nextButton) this.nextButton.addEventListener('click', () => this.switchSlides('next'));
        }

        getCurrentBreakpoint() {
            const width = window.innerWidth;
            if (width <= this.breakpoints.mobile) return 'mobile';
            if (width <= this.breakpoints.tablet) return 'tablet';
            return 'desktop';
        }

        updateDimensions() {
            const computedStyle = window.getComputedStyle(this.element);
            const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
            const paddingRight = parseInt(computedStyle.paddingRight) || 0;
            const parentWidth = this.element.offsetWidth - paddingLeft - paddingRight;
            
            const currentBreakpoint = this.getCurrentBreakpoint();
            const currentElementsPerSlide = this.elementsPerSlide[currentBreakpoint];
            
            const gapTotal = this.gap * (currentElementsPerSlide - 1);
            const availableWidth = parentWidth - gapTotal;
            const itemWidth = availableWidth / currentElementsPerSlide;
            
            this.totalSlides = Math.ceil(this.totalElements / currentElementsPerSlide);
            
            if (this.currentIndex >= this.totalSlides) {
                this.currentIndex = this.totalSlides - 1;
                this.container.style.transform = `translateX(calc(-${this.currentIndex * (this.container.offsetWidth / this.totalSlides)}px))`;
            }
            
            this.addStyles(itemWidth);
        }

        addStyles(itemWidth) {
            let styleSheet;
            const styleSheetId = `${className}-styles`;
            if (!document.getElementById(styleSheetId)) {
                styleSheet = document.createElement('style');
                styleSheet.id = styleSheetId;
                document.head.appendChild(styleSheet);
            } else {
                styleSheet = document.getElementById(styleSheetId);
            }
            
            styleSheet.textContent = `
                .${className} .scroller__container {
                    display: flex;
                    width: fit-content;
                    gap: ${this.gap}px;
                    overflow: visible;
                    transition: transform 1s ease-in-out;
                }
                .${className} .scroller__item {
                    width: ${itemWidth}px;
                }
                .${className} .scroller--fade {
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent,
                        black ${this.fadeWidth}px,
                        black calc(100% - ${this.fadeWidth}px),
                        transparent
                    );
                }
            `;

            Array.from(document.querySelector('.scroller__container').children).forEach(child => {
                child.classList.add('scroller__item');
            });
        }

        createContainer() {
            const container = document.createElement('div');
            container.className = 'scroller__container';
            while (this.element.firstChild) {
                container.appendChild(this.element.firstChild);
            }
            this.element.appendChild(container);
            return container;
        }

        switchSlides(direction) {
            if (direction === 'next' && this.currentIndex < this.totalSlides - 1) {
                this.currentIndex++;
                document.querySelector('.scroller__container').style.transform = `translateX(calc(-${this.currentIndex * (this.container.offsetWidth / this.totalSlides)}px))`;
            }
            if (direction === 'prev' && this.currentIndex > 0) {
                this.currentIndex--;
                document.querySelector('.scroller__container').style.transform = `translateX(calc(-${this.currentIndex * (this.container.offsetWidth / this.totalSlides)}px))`;
            }
            console.log(this.currentIndex);
        }
    }

    document.querySelectorAll(`.${className}`).forEach(element => {
        new Scroller(element, fadeWidth, elementsPerSlide, prevButton, nextButton, breakpoints);
    });
}

export { makeScroller };
