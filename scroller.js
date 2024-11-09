function makeScroller(className, prevButton = 'scroller__prev', nextButton = 'scroller__next', fadeWidth = 0, elementsPerSlide = 3, gap = 16) {
    class Scroller {
        constructor(element, fadeWidth, elementsPerSlide, prevButton, nextButton) {
            this.element = element;
            this.prevButton = document.querySelector(`.${prevButton}`);
            this.nextButton = document.querySelector(`.${nextButton}`);
            this.currentIndex = 0;
            this.fadeWidth = fadeWidth;
            this.elementsPerSlide = elementsPerSlide;
            this.totalElements = this.element.children.length;
            this.totalSlides = Math.ceil(this.element.children.length / this.elementsPerSlide);
            this.gap = gap;
            this.container = element.querySelector('.scroller__container') || this.createContainer();
            this.addStyles();

            if (this.prevButton) this.prevButton.addEventListener('click', () => this.switchSlides('prev'));
            if (this.nextButton) this.nextButton.addEventListener('click', () => this.switchSlides('next'));
        }

        addStyles() {
            let styleSheet;
            if (!document.getElementById('scroller-styles')) {
                styleSheet = document.createElement('style');
                styleSheet.id = 'scroller-styles';
                document.head.appendChild(styleSheet);
            } else {
                styleSheet = document.getElementById('scroller-styles');
            }
            
            styleSheet.textContent = `
                .scroller__container {
                    display: flex;
                    width: fit-content;
                    gap: ${this.gap}px;
                    overflow: visible;
                    transition: transform 0.5s ease-in-out;
                }
                .scroller__item {
                    width: ${(document.querySelector('.scroller__container').offsetWidth - (this.gap * (this.elementsPerSlide - 1))) / this.elementsPerSlide}px;
                }
                .scroller--fade {
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
            
            this.element.classList.add('scroller');
            if (this.fadeWidth > 0) {
                this.element.classList.add('scroller--fade');
            }
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
        new Scroller(element, fadeWidth, elementsPerSlide, prevButton, nextButton);
    });
}

export { makeScroller };
