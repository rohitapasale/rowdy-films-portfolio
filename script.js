/**
 * Ritesh Itkar - Portfolio Interactive Scripts
 * Dynamic video rendering, modal playback, filtering, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Retrieve video dataset from window.portfolioVideos (defined in src/data/videos.js)
    const videoData = (typeof window !== 'undefined' && window.portfolioVideos) || [];

    // --- Render Portfolio Cards from Data Array ---
    if (portfolioGrid && videoData.length > 0) {
        portfolioGrid.innerHTML = videoData.map(video => `
            <div class="portfolio-card" data-category="${video.category}" data-id="${video.id}">
                <div class="portfolio-thumbnail">
                    <video 
                        class="portfolio-video" 
                        src="${video.videoSrc}" 
                        poster="${video.thumbnail}" 
                        muted 
                        playsinline 
                        preload="metadata"
                        loop>
                    </video>
                    <div class="thumbnail-gradient"></div>
                    <div class="play-btn-circle" aria-label="Play video">
                        <svg class="video-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <div class="thumbnail-title-overlay">${video.title}</div>
                </div>
                <div class="portfolio-info">
                    <div class="portfolio-meta">
                        ${(video.tags || [video.category]).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                    <div class="portfolio-card-footer">
                        <span>Play Video</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // --- Hover Preview & Modal Player Handlers ---
    portfolioCards.forEach(card => {
        const cardVideo = card.querySelector('.portfolio-video');

        // Mouse hover preview (muted, plays inline)
        card.addEventListener('mouseenter', () => {
            if (cardVideo) {
                cardVideo.play().catch(() => {
                    // Autoplay policy fallback (silent)
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (cardVideo) {
                cardVideo.pause();
                cardVideo.currentTime = 0;
            }
        });

        // Click to open video in full modal
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-id');
            const videoObj = videoData.find(v => v.id === videoId);
            if (videoObj && modal && modalVideo) {
                modalVideo.src = videoObj.videoSrc;
                modalVideo.poster = videoObj.thumbnail;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scrolling
                modalVideo.currentTime = 0;
                modalVideo.play().catch(() => {});
            }
        });
    });

    // --- Modal Close Handler ---
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scroll
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.load();
        }
    };

    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            // Close if clicked on the backdrop (outside modal-content)
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Category Filtering ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- Scroll Animations (Reveal Sections) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Active Nav Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
