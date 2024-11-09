const contentScroller = {
    currentIndex: 0,
    interval: null,
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    updateDimensions(index) {
        this.imageTrackOffset = document.querySelector('.content-scroller__track').offsetWidth / 2 - this.activeImageWidth / 2;
        
        const activeImageHeight = document.querySelector('.content-scroller__images__item.active').offsetHeight;
        this.imageTrack.style.height = `${activeImageHeight}px`;

        const offset = index * (this.inactiveImageWidth + this.imageGap);
        this.imageTrack.style.transform = `translateX(${this.imageTrackOffset - offset}px)`;
    },
    
    init() {
        this.tabs = [...document.querySelectorAll('.content-scroller__tab')];
        this.descriptions = [...document.querySelectorAll('.content-scroller__description')];
        this.images = [...document.querySelectorAll('.content-scroller__images__item')];
        this.imageTrack = document.querySelector('.content-scroller__images');
        this.totalItems = this.tabs.length;
        this.activeImageWidth = 500;
        this.inactiveImageWidth = 400;
        this.imageGap = 16;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            .content-scroller__images {
                gap: ${this.imageGap}px;
            }
            .content-scroller__images__item {
                width: ${this.inactiveImageWidth}px;
            }
            .content-scroller__images__item.active {
                width: ${this.activeImageWidth}px;
            }
        `;
        document.head.appendChild(styleElement);

        this.updateDimensions(this.currentIndex);
        
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchToIndex(index));
        });

        this.handleResize = this.throttle(() => this.updateDimensions(this.currentIndex), 150);
        window.addEventListener('resize', this.handleResize);
    },
    
    switchToIndex(index) {
        
        this.currentIndex = index;
        
        this.tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
        
        this.descriptions.forEach((desc, i) => {
            desc.classList.toggle('active', i === index);
        });
        
        this.images.forEach((image, i) => {
            image.classList.toggle('active', i === index);
        });

        this.updateDimensions(index); // This will handle the width changes
    }
};

export { contentScroller };