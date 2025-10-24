(function () {
    // --- 1. CONFIGURATION & STATE ---

    // Dynamically collect image sources from the HTML when the script loads
    const imageSources = Array.from(document.querySelectorAll('.grid-thumbnail img')).map(img => img.src);
    const totalLightboxSlides = imageSources.length;
    
    // Mutable state for tracking the current slide
    let currentLightboxSlideIndex = 0; 

    // --- 2. DOM ELEMENT SELECTION ---
    const gridThumbnails = document.querySelectorAll('.grid-thumbnail');
    const lightbox = document.getElementById('lightbox');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const lightboxSliderTrack = document.getElementById('lightbox-slider-track');
    const lightboxSliderWindow = document.getElementById('lightbox-slider-window');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    const lightboxNextBtn = document.getElementById('lightbox-next-btn');

    // Early exit if essential elements are missing (basic error handling)
    if (!lightbox || !lightboxSliderTrack || !lightboxSliderWindow) {
        console.error('Lightbox elements not found. Initialization stopped.');
        return; 
    }

    // --- 3. SLIDE GENERATION ---
    const generateLightboxSlides = () => {
        const fragment = document.createDocumentFragment();
        
        imageSources.forEach((src, index) => {
            const slideDiv = document.createElement('div');
            // w-[65vw] on mobile, md:w-[400px] on desktop, aspect-[2/3] for portrait look
            slideDiv.className = 'lightbox-slide flex-none w-[65vw] md:w-[400px] aspect-[2/3] p-2'; 
            slideDiv.setAttribute('data-index', index);

            const innerContentDiv = document.createElement('div');
            innerContentDiv.className = 'lightbox-slide-content h-full bg-white rounded-[2rem] shadow-xl border-8 border-gray-100 flex items-center justify-center overflow-hidden';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            
            innerContentDiv.appendChild(img);
            slideDiv.appendChild(innerContentDiv);
            fragment.appendChild(slideDiv);
        });
        
        lightboxSliderTrack.innerHTML = ''; 
        lightboxSliderTrack.appendChild(fragment);
    };

    // --- 4. LIGHTBOX SLIDER CORE LOGIC ---
    const centerLightboxSlide = (index) => {
        const lightboxSlides = lightboxSliderTrack.querySelectorAll('.lightbox-slide');
        if (lightboxSlides.length === 0) return;

        // Ensure slide widths are calculated correctly
        const slideWidth = lightboxSlides[0].offsetWidth; 
        const windowWidth = lightboxSliderWindow.offsetWidth;

        // Calculate position and offset for centering
        const currentSlideLeft = index * slideWidth;
        const offset = (windowWidth / 2) - (slideWidth / 2) - currentSlideLeft;
        
        lightboxSliderTrack.style.transform = `translateX(${offset}px)`;

        // Apply scale and opacity for the "Peek-a-boo" effect
        lightboxSlides.forEach((slide, i) => {
            const innerContent = slide.querySelector('.lightbox-slide-content');
            const scale = i === index ? 'scale(1.0)' : 'scale(0.85)';
            const opacity = i === index ? '1.0' : '0.7';

            innerContent.style.transform = scale;
            innerContent.style.opacity = opacity;
        });
    };

    const navigateLightbox = (direction) => {
        let newIndex = currentLightboxSlideIndex + direction;

        // Wrap-around navigation
        if (newIndex < 0) {
            newIndex = totalLightboxSlides - 1; 
        } else if (newIndex >= totalLightboxSlides) {
            newIndex = 0; 
        }
        
        currentLightboxSlideIndex = newIndex;
        centerLightboxSlide(currentLightboxSlideIndex);
    };

    // Handles showing the lightbox
    const openLightbox = (startIndex) => {
        
        // 1. Generate slides if they don't exist
        if (lightboxSliderTrack.children.length === 0) {
            generateLightboxSlides();
        }

        currentLightboxSlideIndex = startIndex;
        
        // 2. Fix: Use requestAnimationFrame twice.
        // The first frame ensures the slides are attached to the DOM.
        // The second frame ensures the browser has calculated the final 'offsetWidth' based on Tailwind CSS.
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                centerLightboxSlide(currentLightboxSlideIndex);
                
                // 3. Show the lightbox after centering is complete
                lightbox.classList.remove('lightbox-hidden');
                lightbox.classList.add('lightbox-visible');
            });
        });
    };

    const closeLightbox = () => {
        lightbox.classList.remove('lightbox-visible');
        lightbox.classList.add('lightbox-hidden');
    };

    // --- 5. EVENT LISTENERS ---

    // Open Lightbox when a thumbnail is clicked
    gridThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const index = parseInt(thumbnail.dataset.index);
            openLightbox(index);
        });
    });

    // Navigation and Close buttons
    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', () => navigateLightbox(-1));
    lightboxNextBtn.addEventListener('click', () => navigateLightbox(1));

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('lightbox-visible')) {
            closeLightbox();
        }
    });

    // Recenter on window resize
    window.addEventListener('resize', () => {
        if (lightbox.classList.contains('lightbox-visible')) {
            centerLightboxSlide(currentLightboxSlideIndex);
        }
    });

})();