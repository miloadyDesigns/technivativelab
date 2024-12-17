// =================== Cursor Animation ===================
const svgns = "http://www.w3.org/2000/svg";
const root = document.querySelector("svg");
const totalLines = 40; // Number of lines in the cursor trail
const ease = 0.55; // Smoothness of trailing effect
let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Pointer position

// Track cursor position
window.addEventListener("mousemove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
});

// Create lines for the cursor trail
const lines = [];
for (let i = 0; i < totalLines; i++) {
    const line = document.createElementNS(svgns, "line");
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", 4);
    line.setAttribute("opacity", (totalLines - i) / totalLines); // Gradual fade
    root.appendChild(line);
    lines.push({ element: line, x: pointer.x, y: pointer.y });
}

// Update the lines' positions
function animateLines() {
    let previous = { x: pointer.x, y: pointer.y };
    lines.forEach((line, index) => {
        const { element } = line;
        line.x += (previous.x - line.x) * ease;
        line.y += (previous.y - line.y) * ease;

        element.setAttribute("x1", previous.x);
        element.setAttribute("y1", previous.y);
        element.setAttribute("x2", line.x);
        element.setAttribute("y2", line.y);

        previous = { x: line.x, y: line.y };
    });
    requestAnimationFrame(animateLines);
}
animateLines();

// =================== Smooth Scrolling ===================
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isScrolling = false;
const scrollThreshold = 20;

const smoothScrollTo = (targetIndex) => {
    currentIndex = targetIndex;
    container.scrollTo({
        top: targetIndex * window.innerHeight,
        behavior: 'smooth',
    });
};

const handleScroll = (delta) => {
    if (isScrolling) return;

    const targetIndex = Math.max(0, Math.min(currentIndex + delta, sections.length - 1));
    if (targetIndex !== currentIndex) {
        isScrolling = true;
        smoothScrollTo(targetIndex);
        setTimeout(() => (isScrolling = false), 800);
    }
};

container.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (Math.abs(event.deltaY) > scrollThreshold) handleScroll(delta);
});

let touchStartY = 0;
container.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

container.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    const delta = touchEndY > touchStartY ? -1 : 1;
    handleScroll(delta);
});

window.addEventListener('resize', () => smoothScrollTo(currentIndex));


const modalFooter = document.querySelector(".modalFooter")
const modalFooterHandler = document.querySelector("#modalFooterHandler")
const modalFooterCloseHandler = document.querySelector("#modalFooterCloseHandler")
const onClickModalFooterHandler = () => {
    modalFooter.classList.add('modalFooterActive')
}
const onClickmodalFooterCloseHandler = () => {
    modalFooter.classList.remove('modalFooterActive')
}
modalFooterHandler.addEventListener('click', onClickModalFooterHandler)
modalFooterCloseHandler.addEventListener('click', onClickmodalFooterCloseHandler)

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.nft-image');
    let currentIndex = 0;

    function showNextImage() {
        const currentImage = images[currentIndex];
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = images[nextIndex];

        currentImage.classList.remove('active');
        currentImage.classList.add('exiting');

        nextImage.classList.remove('exiting');
        nextImage.classList.add('active');

        currentIndex = nextIndex;
    }
    images[currentIndex].classList.add('active');
    setInterval(showNextImage, 3000);

    const animation_images = document.querySelectorAll('.animation_images');
    let currentIndex1 = 0;

    // Function to toggle images
    const toggleImages = () => {
        const currentImage = animation_images[currentIndex1];
        const nextIndex = (currentIndex1 + 1) % animation_images.length; // Correct index wrapping
        const nextImage = animation_images[nextIndex];

        // Update classes for transition
        currentImage.classList.remove('active1');
        currentImage.classList.add('changing');

        nextImage.classList.remove('changing');
        nextImage.classList.add('active1');

        // Update current index
        currentIndex1 = nextIndex;
    };

    animation_images[currentIndex1].classList.add('active1');


    setInterval(toggleImages, 1000);

});

