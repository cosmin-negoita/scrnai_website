function makeMarquee(className, speed = 1, gap = 16, padding = 0, direction = 'left', fadeWidth = 0) {
    class Marquee {
        constructor(element, speed, gap, padding, direction, fadeWidth) {
            this.padding = padding;
            this.element = element;
            this.direction = direction;
            this.gap = gap;
            this.speed = speed;
            this.fadeWidth = fadeWidth;
            this.addStyles();
            this.container = element.querySelector('.marquee-container') || this.createContainer();
            this.init();
        }

        addStyles() {
            if (!document.getElementById('marquee-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'marquee-styles';
                styleSheet.textContent = `
                    .marquee {
                        overflow: hidden;
                        width: 100%;
                        padding: ${this.padding}px 0;
                        position: relative;
                    }
                    .marquee-container {
                        display: inline-flex;
                        white-space: nowrap;
                        gap: ${this.gap}px;
                    }
                    .marquee--fade {
                        -webkit-mask-image: linear-gradient(
                            to right,
                            transparent,
                            black ${this.fadeWidth}px,
                            black calc(100% - ${this.fadeWidth}px),
                            transparent
                        );
                        mask-image: linear-gradient(
                            to right,
                            transparent,
                            black ${this.fadeWidth}px,
                            black calc(100% - ${this.fadeWidth}px),
                            transparent
                        );
                    }
                `;
                document.head.appendChild(styleSheet);
            }
            this.element.classList.add('marquee');
            if (this.fadeWidth > 0) {
                this.element.classList.add('marquee--fade');
            }
        }

        createContainer() {
            const container = document.createElement('div');
            container.className = 'marquee-container';
            while (this.element.firstChild) {
                container.appendChild(this.element.firstChild);
            }
            this.element.appendChild(container);
            return container;
        }

        init() {
            const content = this.container.innerHTML;
            this.container.innerHTML = content + content;
            
            if (this.direction === 'right') {
                this.container.style.transform = `translateX(-${this.container.scrollWidth / 2}px)`;
            }
            this.animate();
        }

        animate() {
            let position = this.direction === 'left' ? 0 : -this.container.scrollWidth / 2;
            const contentWidth = this.container.scrollWidth / 2;

            const scroll = () => {
                if (this.direction === 'left') {
                    position -= this.speed;
                    if (Math.abs(position) >= contentWidth) {
                        position = 0;
                    }
                } else {
                    position += this.speed;
                    if (position >= 0) {
                        position = -contentWidth;
                    }
                }
                this.container.style.transform = `translateX(${position}px)`;
                requestAnimationFrame(scroll);
            };

            requestAnimationFrame(scroll);
        }
    }

    document.querySelectorAll(`.${className}`).forEach(element => {
        new Marquee(element, speed, gap, padding, direction, fadeWidth);
    });
}

export { makeMarquee };