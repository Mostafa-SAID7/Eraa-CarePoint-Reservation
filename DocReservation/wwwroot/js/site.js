// Simple mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});
// for hero section 
(function () {
    // run when DOM is ready (safe even when script is deferred)
    function init() {
        // Reveal elements (intersection observer)
        const revealEls = Array.from(document.querySelectorAll('.reveal'));
        if (revealEls.length) {
            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            e.target.classList.add('in-view');
                            io.unobserve(e.target);
                        }
                    });
                }, { threshold: 0.12 });
                revealEls.forEach(el => io.observe(el));
            } else {
                // fallback: reveal immediately
                revealEls.forEach(el => el.classList.add('in-view'));
            }
        }

        // Respect reduced-motion preference
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Neumorph image interactions (support multiple)
        const imgWraps = Array.from(document.querySelectorAll('.neumorph'));
        imgWraps.forEach(imgWrap => {
            // safe guards
            if (!imgWrap) return;
            const img = imgWrap.querySelector('img');
            if (!img) return;

            // usable state
            let rect = null;
            let rafId = null;

            // helper to reset transform
            const resetImageTransform = () => {
                // valid CSS transform to reset
                img.style.transform = 'translate(0px, 0px) scale(1)';
            };

            // pointerenter to capture bounding rect (for pointer move math)
            imgWrap.addEventListener('pointerenter', () => {
                rect = imgWrap.getBoundingClientRect();
            });

            // pointermove => parallax (throttled with rAF)
            if (!reduceMotion) {
                imgWrap.addEventListener('pointermove', (ev) => {
                    if (!rect) return;
                    if (rafId) return; // already queued
                    rafId = requestAnimationFrame(() => {
                        rafId = null;
                        const px = (ev.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
                        const py = (ev.clientY - rect.top) / rect.height - 0.5;
                        // limit translation in px
                        const maxTranslate = 8; // px
                        const tx = Math.max(-maxTranslate, Math.min(maxTranslate, px * maxTranslate * 2));
                        const ty = Math.max(-maxTranslate, Math.min(maxTranslate, py * maxTranslate * 2));
                        // subtle scale
                        img.style.transform = `translate(${tx}px, ${ty}px) scale(1.02)`;
                    });
                });

                // on pointerleave reset transform and rect
                imgWrap.addEventListener('pointerleave', () => {
                    rect = null;
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    resetImageTransform();
                });
            } else {
                // reduced motion: no pointermove, but still ensure clean reset on leave
                imgWrap.addEventListener('pointerleave', () => {
                    resetImageTransform();
                });
            }

            // keyboard accessibility: simulate press effect on Enter/Space
            imgWrap.addEventListener('keydown', (e) => {
                const key = e.key || e.code || '';
                if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 'Space') {
                    e.preventDefault();
                    imgWrap.classList.add('active');
                    setTimeout(() => imgWrap.classList.remove('active'), 160);
                }
            });

            // ensure transform resets if element is removed or page navigates
            window.addEventListener('pagehide', resetImageTransform, { passive: true });
        });
    }

    // DOM-ready guard: works whether script is deferred or not
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// for Complete Appointment
document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    });

    closeModal.addEventListener('click', function () {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    });
});