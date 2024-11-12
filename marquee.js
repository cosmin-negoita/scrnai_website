function makeMarquee({ className, duration = 10, gap = 16, direction = 'right', fadeWidth = 0 }) {
    const elements = document.querySelectorAll(`.${className}`);

    // Add CSS
    if (!document.getElementById(`${className}-styles`)) {
        const styleSheet = document.createElement('style');
        styleSheet.id = `${className}-styles`;
        styleSheet.textContent = `
            .${className}.marquee-container {
                overflow: hidden;
                white-space: nowrap;
                width: 100%;
                position: relative;
            }  
            .${className} .marquee-content {
                display: inline-flex;
                animation: marquee-${direction} ${duration}s linear infinite;
            }
            .${className} .marquee-content > * {
                margin-right: ${gap}px;
            }
            .${className}.marquee--fade {
                -webkit-mask-image: linear-gradient(
                    to right,
                    transparent,
                    black ${fadeWidth}px,
                    black calc(100% - ${fadeWidth}px),
                    transparent
                );
                mask-image: linear-gradient(
                    to right,
                    transparent,
                    black ${fadeWidth}px,
                    black calc(100% - ${fadeWidth}px),
                    transparent
                );
            }
            ${direction === 'left' ? `
                @keyframes marquee-left {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(-50%);
                }
            }` : `
                @keyframes marquee-right {
                    from {
                        transform: translateX(-50%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}
        `;
        document.head.appendChild(styleSheet);
    }

    elements.forEach(element => {
        element.classList.add('marquee-container');
        
        if (fadeWidth > 0) {
            element.classList.add('marquee--fade');
        }

        // Create container
        const container = document.createElement('div');
        container.className = 'marquee-content';
        while (element.firstChild) {
            container.appendChild(element.firstChild);
        }
        element.appendChild(container);

        // Duplicate content
        container.innerHTML += container.innerHTML;
    });
}

export { makeMarquee };