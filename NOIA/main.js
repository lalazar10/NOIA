// Remove the product card observer code and keep only the hero animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate nav
    const nav = document.querySelector('nav');
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-50px)';
    nav.style.transition = 'opacity 1000ms ease, transform 1000ms ease';
    
    setTimeout(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
    }, 0);

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(50px)';
    heroContent.style.transition = 'opacity 1000ms ease, transform 1000ms ease';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);
});

